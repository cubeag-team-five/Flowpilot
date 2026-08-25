package com.flowpilot.flowpilot.scrummaster.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.flowpilot.flowpilot.scrummaster.dto.ScrumSprintDto;
import com.flowpilot.flowpilot.scrummaster.exception.ScrumNotFoundException;
import com.flowpilot.flowpilot.scrummaster.exception.ScrumValidationException;
import com.flowpilot.flowpilot.scrummaster.model.ScrumSprint;
import com.flowpilot.flowpilot.scrummaster.model.ScrumTask;
import com.flowpilot.flowpilot.scrummaster.repository.ScrumSprintRepository;
import com.flowpilot.flowpilot.scrummaster.repository.ScrumTaskRepository;

/**
 * The sprint lifecycle: plan, start, complete.
 *
 * This is what separates a scrum tool from a task list. Points are frozen at
 * start so scope creep is measurable, only one sprint may be active at a time,
 * and closing a sprint carries unfinished work forward instead of losing it.
 */
@Service
public class ScrumSprintService {

    private final ScrumSprintRepository sprintRepository;
    private final ScrumTaskRepository taskRepository;

    public ScrumSprintService(
            ScrumSprintRepository sprintRepository,
            ScrumTaskRepository taskRepository
    ) {
        this.sprintRepository = sprintRepository;
        this.taskRepository = taskRepository;
    }


    // ============================================
    // LIST ALL SPRINTS
    // ============================================
    public List<ScrumSprintDto.Response> listSprints() {

        List<ScrumSprintDto.Response> out = new ArrayList<>();

        for (ScrumSprint sprint : sprintRepository.findAll()) {
            out.add(toResponse(sprint));
        }

        out.sort((a, b) -> b.getSprintNumber() - a.getSprintNumber());

        return out;
    }


    public ScrumSprintDto.Response getActiveSprint() {

        return toResponse(requireActiveSprint());
    }


    // ============================================
    // CREATE A SPRINT (starts life as PLANNED)
    // ============================================
    @Transactional
    public ScrumSprintDto.Response createSprint(ScrumSprintDto.CreateRequest request) {

        if (request == null) {
            throw new ScrumValidationException("Sprint details are required");
        }

        if (request.getName() == null || request.getName().isBlank()) {
            throw new ScrumValidationException("Sprint name is required");
        }

        if (request.getStartDate() != null
                && request.getEndDate() != null
                && request.getEndDate().isBefore(request.getStartDate())) {

            throw new ScrumValidationException("End date cannot be before the start date");
        }

        int nextNumber = sprintRepository
                .findFirstByOrderBySprintNumberDesc()
                .map(sprint -> sprint.getSprintNumber() + 1)
                .orElse(1);

        ScrumSprint sprint = new ScrumSprint();
        sprint.setSprintNumber(nextNumber);
        sprint.setName(request.getName().trim());
        sprint.setGoal(request.getGoal());
        sprint.setStartDate(request.getStartDate());
        sprint.setEndDate(request.getEndDate());
        sprint.setStatus(ScrumSprint.Status.PLANNED);

        return toResponse(sprintRepository.save(sprint));
    }


    // ============================================
    // START A SPRINT — freezes the commitment
    // ============================================
    @Transactional
    public ScrumSprintDto.Response startSprint(Long sprintId) {

        ScrumSprint sprint = sprintRepository
                .findById(sprintId)
                .orElseThrow(() -> new ScrumNotFoundException("Sprint not found: " + sprintId));

        if (sprint.getStatus() == ScrumSprint.Status.ACTIVE) {
            throw new ScrumValidationException("That sprint is already active");
        }

        if (sprint.getStatus() == ScrumSprint.Status.COMPLETED) {
            throw new ScrumValidationException("A completed sprint cannot be restarted");
        }

        // Scrum allows exactly one sprint in flight
        if (sprintRepository.findFirstByStatus(ScrumSprint.Status.ACTIVE).isPresent()) {
            throw new ScrumValidationException(
                    "Another sprint is already active — complete it first"
            );
        }

        Integer points = taskRepository.sumStoryPointsForSprint(sprintId);

        sprint.setStatus(ScrumSprint.Status.ACTIVE);
        sprint.setCommittedPoints(points == null ? 0 : points);

        if (sprint.getStartDate() == null) {
            sprint.setStartDate(LocalDate.now());
        }

        return toResponse(sprintRepository.save(sprint));
    }


    // ============================================
    // COMPLETE A SPRINT — carries work forward
    // ============================================
    @Transactional
    public ScrumSprintDto.CompleteResult completeSprint(
            Long sprintId,
            Long carryToSprintId
    ) {

        ScrumSprint sprint = sprintRepository
                .findById(sprintId)
                .orElseThrow(() -> new ScrumNotFoundException("Sprint not found: " + sprintId));

        if (sprint.getStatus() != ScrumSprint.Status.ACTIVE) {
            throw new ScrumValidationException("Only an active sprint can be completed");
        }

        ScrumSprint carryTo = null;

        if (carryToSprintId != null) {

            carryTo = sprintRepository
                    .findById(carryToSprintId)
                    .orElseThrow(() -> new ScrumNotFoundException(
                            "Target sprint not found: " + carryToSprintId));

            if (carryTo.getId().equals(sprint.getId())) {
                throw new ScrumValidationException(
                        "Unfinished work cannot carry into the same sprint"
                );
            }

            if (carryTo.getStatus() == ScrumSprint.Status.COMPLETED) {
                throw new ScrumValidationException(
                        "Unfinished work cannot carry into a completed sprint"
                );
            }
        }

        Integer donePoints = taskRepository
                .sumStoryPointsForSprintByStatus(sprintId, ScrumTask.Status.DONE);

        int carried = 0;

        for (ScrumTask task : taskRepository
                .findBySprintIdOrderByStatusAscTaskKeyAsc(sprintId)) {

            if (task.getStatus() == ScrumTask.Status.DONE) {
                continue;
            }

            // Unfinished work either moves to the next sprint or returns to the backlog
            task.setSprint(carryTo);
            taskRepository.save(task);
            carried++;
        }

        sprint.setStatus(ScrumSprint.Status.COMPLETED);
        sprintRepository.save(sprint);

        ScrumSprintDto.CompleteResult result = new ScrumSprintDto.CompleteResult();
        result.setCompletedSprintId(sprint.getId());
        result.setCompletedPoints(donePoints == null ? 0 : donePoints);
        result.setCarriedTaskCount(carried);
        result.setCarriedToSprintId(carryTo == null ? null : carryTo.getId());

        return result;
    }


    @Transactional
    public void deleteSprint(Long sprintId) {

        ScrumSprint sprint = sprintRepository
                .findById(sprintId)
                .orElseThrow(() -> new ScrumNotFoundException("Sprint not found: " + sprintId));

        if (sprint.getStatus() == ScrumSprint.Status.ACTIVE) {
            throw new ScrumValidationException(
                    "An active sprint cannot be deleted — complete it first"
            );
        }

        // Detach tasks rather than delete them; the work still exists
        for (ScrumTask task : taskRepository
                .findBySprintIdOrderByStatusAscTaskKeyAsc(sprintId)) {

            task.setSprint(null);
            taskRepository.save(task);
        }

        sprintRepository.delete(sprint);
    }


    ScrumSprint requireActiveSprint() {

        return sprintRepository
                .findFirstByStatus(ScrumSprint.Status.ACTIVE)
                .orElseThrow(() -> new ScrumNotFoundException(
                        "No active sprint. Create one and start it."
                ));
    }


    private ScrumSprintDto.Response toResponse(ScrumSprint sprint) {

        Integer points = taskRepository.sumStoryPointsForSprint(sprint.getId());
        long count = taskRepository.countBySprintId(sprint.getId());

        ScrumSprintDto.Response response = new ScrumSprintDto.Response();
        response.setId(sprint.getId());
        response.setSprintNumber(sprint.getSprintNumber());
        response.setName(sprint.getName());
        response.setGoal(sprint.getGoal());
        response.setStartDate(sprint.getStartDate());
        response.setEndDate(sprint.getEndDate());
        response.setStatus(sprint.getStatus().name());
        response.setCommittedPoints(sprint.getCommittedPoints());
        response.setTaskCount((int) count);
        response.setTotalPoints(points == null ? 0 : points);

        return response;
    }
}

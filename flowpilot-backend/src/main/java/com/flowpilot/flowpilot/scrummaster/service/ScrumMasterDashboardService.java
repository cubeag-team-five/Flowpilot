package com.flowpilot.flowpilot.scrummaster.service;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.flowpilot.flowpilot.scrummaster.exception.ScrumNotFoundException;
import com.flowpilot.flowpilot.scrummaster.dto.ScrumDashboardDto;
import com.flowpilot.flowpilot.scrummaster.model.ScrumSprint;
import com.flowpilot.flowpilot.scrummaster.model.ScrumTask;
import com.flowpilot.flowpilot.scrummaster.repository.ScrumSprintRepository;
import com.flowpilot.flowpilot.scrummaster.repository.ScrumTaskRepository;

@Service
public class ScrumMasterDashboardService {

    private static final DateTimeFormatter DAY_MONTH =
            DateTimeFormatter.ofPattern("MMM d");

    private final ScrumSprintRepository sprintRepository;
    private final ScrumTaskRepository taskRepository;

    public ScrumMasterDashboardService(
            ScrumSprintRepository sprintRepository,
            ScrumTaskRepository taskRepository
    ) {
        this.sprintRepository = sprintRepository;
        this.taskRepository = taskRepository;
    }


    // ============================================
    // SPRINT HEALTH FOR THE ACTIVE SPRINT
    // ============================================
    public ScrumDashboardDto.Response getDashboard() {

        ScrumSprint sprint = sprintRepository
                .findFirstByStatus(ScrumSprint.Status.ACTIVE)
                .orElseThrow(() -> new ScrumNotFoundException("No active sprint"));

        Long sprintId = sprint.getId();

        long tasksTotal = taskRepository.countBySprintId(sprintId);
        long tasksDone = taskRepository
                .countBySprintIdAndStatus(sprintId, ScrumTask.Status.DONE);

        Integer pointsTotal = taskRepository.sumStoryPointsForSprint(sprintId);
        Integer pointsDone = taskRepository
                .sumStoryPointsForSprintByStatus(sprintId, ScrumTask.Status.DONE);

        // Cards stuck in one column are what a scrum master must unblock
        long blockers = taskRepository
                .findBySprintIdOrderByStatusAscTaskKeyAsc(sprintId)
                .stream()
                .filter(task -> task.getStatus() != ScrumTask.Status.DONE)
                .filter(task -> task.getDaysInColumn() >= 3)
                .count();

        ScrumDashboardDto.Response response = new ScrumDashboardDto.Response();
        response.setSprintId(sprintId);
        response.setSprintNumber(sprint.getSprintNumber());
        response.setSprintName(sprint.getName());
        response.setGoal(sprint.getGoal());
        response.setStatus(sprint.getStatus().name());

        response.setDaysRemaining(sprint.getDaysRemaining());
        response.setTotalDays(sprint.getTotalDays());

        response.setTasksDone((int) tasksDone);
        response.setTasksTotal((int) tasksTotal);
        response.setPercentComplete(
                tasksTotal == 0 ? 0 : (int) Math.round(tasksDone * 100.0 / tasksTotal)
        );

        response.setPointsDone(pointsDone == null ? 0 : pointsDone);
        response.setPointsTotal(pointsTotal == null ? 0 : pointsTotal);
        response.setCommittedPoints(sprint.getCommittedPoints());

        response.setBlockerCount((int) blockers);
        response.setCeremonies(buildCeremonies(sprint));

        return response;
    }


    /**
     * Ceremony dates are derived from the sprint window rather than stored,
     * because they follow a fixed cadence: standup daily, review and retro at
     * the end, next planning the day after this sprint closes.
     */
    private List<ScrumDashboardDto.Ceremony> buildCeremonies(ScrumSprint sprint) {

        List<ScrumDashboardDto.Ceremony> ceremonies = new ArrayList<>();

        ceremonies.add(new ScrumDashboardDto.Ceremony(
                "Daily standup", "9:30 AM — daily", "done"
        ));

        if (sprint.getEndDate() != null) {

            ceremonies.add(new ScrumDashboardDto.Ceremony(
                    "Sprint review / demo",
                    sprint.getEndDate().minusDays(1).format(DAY_MONTH) + " · 3:00 PM",
                    "plan"
            ));

            ceremonies.add(new ScrumDashboardDto.Ceremony(
                    "Sprint retrospective",
                    sprint.getEndDate().format(DAY_MONTH) + " · 10:00 AM",
                    "done"
            ));

            ceremonies.add(new ScrumDashboardDto.Ceremony(
                    "Next sprint planning",
                    sprint.getEndDate().plusDays(1).format(DAY_MONTH) + " · 9:00 AM",
                    "active"
            ));
        }

        return ceremonies;
    }
}

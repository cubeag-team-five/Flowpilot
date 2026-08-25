package com.flowpilot.flowpilot.scrummaster.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.flowpilot.flowpilot.scrummaster.exception.ScrumNotFoundException;
import com.flowpilot.flowpilot.scrummaster.exception.ScrumValidationException;
import com.flowpilot.flowpilot.scrummaster.dto.ScrumBoardDto;
import com.flowpilot.flowpilot.scrummaster.model.ScrumSprint;
import com.flowpilot.flowpilot.scrummaster.model.ScrumTask;
import com.flowpilot.flowpilot.scrummaster.repository.ScrumSprintRepository;
import com.flowpilot.flowpilot.scrummaster.repository.ScrumTaskRepository;

@Service
public class ScrumBoardService {

    private final ScrumTaskRepository taskRepository;
    private final ScrumSprintRepository sprintRepository;

    public ScrumBoardService(
            ScrumTaskRepository taskRepository,
            ScrumSprintRepository sprintRepository
    ) {
        this.taskRepository = taskRepository;
        this.sprintRepository = sprintRepository;
    }


    /** Column headings shown to people, kept beside the enum they describe. */
    private String labelFor(ScrumTask.Status status) {

        switch (status) {
            case BACKLOG:     return "Backlog";
            case TODO:        return "To do";
            case IN_PROGRESS: return "In progress";
            case CODE_REVIEW: return "Code review";
            case TESTING:     return "Testing";
            case DONE:        return "Done";
            default:          return status.name();
        }
    }


    // ============================================
    // WHOLE BOARD FOR THE ACTIVE SPRINT
    // ============================================
    public ScrumBoardDto.Response getBoard() {

        ScrumSprint sprint = sprintRepository
                .findFirstByStatus(ScrumSprint.Status.ACTIVE)
                .orElseThrow(() -> new ScrumNotFoundException("No active sprint"));

        List<ScrumTask> tasks = taskRepository
                .findBySprintIdOrderByStatusAscTaskKeyAsc(sprint.getId());

        List<ScrumBoardDto.Column> columns = new ArrayList<>();
        int totalPoints = 0;

        // Every column is emitted even when empty, so the board keeps its shape
        for (ScrumTask.Status status : ScrumTask.Status.values()) {

            List<ScrumBoardDto.Card> cards = new ArrayList<>();
            int columnPoints = 0;

            for (ScrumTask task : tasks) {

                if (task.getStatus() != status) {
                    continue;
                }

                cards.add(toCard(task));
                columnPoints += task.getStoryPoints();
            }

            ScrumBoardDto.Column column = new ScrumBoardDto.Column();
            column.setStatus(status.name());
            column.setLabel(labelFor(status));
            column.setTaskCount(cards.size());
            column.setTotalPoints(columnPoints);
            column.setCards(cards);

            columns.add(column);
            totalPoints += columnPoints;
        }

        ScrumBoardDto.Response response = new ScrumBoardDto.Response();
        response.setSprintId(sprint.getId());
        response.setSprintName(sprint.getName());
        response.setTotalTasks(tasks.size());
        response.setTotalPoints(totalPoints);
        response.setColumns(columns);

        return response;
    }


    // ============================================
    // MOVE A CARD BETWEEN COLUMNS
    // ============================================
    public ScrumBoardDto.Card moveTask(Long taskId, String newStatus) {

        if (newStatus == null || newStatus.isBlank()) {
            throw new ScrumValidationException("Status is required");
        }

        ScrumTask.Status status;

        try {
            status = ScrumTask.Status.valueOf(newStatus.trim().toUpperCase());
        } catch (IllegalArgumentException ex) {
            throw new ScrumValidationException("Unknown status: " + newStatus);
        }

        ScrumTask task = taskRepository
                .findById(taskId)
                .orElseThrow(() -> new ScrumNotFoundException("Task not found: " + taskId));

        // moveTo also restarts the ageing clock
        task.moveTo(status);

        return toCard(taskRepository.save(task));
    }


    private ScrumBoardDto.Card toCard(ScrumTask task) {

        ScrumBoardDto.Card card = new ScrumBoardDto.Card();
        card.setId(task.getId());
        card.setTaskKey(task.getTaskKey());
        card.setTitle(task.getTitle());
        card.setAssigneeName(task.getAssigneeName());
        card.setAssigneeInitials(task.getAssigneeInitials());
        card.setStoryPoints(task.getStoryPoints());
        card.setStatus(task.getStatus().name());
        card.setDaysInColumn(task.getDaysInColumn());

        return card;
    }
}

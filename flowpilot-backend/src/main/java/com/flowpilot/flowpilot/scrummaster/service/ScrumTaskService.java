package com.flowpilot.flowpilot.scrummaster.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.flowpilot.flowpilot.common.model.User;
import com.flowpilot.flowpilot.common.repository.UserRepository;
import com.flowpilot.flowpilot.scrummaster.dto.ScrumBoardDto;
import com.flowpilot.flowpilot.scrummaster.dto.ScrumTaskDto;
import com.flowpilot.flowpilot.scrummaster.exception.ScrumNotFoundException;
import com.flowpilot.flowpilot.scrummaster.exception.ScrumValidationException;
import com.flowpilot.flowpilot.scrummaster.model.ScrumSprint;
import com.flowpilot.flowpilot.scrummaster.model.ScrumTask;
import com.flowpilot.flowpilot.scrummaster.repository.ScrumSprintRepository;
import com.flowpilot.flowpilot.scrummaster.repository.ScrumTaskRepository;

@Service
public class ScrumTaskService {

    private static final int MAX_STORY_POINTS = 100;

    private final ScrumTaskRepository taskRepository;
    private final ScrumSprintRepository sprintRepository;
    private final UserRepository userRepository;

    public ScrumTaskService(
            ScrumTaskRepository taskRepository,
            ScrumSprintRepository sprintRepository,
            UserRepository userRepository
    ) {
        this.taskRepository = taskRepository;
        this.sprintRepository = sprintRepository;
        this.userRepository = userRepository;
    }


    // ============================================
    // PEOPLE A TASK CAN BE ASSIGNED TO
    // ============================================
    public List<ScrumTaskDto.Member> listMembers() {

        List<ScrumTaskDto.Member> members = new ArrayList<>();

        for (User user : userRepository.findAll()) {

            ScrumTaskDto.Member member = new ScrumTaskDto.Member();
            member.setId(user.getId());
            member.setName(user.getName());
            member.setEmail(user.getEmail());
            member.setRole(user.getRole());
            member.setInitials(initialsOf(user.getName()));

            members.add(member);
        }

        members.sort((a, b) -> {
            String left = a.getName() == null ? "" : a.getName();
            String right = b.getName() == null ? "" : b.getName();
            return left.compareToIgnoreCase(right);
        });

        return members;
    }


    // ============================================
    // CREATE A TASK
    // ============================================
    @Transactional
    public ScrumBoardDto.Card createTask(ScrumTaskDto.CreateRequest request) {

        if (request == null) {
            throw new ScrumValidationException("Task details are required");
        }

        if (request.getTitle() == null || request.getTitle().isBlank()) {
            throw new ScrumValidationException("Title is required");
        }

        ScrumTask task = new ScrumTask();
        task.setTaskKey(nextTaskKey());
        task.setTitle(request.getTitle().trim());
        task.setStoryPoints(validPoints(request.getStoryPoints(), 0));
        task.setStatus(parseStatus(request.getStatus(), ScrumTask.Status.BACKLOG));

        if (request.getAssigneeId() != null) {
            task.setAssignee(requireUser(request.getAssigneeId()));
        }

        if (request.getSprintId() != null) {
            task.setSprint(requireSprint(request.getSprintId()));
        }

        return toCard(taskRepository.save(task));
    }


    // ============================================
    // UPDATE — TITLE, POINTS, ASSIGNEE, SPRINT
    // ============================================
    @Transactional
    public ScrumBoardDto.Card updateTask(Long taskId, ScrumTaskDto.UpdateRequest request) {

        if (request == null) {
            throw new ScrumValidationException("Nothing to update");
        }

        ScrumTask task = requireTask(taskId);

        if (request.getTitle() != null) {

            if (request.getTitle().isBlank()) {
                throw new ScrumValidationException("Title cannot be empty");
            }

            task.setTitle(request.getTitle().trim());
        }

        if (request.getStoryPoints() != null) {
            task.setStoryPoints(validPoints(request.getStoryPoints(), task.getStoryPoints()));
        }

        // Unassign wins over assigneeId so clearing an owner is unambiguous
        if (Boolean.TRUE.equals(request.getUnassign())) {
            task.setAssignee(null);
        } else if (request.getAssigneeId() != null) {
            task.setAssignee(requireUser(request.getAssigneeId()));
        }

        if (request.getSprintId() != null) {
            task.setSprint(requireSprint(request.getSprintId()));
        }

        if (request.getStatus() != null) {
            task.moveTo(parseStatus(request.getStatus(), task.getStatus()));
        }

        return toCard(taskRepository.save(task));
    }


    @Transactional
    public void deleteTask(Long taskId) {

        taskRepository.delete(requireTask(taskId));
    }


    // ============================================
    // HELPERS
    // ============================================

    /** Sequential, human-readable keys: T-001, T-002 … */
    private String nextTaskKey() {

        long next = taskRepository.count() + 1;
        String key = String.format("T-%03d", next);

        // count() can collide after deletions, so walk forward until free
        while (taskRepository.existsByTaskKey(key)) {
            next++;
            key = String.format("T-%03d", next);
        }

        return key;
    }

    private int validPoints(Integer points, int fallback) {

        if (points == null) {
            return fallback;
        }

        if (points < 0) {
            throw new ScrumValidationException("Story points cannot be negative");
        }

        if (points > MAX_STORY_POINTS) {
            throw new ScrumValidationException(
                    "Story points cannot exceed " + MAX_STORY_POINTS
            );
        }

        return points;
    }

    private ScrumTask.Status parseStatus(String raw, ScrumTask.Status fallback) {

        if (raw == null || raw.isBlank()) {
            return fallback;
        }

        try {
            return ScrumTask.Status.valueOf(raw.trim().toUpperCase());
        } catch (IllegalArgumentException ex) {
            throw new ScrumValidationException("Unknown status: " + raw);
        }
    }

    private ScrumTask requireTask(Long taskId) {

        return taskRepository
                .findById(taskId)
                .orElseThrow(() -> new ScrumNotFoundException("Task not found: " + taskId));
    }

    private User requireUser(Long userId) {

        return userRepository
                .findById(userId)
                .orElseThrow(() -> new ScrumNotFoundException("User not found: " + userId));
    }

    private ScrumSprint requireSprint(Long sprintId) {

        return sprintRepository
                .findById(sprintId)
                .orElseThrow(() -> new ScrumNotFoundException("Sprint not found: " + sprintId));
    }

    private String initialsOf(String name) {

        if (name == null || name.isBlank()) {
            return "?";
        }

        String[] parts = name.trim().split("\\s+");

        if (parts.length == 1) {
            return parts[0].substring(0, 1).toUpperCase();
        }

        return (parts[0].substring(0, 1) + parts[parts.length - 1].substring(0, 1))
                .toUpperCase();
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

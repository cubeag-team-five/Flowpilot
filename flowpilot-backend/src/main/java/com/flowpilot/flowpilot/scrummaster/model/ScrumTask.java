package com.flowpilot.flowpilot.scrummaster.model;

import java.time.LocalDateTime;

import com.flowpilot.flowpilot.common.model.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

/**
 * A single work item on the scrum board.
 *
 * `enteredStatusAt` is stamped every time the status changes. That is what
 * powers the ageing warning on the board — a card sitting in one column for
 * days is the signal a scrum master needs, and it cannot be recovered later
 * if we only store the current status.
 */
@Entity
@Table(name = "scrum_tasks")
public class ScrumTask {

    /** The board columns, in flow order. */
    public enum Status {
        BACKLOG,
        TODO,
        IN_PROGRESS,
        CODE_REVIEW,
        TESTING,
        DONE
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** Human-facing identifier shown on the card, e.g. "T-043". */
    @Column(name = "task_key", nullable = false, unique = true, length = 20)
    private String taskKey;

    @Column(nullable = false, length = 255)
    private String title;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "assignee_id")
    private User assignee;

    @Column(name = "story_points", nullable = false)
    private Integer storyPoints;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private Status status;

    @Column(name = "entered_status_at", nullable = false)
    private LocalDateTime enteredStatusAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sprint_id")
    private ScrumSprint sprint;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    public ScrumTask() {
    }

    @PrePersist
    public void beforeSave() {

        if (this.status == null) {
            this.status = Status.BACKLOG;
        }

        if (this.storyPoints == null) {
            this.storyPoints = 0;
        }

        if (this.enteredStatusAt == null) {
            this.enteredStatusAt = LocalDateTime.now();
        }

        if (this.createdAt == null) {
            this.createdAt = LocalDateTime.now();
        }
    }

    /**
     * Moves the card and restarts its ageing clock. Always use this rather
     * than setStatus, so `enteredStatusAt` can never drift out of step.
     */
    public void moveTo(Status newStatus) {

        if (newStatus == null || newStatus == this.status) {
            return;
        }

        this.status = newStatus;
        this.enteredStatusAt = LocalDateTime.now();
    }

    /** Whole days the card has sat in its current column. */
    public int getDaysInColumn() {

        if (this.enteredStatusAt == null) {
            return 0;
        }

        long hours = java.time.Duration
                .between(this.enteredStatusAt, LocalDateTime.now())
                .toHours();

        return (int) (hours / 24);
    }

    /** Initials for the card avatar, derived so the UI needs no extra field. */
    public String getAssigneeInitials() {

        String name = getAssigneeName();

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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTaskKey() {
        return taskKey;
    }

    public void setTaskKey(String taskKey) {
        this.taskKey = taskKey;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public User getAssignee() {
        return assignee;
    }

    public void setAssignee(User assignee) {
        this.assignee = assignee;
    }

    /** Display name of the assignee, or null when nobody owns the task. */
    public String getAssigneeName() {
        return this.assignee == null ? null : this.assignee.getName();
    }

    public Integer getStoryPoints() {
        return storyPoints;
    }

    public void setStoryPoints(Integer storyPoints) {
        this.storyPoints = storyPoints;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public LocalDateTime getEnteredStatusAt() {
        return enteredStatusAt;
    }

    public void setEnteredStatusAt(LocalDateTime enteredStatusAt) {
        this.enteredStatusAt = enteredStatusAt;
    }

    public ScrumSprint getSprint() {
        return sprint;
    }

    public void setSprint(ScrumSprint sprint) {
        this.sprint = sprint;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}

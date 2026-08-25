package com.flowpilot.flowpilot.scrummaster.model;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

/**
 * A sprint: the unit of work a scrum team commits to for a fixed period.
 *
 * Only one sprint per project may be ACTIVE at a time. Committed points are
 * frozen when the sprint starts, so mid-sprint scope changes are visible as
 * the gap between committed and current points rather than silently absorbed.
 */
@Entity
@Table(name = "scrum_sprints")
public class ScrumSprint {

    public enum Status {
        PLANNED,
        ACTIVE,
        COMPLETED
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "sprint_number", nullable = false)
    private Integer sprintNumber;

    @Column(nullable = false, length = 255)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String goal;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private Status status;

    /** Story points in the sprint at the moment it started. Null until then. */
    @Column(name = "committed_points")
    private Integer committedPoints;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    public ScrumSprint() {
    }

    @PrePersist
    public void beforeSave() {

        if (this.status == null) {
            this.status = Status.PLANNED;
        }

        if (this.createdAt == null) {
            this.createdAt = LocalDateTime.now();
        }
    }

    /** Total sprint length in days, or 0 if the dates are not set yet. */
    public int getTotalDays() {

        if (this.startDate == null || this.endDate == null) {
            return 0;
        }

        return (int) (this.endDate.toEpochDay() - this.startDate.toEpochDay());
    }

    /** Days left before the sprint ends, never negative. */
    public int getDaysRemaining() {

        if (this.endDate == null) {
            return 0;
        }

        long remaining = this.endDate.toEpochDay() - LocalDate.now().toEpochDay();

        return remaining < 0 ? 0 : (int) remaining;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getSprintNumber() {
        return sprintNumber;
    }

    public void setSprintNumber(Integer sprintNumber) {
        this.sprintNumber = sprintNumber;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getGoal() {
        return goal;
    }

    public void setGoal(String goal) {
        this.goal = goal;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Integer getCommittedPoints() {
        return committedPoints;
    }

    public void setCommittedPoints(Integer committedPoints) {
        this.committedPoints = committedPoints;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}

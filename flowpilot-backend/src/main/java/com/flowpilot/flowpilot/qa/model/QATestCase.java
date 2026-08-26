package com.flowpilot.flowpilot.qa.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "qa_test_cases")
public class QATestCase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "test_id", nullable = false, unique = true)
    private String testId;

    @Column(nullable = false)
    private String title;

    private String type;

    @Column(name = "linked_task")
    private String linkedTask;

    private String priority;

    private String status;

    @Column(name = "assigned_to")
    private String assignedTo;

    @Column(name = "project")
    private String project;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    public QATestCase() {
    }

    @PrePersist
    public void onCreate() {

        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }

        if (status == null || status.isBlank()) {
            status = "Pending";
        }
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTestId() {
        return testId;
    }

    public void setTestId(String testId) {
        this.testId = testId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getLinkedTask() {
        return linkedTask;
    }

    public void setLinkedTask(String linkedTask) {
        this.linkedTask = linkedTask;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getAssignedTo() {
        return assignedTo;
    }

    public void setAssignedTo(String assignedTo) {
        this.assignedTo = assignedTo;
    }

    public String getProject() {
        return project;
    }

    public void setProject(String project) {
        this.project = project;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
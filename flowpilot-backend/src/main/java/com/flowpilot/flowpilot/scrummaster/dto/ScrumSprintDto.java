package com.flowpilot.flowpilot.scrummaster.dto;

import java.time.LocalDate;

/** Sprint create and read payloads. */
public class ScrumSprintDto {

    // ============================================
    // CREATE A SPRINT
    // ============================================
    public static class CreateRequest {

        private String name;
        private String goal;
        private LocalDate startDate;
        private LocalDate endDate;

        public CreateRequest() {
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
    }


    // ============================================
    // SPRINT RESPONSE
    // ============================================
    public static class Response {

        private Long id;
        private Integer sprintNumber;
        private String name;
        private String goal;
        private LocalDate startDate;
        private LocalDate endDate;
        private String status;
        private Integer committedPoints;
        private Integer taskCount;
        private Integer totalPoints;

        public Response() {
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

        public String getStatus() {
            return status;
        }

        public void setStatus(String status) {
            this.status = status;
        }

        public Integer getCommittedPoints() {
            return committedPoints;
        }

        public void setCommittedPoints(Integer committedPoints) {
            this.committedPoints = committedPoints;
        }

        public Integer getTaskCount() {
            return taskCount;
        }

        public void setTaskCount(Integer taskCount) {
            this.taskCount = taskCount;
        }

        public Integer getTotalPoints() {
            return totalPoints;
        }

        public void setTotalPoints(Integer totalPoints) {
            this.totalPoints = totalPoints;
        }
    }


    /** Result of closing a sprint, so the UI can report what carried over. */
    public static class CompleteResult {

        private Long completedSprintId;
        private Integer completedPoints;
        private Integer carriedTaskCount;
        private Long carriedToSprintId;

        public CompleteResult() {
        }

        public Long getCompletedSprintId() {
            return completedSprintId;
        }

        public void setCompletedSprintId(Long completedSprintId) {
            this.completedSprintId = completedSprintId;
        }

        public Integer getCompletedPoints() {
            return completedPoints;
        }

        public void setCompletedPoints(Integer completedPoints) {
            this.completedPoints = completedPoints;
        }

        public Integer getCarriedTaskCount() {
            return carriedTaskCount;
        }

        public void setCarriedTaskCount(Integer carriedTaskCount) {
            this.carriedTaskCount = carriedTaskCount;
        }

        public Long getCarriedToSprintId() {
            return carriedToSprintId;
        }

        public void setCarriedToSprintId(Long carriedToSprintId) {
            this.carriedToSprintId = carriedToSprintId;
        }
    }
}

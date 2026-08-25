package com.flowpilot.flowpilot.scrummaster.dto;

import java.util.List;

/** Sprint Overview payload: sprint health in one call. */
public class ScrumDashboardDto {

    public static class Ceremony {

        private String name;
        private String when;
        private String tone;

        public Ceremony() {
        }

        public Ceremony(String name, String when, String tone) {
            this.name = name;
            this.when = when;
            this.tone = tone;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getWhen() {
            return when;
        }

        public void setWhen(String when) {
            this.when = when;
        }

        public String getTone() {
            return tone;
        }

        public void setTone(String tone) {
            this.tone = tone;
        }
    }


    public static class Response {

        private Long sprintId;
        private Integer sprintNumber;
        private String sprintName;
        private String goal;
        private String status;

        private Integer daysRemaining;
        private Integer totalDays;

        private Integer tasksDone;
        private Integer tasksTotal;
        private Integer percentComplete;

        private Integer pointsDone;
        private Integer pointsTotal;
        private Integer committedPoints;

        private Integer blockerCount;
        private List<Ceremony> ceremonies;

        public Response() {
        }

        public Long getSprintId() {
            return sprintId;
        }

        public void setSprintId(Long sprintId) {
            this.sprintId = sprintId;
        }

        public Integer getSprintNumber() {
            return sprintNumber;
        }

        public void setSprintNumber(Integer sprintNumber) {
            this.sprintNumber = sprintNumber;
        }

        public String getSprintName() {
            return sprintName;
        }

        public void setSprintName(String sprintName) {
            this.sprintName = sprintName;
        }

        public String getGoal() {
            return goal;
        }

        public void setGoal(String goal) {
            this.goal = goal;
        }

        public String getStatus() {
            return status;
        }

        public void setStatus(String status) {
            this.status = status;
        }

        public Integer getDaysRemaining() {
            return daysRemaining;
        }

        public void setDaysRemaining(Integer daysRemaining) {
            this.daysRemaining = daysRemaining;
        }

        public Integer getTotalDays() {
            return totalDays;
        }

        public void setTotalDays(Integer totalDays) {
            this.totalDays = totalDays;
        }

        public Integer getTasksDone() {
            return tasksDone;
        }

        public void setTasksDone(Integer tasksDone) {
            this.tasksDone = tasksDone;
        }

        public Integer getTasksTotal() {
            return tasksTotal;
        }

        public void setTasksTotal(Integer tasksTotal) {
            this.tasksTotal = tasksTotal;
        }

        public Integer getPercentComplete() {
            return percentComplete;
        }

        public void setPercentComplete(Integer percentComplete) {
            this.percentComplete = percentComplete;
        }

        public Integer getPointsDone() {
            return pointsDone;
        }

        public void setPointsDone(Integer pointsDone) {
            this.pointsDone = pointsDone;
        }

        public Integer getPointsTotal() {
            return pointsTotal;
        }

        public void setPointsTotal(Integer pointsTotal) {
            this.pointsTotal = pointsTotal;
        }

        public Integer getCommittedPoints() {
            return committedPoints;
        }

        public void setCommittedPoints(Integer committedPoints) {
            this.committedPoints = committedPoints;
        }

        public Integer getBlockerCount() {
            return blockerCount;
        }

        public void setBlockerCount(Integer blockerCount) {
            this.blockerCount = blockerCount;
        }

        public List<Ceremony> getCeremonies() {
            return ceremonies;
        }

        public void setCeremonies(List<Ceremony> ceremonies) {
            this.ceremonies = ceremonies;
        }
    }
}

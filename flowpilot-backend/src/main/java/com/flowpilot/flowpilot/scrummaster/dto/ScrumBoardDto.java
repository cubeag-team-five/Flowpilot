package com.flowpilot.flowpilot.scrummaster.dto;

import java.util.List;

/**
 * Board payload. The backend groups tasks into columns so every client shows
 * the same flow order, rather than each one re-deriving it.
 */
public class ScrumBoardDto {

    // ============================================
    // ONE CARD
    // ============================================
    public static class Card {

        private Long id;
        private String taskKey;
        private String title;
        private String assigneeName;
        private String assigneeInitials;
        private Integer storyPoints;
        private String status;
        private Integer daysInColumn;

        public Card() {
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

        public String getAssigneeName() {
            return assigneeName;
        }

        public void setAssigneeName(String assigneeName) {
            this.assigneeName = assigneeName;
        }

        public String getAssigneeInitials() {
            return assigneeInitials;
        }

        public void setAssigneeInitials(String assigneeInitials) {
            this.assigneeInitials = assigneeInitials;
        }

        public Integer getStoryPoints() {
            return storyPoints;
        }

        public void setStoryPoints(Integer storyPoints) {
            this.storyPoints = storyPoints;
        }

        public String getStatus() {
            return status;
        }

        public void setStatus(String status) {
            this.status = status;
        }

        public Integer getDaysInColumn() {
            return daysInColumn;
        }

        public void setDaysInColumn(Integer daysInColumn) {
            this.daysInColumn = daysInColumn;
        }
    }


    // ============================================
    // ONE COLUMN
    // ============================================
    public static class Column {

        private String status;
        private String label;
        private Integer taskCount;
        private Integer totalPoints;
        private List<Card> cards;

        public Column() {
        }

        public String getStatus() {
            return status;
        }

        public void setStatus(String status) {
            this.status = status;
        }

        public String getLabel() {
            return label;
        }

        public void setLabel(String label) {
            this.label = label;
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

        public List<Card> getCards() {
            return cards;
        }

        public void setCards(List<Card> cards) {
            this.cards = cards;
        }
    }


    // ============================================
    // WHOLE BOARD
    // ============================================
    public static class Response {

        private Long sprintId;
        private String sprintName;
        private Integer totalTasks;
        private Integer totalPoints;
        private List<Column> columns;

        public Response() {
        }

        public Long getSprintId() {
            return sprintId;
        }

        public void setSprintId(Long sprintId) {
            this.sprintId = sprintId;
        }

        public String getSprintName() {
            return sprintName;
        }

        public void setSprintName(String sprintName) {
            this.sprintName = sprintName;
        }

        public Integer getTotalTasks() {
            return totalTasks;
        }

        public void setTotalTasks(Integer totalTasks) {
            this.totalTasks = totalTasks;
        }

        public Integer getTotalPoints() {
            return totalPoints;
        }

        public void setTotalPoints(Integer totalPoints) {
            this.totalPoints = totalPoints;
        }

        public List<Column> getColumns() {
            return columns;
        }

        public void setColumns(List<Column> columns) {
            this.columns = columns;
        }
    }


    // ============================================
    // MOVE A CARD
    // ============================================
    public static class MoveRequest {

        private String status;

        public MoveRequest() {
        }

        public String getStatus() {
            return status;
        }

        public void setStatus(String status) {
            this.status = status;
        }
    }
}

package com.flowpilot.flowpilot.scrummaster.dto;

/** Task create, update and assignment payloads. */
public class ScrumTaskDto {

    public static class CreateRequest {

        private String title;
        private Integer storyPoints;
        private Long assigneeId;
        private Long sprintId;
        private String status;

        public CreateRequest() {
        }

        public String getTitle() {
            return title;
        }

        public void setTitle(String title) {
            this.title = title;
        }

        public Integer getStoryPoints() {
            return storyPoints;
        }

        public void setStoryPoints(Integer storyPoints) {
            this.storyPoints = storyPoints;
        }

        public Long getAssigneeId() {
            return assigneeId;
        }

        public void setAssigneeId(Long assigneeId) {
            this.assigneeId = assigneeId;
        }

        public Long getSprintId() {
            return sprintId;
        }

        public void setSprintId(Long sprintId) {
            this.sprintId = sprintId;
        }

        public String getStatus() {
            return status;
        }

        public void setStatus(String status) {
            this.status = status;
        }
    }


    /** Every field optional — only what is sent gets changed. */
    public static class UpdateRequest {

        private String title;
        private Integer storyPoints;
        private Long assigneeId;
        private Boolean unassign;
        private Long sprintId;
        private String status;

        public UpdateRequest() {
        }

        public String getTitle() {
            return title;
        }

        public void setTitle(String title) {
            this.title = title;
        }

        public Integer getStoryPoints() {
            return storyPoints;
        }

        public void setStoryPoints(Integer storyPoints) {
            this.storyPoints = storyPoints;
        }

        public Long getAssigneeId() {
            return assigneeId;
        }

        public void setAssigneeId(Long assigneeId) {
            this.assigneeId = assigneeId;
        }

        public Boolean getUnassign() {
            return unassign;
        }

        public void setUnassign(Boolean unassign) {
            this.unassign = unassign;
        }

        public Long getSprintId() {
            return sprintId;
        }

        public void setSprintId(Long sprintId) {
            this.sprintId = sprintId;
        }

        public String getStatus() {
            return status;
        }

        public void setStatus(String status) {
            this.status = status;
        }
    }


    /** A person a task can be assigned to. */
    public static class Member {

        private Long id;
        private String name;
        private String email;
        private String role;
        private String initials;

        public Member() {
        }

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getRole() {
            return role;
        }

        public void setRole(String role) {
            this.role = role;
        }

        public String getInitials() {
            return initials;
        }

        public void setInitials(String initials) {
            this.initials = initials;
        }
    }
}

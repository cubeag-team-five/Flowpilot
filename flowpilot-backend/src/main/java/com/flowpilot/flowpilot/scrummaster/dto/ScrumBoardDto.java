package com.flowpilot.flowpilot.scrummaster.dto;

import lombok.*;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ScrumBoardDto {
    private Long projectId;
    private String sprintName;
    private String sprintGoal;
    private Integer totalTasks;
    private Integer totalPoints;
    private List<BoardColumnDto> columns;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class BoardColumnDto {
        private String name;
        private String tone;
        private Integer taskCount;
        private Integer pointsCount;
        private List<BoardTaskDto> tasks;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class BoardTaskDto {
        private Long id;
        private Long projectId;
        private String taskCode;
        private String title;
        private String who;
        private String assigneeName;
        private Integer points;
        private String columnStatus;
        private Integer ageDays;
        private Boolean isStuck;
    }
}

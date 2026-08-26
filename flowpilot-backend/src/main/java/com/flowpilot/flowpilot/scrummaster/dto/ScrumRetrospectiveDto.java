package com.flowpilot.flowpilot.scrummaster.dto;

import lombok.*;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ScrumRetrospectiveDto {
    private String sprintName;
    private String dateStr;
    private String facilitator;
    private List<String> wentWell;
    private List<String> needsImprovement;
    private List<ActionItemDto> actionItems;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ActionItemDto {
        private Long id;
        private Integer order;
        private String title;
        private String owner;
        private String due;
    }
}

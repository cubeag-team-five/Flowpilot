package com.flowpilot.flowpilot.developer.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DeveloperSprintDto {

    private List<SprintColumnDto> columns;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SprintColumnDto {

        private String title;
        private Integer count;
        private List<SprintCardDto> cards;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SprintCardDto {

        private Long databaseId;
        private String id;
        private String title;
        private String member;
        private Integer points;
        private Boolean isMyTask;
        private Boolean completed;
    }
}
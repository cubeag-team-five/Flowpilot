package com.flowpilot.flowpilot.scrummaster.dto;

import lombok.*;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ScrumBurndownDto {
    private String sprintName;
    private String note;
    private List<BurndownPointDto> burndownPoints;
    private List<VelocityItemDto> velocityData;
    private Double averageVelocity;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class BurndownPointDto {
        private Integer x;
        private Integer y;
        private String label;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class VelocityItemDto {
        private Long id;
        private String sprint;
        private Integer points;
        private Boolean isCurrent;
    }
}

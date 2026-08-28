package com.flowpilot.flowpilot.developer.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DeveloperMentionDto {

    private Long id;
    private String initials;
    private String name;
    private String task;
    private String message;
    private String time;
    private Boolean unread;
}
package com.flowpilot.flowpilot.scrummaster.dto;

import lombok.*;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ScrumStandupDto {
    private Long id;
    private String initials;
    private String name;
    private String role;
    private String yesterday;
    private String today;
    private String blocker;
    private LocalDate standupDate;
    private Boolean isBlocked;
}

package com.flowpilot.flowpilot.scrummaster.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "scrum_retrospectives")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ScrumRetrospective {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String category; // WENT_WELL or NEEDS_IMPROVEMENT

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    private String sprintName;
}

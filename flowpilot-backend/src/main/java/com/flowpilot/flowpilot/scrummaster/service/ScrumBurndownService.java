package com.flowpilot.flowpilot.scrummaster.service;

import com.flowpilot.flowpilot.scrummaster.dto.ScrumBurndownDto;
import com.flowpilot.flowpilot.scrummaster.model.ScrumVelocity;
import com.flowpilot.flowpilot.scrummaster.repository.ScrumVelocityRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ScrumBurndownService {

    private final ScrumVelocityRepository velocityRepository;

    @Transactional(readOnly = true)
    public ScrumBurndownDto getBurndownAndVelocity() {
        List<ScrumVelocity> velocityList = velocityRepository.findAll();
        if (velocityList.isEmpty()) {
            velocityList = createDefaultVelocityData();
        }

        double averageVelocity = velocityList.stream()
                .mapToInt(v -> v.getPoints() != null ? v.getPoints() : 0)
                .average()
                .orElse(0.0);

        List<ScrumBurndownDto.BurndownPointDto> points = List.of(
                new ScrumBurndownDto.BurndownPointDto(0, 10, "D1"),
                new ScrumBurndownDto.BurndownPointDto(28, 18, "D3"),
                new ScrumBurndownDto.BurndownPointDto(56, 24, "D5"),
                new ScrumBurndownDto.BurndownPointDto(84, 38, "D7"),
                new ScrumBurndownDto.BurndownPointDto(112, 50, "D9"),
                new ScrumBurndownDto.BurndownPointDto(140, 52, "D11"),
                new ScrumBurndownDto.BurndownPointDto(168, 68, "D13"),
                new ScrumBurndownDto.BurndownPointDto(196, 72, "D15"),
                new ScrumBurndownDto.BurndownPointDto(224, 90, "D17"),
                new ScrumBurndownDto.BurndownPointDto(252, 96, "D19"),
                new ScrumBurndownDto.BurndownPointDto(280, 108, "D21")
        );

        List<ScrumBurndownDto.VelocityItemDto> velocityDtos = velocityList.stream()
                .map(v -> ScrumBurndownDto.VelocityItemDto.builder()
                        .id(v.getId())
                        .sprint(v.getSprintName())
                        .points(v.getPoints())
                        .isCurrent(Boolean.TRUE.equals(v.getIsCurrent()))
                        .build())
                .toList();

        return ScrumBurndownDto.builder()
                .sprintName("Sprint 12")
                .note("Tracking behind the ideal line since day 7")
                .burndownPoints(points)
                .velocityData(velocityDtos)
                .averageVelocity(Math.round(averageVelocity * 10.0) / 10.0)
                .build();
    }

    private List<ScrumVelocity> createDefaultVelocityData() {
        List<ScrumVelocity> defaults = List.of(
                ScrumVelocity.builder().sprintName("S5").points(28).isCurrent(false).build(),
                ScrumVelocity.builder().sprintName("S6").points(33).isCurrent(false).build(),
                ScrumVelocity.builder().sprintName("S7").points(36).isCurrent(false).build(),
                ScrumVelocity.builder().sprintName("S8").points(29).isCurrent(false).build(),
                ScrumVelocity.builder().sprintName("S9").points(38).isCurrent(false).build(),
                ScrumVelocity.builder().sprintName("S10").points(41).isCurrent(false).build(),
                ScrumVelocity.builder().sprintName("S11").points(35).isCurrent(false).build(),
                ScrumVelocity.builder().sprintName("S12").points(41).isCurrent(true).build()
        );
        return velocityRepository.saveAll(defaults);
    }
}

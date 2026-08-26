package com.flowpilot.flowpilot.scrummaster.service;

import com.flowpilot.flowpilot.scrummaster.dto.ScrumDashboardDto;
import com.flowpilot.flowpilot.scrummaster.model.ScrumBlocker;
import com.flowpilot.flowpilot.scrummaster.model.ScrumCeremony;
import com.flowpilot.flowpilot.scrummaster.model.ScrumSprint;
import com.flowpilot.flowpilot.scrummaster.repository.ScrumBlockerRepository;
import com.flowpilot.flowpilot.scrummaster.repository.ScrumBoardTaskRepository;
import com.flowpilot.flowpilot.scrummaster.repository.ScrumCeremonyRepository;
import com.flowpilot.flowpilot.scrummaster.repository.ScrumSprintRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ScrumMasterDashboardService {

    private final ScrumSprintRepository sprintRepository;
    private final ScrumBlockerRepository blockerRepository;
    private final ScrumCeremonyRepository ceremonyRepository;
    private final ScrumBoardTaskRepository boardTaskRepository;

    @Transactional(readOnly = true)
    public ScrumDashboardDto getDashboardData() {
        ScrumSprint activeSprint = sprintRepository.findByStatus("ACTIVE")
                .orElseGet(() -> ScrumSprint.builder()
                        .name("Sprint 12")
                        .projectName("IPMT Platform v2")
                        .goal("Deliver the core design system, task board enhancements, and mobile responsiveness for the IPMT Platform.")
                        .totalDays(21)
                        .status("ACTIVE")
                        .build());

        List<ScrumBlocker> activeBlockers = blockerRepository.findByStatus("ACTIVE");
        if (activeBlockers.isEmpty()) {
            activeBlockers = List.of(
                    ScrumBlocker.builder()
                            .id(1L)
                            .raisedBy("Divya Mehta")
                            .title("waiting for brand colour tokens")
                            .details("Blocks T-044 mobile responsive layout and T-047 dark mode theming · raised 2 days ago")
                            .status("ACTIVE")
                            .createdAt(LocalDateTime.now().minusDays(2))
                            .build()
            );
        }

        List<ScrumCeremony> ceremonies = ceremonyRepository.findAll();
        if (ceremonies.isEmpty()) {
            ceremonies = List.of(
                    ScrumCeremony.builder().id(1L).name("Daily standup").whenTime("9:30 AM — daily").tone("done").status("SCHEDULED").build(),
                    ScrumCeremony.builder().id(2L).name("Sprint review / demo").whenTime("Aug 8 · 3:00 PM").tone("plan").status("SCHEDULED").build(),
                    ScrumCeremony.builder().id(3L).name("Sprint retrospective").whenTime("Aug 9 · 10:00 AM").tone("done").status("SCHEDULED").build(),
                    ScrumCeremony.builder().id(4L).name("Sprint 13 planning").whenTime("Aug 18 · 9:00 AM").tone("active").status("SCHEDULED").build()
            );
        }

        long totalTasks = boardTaskRepository.count();
        if (totalTasks == 0) {
            totalTasks = 18;
        }

        long doneTasks = boardTaskRepository.findByColumnStatus("Done").size();
        if (doneTasks == 0 && totalTasks == 18) {
            doneTasks = 7;
        }

        int percentage = totalTasks > 0 ? (int) ((doneTasks * 100) / totalTasks) : 0;

        List<ScrumDashboardDto.BlockerDto> blockerDtos = activeBlockers.stream()
                .map(b -> ScrumDashboardDto.BlockerDto.builder()
                        .id(b.getId())
                        .raisedBy(b.getRaisedBy())
                        .title(b.getTitle())
                        .details(b.getDetails())
                        .status(b.getStatus())
                        .createdAt(b.getCreatedAt() != null ? b.getCreatedAt().toString() : null)
                        .build())
                .toList();

        List<ScrumDashboardDto.CeremonyDto> ceremonyDtos = ceremonies.stream()
                .map(c -> ScrumDashboardDto.CeremonyDto.builder()
                        .id(c.getId())
                        .name(c.getName())
                        .when(c.getWhenTime())
                        .tone(c.getTone())
                        .status(c.getStatus())
                        .build())
                .toList();

        return ScrumDashboardDto.builder()
                .sprintName(activeSprint.getName())
                .projectName(activeSprint.getProjectName())
                .daysRemaining(14)
                .totalDays(activeSprint.getTotalDays() != null ? activeSprint.getTotalDays() : 21)
                .tasksCompleted((int) doneTasks)
                .totalTasks((int) totalTasks)
                .completionPercentage(percentage)
                .activeBlockersCount(activeBlockers.size())
                .sprintGoal(activeSprint.getGoal())
                .activeBlockers(blockerDtos)
                .ceremonies(ceremonyDtos)
                .build();
    }

    @Transactional
    public ScrumDashboardDto.BlockerDto escalateBlocker(Long blockerId) {
        ScrumBlocker blocker = blockerRepository.findById(blockerId)
                .orElseThrow(() -> new RuntimeException("Blocker not found with id: " + blockerId));
        blocker.setStatus("ESCALATED");
        ScrumBlocker updated = blockerRepository.save(blocker);
        return ScrumDashboardDto.BlockerDto.builder()
                .id(updated.getId())
                .raisedBy(updated.getRaisedBy())
                .title(updated.getTitle())
                .details(updated.getDetails())
                .status(updated.getStatus())
                .createdAt(updated.getCreatedAt() != null ? updated.getCreatedAt().toString() : null)
                .build();
    }

    @Transactional
    public ScrumDashboardDto.BlockerDto resolveBlocker(Long blockerId) {
        ScrumBlocker blocker = blockerRepository.findById(blockerId)
                .orElseThrow(() -> new RuntimeException("Blocker not found with id: " + blockerId));
        blocker.setStatus("RESOLVED");
        ScrumBlocker updated = blockerRepository.save(blocker);
        return ScrumDashboardDto.BlockerDto.builder()
                .id(updated.getId())
                .raisedBy(updated.getRaisedBy())
                .title(updated.getTitle())
                .details(updated.getDetails())
                .status(updated.getStatus())
                .createdAt(updated.getCreatedAt() != null ? updated.getCreatedAt().toString() : null)
                .build();
    }
}

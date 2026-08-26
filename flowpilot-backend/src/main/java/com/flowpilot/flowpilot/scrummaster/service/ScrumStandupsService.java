package com.flowpilot.flowpilot.scrummaster.service;

import com.flowpilot.flowpilot.scrummaster.dto.ScrumStandupDto;
import com.flowpilot.flowpilot.scrummaster.model.ScrumStandup;
import com.flowpilot.flowpilot.scrummaster.repository.ScrumStandupRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ScrumStandupsService {

    private final ScrumStandupRepository standupRepository;

    @Transactional(readOnly = true)
    public List<ScrumStandupDto> getStandups() {
        List<ScrumStandup> list = standupRepository.findAll();
        if (list.isEmpty()) {
            list = createDefaultStandups();
        }

        return list.stream()
                .map(this::convertToDto)
                .toList();
    }

    @Transactional
    public ScrumStandupDto createStandup(ScrumStandupDto dto) {
        ScrumStandup standup = ScrumStandup.builder()
                .initials(dto.getInitials())
                .name(dto.getName())
                .role(dto.getRole())
                .yesterday(dto.getYesterday())
                .today(dto.getToday())
                .blocker(dto.getBlocker())
                .standupDate(dto.getStandupDate() != null ? dto.getStandupDate() : LocalDate.now())
                .build();

        return convertToDto(standupRepository.save(standup));
    }

    private ScrumStandupDto convertToDto(ScrumStandup s) {
        return ScrumStandupDto.builder()
                .id(s.getId())
                .initials(s.getInitials())
                .name(s.getName())
                .role(s.getRole())
                .yesterday(s.getYesterday())
                .today(s.getToday())
                .blocker(s.getBlocker())
                .standupDate(s.getStandupDate())
                .isBlocked(s.getBlocker() != null && !s.getBlocker().isBlank())
                .build();
    }

    private List<ScrumStandup> createDefaultStandups() {
        LocalDate todayDate = LocalDate.now();
        List<ScrumStandup> defaults = List.of(
                ScrumStandup.builder().initials("SR").name("Sneha Rao").role("Frontend").yesterday("Completed velocity module, started component library").today("Continue component library").standupDate(todayDate).build(),
                ScrumStandup.builder().initials("MK").name("Mihir Khatri").role("Backend").yesterday("Finished REST API documentation PR").today("Review file upload S3 task").standupDate(todayDate).build(),
                ScrumStandup.builder().initials("DM").name("Divya Mehta").role("Design").yesterday("Mobile responsive layouts 80% done").today("Complete dark mode research").blocker("Waiting for brand colour tokens from Design").standupDate(todayDate).build(),
                ScrumStandup.builder().initials("KD").name("Karan Dev").role("Platform").yesterday("Started notification service scaffolding").today("Finish Slack hook integration").standupDate(todayDate).build(),
                ScrumStandup.builder().initials("PR").name("Priya Rajan").role("QA").yesterday("Tested file upload module, filed 2 bugs").today("Test notification service").standupDate(todayDate).build()
        );
        return standupRepository.saveAll(defaults);
    }
}

package com.flowpilot.flowpilot.scrummaster.service;

import com.flowpilot.flowpilot.scrummaster.dto.ScrumRetrospectiveDto;
import com.flowpilot.flowpilot.scrummaster.model.ScrumRetroActionItem;
import com.flowpilot.flowpilot.scrummaster.model.ScrumRetrospective;
import com.flowpilot.flowpilot.scrummaster.repository.ScrumRetroActionItemRepository;
import com.flowpilot.flowpilot.scrummaster.repository.ScrumRetrospectiveRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ScrumRetrospectiveService {

    private final ScrumRetrospectiveRepository retrospectiveRepository;
    private final ScrumRetroActionItemRepository actionItemRepository;

    @Transactional(readOnly = true)
    public ScrumRetrospectiveDto getRetrospective() {
        String sprintName = "Sprint 12";

        List<ScrumRetrospective> items = retrospectiveRepository.findBySprintName(sprintName);
        if (items.isEmpty()) {
            items = createDefaultRetroItems(sprintName);
        }

        List<ScrumRetroActionItem> actionItems = actionItemRepository.findBySprintNameOrderByItemOrderAsc(sprintName);
        if (actionItems.isEmpty()) {
            actionItems = createDefaultActionItems(sprintName);
        }

        List<String> wentWell = items.stream()
                .filter(i -> "WENT_WELL".equalsIgnoreCase(i.getCategory()))
                .map(ScrumRetrospective::getContent)
                .toList();

        List<String> needsImprovement = items.stream()
                .filter(i -> "NEEDS_IMPROVEMENT".equalsIgnoreCase(i.getCategory()))
                .map(ScrumRetrospective::getContent)
                .toList();

        List<ScrumRetrospectiveDto.ActionItemDto> actionDtos = actionItems.stream()
                .map(a -> ScrumRetrospectiveDto.ActionItemDto.builder()
                        .id(a.getId())
                        .order(a.getItemOrder())
                        .title(a.getTitle())
                        .owner(a.getOwner())
                        .due(a.getDue())
                        .build())
                .toList();

        return ScrumRetrospectiveDto.builder()
                .sprintName(sprintName)
                .dateStr("Aug 9, 2026 · 10:00 AM")
                .facilitator("Aryan Kapoor")
                .wentWell(wentWell)
                .needsImprovement(needsImprovement)
                .actionItems(actionDtos)
                .build();
    }

    @Transactional
    public void addRetroItem(String category, String content) {
        ScrumRetrospective item = ScrumRetrospective.builder()
                .sprintName("Sprint 12")
                .category(category)
                .content(content)
                .build();
        retrospectiveRepository.save(item);
    }

    @Transactional
    public ScrumRetrospectiveDto.ActionItemDto addActionItem(ScrumRetrospectiveDto.ActionItemDto dto) {
        long currentCount = actionItemRepository.count();
        ScrumRetroActionItem item = ScrumRetroActionItem.builder()
                .sprintName("Sprint 12")
                .itemOrder((int) currentCount + 1)
                .title(dto.getTitle())
                .owner(dto.getOwner())
                .due(dto.getDue())
                .build();

        ScrumRetroActionItem saved = actionItemRepository.save(item);
        return ScrumRetrospectiveDto.ActionItemDto.builder()
                .id(saved.getId())
                .order(saved.getItemOrder())
                .title(saved.getTitle())
                .owner(saved.getOwner())
                .due(saved.getDue())
                .build();
    }

    private List<ScrumRetrospective> createDefaultRetroItems(String sprintName) {
        List<ScrumRetrospective> defaults = List.of(
                ScrumRetrospective.builder().sprintName(sprintName).category("WENT_WELL").content("Velocity up 12% from last sprint").build(),
                ScrumRetrospective.builder().sprintName(sprintName).category("WENT_WELL").content("Zero missed standups this sprint").build(),
                ScrumRetrospective.builder().sprintName(sprintName).category("WENT_WELL").content("PR review time down to under 24h on average").build(),
                ScrumRetrospective.builder().sprintName(sprintName).category("WENT_WELL").content("Strong cross-team collaboration on the API module").build(),
                ScrumRetrospective.builder().sprintName(sprintName).category("NEEDS_IMPROVEMENT").content("Blocker on brand colour tokens delayed 2 tasks").build(),
                ScrumRetrospective.builder().sprintName(sprintName).category("NEEDS_IMPROVEMENT").content("Sprint scope crept mid-sprint — 3 tasks added").build(),
                ScrumRetrospective.builder().sprintName(sprintName).category("NEEDS_IMPROVEMENT").content("QA environment was down for a day").build()
        );
        return retrospectiveRepository.saveAll(defaults);
    }

    private List<ScrumRetroActionItem> createDefaultActionItems(String sprintName) {
        List<ScrumRetroActionItem> defaults = List.of(
                ScrumRetroActionItem.builder().sprintName(sprintName).itemOrder(1).title("Lock sprint scope after day 1").owner("Arjun Shah").due("Sprint 13").build(),
                ScrumRetroActionItem.builder().sprintName(sprintName).itemOrder(2).title("Set up staging environment health checks").owner("Karan Dev").due("Aug 10").build(),
                ScrumRetroActionItem.builder().sprintName(sprintName).itemOrder(3).title("Share design tokens one sprint ahead").owner("Divya Mehta").due("Sprint 13 start").build()
        );
        return actionItemRepository.saveAll(defaults);
    }
}

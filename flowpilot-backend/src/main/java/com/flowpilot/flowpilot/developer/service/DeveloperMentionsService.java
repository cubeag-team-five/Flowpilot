package com.flowpilot.flowpilot.developer.service;

import com.flowpilot.flowpilot.developer.dto.DeveloperMentionDto;
import com.flowpilot.flowpilot.qa.model.QABugReport;
import com.flowpilot.flowpilot.qa.repository.QABugRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DeveloperMentionsService {

    private final QABugRepository qaBugRepository;

    public List<DeveloperMentionDto> getAllMentions() {

        return qaBugRepository.findAll()
                .stream()
                .sorted(
                        Comparator.comparing(
                                QABugReport::getCreatedAt,
                                Comparator.nullsLast(
                                        Comparator.reverseOrder()
                                )
                        )
                )
                .map(this::convertBugToMention)
                .toList();
    }

    private DeveloperMentionDto convertBugToMention(
            QABugReport bug
    ) {

        String task = bug.getLinkedTaskId();

        if (task == null || task.isBlank()) {
            task = bug.getBugId();
        }

        return DeveloperMentionDto.builder()
                .id(bug.getId())
                .initials("QA")
                .name("QA Team")
                .task(task)
                .message(buildMessage(bug))
                .time(getRelativeTime(bug.getCreatedAt()))
                .unread(true)
                .build();
    }

    private String buildMessage(QABugReport bug) {

        String assignedTo = "";

        if (bug.getAssignedTo() != null
                && !bug.getAssignedTo().isBlank()) {

            assignedTo = "@" + bug.getAssignedTo() + " ";
        }

        String description = bug.getTitle();

        if (bug.getStepsToReproduce() != null
                && !bug.getStepsToReproduce().isBlank()) {

            description = bug.getStepsToReproduce();
        }

        return assignedTo
                + description
                + "\nBug ID: "
                + bug.getBugId();
    }

    private String getRelativeTime(
            LocalDateTime createdAt
    ) {

        if (createdAt == null) {
            return "Just now";
        }

        Duration duration =
                Duration.between(createdAt, LocalDateTime.now());

        long minutes = duration.toMinutes();

        if (minutes < 1) {
            return "Just now";
        }

        if (minutes < 60) {
            return minutes + "m ago";
        }

        long hours = duration.toHours();

        if (hours < 24) {
            return hours + "h ago";
        }

        long days = duration.toDays();

        if (days == 1) {
            return "Yesterday";
        }

        return days + "d ago";
    }
}
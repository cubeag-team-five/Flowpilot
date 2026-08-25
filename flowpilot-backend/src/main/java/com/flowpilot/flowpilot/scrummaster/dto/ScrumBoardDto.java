package com.flowpilot.flowpilot.scrummaster.dto;

import java.util.List;

/** Board payloads. The backend groups and orders columns so clients agree. */
public class ScrumBoardDto {

    public record Column(
            String status,
            String label,
            Integer taskCount,
            Integer totalPoints,
            /** WIP limit for this column, or null when unlimited. */
            Integer wipLimit,
            /** True when taskCount exceeds the limit — the board flags it. */
            boolean wipExceeded,
            List<ScrumTaskDto.Card> cards
    ) {}

    public record Response(
            Long sprintId,
            String sprintName,
            String sprintStatus,
            Integer totalTasks,
            Integer totalPoints,
            /** Distinct labels present in this sprint, for the filter control. */
            List<String> availableLabels,
            List<ScrumTaskDto.Member> members,
            List<Column> columns
    ) {}

    /** Moving one card. */
    public record MoveRequest(
            String status,
            String blockedReason
    ) {}

    /** Setting a column's WIP limit. */
    public record WipLimitRequest(
            String status,
            Integer limit
    ) {}
}

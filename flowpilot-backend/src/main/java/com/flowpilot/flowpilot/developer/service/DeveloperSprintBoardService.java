package com.flowpilot.flowpilot.developer.service;

import com.flowpilot.flowpilot.developer.dto.DeveloperSprintDto;
import com.flowpilot.flowpilot.scrummaster.model.ScrumBoardTask;
import com.flowpilot.flowpilot.scrummaster.repository.ScrumBoardTaskRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class DeveloperSprintBoardService {

    private final ScrumBoardTaskRepository scrumBoardTaskRepository;

    public DeveloperSprintDto getSprintBoard() {

        List<ScrumBoardTask> tasks =
                scrumBoardTaskRepository.findAll();

        Map<String, List<DeveloperSprintDto.SprintCardDto>> board =
                new LinkedHashMap<>();

        board.put("To Do", new ArrayList<>());
        board.put("In Progress", new ArrayList<>());
        board.put("Code Review", new ArrayList<>());
        board.put("Testing", new ArrayList<>());
        board.put("Done", new ArrayList<>());

        for (ScrumBoardTask task : tasks) {

            String status = mapStatus(task.getColumnStatus());

            if (status == null) {
                continue;
            }

            DeveloperSprintDto.SprintCardDto card =
                    DeveloperSprintDto.SprintCardDto.builder()
                            .databaseId(task.getId())
                            .id(task.getTaskCode())
                            .title(task.getTitle())
                            .member(task.getAssigneeInitials())
                            .points(
                                    task.getPoints() != null
                                            ? task.getPoints()
                                            : 0
                            )
                            .isMyTask(false)
                            .completed(
                                    "Done".equalsIgnoreCase(status)
                            )
                            .build();

            board.get(status).add(card);
        }

        List<DeveloperSprintDto.SprintColumnDto> columns =
                new ArrayList<>();

        for (Map.Entry<String,
                List<DeveloperSprintDto.SprintCardDto>> entry
                : board.entrySet()) {

            columns.add(
                    DeveloperSprintDto.SprintColumnDto.builder()
                            .title(entry.getKey())
                            .count(entry.getValue().size())
                            .cards(entry.getValue())
                            .build()
            );
        }

        return DeveloperSprintDto.builder()
                .columns(columns)
                .build();
    }

    private String mapStatus(String status) {

        if (status == null) {
            return null;
        }

        return switch (status.trim().toLowerCase()) {

            case "backlog", "to do", "todo" ->
                    "To Do";

            case "in progress", "inprogress" ->
                    "In Progress";

            case "code review", "codereview" ->
                    "Code Review";

            case "testing" ->
                    "Testing";

            case "done" ->
                    "Done";

            default ->
                    null;
        };
    }
}
package com.flowpilot.flowpilot.scrummaster.service;

import com.flowpilot.flowpilot.scrummaster.dto.ScrumBoardDto;
import com.flowpilot.flowpilot.scrummaster.model.ScrumBoardTask;
import com.flowpilot.flowpilot.scrummaster.repository.ScrumBoardTaskRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ScrumBoardService {

    private final ScrumBoardTaskRepository taskRepository;

    private static final int STUCK_AFTER_DAYS = 3;

    private static final List<ColumnSpec> COLUMN_SPECS = List.of(
            new ColumnSpec("Backlog", "idle"),
            new ColumnSpec("To do", "idle"),
            new ColumnSpec("In progress", "active"),
            new ColumnSpec("Code review", "plan"),
            new ColumnSpec("Testing", "test"),
            new ColumnSpec("Done", "done")
    );

    private record ColumnSpec(String name, String tone) {}

    @Transactional(readOnly = true)
    public ScrumBoardDto getBoard(Long projectId) {
        List<ScrumBoardTask> allTasks;
        if (projectId != null) {
            allTasks = taskRepository.findByProjectId(projectId);
            if (allTasks.isEmpty()) {
                allTasks = taskRepository.findAll().stream()
                        .filter(t -> t.getProjectId() == null || t.getProjectId().equals(projectId))
                        .toList();
            }
        } else {
            allTasks = taskRepository.findAll();
        }

        if (allTasks.isEmpty()) {
            allTasks = createDefaultTasks(projectId);
        }

        Map<String, List<ScrumBoardTask>> tasksByColumn = allTasks.stream()
                .collect(Collectors.groupingBy(ScrumBoardTask::getColumnStatus));

        int totalTasks = allTasks.size();
        int totalPoints = allTasks.stream().mapToInt(t -> t.getPoints() != null ? t.getPoints() : 0).sum();

        List<ScrumBoardDto.BoardColumnDto> columns = new ArrayList<>();
        for (ColumnSpec spec : COLUMN_SPECS) {
            List<ScrumBoardTask> colTasks = tasksByColumn.getOrDefault(spec.name(), List.of());
            int colPoints = colTasks.stream().mapToInt(t -> t.getPoints() != null ? t.getPoints() : 0).sum();

            List<ScrumBoardDto.BoardTaskDto> taskDtos = colTasks.stream()
                    .map(t -> ScrumBoardDto.BoardTaskDto.builder()
                            .id(t.getId())
                            .projectId(t.getProjectId())
                            .taskCode(t.getTaskCode())
                            .title(t.getTitle())
                            .who(t.getAssigneeInitials())
                            .assigneeName(t.getAssigneeName())
                            .points(t.getPoints())
                            .columnStatus(t.getColumnStatus())
                            .ageDays(t.getAgeDays())
                            .isStuck(t.getAgeDays() != null && t.getAgeDays() >= STUCK_AFTER_DAYS)
                            .build())
                    .toList();

            columns.add(ScrumBoardDto.BoardColumnDto.builder()
                    .name(spec.name())
                    .tone(spec.tone())
                    .taskCount(colTasks.size())
                    .pointsCount(colPoints)
                    .tasks(taskDtos)
                    .build());
        }

        return ScrumBoardDto.builder()
                .projectId(projectId)
                .sprintName("Sprint 12")
                .sprintGoal("Deliver Core Module API & Dashboard UI")
                .totalTasks(totalTasks)
                .totalPoints(totalPoints)
                .columns(columns)
                .build();
    }

    @Transactional
    public ScrumBoardDto.BoardTaskDto createTask(ScrumBoardDto.BoardTaskDto dto) {
        String code = dto.getTaskCode();
        if (code == null || code.isBlank()) {
            long count = taskRepository.count() + 1;
            code = String.format("T-%03d", count);
        }

        ScrumBoardTask task = ScrumBoardTask.builder()
                .taskCode(code)
                .title(dto.getTitle())
                .projectId(dto.getProjectId())
                .assigneeInitials(dto.getWho())
                .assigneeName(dto.getAssigneeName())
                .points(dto.getPoints() != null ? dto.getPoints() : 3)
                .columnStatus(dto.getColumnStatus() != null ? dto.getColumnStatus() : "Backlog")
                .ageDays(0)
                .build();

        ScrumBoardTask saved = taskRepository.save(task);

        return ScrumBoardDto.BoardTaskDto.builder()
                .id(saved.getId())
                .projectId(saved.getProjectId())
                .taskCode(saved.getTaskCode())
                .title(saved.getTitle())
                .who(saved.getAssigneeInitials())
                .assigneeName(saved.getAssigneeName())
                .points(saved.getPoints())
                .columnStatus(saved.getColumnStatus())
                .ageDays(saved.getAgeDays())
                .isStuck(false)
                .build();
    }

    @Transactional
    public ScrumBoardDto.BoardTaskDto updateTask(Long id, ScrumBoardDto.BoardTaskDto dto) {
        ScrumBoardTask task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + id));

        if (dto.getTitle() != null) task.setTitle(dto.getTitle());
        if (dto.getWho() != null) task.setAssigneeInitials(dto.getWho());
        if (dto.getAssigneeName() != null) task.setAssigneeName(dto.getAssigneeName());
        if (dto.getPoints() != null) task.setPoints(dto.getPoints());
        if (dto.getColumnStatus() != null) task.setColumnStatus(dto.getColumnStatus());
        if (dto.getProjectId() != null) task.setProjectId(dto.getProjectId());

        ScrumBoardTask saved = taskRepository.save(task);

        return ScrumBoardDto.BoardTaskDto.builder()
                .id(saved.getId())
                .projectId(saved.getProjectId())
                .taskCode(saved.getTaskCode())
                .title(saved.getTitle())
                .who(saved.getAssigneeInitials())
                .assigneeName(saved.getAssigneeName())
                .points(saved.getPoints())
                .columnStatus(saved.getColumnStatus())
                .ageDays(saved.getAgeDays())
                .isStuck(saved.getAgeDays() != null && saved.getAgeDays() >= STUCK_AFTER_DAYS)
                .build();
    }

    @Transactional
    public ScrumBoardDto.BoardTaskDto moveTask(Long id, String targetColumn) {
        ScrumBoardTask task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + id));

        if (!task.getColumnStatus().equalsIgnoreCase(targetColumn)) {
            task.setColumnStatus(targetColumn);
            task.setAgeDays(0);
        }

        ScrumBoardTask saved = taskRepository.save(task);

        return ScrumBoardDto.BoardTaskDto.builder()
                .id(saved.getId())
                .projectId(saved.getProjectId())
                .taskCode(saved.getTaskCode())
                .title(saved.getTitle())
                .who(saved.getAssigneeInitials())
                .assigneeName(saved.getAssigneeName())
                .points(saved.getPoints())
                .columnStatus(saved.getColumnStatus())
                .ageDays(saved.getAgeDays())
                .isStuck(saved.getAgeDays() != null && saved.getAgeDays() >= STUCK_AFTER_DAYS)
                .build();
    }

    private List<ScrumBoardTask> createDefaultTasks(Long projectId) {
        List<ScrumBoardTask> defaults = List.of(
                ScrumBoardTask.builder().projectId(projectId).taskCode("T-043").title("Notification service").assigneeInitials("KD").assigneeName("Karan Dev").points(8).columnStatus("Backlog").ageDays(0).build(),
                ScrumBoardTask.builder().projectId(projectId).taskCode("T-047").title("Dark mode theming").assigneeInitials("DM").assigneeName("Divya Mehta").points(5).columnStatus("To do").ageDays(0).build(),
                ScrumBoardTask.builder().projectId(projectId).taskCode("T-049").title("Kanban drag & drop").assigneeInitials("SR").assigneeName("Sneha Rao").points(8).columnStatus("To do").ageDays(0).build(),
                ScrumBoardTask.builder().projectId(projectId).taskCode("T-040").title("Design system component library").assigneeInitials("SR").assigneeName("Sneha Rao").points(8).columnStatus("In progress").ageDays(3).build(),
                ScrumBoardTask.builder().projectId(projectId).taskCode("T-044").title("Mobile responsive layout").assigneeInitials("DM").assigneeName("Divya Mehta").points(5).columnStatus("In progress").ageDays(2).build(),
                ScrumBoardTask.builder().projectId(projectId).taskCode("T-048").title("Role permission guard").assigneeInitials("MK").assigneeName("Mihir Khatri").points(5).columnStatus("In progress").ageDays(4).build(),
                ScrumBoardTask.builder().projectId(projectId).taskCode("T-041").title("REST API docs").assigneeInitials("MK").assigneeName("Mihir Khatri").points(3).columnStatus("Code review").ageDays(1).build(),
                ScrumBoardTask.builder().projectId(projectId).taskCode("T-050").title("Sprint retrospective view").assigneeInitials("AK").assigneeName("Aryan Kapoor").points(3).columnStatus("Code review").ageDays(2).build(),
                ScrumBoardTask.builder().projectId(projectId).taskCode("T-045").title("File upload S3").assigneeInitials("MK").assigneeName("Mihir Khatri").points(3).columnStatus("Testing").ageDays(1).build(),
                ScrumBoardTask.builder().projectId(projectId).taskCode("T-051").title("Slack notification hook").assigneeInitials("KD").assigneeName("Karan Dev").points(5).columnStatus("Testing").ageDays(1).build(),
                ScrumBoardTask.builder().projectId(projectId).taskCode("T-042").title("Velocity tracking module").assigneeInitials("SR").assigneeName("Sneha Rao").points(5).columnStatus("Done").ageDays(0).build(),
                ScrumBoardTask.builder().projectId(projectId).taskCode("T-046").title("JWT token refresh").assigneeInitials("SR").assigneeName("Sneha Rao").points(2).columnStatus("Done").ageDays(0).build()
        );
        return taskRepository.saveAll(defaults);
    }
}

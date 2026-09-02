package com.flowpilot.flowpilot.developer.service;

import com.flowpilot.flowpilot.common.model.User;
import com.flowpilot.flowpilot.common.repository.UserRepository;
import com.flowpilot.flowpilot.developer.dto.DeveloperTaskDto;
import com.flowpilot.flowpilot.developer.repository.DeveloperTasksRepository;
import com.flowpilot.flowpilot.pm.model.PMProject;
import com.flowpilot.flowpilot.pm.repository.PMProjectsRepository;
import com.flowpilot.flowpilot.scrummaster.model.ScrumBoardTask;

import lombok.RequiredArgsConstructor;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DeveloperTasksService {

    private final DeveloperTasksRepository developerTasksRepository;

    private final UserRepository userRepository;

    private final PMProjectsRepository pmProjectsRepository;


    @Transactional(readOnly = true)
    public List<DeveloperTaskDto> getMyTasks() {

        /*
         * ==========================================
         * STEP 1:
         * GET LOGGED-IN USER EMAIL FROM JWT
         * ==========================================
         */
        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        if (authentication == null
                || !authentication.isAuthenticated()
                || "anonymousUser".equals(
                        authentication.getPrincipal()
                )) {

            throw new RuntimeException(
                    "User is not authenticated"
            );
        }

        String email = authentication.getName();


        /*
         * ==========================================
         * STEP 2:
         * FETCH REAL USER FROM users TABLE
         * ==========================================
         */
        User currentUser =
                userRepository.findByEmail(email)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Logged-in user not found"
                                )
                        );

        String developerName =
                currentUser.getName();


        /*
         * ==========================================
         * STEP 3:
         * FETCH ONLY TASKS ASSIGNED TO THIS DEVELOPER
         * FROM scrum_board_tasks
         * ==========================================
         */
        List<ScrumBoardTask> tasks =
                developerTasksRepository
                        .findByAssigneeNameIgnoreCase(
                                developerName
                        );


        /*
         * ==========================================
         * STEP 4:
         * CONVERT REAL DATA TO FRONTEND FORMAT
         * ==========================================
         */
        return tasks.stream()
                .map(this::convertToDto)
                .toList();
    }


    private DeveloperTaskDto convertToDto(
            ScrumBoardTask task
    ) {

        String projectName = getProjectName(
                task.getProjectId()
        );

        return DeveloperTaskDto.builder()
                .id(task.getId())
                .taskId(task.getTaskCode())
                .priority(getPriority(task))
                .title(task.getTitle())
                .details(buildDetails(task, projectName))
                .status(mapStatus(
                        task.getColumnStatus()
                ))
                .storyPoints(task.getPoints())
                .projectId(task.getProjectId())
                .projectName(projectName)
                .build();
    }


    /*
     * ==========================================
     * FETCH REAL PROJECT NAME
     * ==========================================
     */
    @SuppressWarnings("null")
    private String getProjectName(
            Long projectId
    ) {

        if (projectId == null) {
            return "No Project";
        }

        return pmProjectsRepository
                .findById(projectId)
                .map(PMProject::getProjectName)
                .orElse("Unknown Project");
    }


    /*
     * ==========================================
     * FRONTEND DETAILS
     *
     * Uses real project + real task information.
     * ==========================================
     */
    private String buildDetails(
            ScrumBoardTask task,
            String projectName
    ) {

        StringBuilder details =
                new StringBuilder();

        details.append(projectName);

        if (task.getAgeDays() != null) {

            details.append(" · ")
                    .append(task.getAgeDays())
                    .append(
                            task.getAgeDays() == 1
                                    ? " day old"
                                    : " days old"
                    );
        }

        return details.toString();
    }


    /*
     * ==========================================
     * STATUS MAPPING
     *
     * Scrum Board → Developer Frontend
     * ==========================================
     */
    private String mapStatus(
            String columnStatus
    ) {

        if (columnStatus == null) {
            return "To Do";
        }

        return switch (
                columnStatus.trim().toLowerCase()
        ) {

            case "to do",
                 "todo",
                 "backlog" -> "To Do";

            case "in progress",
                 "code review",
                 "testing" -> "In Progress";

            case "done" -> "Done";

            default -> "To Do";
        };
    }


    /*
     * ==========================================
     * PRIORITY
     *
     * Your current ScrumBoardTask entity does NOT
     * contain a priority field.
     *
     * Therefore this is only a fallback until
     * priority exists in the real task table.
     * ==========================================
     */
    private String getPriority(
            ScrumBoardTask task
    ) {

        if (task.getPoints() != null
                && task.getPoints() >= 8) {

            return "High";
        }

        return "Medium";
    }
}

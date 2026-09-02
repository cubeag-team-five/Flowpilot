package com.flowpilot.flowpilot.admin.service;

import com.flowpilot.flowpilot.admin.dto.AdminDashboardDto;
import com.flowpilot.flowpilot.admin.repository.AdminDepartmentsRepository;
import com.flowpilot.flowpilot.superadmin.model.SuperAdminUser;
import com.flowpilot.flowpilot.superadmin.repository.SuperAdminUserRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AdminDashboardService {


    private final SuperAdminUserRepository
            userRepository;

    private final AdminDepartmentsRepository
            departmentRepository;


    // =========================================================
    // GET DASHBOARD DATA
    // =========================================================

    public AdminDashboardDto getDashboardData() {

        List<SuperAdminUser> users =
                userRepository.findAll();


        // =====================================================
        // ACTIVE USERS
        // =====================================================

        long activeUsers =
                users.stream()
                        .filter(user ->
                                Boolean.TRUE.equals(
                                        user.getActive()
                                )
                        )
                        .count();


        // =====================================================
        // DEPARTMENTS
        // =====================================================

        long departments =
                departmentRepository.count();


        // =====================================================
        // OPEN TICKETS
        // =====================================================

        /*
         * Ticket backend is not available yet.
         *
         * We intentionally return 0 instead of
         * hardcoded dashboard data.
         */

        long openTickets = 0;


        // =====================================================
        // PENDING APPROVALS
        // =====================================================

        /*
         * Approval backend is not available yet.
         *
         * We intentionally return 0 instead of
         * hardcoded dashboard data.
         */

        long pendingApprovals = 0;


        // =====================================================
        // ROLE DISTRIBUTION
        // =====================================================

        Map<String, Long> roleCounts =
                new LinkedHashMap<>();


        for (SuperAdminUser user : users) {

            String role = user.getRole();


            if (role == null ||
                    role.isBlank()) {

                role = "Others";

            } else {

                role = normalizeRole(role);

            }


            roleCounts.put(
                    role,
                    roleCounts.getOrDefault(
                            role,
                            0L
                    ) + 1
            );
        }


        List<AdminDashboardDto.RoleDistributionDto>
                roleDistribution =
                new ArrayList<>();


        /*
         * Fixed order so the frontend gets a
         * consistent role sequence.
         */

        String[] roleOrder = {
                "Developer",
                "QA Engineer",
                "Project Manager",
                "Scrum Master",
                "Admin",
                "Viewer",
                "Super Admin",
                "Others"
        };


        for (String role : roleOrder) {

            long count =
                    roleCounts.getOrDefault(
                            role,
                            0L
                    );


            /*
             * Only add roles that actually exist.
             */

            if (count > 0) {

                roleDistribution.add(
                        AdminDashboardDto
                                .RoleDistributionDto
                                .builder()
                                .role(role)
                                .count(count)
                                .build()
                );
            }
        }


        // =====================================================
        // RECENT ACTIVITY
        // =====================================================

        List<AdminDashboardDto.ActivityDto>
                activities =
                buildRecentActivities(users);


        // =====================================================
        // RETURN DASHBOARD
        // =====================================================

        return AdminDashboardDto
                .builder()
                .activeUsers(activeUsers)
                .departments(departments)
                .openTickets(openTickets)
                .pendingApprovals(pendingApprovals)
                .activities(activities)
                .roleDistribution(roleDistribution)
                .build();
    }


    // =========================================================
    // BUILD RECENT ACTIVITIES
    // =========================================================

    private List<AdminDashboardDto.ActivityDto>
    buildRecentActivities(
            List<SuperAdminUser> users
    ) {

        List<AdminDashboardDto.ActivityDto>
                activities =
                new ArrayList<>();


        /*
         * We currently do not have an Activity/Audit table.
         *
         * Instead of displaying fake activities,
         * we generate only meaningful activity
         * from existing user data.
         *
         * New users can be shown using createdAt.
         */

        users.stream()

                .filter(user ->
                        user.getCreatedAt() != null
                )

                .sorted(
                        (left, right) -> right.getCreatedAt().compareTo(left.getCreatedAt())
                )

                .limit(5)

                .forEach(user -> {

                    String userName =
                            user.getName() != null &&
                            !user.getName().isBlank()
                                    ? user.getName()
                                    : "User";


                    String role =
                            user.getRole() != null &&
                            !user.getRole().isBlank()
                                    ? user.getRole()
                                    : "User";


                    String text =
                            "New user "
                                    + userName
                                    + " added as "
                                    + role;


                    String time =
                            formatRelativeTime(
                                    user.getCreatedAt()
                            );


                    activities.add(
                            AdminDashboardDto
                                    .ActivityDto
                                    .builder()
                                    .text(text)
                                    .time(time)
                                    .type("USER")
                                    .build()
                    );
                });


        return activities;
    }


    // =========================================================
    // FORMAT RELATIVE TIME
    // =========================================================

    private String formatRelativeTime(
            LocalDateTime dateTime
    ) {

        if (dateTime == null) {

            return "";
        }


        Duration duration =
                Duration.between(
                        dateTime,
                        LocalDateTime.now()
                );


        long minutes =
                duration.toMinutes();


        if (minutes < 1) {

            return "Just now";
        }


        if (minutes < 60) {

            return minutes + "m ago";
        }


        long hours =
                duration.toHours();


        if (hours < 24) {

            return hours + "h ago";
        }


        long days =
                duration.toDays();


        if (days == 1) {

            return "Yesterday";
        }


        if (days < 7) {

            return days + " days ago";
        }


        return (days / 7) + " weeks ago";
    }


    // =========================================================
    // NORMALIZE ROLE
    // =========================================================

    private String normalizeRole(
            String role
    ) {

        String normalized =
                role.trim()
                        .toLowerCase()
                        .replace("_", " ")
                        .replace("-", " ");


        switch (normalized) {

            case "developer":
                return "Developer";


            case "qa":
            case "qa engineer":
            case "quality assurance":
            case "quality assurance engineer":
                return "QA Engineer";


            case "project manager":
            case "pm":
                return "Project Manager";


            case "scrum master":
            case "scrum":
                return "Scrum Master";


            case "admin":
                return "Admin";


            case "viewer":
                return "Viewer";


            case "super admin":
            case "superadmin":
                return "Super Admin";


            default:
                return "Others";
        }
    }
}

package com.flowpilot.flowpilot.admin.service;

import com.flowpilot.flowpilot.admin.model.AdminDepartmentMember;
import com.flowpilot.flowpilot.pm.dto.PMProjectDto;
import com.flowpilot.flowpilot.pm.model.PMProject;
import com.flowpilot.flowpilot.pm.repository.PMProjectsRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class AdminProjectsService {

    private final PMProjectsRepository pmProjectsRepository;

    public AdminProjectsService(
            PMProjectsRepository pmProjectsRepository) {

        this.pmProjectsRepository = pmProjectsRepository;
    }

    /**
     * Returns all projects created by Project Managers.
     *
     * Converts PMProject entities into PMProjectDto objects
     * so Hibernate lazy-loading proxies are not serialized.
     */
    @Transactional(readOnly = true)
    public List<PMProjectDto> getAllProjects() {

        List<PMProject> projects =
                pmProjectsRepository.findAll();

        List<PMProjectDto> result =
                new ArrayList<>();

        for (PMProject project : projects) {

            result.add(toDto(project));
        }

        return result;
    }

    /**
     * Returns a single project by ID.
     */
    @Transactional(readOnly = true)
    public PMProjectDto getProject(Long id) {

        PMProject project =
                pmProjectsRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Project not found: " + id
                                )
                        );

        return toDto(project);
    }

    /**
     * Converts PMProject entity to PMProjectDto.
     *
     * IMPORTANT:
     * Only member IDs are returned.
     *
     * This prevents JSON serialization from going through:
     *
     * PMProject
     *   -> AdminDepartmentMember
     *       -> AdminDepartment
     *           -> Hibernate proxy
     *
     * which was causing the ByteBuddyInterceptor error.
     */
    private PMProjectDto toDto(PMProject project) {

        PMProjectDto dto =
                new PMProjectDto();

        dto.setId(
                project.getId()
        );

        dto.setProjectCode(
                project.getProjectCode()
        );

        dto.setProjectName(
                project.getProjectName()
        );

        dto.setSprint(
                project.getSprint()
        );

        dto.setBudget(
                project.getBudget()
        );

        dto.setStartDate(
                project.getStartDate()
        );

        dto.setEndDate(
                project.getEndDate()
        );

        dto.setStatus(
                project.getStatus()
        );

        dto.setProgress(
                project.getProgress()
        );

        /*
         * Return only the IDs of assigned team members.
         *
         * This is safe for JSON serialization.
         */
        List<Long> memberIds =
                project.getTeamMembers()
                        .stream()
                        .map(
                                AdminDepartmentMember::getId
                        )
                        .toList();

        dto.setTeamMemberIds(
                memberIds
        );

        return dto;
    }
}
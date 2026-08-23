package com.flowpilot.flowpilot.superadmin.service;

import com.flowpilot.flowpilot.pm.dto.PMProjectDto;
import com.flowpilot.flowpilot.pm.model.PMProject;
import com.flowpilot.flowpilot.pm.repository.PMProjectsRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class SuperAdminProjectsService {

    private final PMProjectsRepository pmProjectsRepository;

    public SuperAdminProjectsService(
            PMProjectsRepository pmProjectsRepository) {

        this.pmProjectsRepository = pmProjectsRepository;
    }

    /**
     * Returns all projects created by Project Managers.
     *
     * DTOs are returned instead of JPA entities to prevent
     * Hibernate proxy / ByteBuddyInterceptor serialization errors.
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
     * Convert PMProject entity to PMProjectDto.
     *
     * Only member IDs are returned.
     * We do NOT return AdminDepartmentMember entities,
     * preventing recursive/lazy Hibernate serialization.
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

        List<Long> memberIds =
                project.getTeamMembers()
                        .stream()
                        .map(member -> member.getId())
                        .toList();

        dto.setTeamMemberIds(
                memberIds
        );

        return dto;
    }
}
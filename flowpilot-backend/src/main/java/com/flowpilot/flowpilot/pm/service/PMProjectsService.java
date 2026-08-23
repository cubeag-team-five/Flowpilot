package com.flowpilot.flowpilot.pm.service;

import com.flowpilot.flowpilot.admin.model.AdminDepartmentMember;
import com.flowpilot.flowpilot.admin.repository.AdminDepartmentMemberRepository;
import com.flowpilot.flowpilot.pm.dto.PMProjectDto;
import com.flowpilot.flowpilot.pm.model.PMProject;
import com.flowpilot.flowpilot.pm.repository.PMProjectsRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class PMProjectsService {

    private final PMProjectsRepository projectRepository;

    private final AdminDepartmentMemberRepository memberRepository;

    public PMProjectsService(
            PMProjectsRepository projectRepository,
            AdminDepartmentMemberRepository memberRepository) {

        this.projectRepository = projectRepository;
        this.memberRepository = memberRepository;
    }

    /* =========================================================
       GET ALL PROJECTS
    ========================================================= */

    @Transactional(readOnly = true)
    public List<PMProjectDto> getAllProjects() {

        List<PMProject> projects =
                projectRepository.findAll();

        List<PMProjectDto> result =
                new ArrayList<>();

        for (PMProject project : projects) {

            result.add(
                    toDto(project)
            );
        }

        return result;
    }

    /* =========================================================
       GET ONE PROJECT
    ========================================================= */

    @Transactional(readOnly = true)
    public PMProjectDto getProject(Long id) {

        PMProject project =
                projectRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Project not found: " + id
                                )
                        );

        return toDto(project);
    }

    /* =========================================================
       GET ALL MEMBERS ASSIGNED TO PM PROJECTS

       This endpoint is used by QA.

       It collects the members from all PM projects and
       removes duplicate members using their member ID.
    ========================================================= */

    @Transactional(readOnly = true)
    public List<Map<String, Object>> getProjectTeamMembers() {

        List<PMProject> projects =
                projectRepository.findAll();

        /*
         * LinkedHashMap keeps the members unique while
         * preserving the order in which they are found.
         */
        Map<Long, Map<String, Object>> uniqueMembers =
                new LinkedHashMap<>();

        for (PMProject project : projects) {

            if (project.getTeamMembers() == null) {
                continue;
            }

            for (AdminDepartmentMember member :
                    project.getTeamMembers()) {

                if (member == null ||
                        member.getId() == null) {

                    continue;
                }

                Map<String, Object> memberData =
                        new LinkedHashMap<>();

                memberData.put(
                        "id",
                        member.getId()
                );

                memberData.put(
                        "fullName",
                        member.getFullName()
                );

                memberData.put(
                        "email",
                        member.getEmail()
                );

                memberData.put(
                        "employeeId",
                        member.getEmployeeId()
                );

                memberData.put(
                        "designation",
                        member.getDesignation()
                );

                /*
                 * Using member ID as the key means the same
                 * person will appear only once even if they
                 * are assigned to multiple projects.
                 */
                uniqueMembers.put(
                        member.getId(),
                        memberData
                );
            }
        }

        return new ArrayList<>(
                uniqueMembers.values()
        );
    }

    /* =========================================================
       CREATE PROJECT
    ========================================================= */

    @Transactional
    public PMProjectDto createProject(
            PMProjectDto dto) {

        validateProject(dto);

        if (projectRepository.existsByProjectCode(
                dto.getProjectCode().trim())) {

            throw new RuntimeException(
                    "Project code already exists: "
                            + dto.getProjectCode()
            );
        }

        PMProject project =
                new PMProject();

        project.setProjectCode(
                dto.getProjectCode().trim()
        );

        project.setProjectName(
                dto.getProjectName().trim()
        );

        project.setSprint(
                dto.getSprint()
        );

        project.setBudget(
                dto.getBudget()
        );

        project.setStartDate(
                dto.getStartDate()
        );

        project.setEndDate(
                dto.getEndDate()
        );

        project.setStatus(
                dto.getStatus()
        );

        project.setProgress(
                dto.getProgress() == null
                        ? 0
                        : dto.getProgress()
        );

        /* =========================================
           MULTIPLE TEAM MEMBERS
        ========================================= */

        List<AdminDepartmentMember> members =
                getMembersByIds(
                        dto.getTeamMemberIds()
                );

        project.setTeamMembers(
                members
        );

        PMProject savedProject =
                projectRepository.save(project);

        return toDto(savedProject);
    }

    /* =========================================================
       UPDATE PROJECT
    ========================================================= */

    @Transactional
    public PMProjectDto updateProject(
            Long id,
            PMProjectDto dto) {

        validateProject(dto);

        PMProject existingProject =
                projectRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Project not found: " + id
                                )
                        );

        /* =========================================
           PROJECT CODE
        ========================================= */

        if (!existingProject
                .getProjectCode()
                .equals(dto.getProjectCode())) {

            if (projectRepository.existsByProjectCode(
                    dto.getProjectCode().trim())) {

                throw new RuntimeException(
                        "Project code already exists: "
                                + dto.getProjectCode()
                );
            }

            existingProject.setProjectCode(
                    dto.getProjectCode().trim()
            );
        }

        /* =========================================
           BASIC DETAILS
        ========================================= */

        existingProject.setProjectName(
                dto.getProjectName().trim()
        );

        existingProject.setSprint(
                dto.getSprint()
        );

        existingProject.setBudget(
                dto.getBudget()
        );

        existingProject.setStartDate(
                dto.getStartDate()
        );

        existingProject.setEndDate(
                dto.getEndDate()
        );

        existingProject.setStatus(
                dto.getStatus()
        );

        if (dto.getProgress() != null) {

            existingProject.setProgress(
                    Math.min(
                            100,
                            Math.max(
                                    0,
                                    dto.getProgress()
                            )
                    )
            );
        }

        /* =========================================
           UPDATE MULTIPLE TEAM MEMBERS
        ========================================= */

        List<AdminDepartmentMember> members =
                getMembersByIds(
                        dto.getTeamMemberIds()
                );

        existingProject.setTeamMembers(
                members
        );

        PMProject savedProject =
                projectRepository.save(
                        existingProject
                );

        return toDto(savedProject);
    }

    /* =========================================================
       DELETE PROJECT
    ========================================================= */

    @Transactional
    public void deleteProject(Long id) {

        if (!projectRepository.existsById(id)) {

            throw new RuntimeException(
                    "Project not found: " + id
            );
        }

        projectRepository.deleteById(id);
    }

    /* =========================================================
       VALIDATE PROJECT
    ========================================================= */

    private void validateProject(
            PMProjectDto dto) {

        if (dto == null) {

            throw new RuntimeException(
                    "Project data is required"
            );
        }

        if (dto.getProjectCode() == null ||
                dto.getProjectCode()
                        .trim()
                        .isEmpty()) {

            throw new RuntimeException(
                    "Project code is required"
            );
        }

        if (dto.getProjectName() == null ||
                dto.getProjectName()
                        .trim()
                        .isEmpty()) {

            throw new RuntimeException(
                    "Project name is required"
            );
        }
    }

    /* =========================================================
       FIND MEMBERS BY IDS
    ========================================================= */

    private List<AdminDepartmentMember> getMembersByIds(
            List<Long> memberIds) {

        if (memberIds == null ||
                memberIds.isEmpty()) {

            return new ArrayList<>();
        }

        List<AdminDepartmentMember> members =
                new ArrayList<>();

        for (Long memberId : memberIds) {

            if (memberId == null) {
                continue;
            }

            AdminDepartmentMember member =
                    memberRepository.findById(memberId)
                            .orElseThrow(() ->
                                    new RuntimeException(
                                            "Admin department member not found: "
                                                    + memberId
                                    )
                            );

            members.add(member);
        }

        return members;
    }

    /* =========================================================
       ENTITY -> DTO

       Only member IDs are returned here to prevent
       recursive JSON serialization.
    ========================================================= */

    private PMProjectDto toDto(
            PMProject project) {

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
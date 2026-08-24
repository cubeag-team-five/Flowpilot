package com.flowpilot.flowpilot.qa.service;

import com.flowpilot.flowpilot.admin.model.AdminDepartmentMember;
import com.flowpilot.flowpilot.pm.model.PMProject;
import com.flowpilot.flowpilot.pm.repository.PMProjectsRepository;
import com.flowpilot.flowpilot.qa.model.QABugReport;
import com.flowpilot.flowpilot.qa.repository.QABugRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class QABugReportsService {

    private final QABugRepository bugRepository;
    private final PMProjectsRepository pmProjectsRepository;

    public QABugReportsService(
            QABugRepository bugRepository,
            PMProjectsRepository pmProjectsRepository) {

        this.bugRepository = bugRepository;
        this.pmProjectsRepository = pmProjectsRepository;
    }

    /*
     * Existing functionality - unchanged
     */
    public List<QABugReport> getAllBugs() {
        return bugRepository.findAll();
    }

    /*
     * Existing functionality - unchanged
     */
    public QABugReport createBug(QABugReport bug) {
        return bugRepository.save(bug);
    }

    /*
     * Get members assigned by Project Managers.
     *
     * No new DTO/file is required.
     */
    @Transactional(readOnly = true)
    public List<Map<String, Object>> getQAAssignees() {

        List<PMProject> projects =
                pmProjectsRepository.findAll();

        Map<Long, Map<String, Object>> uniqueMembers =
                new LinkedHashMap<>();

        for (PMProject project : projects) {

            if (project.getTeamMembers() == null) {
                continue;
            }

            for (AdminDepartmentMember member :
                    project.getTeamMembers()) {

                if (member == null || member.getId() == null) {
                    continue;
                }

                Map<String, Object> memberData =
                        new LinkedHashMap<>();

                memberData.put("id", member.getId());
                memberData.put("fullName", member.getFullName());
                memberData.put("email", member.getEmail());
                memberData.put("employeeId", member.getEmployeeId());
                memberData.put("designation", member.getDesignation());

                uniqueMembers.putIfAbsent(
                        member.getId(),
                        memberData
                );
            }
        }

        return new ArrayList<>(
                uniqueMembers.values()
        );
    }
}
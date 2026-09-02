package com.flowpilot.flowpilot.qa.service;

import com.flowpilot.flowpilot.qa.model.QABugReport;
import com.flowpilot.flowpilot.qa.repository.QABugRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class QABugReportsService {

    private final QABugRepository bugRepository;

    public QABugReportsService(QABugRepository bugRepository) {

        this.bugRepository =
                bugRepository;

    }

    /*
     * =========================================================
     * GET ALL BUGS
     * =========================================================
     */
    @Transactional(readOnly = true)
    public List<QABugReport> getAllBugs() {

        return bugRepository.findAll();
    }

    /*
     * =========================================================
     * GET BUGS CREATED BY A PARTICULAR QA USER
     * =========================================================
     */
    @Transactional(readOnly = true)
    public List<QABugReport> getBugsCreatedBy(
            String createdBy) {

        if (createdBy == null ||
                createdBy.trim().isEmpty()) {

            return List.of();
        }

        return bugRepository
                .findByCreatedByIgnoreCase(
                        createdBy.trim()
                );
    }

    /*
     * =========================================================
     * CREATE BUG
     * =========================================================
     */
    @Transactional
    public QABugReport createBug(
            QABugReport bug) {

        if (bug == null) {

            throw new IllegalArgumentException(
                    "Bug report cannot be null"
            );
        }

        if (bug.getBugId() == null ||
                bug.getBugId().trim().isEmpty()) {

            throw new IllegalArgumentException(
                    "Bug ID is required"
            );
        }

        if (bug.getTitle() == null ||
                bug.getTitle().trim().isEmpty()) {

            throw new IllegalArgumentException(
                    "Bug title is required"
            );
        }

        if (bug.getSeverity() == null ||
                bug.getSeverity().trim().isEmpty()) {

            throw new IllegalArgumentException(
                    "Bug severity is required"
            );
        }

        if (bug.getCreatedBy() == null ||
                bug.getCreatedBy().trim().isEmpty()) {

            throw new IllegalArgumentException(
                    "Bug creator is required"
            );
        }

        String bugId =
                bug.getBugId().trim();

        if (bugRepository
                .existsByBugId(bugId)) {

            throw new IllegalArgumentException(
                    "Bug ID already exists: " +
                            bugId
            );
        }

        bug.setId(null);

        bug.setBugId(
                bugId
        );

        bug.setTitle(
                bug.getTitle().trim()
        );

        bug.setCreatedBy(
                bug.getCreatedBy().trim()
        );

        if (bug.getAssignedTo() != null) {

            bug.setAssignedTo(
                    bug.getAssignedTo().trim()
            );
        }

        if (bug.getLinkedTaskId() != null) {

            bug.setLinkedTaskId(
                    bug.getLinkedTaskId().trim()
            );
        }

        if (bug.getEnvironment() != null) {

            bug.setEnvironment(
                    bug.getEnvironment().trim()
            );
        }

        if (bug.getSeverity() != null) {

            bug.setSeverity(
                    bug.getSeverity().trim()
            );
        }

        if (bug.getStatus() == null ||
                bug.getStatus().isBlank()) {

            bug.setStatus("Open");

        } else {

            bug.setStatus(
                    bug.getStatus().trim()
            );
        }

        return bugRepository.save(bug);
    }
}

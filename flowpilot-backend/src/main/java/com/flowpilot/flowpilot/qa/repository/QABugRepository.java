package com.flowpilot.flowpilot.qa.repository;

import com.flowpilot.flowpilot.qa.model.QABugReport;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QABugRepository
        extends JpaRepository<QABugReport, Long> {

    boolean existsByBugId(
            String bugId
    );

    List<QABugReport> findByCreatedByIgnoreCase(
            String createdBy
    );
}
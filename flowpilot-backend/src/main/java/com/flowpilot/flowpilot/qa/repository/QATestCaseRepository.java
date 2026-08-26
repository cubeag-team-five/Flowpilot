package com.flowpilot.flowpilot.qa.repository;

import com.flowpilot.flowpilot.qa.model.QATestCase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QATestCaseRepository
        extends JpaRepository<QATestCase, Long> {

    boolean existsByTestId(String testId);
}
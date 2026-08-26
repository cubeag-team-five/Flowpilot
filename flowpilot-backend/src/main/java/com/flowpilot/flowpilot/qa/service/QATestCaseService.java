package com.flowpilot.flowpilot.qa.service;

import com.flowpilot.flowpilot.qa.model.QATestCase;
import com.flowpilot.flowpilot.qa.repository.QATestCaseRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QATestCaseService {

    private final QATestCaseRepository testCaseRepository;

    public QATestCaseService(
            QATestCaseRepository testCaseRepository) {

        this.testCaseRepository = testCaseRepository;
    }

    /*
     * GET ALL TEST CASES
     */
    public List<QATestCase> getAllTestCases() {

        return testCaseRepository.findAll();
    }

    /*
     * GET ONE TEST CASE
     */
    public QATestCase getTestCase(Long id) {

        return testCaseRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Test case not found: " + id
                        )
                );
    }

    /*
     * CREATE TEST CASE
     */
    public QATestCase createTestCase(
            QATestCase testCase) {

        if (testCase.getTestId() == null ||
                testCase.getTestId().trim().isEmpty()) {

            throw new IllegalArgumentException(
                    "Test ID is required"
            );
        }

        if (testCase.getTitle() == null ||
                testCase.getTitle().trim().isEmpty()) {

            throw new IllegalArgumentException(
                    "Test title is required"
            );
        }

        if (testCaseRepository.existsByTestId(
                testCase.getTestId().trim())) {

            throw new IllegalArgumentException(
                    "Test ID already exists: "
                            + testCase.getTestId()
            );
        }

        testCase.setId(null);

        testCase.setTestId(
                testCase.getTestId().trim()
        );

        testCase.setTitle(
                testCase.getTitle().trim()
        );

        if (testCase.getStatus() == null ||
                testCase.getStatus().isBlank()) {

            testCase.setStatus("Pending");
        }

        return testCaseRepository.save(testCase);
    }

    /*
     * UPDATE TEST CASE STATUS
     */
    public QATestCase updateStatus(
            Long id,
            String status) {

        QATestCase existing =
                testCaseRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Test case not found: " + id
                                )
                        );

        existing.setStatus(status);

        return testCaseRepository.save(existing);
    }
}
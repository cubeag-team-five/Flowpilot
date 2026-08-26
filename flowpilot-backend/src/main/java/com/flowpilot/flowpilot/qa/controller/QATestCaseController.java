package com.flowpilot.flowpilot.qa.controller;

import com.flowpilot.flowpilot.qa.model.QATestCase;
import com.flowpilot.flowpilot.qa.service.QATestCaseService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/qa/test-cases")
@CrossOrigin(origins = "http://localhost:5173")
public class QATestCaseController {

    private final QATestCaseService testCaseService;

    public QATestCaseController(
            QATestCaseService testCaseService) {

        this.testCaseService = testCaseService;
    }

    /*
     * GET ALL TEST CASES
     */
    @GetMapping
    public ResponseEntity<List<QATestCase>>
    getAllTestCases() {

        return ResponseEntity.ok(
                testCaseService.getAllTestCases()
        );
    }

    /*
     * GET ONE TEST CASE
     */
    @GetMapping("/{id}")
    public ResponseEntity<QATestCase>
    getTestCase(@PathVariable Long id) {

        return ResponseEntity.ok(
                testCaseService.getTestCase(id)
        );
    }

    /*
     * CREATE TEST CASE
     */
    @PostMapping
    public ResponseEntity<QATestCase>
    createTestCase(
            @RequestBody QATestCase testCase) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        testCaseService.createTestCase(
                                testCase
                        )
                );
    }

    /*
     * UPDATE STATUS
     *
     * Example:
     * PUT /api/qa/test-cases/1/status
     *
     * Body:
     * {
     *   "status": "Passed"
     * }
     */
    @PutMapping("/{id}/status")
    public ResponseEntity<QATestCase>
    updateStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> body) {

        String status = body.get("status");

        if (status == null ||
                status.trim().isEmpty()) {

            return ResponseEntity
                    .badRequest()
                    .build();
        }

        return ResponseEntity.ok(
                testCaseService.updateStatus(
                        id,
                        status
                )
        );
    }
}
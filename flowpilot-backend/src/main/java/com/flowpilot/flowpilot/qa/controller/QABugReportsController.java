package com.flowpilot.flowpilot.qa.controller;

import com.flowpilot.flowpilot.qa.model.QABugReport;
import com.flowpilot.flowpilot.qa.service.QABugReportsService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/qa/bugs")
@CrossOrigin(origins = "http://localhost:5173")
public class QABugReportsController {

    private final QABugReportsService bugReportsService;

    public QABugReportsController(
            QABugReportsService bugReportsService) {

        this.bugReportsService =
                bugReportsService;
    }

    /*
     * =========================================================
     * GET ALL BUGS
     *
     * Kept for existing QA functionality.
     * =========================================================
     */
    @GetMapping
    public ResponseEntity<List<QABugReport>>
    getAllBugs() {

        return ResponseEntity.ok(
                bugReportsService.getAllBugs()
        );
    }

    /*
     * =========================================================
     * GET BUGS CREATED BY USER
     *
     * Example:
     *
     * /api/qa/bugs/by-creator?createdBy=Nishad%20Fulzele
     *
     * =========================================================
     */
    @GetMapping("/by-creator")
    public ResponseEntity<List<QABugReport>>
    getBugsCreatedBy(
            @RequestParam String createdBy) {

        return ResponseEntity.ok(
                bugReportsService
                        .getBugsCreatedBy(
                                createdBy
                        )
        );
    }

    /*
     * =========================================================
     * CREATE BUG
     * =========================================================
     */
    @PostMapping
    public ResponseEntity<QABugReport>
    createBug(
            @RequestBody QABugReport bug) {

        QABugReport savedBug =
                bugReportsService.createBug(
                        bug
                );

        return ResponseEntity.ok(
                savedBug
        );
    }
}
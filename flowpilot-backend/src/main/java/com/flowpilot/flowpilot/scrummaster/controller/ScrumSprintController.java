package com.flowpilot.flowpilot.scrummaster.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.flowpilot.flowpilot.scrummaster.dto.ScrumSprintDto;
import com.flowpilot.flowpilot.scrummaster.service.ScrumSprintService;

@RestController
@RequestMapping("/api/scrummaster/sprints")
@CrossOrigin(origins = "http://localhost:5173")
public class ScrumSprintController {

    private final ScrumSprintService service;

    public ScrumSprintController(ScrumSprintService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<ScrumSprintDto.Response>> listSprints() {

        return ResponseEntity.ok(service.listSprints());
    }

    @GetMapping("/active")
    public ResponseEntity<ScrumSprintDto.Response> getActiveSprint() {

        return ResponseEntity.ok(service.getActiveSprint());
    }

    @PostMapping
    public ResponseEntity<ScrumSprintDto.Response> createSprint(
            @RequestBody ScrumSprintDto.CreateRequest request) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(service.createSprint(request));
    }

    /** Freezes the commitment and makes this the one sprint in flight. */
    @PostMapping("/{sprintId}/start")
    public ResponseEntity<ScrumSprintDto.Response> startSprint(
            @PathVariable Long sprintId) {

        return ResponseEntity.ok(service.startSprint(sprintId));
    }

    /**
     * Closes the sprint. Unfinished tasks move to `carryTo` when given, and
     * otherwise return to the backlog.
     */
    @PostMapping("/{sprintId}/complete")
    public ResponseEntity<ScrumSprintDto.CompleteResult> completeSprint(
            @PathVariable Long sprintId,
            @RequestParam(required = false) Long carryTo
    ) {

        return ResponseEntity.ok(service.completeSprint(sprintId, carryTo));
    }

    @DeleteMapping("/{sprintId}")
    public ResponseEntity<Map<String, Object>> deleteSprint(
            @PathVariable Long sprintId) {

        service.deleteSprint(sprintId);

        return ResponseEntity.ok(Map.of("success", true, "message", "Sprint deleted"));
    }
}

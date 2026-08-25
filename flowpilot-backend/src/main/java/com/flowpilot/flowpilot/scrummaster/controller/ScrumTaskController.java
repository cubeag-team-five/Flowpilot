package com.flowpilot.flowpilot.scrummaster.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.flowpilot.flowpilot.scrummaster.dto.ScrumBoardDto;
import com.flowpilot.flowpilot.scrummaster.dto.ScrumTaskDto;
import com.flowpilot.flowpilot.scrummaster.service.ScrumTaskService;

@RestController
@RequestMapping("/api/scrummaster/tasks")
@CrossOrigin(origins = "http://localhost:5173")
public class ScrumTaskController {

    private final ScrumTaskService service;

    public ScrumTaskController(ScrumTaskService service) {
        this.service = service;
    }

    /** People a task can be assigned to, drawn from the real user table. */
    @GetMapping("/members")
    public ResponseEntity<List<ScrumTaskDto.Member>> listMembers() {

        return ResponseEntity.ok(service.listMembers());
    }

    @PostMapping
    public ResponseEntity<ScrumBoardDto.Card> createTask(
            @RequestBody ScrumTaskDto.CreateRequest request) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(service.createTask(request));
    }

    /** Partial update: title, points, assignee, sprint or status. */
    @PatchMapping("/{taskId}")
    public ResponseEntity<ScrumBoardDto.Card> updateTask(
            @PathVariable Long taskId,
            @RequestBody ScrumTaskDto.UpdateRequest request
    ) {

        return ResponseEntity.ok(service.updateTask(taskId, request));
    }

    @DeleteMapping("/{taskId}")
    public ResponseEntity<Map<String, Object>> deleteTask(@PathVariable Long taskId) {

        service.deleteTask(taskId);

        return ResponseEntity.ok(Map.of("success", true, "message", "Task deleted"));
    }
}

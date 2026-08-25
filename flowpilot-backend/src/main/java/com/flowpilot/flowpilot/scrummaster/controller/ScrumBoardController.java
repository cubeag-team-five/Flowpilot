package com.flowpilot.flowpilot.scrummaster.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.flowpilot.flowpilot.scrummaster.dto.ScrumBoardDto;
import com.flowpilot.flowpilot.scrummaster.service.ScrumBoardService;

@RestController
@RequestMapping("/api/scrummaster/board")
@CrossOrigin(origins = "http://localhost:5173")
public class ScrumBoardController {

    private final ScrumBoardService service;

    public ScrumBoardController(ScrumBoardService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<ScrumBoardDto.Response> getBoard() {

        return ResponseEntity.ok(service.getBoard());
    }

    /** Moves one card to another column and restarts its ageing clock. */
    @PatchMapping("/tasks/{taskId}/status")
    public ResponseEntity<ScrumBoardDto.Card> moveTask(
            @PathVariable Long taskId,
            @RequestBody ScrumBoardDto.MoveRequest request
    ) {

        return ResponseEntity.ok(
                service.moveTask(taskId, request.getStatus())
        );
    }
}

package com.flowpilot.flowpilot.scrummaster.controller;

import com.flowpilot.flowpilot.scrummaster.dto.ScrumBoardDto;
import com.flowpilot.flowpilot.scrummaster.service.ScrumBoardService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/scrummaster/board")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ScrumBoardController {

    private final ScrumBoardService boardService;

    @GetMapping
    public ResponseEntity<ScrumBoardDto> getBoard(@RequestParam(required = false) Long projectId) {
        return ResponseEntity.ok(boardService.getBoard(projectId));
    }

    @PostMapping("/tasks")
    public ResponseEntity<ScrumBoardDto.BoardTaskDto> createTask(@RequestBody ScrumBoardDto.BoardTaskDto taskDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(boardService.createTask(taskDto));
    }

    @PutMapping("/tasks/{id}")
    public ResponseEntity<ScrumBoardDto.BoardTaskDto> updateTask(
            @PathVariable Long id,
            @RequestBody ScrumBoardDto.BoardTaskDto taskDto
    ) {
        return ResponseEntity.ok(boardService.updateTask(id, taskDto));
    }

    @PatchMapping("/tasks/{id}/move")
    public ResponseEntity<ScrumBoardDto.BoardTaskDto> moveTask(
            @PathVariable Long id,
            @RequestParam String targetColumn
    ) {
        return ResponseEntity.ok(boardService.moveTask(id, targetColumn));
    }
}

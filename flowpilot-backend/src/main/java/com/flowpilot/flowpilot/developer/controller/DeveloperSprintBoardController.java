package com.flowpilot.flowpilot.developer.controller;

import com.flowpilot.flowpilot.developer.dto.DeveloperSprintDto;
import com.flowpilot.flowpilot.developer.service.DeveloperSprintBoardService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/developer/sprint-board")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class DeveloperSprintBoardController {

    private final DeveloperSprintBoardService developerSprintBoardService;

    @GetMapping
    public ResponseEntity<DeveloperSprintDto> getSprintBoard() {

        return ResponseEntity.ok(
                developerSprintBoardService.getSprintBoard()
        );
    }
}
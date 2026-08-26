package com.flowpilot.flowpilot.scrummaster.controller;

import com.flowpilot.flowpilot.scrummaster.dto.ScrumRetrospectiveDto;
import com.flowpilot.flowpilot.scrummaster.service.ScrumRetrospectiveService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/scrummaster/retrospective")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ScrumRetrospectiveController {

    private final ScrumRetrospectiveService retrospectiveService;

    @GetMapping
    public ResponseEntity<ScrumRetrospectiveDto> getRetrospective() {
        return ResponseEntity.ok(retrospectiveService.getRetrospective());
    }

    @PostMapping("/items")
    public ResponseEntity<Void> addRetroItem(
            @RequestParam String category,
            @RequestParam String content
    ) {
        retrospectiveService.addRetroItem(category, content);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping("/action-items")
    public ResponseEntity<ScrumRetrospectiveDto.ActionItemDto> addActionItem(
            @RequestBody ScrumRetrospectiveDto.ActionItemDto dto
    ) {
        return ResponseEntity.status(HttpStatus.CREATED).body(retrospectiveService.addActionItem(dto));
    }
}

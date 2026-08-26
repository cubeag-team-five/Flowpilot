package com.flowpilot.flowpilot.scrummaster.controller;

import com.flowpilot.flowpilot.scrummaster.dto.ScrumBurndownDto;
import com.flowpilot.flowpilot.scrummaster.service.ScrumBurndownService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/scrummaster/burndown-velocity")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ScrumBurndownController {

    private final ScrumBurndownService burndownService;

    @GetMapping
    public ResponseEntity<ScrumBurndownDto> getBurndownAndVelocity() {
        return ResponseEntity.ok(burndownService.getBurndownAndVelocity());
    }
}

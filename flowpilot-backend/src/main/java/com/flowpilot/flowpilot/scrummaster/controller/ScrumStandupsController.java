package com.flowpilot.flowpilot.scrummaster.controller;

import com.flowpilot.flowpilot.scrummaster.dto.ScrumStandupDto;
import com.flowpilot.flowpilot.scrummaster.service.ScrumStandupsService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/scrummaster/standups")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ScrumStandupsController {

    private final ScrumStandupsService standupsService;

    @GetMapping
    public ResponseEntity<List<ScrumStandupDto>> getStandups() {
        return ResponseEntity.ok(standupsService.getStandups());
    }

    @PostMapping
    public ResponseEntity<ScrumStandupDto> createStandup(@RequestBody ScrumStandupDto standupDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(standupsService.createStandup(standupDto));
    }
}

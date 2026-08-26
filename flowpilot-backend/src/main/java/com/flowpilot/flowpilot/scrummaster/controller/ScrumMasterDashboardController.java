package com.flowpilot.flowpilot.scrummaster.controller;

import com.flowpilot.flowpilot.scrummaster.dto.ScrumDashboardDto;
import com.flowpilot.flowpilot.scrummaster.service.ScrumMasterDashboardService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/scrummaster/dashboard")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ScrumMasterDashboardController {

    private final ScrumMasterDashboardService dashboardService;

    @GetMapping
    public ResponseEntity<ScrumDashboardDto> getDashboardData() {
        return ResponseEntity.ok(dashboardService.getDashboardData());
    }

    @PatchMapping("/blockers/{id}/escalate")
    public ResponseEntity<ScrumDashboardDto.BlockerDto> escalateBlocker(@PathVariable Long id) {
        return ResponseEntity.ok(dashboardService.escalateBlocker(id));
    }

    @PatchMapping("/blockers/{id}/resolve")
    public ResponseEntity<ScrumDashboardDto.BlockerDto> resolveBlocker(@PathVariable Long id) {
        return ResponseEntity.ok(dashboardService.resolveBlocker(id));
    }
}

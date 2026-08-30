package com.flowpilot.flowpilot.admin.controller;

import com.flowpilot.flowpilot.admin.dto.AdminDashboardDto;
import com.flowpilot.flowpilot.admin.service.AdminDashboardService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/dashboard")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AdminDashboardController {


    private final AdminDashboardService
            adminDashboardService;


    // =========================================================
    // GET DASHBOARD DATA
    // =========================================================

    @GetMapping
    public ResponseEntity<AdminDashboardDto>
    getDashboardData() {

        return ResponseEntity.ok(
                adminDashboardService
                        .getDashboardData()
        );
    }
}
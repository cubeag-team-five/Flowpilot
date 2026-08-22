package com.flowpilot.flowpilot.superadmin.controller;

import com.flowpilot.flowpilot.pm.model.PMProject;
import com.flowpilot.flowpilot.superadmin.service.SuperAdminProjectsService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/superadmin/projects")
@CrossOrigin(origins = "http://localhost:5173")
public class SuperAdminProjectsController {

    private final SuperAdminProjectsService projectService;

    public SuperAdminProjectsController(
            SuperAdminProjectsService projectService) {

        this.projectService = projectService;
    }

    /**
     * Get all projects created by Project Managers.
     */
    @GetMapping
    public ResponseEntity<List<PMProject>> getAllProjects() {

        return ResponseEntity.ok(
                projectService.getAllProjects()
        );
    }

    /**
     * Get a single project by ID.
     */
    @GetMapping("/{id}")
    public ResponseEntity<PMProject> getProject(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                projectService.getProject(id)
        );
    }
}
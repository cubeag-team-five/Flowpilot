package com.flowpilot.flowpilot.pm.controller;

import com.flowpilot.flowpilot.pm.dto.PMProjectDto;
import com.flowpilot.flowpilot.pm.service.PMProjectsService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pm/projects")
@CrossOrigin(origins = "http://localhost:5173")
public class PMProjectsController {

    private final PMProjectsService projectService;

    public PMProjectsController(
            PMProjectsService projectService) {

        this.projectService = projectService;
    }

    /* =========================================================
       GET ALL
    ========================================================= */

    @GetMapping
    public ResponseEntity<List<PMProjectDto>>
    getAllProjects() {

        return ResponseEntity.ok(
                projectService.getAllProjects()
        );
    }

    /* =========================================================
       GET ONE
    ========================================================= */

    @GetMapping("/{id}")
    public ResponseEntity<PMProjectDto>
    getProject(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                projectService.getProject(id)
        );
    }

    /* =========================================================
       CREATE
    ========================================================= */

    @PostMapping
    public ResponseEntity<PMProjectDto>
    createProject(
            @RequestBody PMProjectDto project) {

        PMProjectDto savedProject =
                projectService.createProject(
                        project
                );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(savedProject);
    }

    /* =========================================================
       UPDATE
    ========================================================= */

    @PutMapping("/{id}")
    public ResponseEntity<PMProjectDto>
    updateProject(
            @PathVariable Long id,
            @RequestBody PMProjectDto project) {

        return ResponseEntity.ok(
                projectService.updateProject(
                        id,
                        project
                )
        );
    }

    /* =========================================================
       DELETE
    ========================================================= */

    @DeleteMapping("/{id}")
    public ResponseEntity<Void>
    deleteProject(
            @PathVariable Long id) {

        projectService.deleteProject(id);

        return ResponseEntity
                .noContent()
                .build();
    }
}
package com.flowpilot.flowpilot.pm.controller;

import com.flowpilot.flowpilot.pm.model.PMProject;
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

    public PMProjectsController(PMProjectsService projectService) {
        this.projectService = projectService;
    }

    @GetMapping
    public ResponseEntity<List<PMProject>> getAllProjects() {

        return ResponseEntity.ok(
                projectService.getAllProjects()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<PMProject> getProject(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                projectService.getProject(id)
        );
    }

    @PostMapping
    public ResponseEntity<PMProject> createProject(
            @RequestBody PMProject project) {

        PMProject savedProject =
                projectService.createProject(project);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(savedProject);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PMProject> updateProject(
            @PathVariable Long id,
            @RequestBody PMProject project) {

        return ResponseEntity.ok(
                projectService.updateProject(id, project)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProject(
            @PathVariable Long id) {

        projectService.deleteProject(id);

        return ResponseEntity.noContent().build();
    }
}
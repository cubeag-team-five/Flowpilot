package com.flowpilot.flowpilot.pm.controller;

import java.util.List;

import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.flowpilot.flowpilot.pm.model.Project;
import com.flowpilot.flowpilot.pm.service.ProjectService;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = "http://localhost:5173")
public class ProjectController {

    private final ProjectService service;

    public ProjectController(ProjectService service) {
        this.service = service;
    }

    @GetMapping
    public List<Project> getProjects() {
        return service.getAllProjects();
    }

    @GetMapping("/{id}")
    public Project getProject(
            @PathVariable @NonNull Long id) {
        return service.getProject(id);
    }

    @PostMapping
    public Project createProject(
            @RequestBody @NonNull Project project) {
        return service.createProject(project);
    }

    @PutMapping("/{id}")
    public Project updateProject(
            @PathVariable @NonNull Long id,
            @RequestBody @NonNull Project project) {

        return service.updateProject(id, project);
    }

    @DeleteMapping("/{id}")
    public void deleteProject(
            @PathVariable @NonNull Long id) {

        service.deleteProject(id);
    }
}
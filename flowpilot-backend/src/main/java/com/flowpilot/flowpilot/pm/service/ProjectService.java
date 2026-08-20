package com.flowpilot.flowpilot.pm.service;

import com.flowpilot.flowpilot.pm.model.Project;
import com.flowpilot.flowpilot.pm.repository.ProjectRepository;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {

    private final ProjectRepository repository;

    public ProjectService(ProjectRepository repository) {
        this.repository = repository;
    }

    public List<Project> getAllProjects() {
        return repository.findAll();
    }

    public Project getProject(@NonNull Long id) {
        return repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Project not found: " + id));
    }

    public Project createProject(@NonNull Project project) {
        return repository.save(project);
    }

    public Project updateProject(
            @NonNull Long id,
            @NonNull Project project) {

        Project existing = repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Project not found: " + id));

        existing.setProjectCode(project.getProjectCode());
        existing.setProjectName(project.getProjectName());
        existing.setStatus(project.getStatus());
        existing.setSprint(project.getSprint());
        existing.setTeam(project.getTeam());
        existing.setBudget(project.getBudget());
        existing.setProgress(project.getProgress());
        existing.setStartDate(project.getStartDate());
        existing.setEndDate(project.getEndDate());

        return repository.save(existing);
    }

    public void deleteProject(@NonNull Long id) {
        repository.deleteById(id);
    }
}
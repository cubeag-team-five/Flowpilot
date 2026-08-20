package com.flowpilot.flowpilot.pm.service;

import com.flowpilot.flowpilot.pm.model.PMProject;
import com.flowpilot.flowpilot.pm.repository.PMProjectsRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PMProjectsService {

    private final PMProjectsRepository repository;

    public PMProjectsService(PMProjectsRepository repository) {
        this.repository = repository;
    }

    public List<PMProject> getAllProjects() {
        return repository.findAll();
    }

    public PMProject getProject(Long id) {
        return repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Project not found: " + id));
    }

    public PMProject createProject(PMProject project) {

        if (project.getProjectCode() == null ||
                project.getProjectCode().trim().isEmpty()) {

            throw new RuntimeException("Project code is required");
        }

        if (project.getProjectName() == null ||
                project.getProjectName().trim().isEmpty()) {

            throw new RuntimeException("Project name is required");
        }

        if (repository.existsByProjectCode(project.getProjectCode())) {
            throw new RuntimeException(
                    "Project code already exists: " + project.getProjectCode()
            );
        }

        if (project.getProgress() == null) {
            project.setProgress(0);
        }

        return repository.save(project);
    }

    public PMProject updateProject(Long id, PMProject updatedProject) {

        PMProject existingProject = getProject(id);

        existingProject.setProjectName(updatedProject.getProjectName());
        existingProject.setSprint(updatedProject.getSprint());
        existingProject.setTeam(updatedProject.getTeam());
        existingProject.setBudget(updatedProject.getBudget());
        existingProject.setStartDate(updatedProject.getStartDate());
        existingProject.setEndDate(updatedProject.getEndDate());
        existingProject.setStatus(updatedProject.getStatus());

        if (updatedProject.getProgress() != null) {
            existingProject.setProgress(updatedProject.getProgress());
        }

        return repository.save(existingProject);
    }

    public void deleteProject(Long id) {

        if (!repository.existsById(id)) {
            throw new RuntimeException(
                    "Project not found: " + id
            );
        }

        repository.deleteById(id);
    }
}
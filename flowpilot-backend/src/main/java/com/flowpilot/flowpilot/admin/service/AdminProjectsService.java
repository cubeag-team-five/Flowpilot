package com.flowpilot.flowpilot.admin.service;

import com.flowpilot.flowpilot.pm.model.PMProject;
import com.flowpilot.flowpilot.pm.repository.PMProjectsRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminProjectsService {

    private final PMProjectsRepository pmProjectsRepository;

    public AdminProjectsService(PMProjectsRepository pmProjectsRepository) {
        this.pmProjectsRepository = pmProjectsRepository;
    }

    /**
     * Returns all projects created by Project Managers.
     */
    public List<PMProject> getAllProjects() {
        return pmProjectsRepository.findAll();
    }

    /**
     * Returns a single project by ID.
     */
    public PMProject getProject(Long id) {
        return pmProjectsRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Project not found: " + id));
    }
}
package com.flowpilot.flowpilot.pm.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.flowpilot.flowpilot.pm.model.Project;

public interface ProjectRepository
        extends JpaRepository<Project, Long> {
}
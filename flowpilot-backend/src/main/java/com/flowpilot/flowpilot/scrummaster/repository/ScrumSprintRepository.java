package com.flowpilot.flowpilot.scrummaster.repository;

import com.flowpilot.flowpilot.scrummaster.model.ScrumSprint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ScrumSprintRepository extends JpaRepository<ScrumSprint, Long> {
    Optional<ScrumSprint> findByStatus(String status);
}

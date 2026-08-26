package com.flowpilot.flowpilot.scrummaster.repository;

import com.flowpilot.flowpilot.scrummaster.model.ScrumRetrospective;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScrumRetrospectiveRepository extends JpaRepository<ScrumRetrospective, Long> {
    List<ScrumRetrospective> findBySprintName(String sprintName);
}

package com.flowpilot.flowpilot.developer.repository;

import com.flowpilot.flowpilot.scrummaster.model.ScrumBoardTask;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DeveloperTasksRepository
        extends JpaRepository<ScrumBoardTask, Long> {

    List<ScrumBoardTask> findByAssigneeNameIgnoreCase(
            String assigneeName
    );
}
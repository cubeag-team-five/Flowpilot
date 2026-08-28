package com.flowpilot.flowpilot.scrummaster.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.flowpilot.flowpilot.scrummaster.model.ScrumSprint;

@Repository
public interface ScrumSprintRepository
        extends JpaRepository<ScrumSprint, Long> {

    // The one sprint currently being worked on
    Optional<ScrumSprint> findFirstByStatus(ScrumSprint.Status status);

    // Closed sprints, newest first — the source for velocity history
    List<ScrumSprint> findByStatusOrderBySprintNumberDesc(ScrumSprint.Status status);

    // Highest sprint number so far, used when creating the next one
    Optional<ScrumSprint> findFirstByOrderBySprintNumberDesc();

    // Every sprint of one PM project. The board and the sprint list are scoped
    // to a project, so a sprint from another project must never appear.
    List<ScrumSprint> findByProjectId(Long projectId);

    // The sprint being worked on inside one project
    Optional<ScrumSprint> findFirstByProjectIdAndStatus(
            Long projectId, ScrumSprint.Status status);

    // Fallback when a project has no active sprint: show its most recent one
    // rather than an error, so selecting a project always lands on a board.
    Optional<ScrumSprint> findFirstByProjectIdOrderBySprintNumberDesc(Long projectId);
}

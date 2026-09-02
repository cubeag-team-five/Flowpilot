package com.flowpilot.flowpilot.scrummaster.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.flowpilot.flowpilot.scrummaster.model.ScrumSprint;

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

    /**
     * The sprint the screens should default to.
     *
     * Between sprints there is no ACTIVE row at all — the last one is closed
     * and the next is still PLANNED — and that is a normal state, not an
     * error. Every screen used to throw there, which took the dashboard,
     * board, standups and analytics down together and read in the browser
     * console as a missing endpoint. Falling back to the most recent sprint
     * keeps the module usable; its status is on screen, so nobody mistakes a
     * closed sprint for a running one.
     */
    default Optional<ScrumSprint> findCurrentOrLatest() {
        return findFirstByStatus(ScrumSprint.Status.ACTIVE)
                .or(this::findFirstByOrderBySprintNumberDesc);
    }
}

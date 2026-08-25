package com.flowpilot.flowpilot.scrummaster.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.flowpilot.flowpilot.scrummaster.model.ScrumTask;

@Repository
public interface ScrumTaskRepository
        extends JpaRepository<ScrumTask, Long> {

    // Every card in a sprint, ordered so columns render predictably
    List<ScrumTask> findBySprintIdOrderByStatusAscTaskKeyAsc(Long sprintId);

    long countBySprintIdAndStatus(Long sprintId, ScrumTask.Status status);

    long countBySprintId(Long sprintId);

    boolean existsByTaskKey(String taskKey);

    // Backlog: everything not attached to a sprint
    List<ScrumTask> findBySprintIsNullOrderByTaskKeyAsc();

    @Query("""
        SELECT COALESCE(SUM(t.storyPoints), 0)
        FROM ScrumTask t
        WHERE t.sprint.id = :sprintId
    """)
    Integer sumStoryPointsForSprint(@Param("sprintId") Long sprintId);

    @Query("""
        SELECT COALESCE(SUM(t.storyPoints), 0)
        FROM ScrumTask t
        WHERE t.sprint.id = :sprintId
          AND t.status = :status
    """)
    Integer sumStoryPointsForSprintByStatus(
            @Param("sprintId") Long sprintId,
            @Param("status") ScrumTask.Status status
    );
}

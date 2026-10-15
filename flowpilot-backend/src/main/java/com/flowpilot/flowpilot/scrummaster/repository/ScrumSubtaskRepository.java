package com.flowpilot.flowpilot.scrummaster.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.flowpilot.flowpilot.scrummaster.model.ScrumSubtask;

@Repository
public interface ScrumSubtaskRepository extends JpaRepository<ScrumSubtask, Long> {

    List<ScrumSubtask> findByTaskIdOrderByIdAsc(Long taskId);

    int countByTaskId(Long taskId);

    int countByTaskIdAndCompletedTrue(Long taskId);

    void deleteByTaskId(Long taskId);
}

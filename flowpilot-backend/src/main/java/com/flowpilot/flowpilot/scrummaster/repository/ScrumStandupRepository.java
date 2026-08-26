package com.flowpilot.flowpilot.scrummaster.repository;

import com.flowpilot.flowpilot.scrummaster.model.ScrumStandup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ScrumStandupRepository extends JpaRepository<ScrumStandup, Long> {
    List<ScrumStandup> findByStandupDate(LocalDate standupDate);
}

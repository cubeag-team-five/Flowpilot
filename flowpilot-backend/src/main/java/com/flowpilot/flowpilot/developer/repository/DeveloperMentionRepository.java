package com.flowpilot.flowpilot.developer.repository;

import com.flowpilot.flowpilot.developer.model.DeveloperMention;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DeveloperMentionRepository
        extends JpaRepository<DeveloperMention, Long> {

    List<DeveloperMention> findAllByOrderByIdDesc();

    List<DeveloperMention> findByUnreadTrueOrderByIdDesc();
}
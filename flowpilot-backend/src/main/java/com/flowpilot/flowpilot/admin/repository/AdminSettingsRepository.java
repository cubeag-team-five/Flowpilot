package com.flowpilot.flowpilot.admin.repository;

import com.flowpilot.flowpilot.admin.model.AdminSettings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminSettingsRepository extends JpaRepository<AdminSettings, Long> {
}
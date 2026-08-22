package com.flowpilot.flowpilot.admin.repository;

import com.flowpilot.flowpilot.admin.model.AdminDepartment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminDepartmentsRepository
        extends JpaRepository<AdminDepartment, Long> {

    boolean existsByNameIgnoreCase(String name);
}
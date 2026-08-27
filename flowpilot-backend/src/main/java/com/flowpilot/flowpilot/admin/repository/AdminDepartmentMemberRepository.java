package com.flowpilot.flowpilot.admin.repository;

import com.flowpilot.flowpilot.admin.model.AdminDepartment;
import com.flowpilot.flowpilot.admin.model.AdminDepartmentMember;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AdminDepartmentMemberRepository
        extends JpaRepository<AdminDepartmentMember, Long> {

    List<AdminDepartmentMember> findByDepartment(
            AdminDepartment department
    );

    long countByDepartment(
            AdminDepartment department
    );

    boolean existsByDepartmentAndEmployeeId(
            AdminDepartment department,
            String employeeId
    );

    Optional<AdminDepartmentMember> findByDepartmentAndEmployeeId(
            AdminDepartment department,
            String employeeId
    );

    AdminDepartmentMember findTopByOrderByEmployeeIdDesc();
}
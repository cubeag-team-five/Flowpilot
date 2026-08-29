package com.flowpilot.flowpilot.admin.service;

import com.flowpilot.flowpilot.admin.dto.AdminDepartmentDto;
import com.flowpilot.flowpilot.admin.model.AdminDepartment;
import com.flowpilot.flowpilot.admin.repository.AdminDepartmentsRepository;
import com.flowpilot.flowpilot.admin.repository.AdminDepartmentMemberRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class AdminDepartmentsService {

    private final AdminDepartmentsRepository repository;
    private final AdminDepartmentMemberRepository memberRepository;

    public AdminDepartmentsService(
            AdminDepartmentsRepository repository,
            AdminDepartmentMemberRepository memberRepository) {

        this.repository = repository;
        this.memberRepository = memberRepository;
    }

    // =========================================================
    // ADD DEPARTMENT
    // =========================================================

    public AdminDepartment addDepartment(
            AdminDepartmentDto dto) {

        if (dto == null || dto.getName() == null ||
                dto.getName().trim().isEmpty()) {

            throw new IllegalArgumentException(
                    "Department name is required"
            );
        }

        String departmentName = dto.getName().trim();

        if (repository.existsByNameIgnoreCase(departmentName)) {

            throw new IllegalArgumentException(
                    "Department already exists"
            );
        }

        AdminDepartment department = new AdminDepartment();

        department.setName(departmentName);
        department.setHead(dto.getHead());

        // New department starts with 0 actual members.
        department.setMembers(0);

        department.setProgress(
                dto.getProgress() != null
                        ? dto.getProgress()
                        : 0
        );

        return repository.save(department);
    }


    // =========================================================
    // GET ALL DEPARTMENTS
    // =========================================================

    @Transactional(readOnly = true)
    public List<AdminDepartment> getAllDepartments() {

        List<AdminDepartment> departments =
                repository.findAll();

        for (AdminDepartment department : departments) {

            int memberCount =
                    memberRepository
                            .findByDepartment(department)
                            .size();

            department.setMembers(memberCount);
        }

        return departments;
    }


    // =========================================================
    // UPDATE DEPARTMENT
    // =========================================================

    public AdminDepartment updateDepartment(
            Long departmentId,
            AdminDepartmentDto dto) {

        if (departmentId == null) {

            throw new IllegalArgumentException(
                    "Department ID is required"
            );
        }

        if (dto == null || dto.getName() == null ||
                dto.getName().trim().isEmpty()) {

            throw new IllegalArgumentException(
                    "Department name is required"
            );
        }

        AdminDepartment department =
                repository.findById(departmentId)
                        .orElseThrow(() ->
                                new IllegalArgumentException(
                                        "Department not found"
                                )
                        );

        String newName = dto.getName().trim();

        // Check duplicate department name
        AdminDepartment existingDepartment =
                repository.findByNameIgnoreCase(newName)
                        .orElse(null);

        if (existingDepartment != null &&
                !existingDepartment.getId().equals(departmentId)) {

            throw new IllegalArgumentException(
                    "Department already exists"
            );
        }

        department.setName(newName);
        department.setHead(dto.getHead());

        /*
         * Do not take members from frontend.
         * Members are calculated from admin_department_members.
         */
        int actualMemberCount =
                memberRepository
                        .findByDepartment(department)
                        .size();

        department.setMembers(actualMemberCount);

        if (dto.getProgress() != null) {
            department.setProgress(dto.getProgress());
        }

        return repository.save(department);
    }


    // =========================================================
    // DELETE DEPARTMENT
    // =========================================================

    public void deleteDepartment(Long departmentId) {

        if (departmentId == null) {

            throw new IllegalArgumentException(
                    "Department ID is required"
            );
        }

        AdminDepartment department =
                repository.findById(departmentId)
                        .orElseThrow(() ->
                                new IllegalArgumentException(
                                        "Department not found"
                                )
                        );

        /*
         * First delete members belonging to this department.
         *
         * This prevents foreign-key constraint errors because
         * admin_department_members.department_id references
         * admin_departments.id.
         */
        memberRepository.deleteByDepartment(department);

        // Then delete department itself.
        repository.delete(department);
    }
}
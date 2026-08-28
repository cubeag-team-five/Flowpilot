package com.flowpilot.flowpilot.admin.service;

import com.flowpilot.flowpilot.admin.dto.AdminDepartmentDto;
import com.flowpilot.flowpilot.admin.model.AdminDepartment;
import com.flowpilot.flowpilot.admin.model.AdminDepartmentMember;
import com.flowpilot.flowpilot.admin.repository.AdminDepartmentsRepository;
import com.flowpilot.flowpilot.admin.repository.AdminDepartmentMemberRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminDepartmentsService {

    private final AdminDepartmentsRepository repository;
    private final AdminDepartmentMemberRepository memberRepository;

    public AdminDepartmentsService(
            AdminDepartmentsRepository repository,
            AdminDepartmentMemberRepository memberRepository) {

        this.repository = repository;
        this.memberRepository = memberRepository;
    }

    public AdminDepartment addDepartment(
            AdminDepartmentDto dto) {

        if (repository.existsByNameIgnoreCase(dto.getName())) {

            throw new IllegalArgumentException(
                    "Department already exists"
            );
        }

        AdminDepartment department = new AdminDepartment();

        department.setName(dto.getName());
        department.setHead(dto.getHead());

        department.setMembers(dto.getMembers());

        department.setProgress(dto.getProgress());

        return repository.save(department);
    }

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
}
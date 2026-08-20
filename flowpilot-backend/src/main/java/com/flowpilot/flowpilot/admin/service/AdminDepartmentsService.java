package com.flowpilot.flowpilot.admin.service;

import com.flowpilot.flowpilot.admin.dto.AdminDepartmentDto;
import com.flowpilot.flowpilot.admin.model.AdminDepartment;
import com.flowpilot.flowpilot.admin.repository.AdminDepartmentsRepository;
import org.springframework.stereotype.Service;

@Service
public class AdminDepartmentsService {

    private final AdminDepartmentsRepository repository;

    public AdminDepartmentsService(
            AdminDepartmentsRepository repository) {
        this.repository = repository;
    }

    public AdminDepartment addDepartment(
            AdminDepartmentDto dto) {

        AdminDepartment department = new AdminDepartment();

        department.setName(dto.getName());
        department.setHead(dto.getHead());
        department.setMembers(dto.getMembers());
        department.setProgress(dto.getProgress());

        return repository.save(department);
    }
}
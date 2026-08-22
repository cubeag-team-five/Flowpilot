package com.flowpilot.flowpilot.admin.service;

import com.flowpilot.flowpilot.admin.dto.AdminDepartmentDto;
import com.flowpilot.flowpilot.admin.model.AdminDepartment;
import com.flowpilot.flowpilot.admin.repository.AdminDepartmentsRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminDepartmentsService implements CommandLineRunner {

    private final AdminDepartmentsRepository repository;

    public AdminDepartmentsService(
            AdminDepartmentsRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... args) {

        addInitialDepartment(
                "Engineering",
                "Karan Mehta",
                18,
                40
        );

        addInitialDepartment(
                "Product",
                "Arjun Shah",
                6,
                14
        );

        addInitialDepartment(
                "Quality Assurance",
                "Sana Sheikh",
                7,
                16
        );

        addInitialDepartment(
                "Design",
                "Divya Mehta",
                5,
                11
        );

        addInitialDepartment(
                "Operations",
                "Nisha Agarwal",
                8,
                20
        );

        addInitialDepartment(
                "Leadership",
                "Rajeev Kumar",
                3,
                8
        );
    }

    private void addInitialDepartment(
            String name,
            String head,
            int members,
            int progress) {

        if (repository.existsByNameIgnoreCase(name)) {
            return;
        }

        AdminDepartment department = new AdminDepartment();

        department.setName(name);
        department.setHead(head);
        department.setMembers(members);
        department.setProgress(progress);

        repository.save(department);
    }

    public AdminDepartment addDepartment(
            AdminDepartmentDto dto) {

        // Check whether department already exists
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
        return repository.findAll();
    }
}
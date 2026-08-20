package com.flowpilot.flowpilot.admin.controller;

import com.flowpilot.flowpilot.admin.dto.AdminDepartmentDto;
import com.flowpilot.flowpilot.admin.model.AdminDepartment;
import com.flowpilot.flowpilot.admin.service.AdminDepartmentsService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/departments")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminDepartmentsController {

    private final AdminDepartmentsService service;

    public AdminDepartmentsController(
            AdminDepartmentsService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<AdminDepartment> addDepartment(
            @RequestBody AdminDepartmentDto dto) {

        AdminDepartment department =
                service.addDepartment(dto);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(department);
    }
}
package com.flowpilot.flowpilot.admin.controller;

import com.flowpilot.flowpilot.admin.dto.AdminDepartmentDto;
import com.flowpilot.flowpilot.admin.model.AdminDepartment;
import com.flowpilot.flowpilot.admin.service.AdminDepartmentsService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/departments")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminDepartmentsController {

    private final AdminDepartmentsService service;

    public AdminDepartmentsController(
            AdminDepartmentsService service) {

        this.service = service;
    }


    // =========================================================
    // ADD DEPARTMENT
    // =========================================================

    @PostMapping
    public ResponseEntity<AdminDepartment> addDepartment(
            @RequestBody AdminDepartmentDto dto) {

        AdminDepartment department =
                service.addDepartment(dto);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(department);
    }


    // =========================================================
    // GET ALL DEPARTMENTS
    // =========================================================

    @GetMapping
    public ResponseEntity<List<AdminDepartment>>
    getAllDepartments() {

        List<AdminDepartment> departments =
                service.getAllDepartments();

        return ResponseEntity.ok(departments);
    }


    // =========================================================
    // UPDATE DEPARTMENT
    // =========================================================

    @PutMapping("/{departmentId}")
    public ResponseEntity<AdminDepartment>
    updateDepartment(
            @PathVariable Long departmentId,
            @RequestBody AdminDepartmentDto dto) {

        AdminDepartment department =
                service.updateDepartment(
                        departmentId,
                        dto
                );

        return ResponseEntity.ok(department);
    }


    // =========================================================
    // DELETE DEPARTMENT
    // =========================================================

    @DeleteMapping("/{departmentId}")
    public ResponseEntity<Map<String, String>>
    deleteDepartment(
            @PathVariable Long departmentId) {

        service.deleteDepartment(departmentId);

        return ResponseEntity.ok(
                Map.of(
                        "message",
                        "Department deleted successfully"
                )
        );
    }


    // =========================================================
    // ERROR HANDLER
    // =========================================================

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, String>>
    handleIllegalArgumentException(
            IllegalArgumentException ex) {

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(
                        Map.of(
                                "message",
                                ex.getMessage()
                        )
                );
    }
}
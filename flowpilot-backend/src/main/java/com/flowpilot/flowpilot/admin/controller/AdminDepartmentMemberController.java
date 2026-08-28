package com.flowpilot.flowpilot.admin.controller;

import com.flowpilot.flowpilot.admin.dto.AdminDepartmentMemberDto;
import com.flowpilot.flowpilot.admin.model.AdminDepartmentMember;
import com.flowpilot.flowpilot.admin.service.AdminDepartmentMemberService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/departments")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminDepartmentMemberController {

    private final AdminDepartmentMemberService service;

    public AdminDepartmentMemberController(
            AdminDepartmentMemberService service) {

        this.service = service;
    }


    // =========================================================
    // GET MEMBERS OF DEPARTMENT
    // =========================================================

    @GetMapping("/{departmentId}/members")
    public ResponseEntity<List<AdminDepartmentMember>> getMembers(
            @PathVariable Long departmentId) {

        return ResponseEntity.ok(
                service.getMembers(departmentId)
        );
    }


    // =========================================================
    // ADD EXISTING SUPERADMIN USER AS MEMBER
    // =========================================================

    @PostMapping("/{departmentId}/members")
    public ResponseEntity<AdminDepartmentMember> addMember(
            @PathVariable Long departmentId,
            @RequestBody AdminDepartmentMemberDto dto) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        service.addMember(
                                departmentId,
                                dto
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
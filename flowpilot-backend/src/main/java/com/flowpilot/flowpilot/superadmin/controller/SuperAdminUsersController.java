package com.flowpilot.flowpilot.superadmin.controller;

import com.flowpilot.flowpilot.superadmin.dto.SuperAdminUserDto;
import com.flowpilot.flowpilot.superadmin.service.SuperAdminUsersService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/superadmin/users")
@RequiredArgsConstructor
public class SuperAdminUsersController {

    private final SuperAdminUsersService usersService;


    // =========================================================
    // GET ALL USERS
    // GET /api/superadmin/users
    // =========================================================

    @GetMapping
    public ResponseEntity<List<SuperAdminUserDto>>
    getAllUsers() {

        return ResponseEntity.ok(
                usersService.getAllUsers()
        );
    }


    // =========================================================
    // GET USER BY EMPLOYEE ID
    // GET /api/superadmin/users/{employeeId}
    // =========================================================

    @GetMapping("/{employeeId}")
    public ResponseEntity<SuperAdminUserDto>
    getUserByEmployeeId(
            @PathVariable String employeeId
    ) {

        return ResponseEntity.ok(
                usersService.getUserByEmployeeId(
                        employeeId
                )
        );
    }


    // =========================================================
    // CREATE USER
    // POST /api/superadmin/users
    // =========================================================

    @PostMapping
    public ResponseEntity<SuperAdminUserDto>
    createUser(
            @RequestBody SuperAdminUserDto dto
    ) {

        SuperAdminUserDto createdUser =
                usersService.createUser(dto);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(createdUser);
    }


    // =========================================================
    // UPDATE USER
    // PUT /api/superadmin/users/{employeeId}
    // =========================================================

    @PutMapping("/{employeeId}")
    public ResponseEntity<SuperAdminUserDto>
    updateUser(
            @PathVariable String employeeId,
            @RequestBody SuperAdminUserDto dto
    ) {

        return ResponseEntity.ok(
                usersService.updateUser(
                        employeeId,
                        dto
                )
        );
    }


    // =========================================================
    // ENABLE / DISABLE
    // PATCH /api/superadmin/users/{employeeId}/status
    // =========================================================

    @PatchMapping("/{employeeId}/status")
    public ResponseEntity<SuperAdminUserDto>
    toggleStatus(
            @PathVariable String employeeId
    ) {

        return ResponseEntity.ok(
                usersService.toggleStatus(
                        employeeId
                )
        );
    }


    // =========================================================
    // DELETE USER
    // DELETE /api/superadmin/users/{employeeId}
    // =========================================================

    @DeleteMapping("/{employeeId}")
    public ResponseEntity<Void>
    deleteUser(
            @PathVariable String employeeId
    ) {

        usersService.deleteUser(
                employeeId
        );

        return ResponseEntity
                .noContent()
                .build();
    }
}
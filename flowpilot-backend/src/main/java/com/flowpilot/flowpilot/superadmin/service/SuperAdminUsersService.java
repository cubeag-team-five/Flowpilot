package com.flowpilot.flowpilot.superadmin.service;

import com.flowpilot.flowpilot.superadmin.dto.SuperAdminUserDto;
import com.flowpilot.flowpilot.superadmin.model.SuperAdminUser;
import com.flowpilot.flowpilot.superadmin.repository.SuperAdminUserRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SuperAdminUsersService {

    private final SuperAdminUserRepository userRepository;

    private final PasswordEncoder passwordEncoder;


    // =========================================================
    // GET ALL USERS
    // =========================================================

    public List<SuperAdminUserDto> getAllUsers() {

        return userRepository.findAll()
                .stream()
                .map(this::convertToDto)
                .toList();
    }


    // =========================================================
    // GET USER BY EMPLOYEE ID
    // =========================================================

    public SuperAdminUserDto getUserByEmployeeId(
            String employeeId
    ) {

        SuperAdminUser user =
                userRepository.findById(employeeId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "User not found"
                                )
                        );

        return convertToDto(user);
    }


    // =========================================================
    // CREATE USER
    // =========================================================

    public SuperAdminUserDto createUser(
            SuperAdminUserDto dto
    ) {

        validateRequiredFields(dto);

        String employeeId =
                dto.getEmployeeId().trim();

        String email =
                dto.getEmail().trim();


        if (userRepository.existsById(employeeId)) {

            throw new RuntimeException(
                    "Employee ID already exists"
            );
        }


        if (userRepository.existsByEmail(email)) {

            throw new RuntimeException(
                    "Email already exists"
            );
        }


        if (dto.getPassword() == null ||
                dto.getPassword().isBlank()) {

            throw new RuntimeException(
                    "Password is required"
            );
        }


        validatePassword(dto.getPassword());


        SuperAdminUser user =
                SuperAdminUser.builder()

                        .employeeId(employeeId)

                        .name(
                                dto.getName().trim()
                        )

                        .email(email)

                        .role(
                                dto.getRole().trim()
                        )

                        .department(
                                dto.getDepartment().trim()
                        )

                        .designation(
                                dto.getDesignation().trim()
                        )

                        .password(
                                passwordEncoder.encode(
                                        dto.getPassword()
                                )
                        )

                        .status(
                                SuperAdminUser.UserStatus.ACTIVE
                        )

                        .lastLogin(null)

                        .build();


        SuperAdminUser savedUser =
                userRepository.save(user);


        return convertToDto(savedUser);
    }


    // =========================================================
    // UPDATE USER
    // =========================================================

    public SuperAdminUserDto updateUser(
            String employeeId,
            SuperAdminUserDto dto
    ) {

        SuperAdminUser user =
                userRepository.findById(employeeId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "User not found"
                                )
                        );


        validateUpdateFields(dto);


        String email =
                dto.getEmail().trim();


        userRepository.findByEmail(email)
                .ifPresent(existing -> {

                    if (!existing.getEmployeeId()
                            .equals(employeeId)) {

                        throw new RuntimeException(
                                "Email already exists"
                        );
                    }
                });


        /*
         * Employee ID is the primary key.
         *
         * It must not be changed.
         */

        user.setName(
                dto.getName().trim()
        );

        user.setEmail(email);

        user.setRole(
                dto.getRole().trim()
        );

        user.setDepartment(
                dto.getDepartment().trim()
        );

        user.setDesignation(
                dto.getDesignation().trim()
        );


        /*
         * Password is optional during editing.
         */

        if (dto.getPassword() != null &&
                !dto.getPassword().isBlank()) {

            validatePassword(
                    dto.getPassword()
            );

            user.setPassword(
                    passwordEncoder.encode(
                            dto.getPassword()
                    )
            );
        }


        SuperAdminUser updatedUser =
                userRepository.save(user);


        return convertToDto(updatedUser);
    }


    // =========================================================
    // ENABLE / DISABLE
    // =========================================================

    public SuperAdminUserDto toggleStatus(
            String employeeId
    ) {

        SuperAdminUser user =
                userRepository.findById(employeeId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "User not found"
                                )
                        );


        if (user.getStatus() ==
                SuperAdminUser.UserStatus.ACTIVE) {

            user.setStatus(
                    SuperAdminUser.UserStatus.INACTIVE
            );

        } else {

            user.setStatus(
                    SuperAdminUser.UserStatus.ACTIVE
            );
        }


        return convertToDto(
                userRepository.save(user)
        );
    }


    // =========================================================
    // DELETE
    // =========================================================

    public void deleteUser(
            String employeeId
    ) {

        if (!userRepository.existsById(employeeId)) {

            throw new RuntimeException(
                    "User not found"
            );
        }

        userRepository.deleteById(employeeId);
    }


    // =========================================================
    // VALIDATE CREATE FIELDS
    // =========================================================

    private void validateRequiredFields(
            SuperAdminUserDto dto
    ) {

        if (dto.getEmployeeId() == null ||
                dto.getEmployeeId().isBlank()) {

            throw new RuntimeException(
                    "Employee ID is required"
            );
        }

        if (dto.getName() == null ||
                dto.getName().isBlank()) {

            throw new RuntimeException(
                    "Name is required"
            );
        }

        if (dto.getEmail() == null ||
                dto.getEmail().isBlank()) {

            throw new RuntimeException(
                    "Email is required"
            );
        }

        if (dto.getRole() == null ||
                dto.getRole().isBlank()) {

            throw new RuntimeException(
                    "Role is required"
            );
        }

        if (dto.getDepartment() == null ||
                dto.getDepartment().isBlank()) {

            throw new RuntimeException(
                    "Department is required"
            );
        }

        if (dto.getDesignation() == null ||
                dto.getDesignation().isBlank()) {

            throw new RuntimeException(
                    "Designation is required"
            );
        }
    }


    // =========================================================
    // VALIDATE UPDATE FIELDS
    // =========================================================

    private void validateUpdateFields(
            SuperAdminUserDto dto
    ) {

        if (dto.getName() == null ||
                dto.getName().isBlank()) {

            throw new RuntimeException(
                    "Name is required"
            );
        }

        if (dto.getEmail() == null ||
                dto.getEmail().isBlank()) {

            throw new RuntimeException(
                    "Email is required"
            );
        }

        if (dto.getRole() == null ||
                dto.getRole().isBlank()) {

            throw new RuntimeException(
                    "Role is required"
            );
        }

        if (dto.getDepartment() == null ||
                dto.getDepartment().isBlank()) {

            throw new RuntimeException(
                    "Department is required"
            );
        }

        if (dto.getDesignation() == null ||
                dto.getDesignation().isBlank()) {

            throw new RuntimeException(
                    "Designation is required"
            );
        }
    }


    // =========================================================
    // PASSWORD VALIDATION
    // =========================================================

    private void validatePassword(
            String password
    ) {

        if (password.length() < 8) {

            throw new RuntimeException(
                    "Password must be at least 8 characters"
            );
        }

        if (!password.matches(
                ".*[A-Za-z].*"
        )) {

            throw new RuntimeException(
                    "Password must contain at least one letter"
            );
        }

        if (!password.matches(
                ".*[0-9].*"
        )) {

            throw new RuntimeException(
                    "Password must contain at least one number"
            );
        }

        if (!password.matches(
                ".*[^A-Za-z0-9].*"
        )) {

            throw new RuntimeException(
                    "Password must contain at least one special character"
            );
        }
    }


    // =========================================================
    // MODEL -> DTO
    // =========================================================

    private SuperAdminUserDto convertToDto(
            SuperAdminUser user
    ) {

        SuperAdminUserDto dto =
                new SuperAdminUserDto();

        dto.setEmployeeId(
                user.getEmployeeId()
        );

        dto.setName(
                user.getName()
        );

        dto.setEmail(
                user.getEmail()
        );

        dto.setRole(
                user.getRole()
        );

        dto.setDepartment(
                user.getDepartment()
        );

        dto.setDesignation(
                user.getDesignation()
        );

        /*
         * Never return password.
         */

        dto.setPassword(null);

        dto.setStatus(
                user.getStatus().name()
        );

        if (user.getLastLogin() != null) {

            dto.setLastLogin(
                    user.getLastLogin().toString()
            );

        } else {

            dto.setLastLogin("Never");
        }

        dto.setInitials(
                generateInitials(
                        user.getName()
                )
        );

        return dto;
    }


    // =========================================================
    // GENERATE INITIALS
    // =========================================================

    private String generateInitials(
            String name
    ) {

        if (name == null ||
                name.trim().isEmpty()) {

            return "";
        }

        String[] parts =
                name.trim().split("\\s+");

        StringBuilder initials =
                new StringBuilder();

        for (String part : parts) {

            if (!part.isEmpty()) {

                initials.append(
                        Character.toUpperCase(
                                part.charAt(0)
                        )
                );
            }
        }

        String result =
                initials.toString();

        return result.substring(
                0,
                Math.min(
                        2,
                        result.length()
                )
        );
    }
}
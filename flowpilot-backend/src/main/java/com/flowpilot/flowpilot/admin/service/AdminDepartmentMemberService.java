package com.flowpilot.flowpilot.admin.service;

import com.flowpilot.flowpilot.admin.dto.AdminDepartmentMemberDto;
import com.flowpilot.flowpilot.admin.model.AdminDepartment;
import com.flowpilot.flowpilot.admin.model.AdminDepartmentMember;
import com.flowpilot.flowpilot.admin.repository.AdminDepartmentMemberRepository;
import com.flowpilot.flowpilot.admin.repository.AdminDepartmentsRepository;

import com.flowpilot.flowpilot.superadmin.model.SuperAdminUser;
import com.flowpilot.flowpilot.superadmin.repository.SuperAdminUserRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class AdminDepartmentMemberService {

    private final AdminDepartmentMemberRepository memberRepository;

    private final AdminDepartmentsRepository departmentRepository;

    /*
     * We READ users created/managed by SuperAdmin.
     *
     * We are not modifying SuperAdmin files.
     */
    private final SuperAdminUserRepository superAdminUserRepository;


    // =========================================================
    // GET MEMBERS
    // =========================================================

    @Transactional(readOnly = true)
    public List<AdminDepartmentMember> getMembers(
            Long departmentId
    ) {

        AdminDepartment department =
                departmentRepository.findById(departmentId)
                        .orElseThrow(() ->
                                new IllegalArgumentException(
                                        "Department not found."
                                )
                        );

        return memberRepository.findByDepartment(department);
    }


    // =========================================================
    // ADD MEMBER
    // =========================================================

    public AdminDepartmentMember addMember(
            Long departmentId,
            AdminDepartmentMemberDto dto
    ) {

        if (departmentId == null) {

            throw new IllegalArgumentException(
                    "Department is required."
            );
        }

        if (dto == null ||
                dto.getEmployeeId() == null) {

            throw new IllegalArgumentException(
                    "Employee is required."
            );
        }


        // =====================================================
        // FIND DEPARTMENT
        // =====================================================

        AdminDepartment department =
                departmentRepository.findById(departmentId)
                        .orElseThrow(() ->
                                new IllegalArgumentException(
                                        "Department not found."
                                )
                        );


        // =====================================================
        // FIND SUPERADMIN USER
        // =====================================================

        SuperAdminUser user =
                superAdminUserRepository.findById(
                        dto.getEmployeeId()
                )
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Selected user was not found."
                        )
                );


        // =====================================================
        // CHECK USER STATUS
        // =====================================================

        if (!Boolean.TRUE.equals(user.getActive())) {

            throw new IllegalArgumentException(
                    "Inactive users cannot be added as department members."
            );
        }


        // =====================================================
        // PREVENT DUPLICATE MEMBER
        // =====================================================

        String employeeId =
                String.valueOf(
                        user.getEmployeeId()
                );

        if (
                memberRepository
                        .existsByDepartmentAndEmployeeId(
                                department,
                                employeeId
                        )
        ) {

            throw new IllegalArgumentException(
                    "This user is already a member of the department."
            );
        }


        // =====================================================
        // CREATE MEMBER FROM SUPERADMIN USER
        // =====================================================

        AdminDepartmentMember member =
                new AdminDepartmentMember();

        member.setDepartment(department);

        member.setFullName(
                user.getName()
        );

        member.setEmail(
                user.getEmail()
        );

        member.setEmployeeId(
                employeeId
        );

        member.setDesignation(
                user.getDesignation()
        );


        // =====================================================
        // SAVE
        // =====================================================

        return memberRepository.save(member);
    }


    // =========================================================
    // UPDATE MEMBER
    // =========================================================
    /*
     * You previously wanted member editing removed.
     *
     * Therefore this method should NOT be used.
     *
     * Keep the endpoint removed from the controller.
     */
}
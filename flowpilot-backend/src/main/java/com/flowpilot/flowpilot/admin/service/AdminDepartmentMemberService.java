package com.flowpilot.flowpilot.admin.service;

import com.flowpilot.flowpilot.admin.model.AdminDepartment;
import com.flowpilot.flowpilot.admin.model.AdminDepartmentMember;
import com.flowpilot.flowpilot.admin.repository.AdminDepartmentMemberRepository;
import com.flowpilot.flowpilot.admin.repository.AdminDepartmentsRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminDepartmentMemberService {

    private final AdminDepartmentMemberRepository memberRepository;
    private final AdminDepartmentsRepository departmentRepository;

    public AdminDepartmentMemberService(
            AdminDepartmentMemberRepository memberRepository,
            AdminDepartmentsRepository departmentRepository) {

        this.memberRepository = memberRepository;
        this.departmentRepository = departmentRepository;
    }

    public List<AdminDepartmentMember> getMembers(Long departmentId) {

        AdminDepartment department =
                departmentRepository.findById(departmentId)
                        .orElseThrow(() ->
                                new IllegalArgumentException(
                                        "Department not found"
                                ));

        return memberRepository.findByDepartment(department);
    }

    public AdminDepartmentMember addMember(
            Long departmentId,
            AdminDepartmentMember member) {

        AdminDepartment department =
                departmentRepository.findById(departmentId)
                        .orElseThrow(() ->
                                new IllegalArgumentException(
                                        "Department not found"
                                ));

        member.setId(null);
        member.setDepartment(department);

        return memberRepository.save(member);
    }

    public AdminDepartmentMember updateMember(
            Long departmentId,
            Long memberId,
            AdminDepartmentMember updatedMember) {

        AdminDepartment department =
                departmentRepository.findById(departmentId)
                        .orElseThrow(() ->
                                new IllegalArgumentException(
                                        "Department not found"
                                ));

        AdminDepartmentMember existingMember =
                memberRepository.findById(memberId)
                        .orElseThrow(() ->
                                new IllegalArgumentException(
                                        "Member not found"
                                ));

        existingMember.setDepartment(department);
        existingMember.setFullName(updatedMember.getFullName());
        existingMember.setEmail(updatedMember.getEmail());
        existingMember.setEmployeeId(updatedMember.getEmployeeId());
        existingMember.setDesignation(updatedMember.getDesignation());

        return memberRepository.save(existingMember);
    }
}
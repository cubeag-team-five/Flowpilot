package com.flowpilot.flowpilot.admin.dto;

public class AdminDepartmentMemberDto {

    private Long departmentId;

    private Long employeeId;

    public AdminDepartmentMemberDto() {
    }

    public Long getDepartmentId() {
        return departmentId;
    }

    public void setDepartmentId(Long departmentId) {
        this.departmentId = departmentId;
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }
}
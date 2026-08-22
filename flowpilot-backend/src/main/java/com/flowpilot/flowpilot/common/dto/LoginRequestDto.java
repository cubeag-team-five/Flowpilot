package com.flowpilot.flowpilot.common.dto;

import lombok.Data;

@Data
public class LoginRequestDto {
    private String email;
    private String password;
}

package com.actif.config.auth.dto;

import lombok.Data;

import java.util.List;

@Data
public class UpdateUserDto {
//    private String userId;
    private String firstName;
    private String lastName;
    private String phone;
    private String email;
    private List<String> roles;
    private String oldPassword;
    private String newPassword;
}

package com.actif.config.auth.dto;

import lombok.Data;

@Data
public class CreateUserDto {
    private String userId;
    private String firstName;
    private String lastName;
    private String phone;
    private String mail;
}

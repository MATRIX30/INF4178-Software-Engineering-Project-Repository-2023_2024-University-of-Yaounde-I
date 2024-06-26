package com.actif.config.auth.dto.role;

import lombok.Data;

import java.util.List;

@Data
public class CreateRoleDto {
    private String name;

    private List<String> permissions;
}

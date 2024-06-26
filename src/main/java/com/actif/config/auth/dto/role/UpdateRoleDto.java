package com.actif.config.auth.dto.role;

import lombok.Data;

import java.util.List;

@Data
public class UpdateRoleDto {
    private String name;

    private List<String> permissions;
}

package com.actif.config.auth.controller;

import com.actif.Response;
import com.actif.config.auth.authModels.Permission;
import com.actif.config.auth.authModels.Role;
import com.actif.config.auth.dto.role.CreateRoleDto;
import com.actif.config.auth.dto.role.UpdateRoleDto;
import com.actif.config.auth.repository.PermissionRepository;
import com.actif.config.auth.services.RoleService;
import com.actif.config.auth.services.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@Controller
@RestController
@RequestMapping("/api/roles")
@Tag(name = "Roles")
public class RoleController {
    @Autowired
    RoleService roleService;

    @Autowired
    UserService userService;

    @Autowired
    PermissionRepository permissionRepository;

    @GetMapping
    public ResponseEntity<Response> findAll() {
        List<Role> roles = this.roleService.findAll();
        if (roles.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(Response.builder().message("List of roles").data(roles).build());
    }

    @PostMapping()
    public ResponseEntity<Response> create(@RequestBody CreateRoleDto createRoleDto) {
        Role roleCreated;
        Optional<Role> roleFindByName = roleService.findByName(createRoleDto.getName());
        if(!roleFindByName.isPresent()) {
            /* permission managment */
            List<Permission> permissions = new ArrayList<>();
            for(int i=0; i < createRoleDto.getPermissions().size(); i++) {
                Optional<Permission> permissionGetByName = permissionRepository.findByName(createRoleDto.getPermissions().get(i));
                if(permissionGetByName.isPresent()) {
                    if(!permissions.contains(permissionGetByName.get())) {
                        permissions.add(permissionGetByName.get());
                    }
                } else {
                    Permission newPermission = Permission.builder().build();
                    newPermission.setName(createRoleDto.getPermissions().get(i));
                    Permission permissionCreated =  permissionRepository.save(newPermission);
                    if(!permissions.contains(permissionCreated)) {
                        permissions.add(permissionCreated);
                    }
                }
            }
            HashSet<Permission> permissionsHashSet = new HashSet<>(permissions);
            roleCreated = this.roleService.save(
                    Role.builder()
                            .name(createRoleDto.getName())
                            .permissions(permissionsHashSet)
                            .build()
            );
        } else {
            return ResponseEntity.badRequest().body(
                    Response
                            .builder()
                            .message("Role already exist")
                            .data(null)
                            .build()
            );
        }

        if (roleCreated == null) {
            return ResponseEntity.badRequest().body(
                    Response
                            .builder()
                            .message("Failed to create role")
                            .data(null)
                            .build()
            );
        }

        return ResponseEntity.ok(Response.builder().message("Role successfully created !").data(roleCreated).build());

    }

//    @PostMapping("/{id}")
//    public ResponseEntity<Response> update(@PathVariable Long id, @RequestBody UpdateRoleDto updateRoleDto) {
//        Optional<Role> roleFoundById = this.roleService.findById(id);
//
//        if (roleFoundById.isEmpty()) {
//            return ResponseEntity.badRequest().body(Response.builder().message("Role not found").data(null).build());
//        }
//        if ((updateRoleDto.getName() != null) && (!updateRoleDto.getName().isEmpty())) {
//            Role roleUpdated = this.roleService.update(roleFoundById.get(), updateRoleDto);
//
//            return ResponseEntity.ok(Response.builder().message("Role updated !").data(roleUpdated).build());
//        }
//        return null;
//    }

    @GetMapping("/{id}")
    public ResponseEntity<Response> findAllById(@PathVariable Long id) {
        Optional<Role> role = this.roleService.findById(id);

        if (role.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(Response.builder().message("Found role").data(role).build());
    }

//    @GetMapping("/{id}/users")
//    public ResponseEntity<Response> findAllByRole(@PathVariable Long id) {
//        Optional<Role> role = this.roleService.findById(id);
//
//        if (role.isEmpty()) {
//            return ResponseEntity.badRequest().body(Response.builder().message("Found role").data(role).build());
//        }
//
//        return ResponseEntity.ok(Response.builder().message("Found role").data(this.userService.findAllByRole(role.get())).build());
//    }


}

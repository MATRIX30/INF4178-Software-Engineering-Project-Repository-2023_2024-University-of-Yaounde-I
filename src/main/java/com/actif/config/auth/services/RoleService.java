package com.actif.config.auth.services;


import com.actif.config.auth.authModels.Role;
import com.actif.config.auth.repository.PermissionRepository;
import com.actif.config.auth.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@Service
public class RoleService {
    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PermissionRepository permissionRepository;

    public Role save(Role role) {
        return roleRepository.save(role);
    }
    public Optional<Role> findById(Long id) {return roleRepository.findById(id);}

    public Optional<Role> findByName(String name) {return roleRepository.findByName(name);}
    public List<Role> findAll() { return roleRepository.findAll();}

//    public Role update(Role role, UpdateRoleDto updateRoleDto) {
//        if((updateRoleDto.getName() != null) && (!updateRoleDto.getName().isEmpty())) {
////            if(updateRoleDto.getName().equals(RoleE.ADMIN)){
////                Role roleName = roleRepository.findByName(RoleE.ADMIN)
////                        .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
////
////            }
//            role.setName(updateRoleDto.getName());
//        }
//
//        if ((updateRoleDto.getPermissions() != null) && (!updateRoleDto.getPermissions().isEmpty())) {
//            List<Permission> permissions = new ArrayList<>();
//            for (int i = 0; i < updateRoleDto.getPermissions().size(); i++) {
//                Optional<Permission> permissionGetByName = permissionRepository.findByName(updateRoleDto.getPermissions().get(i));
//                if (permissionGetByName.isPresent()) {
//                    if (!permissions.contains(permissionGetByName.get())) {
//                        permissions.add(permissionGetByName.get());
//                    }
//                } else {
//                    Permission newPermission = new Permission();
//                    newPermission.setName(updateRoleDto.getPermissions().get(i));
//                    Permission permissionCreated = permissionRepository.save(newPermission);
//                    if (!permissions.contains(permissionCreated)) {
//                        permissions.add(permissionCreated);
//                    }
//                }
//            }
//            HashSet<Permission> permissionsHashSet = new HashSet<>(permissions);
//            role.setPermissions(permissionsHashSet);
//        }
//        return roleRepository.save(role);
//    }

}

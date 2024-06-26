package com.actif.config.auth.services;


import com.actif.config.auth.authModels.User;
import com.actif.config.auth.authModels.Role;
import com.actif.config.auth.dto.UpdateUserDto;
import com.actif.config.auth.repository.RoleRepository;
import com.actif.config.auth.repository.UserRepository;
import com.actif.constains.ENTITY_STATUS;
import jakarta.validation.Validator;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@Service
@Data
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;


    private Validator validator;
    private static String SECRET = "404D635166546A576E5A7234753778214125442A472D4B614E645267556B5870";

    public User save(User account) {
        return userRepository.save(account);
    }

    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    public Optional<User> findByMail(String email) {
        return userRepository.findByMail(email);
    }

    public Optional<User> findByUserId(String userId) {
        return userRepository.findByUserId(userId);
    }

    public List<User> findAll() {
        return userRepository.findAllByOrderByIdDesc();
    }

    public User update(User account, UpdateUserDto updateUserDto) {
        List<Role> roles = new ArrayList<>();
        if ((updateUserDto.getFirstName() != null) && (!updateUserDto.getFirstName().isEmpty())) {
            account.setFirstName(updateUserDto.getFirstName());
        }
        if ((updateUserDto.getLastName() != null) && (!updateUserDto.getLastName().isEmpty())) {
            account.setLastName(updateUserDto.getLastName());
        }
        if ((updateUserDto.getEmail() != null) && (!updateUserDto.getEmail().isEmpty())) {
            account.setMail(updateUserDto.getEmail());
        }
        if ((updateUserDto.getPhone() != null) && (!updateUserDto.getPhone().isEmpty())) {
            account.setPhone(updateUserDto.getPhone());
            account.setPhoneVerified(false);
        }
        if ((updateUserDto.getRoles() != null) && (!updateUserDto.getRoles().isEmpty())) {

            for (int i = 0; i < updateUserDto.getRoles().size(); i++) {
                Optional<Role> roleGetByName = roleRepository.findByName(updateUserDto.getRoles().get(i));
                if (roleGetByName.isPresent()) {
                    if (!roles.contains(roleGetByName.get())) {
                        roles.add(roleGetByName.get());
                    }
                } else {
                    Role newRole = Role.builder()
                            .name(updateUserDto.getRoles().get(i)).build();
                    Role roleCreated = roleRepository.save(newRole);
                    if (!roles.contains(roleCreated)) {
                        roles.add(roleCreated);
                    }
                }
            }
            HashSet<Role> rolesHashSet = new HashSet<>(roles);
           // account.getRoles().addAll(rolesHashSet);
        }

        return userRepository.save(account);
    }


    public User deleteUser(User account) {
        account.setStatus(ENTITY_STATUS.DELETED);
        User accountDeleted = userRepository.save(account);
        return accountDeleted;
    }

    public Optional<User> findByPhone(String phone) {
        return this.userRepository.findOneByPhone(phone);
    }

//    public List<User> findAllByRole(Role role) {
//        return this.userRepository.findAllByRole(role.getId());
//    }
}

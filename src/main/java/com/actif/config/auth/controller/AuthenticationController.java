package com.actif.config.auth.controller;


import com.actif.config.auth.authModels.User;
import com.actif.config.auth.authModels.Role;
import com.actif.config.auth.payload.request.*;
import com.actif.config.auth.repository.UserRepository;
import com.actif.config.auth.services.AuthenticationService;
import com.actif.customer.Dtos.CreateCustomerDto;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Tag(name = "Auth")
//@CrossOrigin(origins="http://192.168.1.2")
@CrossOrigin(origins="*")
public class AuthenticationController {

    private final AuthenticationService service;

    private final PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;



    @PostMapping("/login")
    public ResponseEntity<Object> authenticate(
            @RequestBody AuthenticationRequest request
    ) {
        System.out.println("Inside Controller authentication");
        AuthenticationResponse res = service.authenticate(request);
       // System.out.println("res auth login => "+ res);
        if (res.getStatus() != null && res.getStatus() == 400) {
            return ResponseEntity.badRequest().body(res);
        }

        return ResponseEntity.ok(res);
    }


    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request
    ) {
        System.out.println("Inside register");


        return ResponseEntity.ok(service.register(request));
    }

    @PostMapping("/register/carrier")
    public ResponseEntity<AuthenticationResponse> registerLivreur(
            @RequestBody RegisterLivreurRequest request
    ) {
        System.out.println("Inside register");


        return ResponseEntity.ok(service.registerLivreur(request));
    }

    @PostMapping("/register/poc")
    public ResponseEntity<AuthenticationResponse> registerPoc(
            @RequestBody RegisterPocRequest request
    ) {
        System.out.println("Inside register");


        return ResponseEntity.ok(service.registerPoc(request));
    }

    @PostMapping("/register/customer")
    public ResponseEntity<AuthenticationResponse> registerCustomer(
            @RequestBody CreateCustomerDto request
    ) {
        System.out.println("Inside register");


        return ResponseEntity.ok(service.registerCustomer(request));
    }
    @PostMapping("/verify-account")
    public ResponseEntity<AuthenticationResponse> verifiedAccount(
            @RequestBody VerifyAccountRequest request
    ) {
        System.out.println("Inside verify-account");
        AuthenticationResponse res = service.verifyAccount(request);
        if(res.getStatus()!=200){
            return ResponseEntity.badRequest().body(res);
        }
        return ResponseEntity.ok(res);
    }



    @GetMapping("/users/{id}/role/{role}")
    public ResponseEntity<User> setRole(
            @PathVariable Long id, @PathVariable Role role
    ) {
        return ResponseEntity.ok(service.setRole(id, (Set<Role>) List.of(role)));
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<AuthenticationResponse> refreshToken(
            HttpServletRequest request,
            HttpServletResponse response
    ) {
        try {

            return ResponseEntity.ok(service.refreshToken(request, response));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/demo")
    public ResponseEntity<String> demo(
    ) {
        System.out.println("Inside Controller demo");
        return ResponseEntity.ok("EDemo controller");
    }


}
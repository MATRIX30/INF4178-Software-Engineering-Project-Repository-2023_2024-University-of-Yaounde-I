package com.actif.config.auth.controller;

import com.actif.config.auth.services.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test")
@RequiredArgsConstructor
public class AuthenticationControllerTest {

    private final AuthenticationService service;



    @GetMapping("/hello")
    public ResponseEntity<String> demo(
    ) {
        System.out.println("Inside Controller demo");
        return ResponseEntity.ok("EDemo controller");
    }





}
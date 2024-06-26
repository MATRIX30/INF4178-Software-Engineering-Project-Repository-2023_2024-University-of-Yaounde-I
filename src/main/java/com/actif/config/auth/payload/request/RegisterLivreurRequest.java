package com.actif.config.auth.payload.request;

import lombok.Getter;

import java.util.List;

@Getter
public class RegisterLivreurRequest {
    private String firstname;
    private String lastname;
    private String email;
    private String phone;
    private String password;
    private String role;


    private String region;
    private String town;
    private String lat;
    private String lng;
}




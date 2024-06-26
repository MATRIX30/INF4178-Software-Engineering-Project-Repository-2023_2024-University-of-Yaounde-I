package com.actif.config.auth.payload.request;

import lombok.Getter;

import java.util.List;

@Getter
public class RegisterPocRequest {
    private String firstname;
    private String lastname;
    private String email;
    private String phone;
    private String password;
    //private String role;
    private List<String> pocPhones;


    private String region;
    private String town;
    private String lat;
    private String lng;
}

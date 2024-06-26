package com.actif.livreur.dtos;


import lombok.Getter;

@Getter
public class CreateLivreurDto {

    private String firstName;
    private String lastName;
    private String phone;
    private String region;
    private String town;
    private String lat;
    private String lng;
    private String password;

}

package com.actif.POC.dtos;

import lombok.Getter;

@Getter
public class CreatePOCDto {

    private String phone;
    private String region;
    private String town;
    private String lat;
    private String lng;
    private String password;
}

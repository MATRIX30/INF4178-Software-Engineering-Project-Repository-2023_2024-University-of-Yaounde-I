package com.actif.customer.Dtos;

import lombok.Getter;

@Getter
public class CreateCustomerDto {
    private String firstName;
    private String lastName;
    private String phone;
    private String email;
    private String region;
    private String town;
    private String district;
    private String password;

}

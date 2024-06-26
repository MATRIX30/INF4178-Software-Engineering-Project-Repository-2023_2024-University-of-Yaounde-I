package com.actif.city.dto;

import lombok.Data;

@Data
public class CreateCityDto {
    private String name;
    private String lat;
    private String lng;
}

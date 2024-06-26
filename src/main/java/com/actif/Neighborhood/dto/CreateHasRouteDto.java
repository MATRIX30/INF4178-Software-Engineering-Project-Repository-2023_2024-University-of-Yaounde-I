package com.actif.Neighborhood.dto;

import lombok.Data;

@Data
public class CreateHasRouteDto {
    private Long source;
    private Long target;
    private int hour;
    private String traffic;
    private double distance;
    private String road;
    private double weight;
}

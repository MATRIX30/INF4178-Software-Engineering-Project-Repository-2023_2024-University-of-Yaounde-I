package com.actif.estimations.dtos;

import lombok.Getter;

@Getter
public class CreateEstimationDto {
    private Long weight;
    private Long height;
    private Long width;
    private String townSource;
    private String townIntented;
}

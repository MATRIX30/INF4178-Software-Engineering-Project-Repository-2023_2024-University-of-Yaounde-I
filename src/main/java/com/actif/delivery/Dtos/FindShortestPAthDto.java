package com.actif.delivery.Dtos;

import lombok.Data;
import lombok.extern.java.Log;

@Data
public class FindShortestPAthDto {
    private Long sourceId;
    private Long targetId;
}

package com.actif.Neighborhood.repsonse;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class RouteResponse {
    private List<String> neighborhoods = new ArrayList<>();
    private List<Double> weighted;
    private double totalWeighted;
}

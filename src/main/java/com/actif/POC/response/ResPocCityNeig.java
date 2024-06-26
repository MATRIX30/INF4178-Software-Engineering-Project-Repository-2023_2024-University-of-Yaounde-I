package com.actif.POC.response;

import com.actif.Neighborhood.Neighborhood;
import com.actif.POC.POC;
import com.actif.city.City;
import lombok.Data;

@Data
public class ResPocCityNeig {
    private POC poc;
    private City city;
    private Neighborhood neighborhood;
}

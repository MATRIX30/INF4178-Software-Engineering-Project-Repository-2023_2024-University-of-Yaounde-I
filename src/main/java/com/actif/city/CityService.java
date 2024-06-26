package com.actif.city;

import com.actif.Neighborhood.Neighborhood;
import com.actif.Neighborhood.NeighborhoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CityService {
    @Autowired
    private CityRepository cityRepository;

    @Autowired
    private NeighborhoodRepository neighborhoodRepository;

    public City create(City city){
        return this.cityRepository.save(city);
    }


    public Page<City> getAll(int page, int limit){
        return this.cityRepository.findAll(PageRequest.of(page, limit));
    }


    public Optional<City> getById(Long id){
        return this.cityRepository.findById(id);
    }

    public List<Neighborhood> getByCityId(Long id) {
        return neighborhoodRepository.findByCityId(id);
    }
}

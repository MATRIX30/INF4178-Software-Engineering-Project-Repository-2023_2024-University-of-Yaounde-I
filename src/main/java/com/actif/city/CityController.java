package com.actif.city;

import com.actif.Neighborhood.Neighborhood;
import com.actif.ResultDto;
import com.actif.city.dto.CreateCityDto;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@Tag(name = "cities")
@RequestMapping("/api/cities")
public class CityController {
    @Autowired
    CityService cityService;

    @PostMapping
    public ResponseEntity<ResultDto> search2(
            @RequestBody CreateCityDto createCityDto
    ) {
        City city = City.builder()
                .name(createCityDto.getName())
                .lat(createCityDto.getLat())
                .lng(createCityDto.getLng())
                .build();
        City citySaved = this.cityService.create(city);
        return ResponseEntity.ok().body(new ResultDto("New city add!", citySaved, HttpStatus.OK.value(), null));
    }

    @GetMapping
    public ResponseEntity<ResultDto> getAllPacket(
            @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "20") int size
    ) {


        Page<City> cities = cityService.getAll(page, size);

        if (cities == null) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(new ResultDto("List of cities !", cities, HttpStatus.OK.value(), null));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResultDto> getById(@PathVariable Long id) {
        Optional<City> cityFound = this.cityService.getById(id);

        if(cityFound.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(new ResultDto("City found by id!", cityFound, HttpStatus.OK.value(), null));
    }

    @GetMapping("/{id}/neighborhoods")
    public ResponseEntity<ResultDto> getNeighborhoodsByCityId(@PathVariable Long id) {
        Optional<City> cityFound = cityService.getById(id);

        if(cityFound.isEmpty()) {
            return ResponseEntity.ok(new ResultDto("City not found !", null, HttpStatus.NOT_FOUND.value(), null));
        }

        List<Neighborhood> neighborhoods = cityService.getByCityId(cityFound.get().getId());
        if(neighborhoods.isEmpty()) {
            return ResponseEntity.ok(new ResultDto("No neighborhoods for this city !", null, HttpStatus.NO_CONTENT.value(), null));
        }
        return ResponseEntity.ok(new ResultDto("Neighborhoods list for this city ", neighborhoods, HttpStatus.OK.value(), null));
    }

}

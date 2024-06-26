package com.actif.Neighborhood;

import com.actif.Neighborhood.dto.CreateHasRouteDto;
import com.actif.Neighborhood.dto.CreateLocatedAtDto;
import com.actif.Neighborhood.dto.CreateNeighborhoodDto;
import com.actif.Neighborhood.relationshipProperties.HasRout;
import com.actif.Neighborhood.relationshipProperties.HasRoute;
import com.actif.ResultDto;
import com.actif.city.City;
import com.actif.city.CityService;
import com.actif.delivery.DELIVERY_STATUS;
import com.actif.delivery.Delivery;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;

@RestController
@Tag(name = "Neighborhoods")
@RequestMapping("/api/neighborhoods")
public class NeighborhoodController {
    @Autowired
    NeighborhoodService neighborhoodService;

    @Autowired
    CityService cityService;

    @Autowired
    HasRouteRepository hasRouteRepository;

    @Autowired
    AirportRepository airportRepository;

    @PostMapping
    public ResponseEntity<ResultDto> create(@RequestBody CreateNeighborhoodDto createNeighborhoodDto) {
        Neighborhood neighborhood = Neighborhood.builder()
                .name(createNeighborhoodDto.getName())
                .lat(createNeighborhoodDto.getLat())
                .lng(createNeighborhoodDto.getLng())
                .build();
        Neighborhood neighborhoodSaved = this.neighborhoodService.create(neighborhood);
        return ResponseEntity.ok().body(new ResultDto("New neighborhood add!", neighborhoodSaved, HttpStatus.OK.value(), null));
    }

    @GetMapping
    public ResponseEntity<ResultDto> getAll(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "20") int size) {
        Page<Neighborhood> neighborhoods = this.neighborhoodService.getAll(page, size);

        if (neighborhoods == null) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(new ResultDto("List of neighborhoods !", neighborhoods, HttpStatus.OK.value(), null));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResultDto> getById(@PathVariable Long id) {
        Optional<Neighborhood> neighborhoodFound = this.neighborhoodService.getById(id);

        if(neighborhoodFound.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(new ResultDto("Neighborhood found by id!", neighborhoodFound, HttpStatus.OK.value(), null));
    }


    @PostMapping("/addToCity")
    public ResponseEntity<ResultDto> addNeighborHoodToCity(@RequestBody CreateLocatedAtDto createLocatedAtDto) {
        Optional<City> cityOptional = this.cityService.getById(createLocatedAtDto.getCityId());

        if (cityOptional.isEmpty()) {
            return ResponseEntity.ok(new ResultDto("No city found  !", null, HttpStatus.NO_CONTENT.value(), null));
        }

        Optional<Neighborhood> neighborhoodOptional = this.neighborhoodService.getById(createLocatedAtDto.getNeighborhoodId());

        if (neighborhoodOptional.isEmpty()) {
            return ResponseEntity.ok(new ResultDto("No neighborhoodOptional found  !", null, HttpStatus.NO_CONTENT.value(), null));
        }

        Neighborhood updateNei = this.neighborhoodService.locatedAt(neighborhoodOptional.get(), cityOptional.get());
        if (updateNei == null) {
            return ResponseEntity.badRequest().body(new ResultDto("Neighborhood not added  !", null, HttpStatus.NO_CONTENT.value(), null));
        }

        return ResponseEntity.ok(new ResultDto("Neighborhood located at city!", updateNei, HttpStatus.OK.value(), null));
    }

    @PostMapping("/airport")
    public ResponseEntity<ResultDto> airport() {
        Airport toronto = new Airport("Toronto Pearson Int");
        Airport frankfurt = new Airport("Frankfurt M");
        Airport baltimore = new Airport("Baltimore");

        HasRout hasRoute = HasRout.builder()
                .distance(0)
                .airport(frankfurt)
                .hour(0)
                .weight(0)
                .date(LocalDateTime.now())
                .build();

        HasRout hasRoute2 = HasRout.builder()
                .distance(0)
                .airport(baltimore)
                .hour(0)
                .weight(0)
                .date(LocalDateTime.now())
                .build();
        HasRout hasRoute3 = HasRout.builder()
                .distance(0)
                .airport(toronto)
                .hour(0)
                .weight(0)
                .date(LocalDateTime.now())
                .build();

        toronto.addRoute(hasRoute);
        toronto.addRoute(hasRoute2);
        frankfurt.addRoute(hasRoute3);
        baltimore.addRoute(hasRoute3);

        airportRepository.save(toronto);
        airportRepository.save(frankfurt);
        airportRepository.save(baltimore);
        return ResponseEntity.ok(new ResultDto("No neighborhoodOptional source found  !", null, HttpStatus.NO_CONTENT.value(), null));
    }

    @PostMapping("/addDirectionNeighborhood")
    public ResponseEntity<ResultDto> addDirectionNeighborhood(@RequestBody List<CreateHasRouteDto> createHasRouteDtos) {
        Set<Neighborhood> neighborhoods = new HashSet<>();
        Neighborhood updateNei = null;

        if(!createHasRouteDtos.isEmpty()) {
            for(CreateHasRouteDto request : createHasRouteDtos) {

                Optional<Neighborhood> source = this.neighborhoodService.getById(request.getSource());
                if (source.isEmpty()) {
                    return ResponseEntity.ok(new ResultDto("No neighborhoodOptional source found  !", null, HttpStatus.NO_CONTENT.value(), null));
                }

                Optional<Neighborhood> target = this.neighborhoodService.getById(request.getTarget());

                if (target.isEmpty()) {
                    return ResponseEntity.ok(new ResultDto("No neighborhoodOptional target found !", null, HttpStatus.NO_CONTENT.value(), null));
                }

                // Find if relation has_route exist between neighborhoods
                Neighborhood n =this.neighborhoodService.addRoute(neighborhoodService, source.get(), target.get(), request);
                neighborhoods.add(n);
            }
        }

//        Neighborhood updateNei = null;
//        for(HasRoute r : routes) {
//            source.get().getHasRoutes().add(r);
//            updateNei = this.neighborhoodService.create(source.get());
//        }

        if (neighborhoods.isEmpty()) {
            return ResponseEntity.badRequest().body(new ResultDto("Itinerary not added to Neighborhood source  !", null, HttpStatus.NO_CONTENT.value(), null));
        }

        return ResponseEntity.ok(new ResultDto("Itineraries added to Neighborhood source", neighborhoods, HttpStatus.OK.value(), null));
    }
}

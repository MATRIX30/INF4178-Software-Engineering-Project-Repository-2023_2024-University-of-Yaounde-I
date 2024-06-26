package com.actif.Neighborhood;

import com.actif.Neighborhood.dto.CreateHasRouteDto;
import com.actif.Neighborhood.relationshipProperties.HasRoute;
import com.actif.Neighborhood.relationshipProperties.LocatedAt;
import com.actif.POC.POC;
import com.actif.city.City;
import com.actif.delivery.Delivery;
import com.actif.delivery.relationshipProperties.DeposedAt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class NeighborhoodService {
    @Autowired
    NeighborhoodRepository neighborhoodRepository;

    public Neighborhood create(Neighborhood neighborhood){
        return this.neighborhoodRepository.save(neighborhood);
    }


    public Page<Neighborhood> getAll(int page, int limit){
        return this.neighborhoodRepository.findAll(PageRequest.of(page, limit));
    }


    public Optional<Neighborhood> getById(Long id){
        return this.neighborhoodRepository.findById(id);
    }

    public Neighborhood locatedAt(Neighborhood neighborhood, City city){
        LocatedAt locatedAt = LocatedAt.builder()
                .city(city)
                .date(LocalDateTime.now())
                .build();
        neighborhood.setLocatedAt(locatedAt);
        return this.neighborhoodRepository.save(neighborhood);
    }

    public Neighborhood findNeighborhoodRelation(Long source, Long target) {
        return this.neighborhoodRepository.findNeighborhoodRelation(source, target);
    }

    public Neighborhood addRoute(NeighborhoodService neighborhoodService, Neighborhood source, Neighborhood target, CreateHasRouteDto request) {
        Neighborhood relationOne = neighborhoodService.findNeighborhoodRelation(source.getId(), target.getId());
        if(relationOne == null) {
            HasRoute hasRoute = HasRoute.builder()
                    .distance(request.getDistance())
                    .neighborhood(target)
                    .hour(request.getHour())
                    .weight(request.getWeight())
                    .date(LocalDateTime.now())
                    .build();
            source.getHasRoutes().add(hasRoute);
        } else {
            System.out.println("Route relation with source and target");
        }

//        Neighborhood relationTwo = neighborhoodService.findNeighborhoodRelation(target.getId(), source.getId());
//        if(relationTwo == null) {
//            HasRoute hasRoute = HasRoute.builder()
//                    .distance(request.getDistance())
//                    .neighborhood(source)
//                    .hour(request.getHour())
//                    .weight(request.getWeight())
//                    .date(LocalDateTime.now())
//                    .build();
//            target.getHasRoutes().add(hasRoute);
//        } else {
//            System.out.println("Route relation with target and source");
//        }

//        Neighborhood updateNei = neighborhoodService.create(source);
//        neighborhoodService.create(target);

        return neighborhoodService.create(source);
    }

//    public Neighborhood hasRoute(Neighborhood source, Neighborhood target, String distance, String hour){
//        HasRoute hasRoute = HasRoute.builder()
//                .distance(distance)
//                .hour(hour)
//                .date(LocalDateTime.now())
//                .build();
//        hasRoute.getNeighborhood().add(target);
//        source.getHasRoute(hasRoute);
//        return this.neighborhoodRepository.save(source);
//    }
}

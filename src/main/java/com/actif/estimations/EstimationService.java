package com.actif.estimations;

import com.actif.delivery.DeliveryService;
import com.actif.estimations.dtos.CreateEstimationDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class EstimationService {
    @Autowired
    private EstimationRepository estimationRepository;

    @Autowired
    DeliveryService deliveryService;

    public Optional<Estimation> create (CreateEstimationDto createEstimationDto){
        Estimation estimation = Estimation.builder()
                .cost(deliveryService.getComputedPrice())
                .weight(createEstimationDto.getWeight())
                .height(createEstimationDto.getHeight())
                .width(createEstimationDto.getWidth())
                .townSource(createEstimationDto.getTownSource())
                .townIntented(createEstimationDto.getTownIntented())
                .isAccepted(false)
                .createdAt(LocalDateTime.now())
                .lastUpdatedOn(LocalDateTime.now())
                .build();
        return Optional.of(estimationRepository.save(estimation));
    }

    public Slice<Estimation> getAll(int page, int size){

        return this.estimationRepository.findAll(PageRequest.of(page, size));
    }

    public Optional<Estimation> getById(Long estimationId){

        return this.estimationRepository.findById(estimationId);
    }
}

package com.actif.estimations;

import com.actif.POC.POC;
import com.actif.ResultDto;
import com.actif.customer.Customer;
import com.actif.estimations.dtos.CreateEstimationDto;
import com.actif.item.Item;
import com.actif.item.dtos.CreateItemDtos;
import com.actif.packet.Packet;
import com.actif.packet.dtos.CreatePaketDto;
import com.google.zxing.WriterException;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Slice;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@Tag(name = "estimations")
@RequestMapping(value = "/api/estimations")
public class EstimationController {

    @Autowired
    private EstimationService estimationService;
    @PostMapping()
    public ResponseEntity<ResultDto> create(@RequestBody CreateEstimationDto request
    ) {

      Optional<Estimation> estimation = this.estimationService.create(request);
      if(estimation.isEmpty()){
          return ResponseEntity.badRequest().body(new ResultDto("Faled to create Estimation !", null, HttpStatus.BAD_REQUEST.value(), null));
      }
        return ResponseEntity.ok(new ResultDto("Created estimation !", estimation, HttpStatus.OK.value(), null));
    }




    @GetMapping
    public ResponseEntity<ResultDto> getAllPacket(
            @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "20") int size
    ) {


        Slice<Estimation> estimations = estimationService.getAll(page, size);

        if (estimations.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(new ResultDto("List of estimations !", estimations, HttpStatus.OK.value(), null));
    }

}

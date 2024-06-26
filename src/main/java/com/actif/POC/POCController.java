package com.actif.POC;

import com.actif.Neighborhood.Neighborhood;
import com.actif.Neighborhood.NeighborhoodService;
import com.actif.POC.dtos.CreatePocLocation;
import com.actif.POC.dtos.SearchPocQuery;
import com.actif.POC.relationshipProperties.HasLocated;
import com.actif.ResultDto;
import com.actif.delivery.Delivery;
import com.actif.delivery.DeliveryService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Slice;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@Tag(name = "pocs")
@RequestMapping(value = "/api/pocs")
public class POCController {
    @Autowired
    POCService pocService;
    @Autowired
    private DeliveryService deliveryService;

    @Autowired
    private NeighborhoodService neighborhoodService;

//    @PostMapping()
//    public ResultDto create(@RequestBody CreatePOCDto request
//    ) {
//
//
////        POC poc = POC.builder()
////                .phone(request.getPhone())
////                .region(request.getRegion())
////                .town(request.getTown())
////                .lng(request.getLng())
////                .lat(request.getLat())
////                .password(request.getPassword())
////
////                .createdAt(LocalDateTime.now())
////                .lastUpdatedOn(LocalDateTime.now())
////                .build();
//
//        POC poc = new  POC();
//        poc.setFirstName(request.getFirstname());
//        poc.setLastName(request.getLastname());
//        poc.setMail(request.getEmail());
//        poc.setPhone(request.getPhone());
//        //user.setRoles(rolesHashSet);
//        poc.setStatus(ENTITY_STATUS.CREATED);
//        poc.setVerificationCode(Utils.generatedRamdomCode(4));
//        //poc.setUserId(rstr);
//        poc.setPassword(passwordEncoder.encode(request.getPhone()));
//        poc.setRegion(request.getRegion());
//        poc.setTown(request.getTown());
//        poc.setLat(request.getLat());
//        poc.setLng(request.getLng());
//        poc.setCode(Utils.generatedRamdomCode(4));
//        poc.setCreatedAt(LocalDateTime.now());
//        poc.setLastUpdatedOn(LocalDateTime.now());
//
//        POC savedPOc = this.pocService.create(poc);
//        if (savedPOc == null) {
//            return new ResultDto("No savedPOc Created !", null, HttpStatus.NO_CONTENT.value(), null);
//        }
//        return new ResultDto("Created POC !", savedPOc, HttpStatus.OK.value(), null);
//    }

//    @PostMapping("/search")
//    public ResponseEntity<ResultDto> search(
//            @RequestBody SearchPocQuery searchPocQuery
//            ) {
//
//
//        List<POC> pocs = pocService.search(searchPocQuery);
//
//        if (pocs == null) {
//            return ResponseEntity.noContent().build();
//        }
//        return ResponseEntity.ok().body(new ResultDto("List of pocs !", pocs, HttpStatus.OK.value(), null));
//    }


    @PostMapping("/search")
    public ResponseEntity<ResultDto> search2(
            @RequestBody SearchPocQuery searchPocQuery
    ) {


        List<POC> pocs = pocService.search(searchPocQuery);

        if (pocs == null) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok().body(new ResultDto("List of pocs !", pocs, HttpStatus.OK.value(), null));
    }

    @GetMapping
    public ResponseEntity<ResultDto> getAllPacket(
            @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "20") int size
    ) {


        Page<POC> pocs = pocService.getAll(page, size);

        if (pocs == null) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(new ResultDto("List of pocs !", pocs, HttpStatus.OK.value(), null));
    }

    @GetMapping("/code/{code}")
    public ResponseEntity<ResultDto> getAllPacket(
            @PathVariable String code
    ) {


        POC poc = pocService.getByCode(code);

        if (poc == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(new ResultDto("POc found by code!", poc, HttpStatus.OK.value(), null));
    }

    @PostMapping("/{id}/locatedAt")
    public ResponseEntity<ResultDto> addPocLocation (@PathVariable Long id, CreatePocLocation createPocLocation) {
        Optional<POC> pocFound = pocService.getById(id);
        if(pocFound.isEmpty()) {
            return ResponseEntity.ok(new ResultDto("POC not found !", null, HttpStatus.NOT_FOUND.value(), null));
        }
        Optional<Neighborhood> neighborhoodFound = this.neighborhoodService.getById(createPocLocation.getNeighborhoodId());
        if(neighborhoodFound.isEmpty()) {
            return ResponseEntity.ok(new ResultDto("neighborhood not found !", null, HttpStatus.NOT_FOUND.value(), null));
        }
        HasLocated hasPoc = HasLocated.builder()
                .neighborhood(neighborhoodFound.get())
                .build();
        pocFound.get().setHasLocated(hasPoc);
        POC pocSaved = pocService.create(pocFound.get());
        return ResponseEntity.ok(new ResultDto("Location add to poc !", pocSaved, HttpStatus.OK.value(), null));
    }


    @GetMapping("/{id}/deliveries/in-stock")
    public ResponseEntity<ResultDto> getAllInStock(
            @PathVariable Long id,
            @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "20") int size

    ) {


        Optional<POC> poc = pocService.getById(id);

        if (poc.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Slice<Delivery> deliveries = this.deliveryService.getAllInStockByPoc(poc.get(), page, size);
        if (deliveries == null) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok().body(new ResultDto("List of in stock deliveries  !", deliveries, HttpStatus.OK.value(), null));
    }

    @GetMapping("/{id}/deliveries/in-process")
    public ResponseEntity<ResultDto> getAllInProcess(
            @PathVariable Long id,
            @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "20") int size

    ) {


        Optional<POC> poc = pocService.getById(id);

        if (poc.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Slice<Delivery> deliveries = this.deliveryService.getAllInProcessByPoc(poc.get(), page, size);
        if (deliveries == null) {
            return ResponseEntity.badRequest().body(new ResultDto("No delivery content !", null, HttpStatus.NO_CONTENT.value(), null));
        }
        return ResponseEntity.ok().body(new ResultDto("List of in process deliveries  !", deliveries, HttpStatus.OK.value(), null));
    }



    @GetMapping("/{id}/deliveries/terminated")
    public ResponseEntity<ResultDto> getAllTerminated(
            @PathVariable Long id,
            @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "20") int size

    ) {


        Optional<POC> poc = pocService.getById(id);

        if (poc.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Slice<Delivery> deliveries = this.deliveryService.getAlltermicedByPoc(poc.get(), page, size);
        if (deliveries.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok().body(new ResultDto("List of terminated deliveries  !", deliveries, HttpStatus.OK.value(), null));
    }
}





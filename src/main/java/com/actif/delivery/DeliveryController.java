package com.actif.delivery;


import com.actif.Neighborhood.Neighborhood;
import com.actif.Neighborhood.NeighborhoodService;
import com.actif.Neighborhood.repsonse.RouteResponse;
import com.actif.POC.POC;
import com.actif.POC.POCService;
import com.actif.QRcode.QRCodeGeneratorService;
import com.actif.ResultDto;
import com.actif.customer.Customer;
import com.actif.customer.CustomerService;
import com.actif.delivery.Dtos.*;
import com.actif.delivery.relationshipProperties.TakenBy;
import com.actif.item.ItemService;
import com.actif.livreur.Livreur;
import com.actif.livreur.LivreurService;
import com.actif.packet.Packet;
import com.actif.packet.PacketService;
import com.actif.packet.relationshipProperties.IgnoredBy;
import com.actif.packet.relationshipProperties.IncludedIn;
import com.actif.packet.relationshipProperties.SelectedBy;
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
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@Tag(name = "deliveries")
@RequestMapping(value = "/api/deliveries")
public class DeliveryController {

    @Autowired
    DeliveryService deliveryService;
    @Autowired
    LivreurService livreurService;

    @Autowired
    PacketService packetService;
    @Autowired
    POCService pocService;

    @Autowired
    CustomerService customerService;

    @Autowired
    ItemService itemService;

    @Autowired
    QRCodeGeneratorService qrCodeGeneratorService;

    @Autowired
    NeighborhoodService neighborhoodService;

    @PostMapping()
    public ResultDto create(@RequestBody CreateDelivyDto request
    ) {
        Optional<Packet> packet = packetService.getById(request.getPacketId());

        if (packet.isEmpty()) {
            return new ResultDto("No packet found  !", null, HttpStatus.NO_CONTENT.value(), null);
        }

        Optional<POC> pocIntended = pocService.getById(request.getPocIndentedId());
        Optional<POC> pocSource = pocService.getById(request.getPocSourceId());

        if (pocIntended.isEmpty()) {
            return new ResultDto("No poc indented found  !", null, HttpStatus.NO_CONTENT.value(), null);
        }

        if (pocSource.isEmpty()) {
            return new ResultDto("No poc source  !", null, HttpStatus.NO_CONTENT.value(), null);
        }

//Starting create packet
        Optional<POC> poc = this.pocService.getById(packet.get().getPoc().getId());
        if (poc.isEmpty()) {
            return new ResultDto("No saved packet poc  found !", null, HttpStatus.NO_CONTENT.value(), null);
        }

        Optional<Customer> customer = this.customerService.getById(packet.get().getCustomerSender().getId());
        if (customer.isEmpty()) {
            return new ResultDto("No customer found !", null, HttpStatus.NO_CONTENT.value(), null);
        }

        IncludedIn ins = IncludedIn.builder()
                .date(LocalDateTime.now())
                .packet(packet.get())
                .build();

      //  packet.get().setIncludedIn(ins);
        Delivery delivery = Delivery.builder()
                .cost(deliveryService.getComputedPrice())

                .pocIntended(pocIntended.get())
                .pocSource(pocSource.get())
                //  .packet(savedpacket)
                .includedIn(ins)
                .estimatedDeliveryDate(deliveryService.computeEstimatedDeliveryDate())
                .distance(deliveryService.getRoadDistance())
                .createdAt(LocalDateTime.now())
                .lastUpdatedOn(LocalDateTime.now())
                .status(DELIVERY_STATUS.AVAILABLE)
                .build();


        Delivery savedDelivery = this.deliveryService.create(delivery);
        if (savedDelivery == null) {
            return new ResultDto("No Delivery Created !", null, HttpStatus.NO_CONTENT.value(), null);
        }


//        List<IncludedIn> ins = packet.get().getIncludedIn();
//        ins.add(IncludedIn.builder()
//                .date(LocalDateTime.now())
//                .delivery(delivery)
//                .build());
//
//        packet.get().setIncludedIn(ins);
//
//
//        Packet savedpacket = this.packetService.create(packet.get());
//        if (savedpacket == null) {
//            return new ResultDto("No packet content !", null, HttpStatus.NO_CONTENT.value(), null);
//        }
        //  String LINK = API_URL + "packets/" + savedpacket.getId();
        String LINK = "packet-" + packet.get().getId();

        try {
            this.qrCodeGeneratorService.generateQRCodeImage(LINK, "QRCODE" + packet.get().getId() + ".png");
            packet.get().setQrCodePath("QRCODE" + packet.get().getId() + ".png");
            this.packetService.create(packet.get());
        } catch (WriterException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return new ResultDto("Created Delivery !", savedDelivery, HttpStatus.OK.value(), null);
    }


    @PostMapping("/with-new-packet")
    public ResultDto create(@RequestBody CreateDelivyWithNewPacketDto request
    ) {
        ResultDto resPacket = packetService.createWithItems(request.getPacket());

        if (resPacket.getStatus() != 200 && resPacket.getStatus() != 201) {
            return resPacket;
        }

        if (resPacket.getResult() == null) {
            return resPacket;
        }
        Packet packet = (Packet) resPacket.getResult();
        Optional<POC> pocIntended = pocService.getById(request.getPocIndentedId());
        Optional<POC> pocSource = pocService.getById(request.getPocSourceId());

        if (pocIntended.isEmpty()) {
            return new ResultDto("No poc indented found  !", null, HttpStatus.NO_CONTENT.value(), null);
        }

        if (pocSource.isEmpty()) {
            return new ResultDto("No poc source  !", null, HttpStatus.NO_CONTENT.value(), null);
        }

//Starting create packet
        Optional<POC> poc = this.pocService.getById(packet.getPoc().getId());
        if (poc.isEmpty()) {
            return new ResultDto("No saved packet poc  found !", null, HttpStatus.NO_CONTENT.value(), null);
        }

        Optional<Customer> customer = this.customerService.getById(packet.getCustomerSender().getId());
        if (customer.isEmpty()) {
            return new ResultDto("No customer found !", null, HttpStatus.NO_CONTENT.value(), null);
        }
        IncludedIn ins = IncludedIn.builder()
                .date(LocalDateTime.now())
                .packet(packet)
                .build();

        Delivery delivery = Delivery.builder()
                .cost(deliveryService.getComputedPrice())

                .pocIntended(pocIntended.get())
                .pocSource(pocSource.get())
                //  .packet(savedpacket)
                .includedIn(ins)

                .estimatedDeliveryDate(deliveryService.computeEstimatedDeliveryDate())
                .distance(deliveryService.getRoadDistance())
                .createdAt(LocalDateTime.now())
                .lastUpdatedOn(LocalDateTime.now())
                .status(DELIVERY_STATUS.AVAILABLE)
                .build();


        Delivery savedDelivery = this.deliveryService.create(delivery);
        if (savedDelivery == null) {
            return new ResultDto("No Delivery Created !", null, HttpStatus.NO_CONTENT.value(), null);
        }
        Packet savedpacket = this.packetService.create(packet);

        if (savedpacket == null) {
            return new ResultDto("No packet content !", null, HttpStatus.NO_CONTENT.value(), null);
        }
        //  String LINK = API_URL + "packets/" + savedpacket.getId();
        String LINK = "packet-" + savedpacket.getId();

        try {
            this.qrCodeGeneratorService.generateQRCodeImage(LINK, "QRCODE" + savedpacket.getId() + ".png");
            savedpacket.setQrCodePath("QRCODE" + savedpacket.getId() + ".png");
            this.packetService.create(savedpacket);
        } catch (WriterException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return new ResultDto("Created Delivery !", savedDelivery, HttpStatus.OK.value(), null);
    }


    @PostMapping("/with-new-packet-and-customers")
    public ResponseEntity<ResultDto> create(@RequestBody CreateDelivyWithNewPacketAndCustomerDto request
    ) {
        ResultDto resPacket = packetService.createWithItemsAndCustomers(request.getPacket());

        if (resPacket.getStatus() != 200 && resPacket.getStatus() != 201) {
            return ResponseEntity.badRequest().body(resPacket);
        }

        if (resPacket.getResult() == null) {
           // return resPacket;
            return ResponseEntity.badRequest().body(resPacket);

        }
        Packet packet = (Packet) resPacket.getResult();
        Optional<POC> pocIntended = pocService.getById(request.getPocIndentedId());
        Optional<POC> pocSource = pocService.getById(request.getPocSourceId());

        if (pocIntended.isEmpty()) {
            return ResponseEntity.badRequest().body(new ResultDto("No poc indented found  !", null, HttpStatus.NO_CONTENT.value(), null));
        }

        if (pocSource.isEmpty()) {
            return ResponseEntity.badRequest().body(new ResultDto("No poc source  !", null, HttpStatus.NO_CONTENT.value(), null));
        }

//Starting create packet
        Optional<POC> poc = this.pocService.getById(packet.getPoc().getId());
        if (poc.isEmpty()) {
            return ResponseEntity.badRequest().body(new ResultDto("No saved packet poc  found !", null, HttpStatus.NO_CONTENT.value(), null));
        }

        Optional<Customer> customer = this.customerService.getById(packet.getCustomerSender().getId());
        if (customer.isEmpty()) {
            return ResponseEntity.badRequest().body(new ResultDto("No customer found !", null, HttpStatus.NO_CONTENT.value(), null));
        }
        IncludedIn ins = IncludedIn.builder()
                .date(LocalDateTime.now())
                .packet(packet)
                .build();

        Delivery delivery = Delivery.builder()
                .cost(deliveryService.getComputedPrice())

                .pocIntended(pocIntended.get())
                .pocSource(pocSource.get())
                //  .packet(savedpacket)
                .includedIn(ins)

                .estimatedDeliveryDate(deliveryService.computeEstimatedDeliveryDate())
                .distance(deliveryService.getRoadDistance())
                .createdAt(LocalDateTime.now())
                .lastUpdatedOn(LocalDateTime.now())
                .status(DELIVERY_STATUS.AVAILABLE)
                .build();


        Delivery savedDelivery = this.deliveryService.create(delivery);
        if (savedDelivery == null) {
            return ResponseEntity.badRequest().body(new ResultDto("No Delivery Created !", null, HttpStatus.NO_CONTENT.value(), null));
        }
        Packet savedpacket = this.packetService.create(packet);

        if (savedpacket == null) {
            return ResponseEntity.badRequest().body( new ResultDto("No packet content !", null, HttpStatus.NO_CONTENT.value(), null));
        }
        //  String LINK = API_URL + "packets/" + savedpacket.getId();
        String LINK = "packet-" + savedpacket.getId();

        try {
            this.qrCodeGeneratorService.generateQRCodeImage(LINK, "QRCODE" + savedpacket.getId() + ".png");
            savedpacket.setQrCodePath("QRCODE" + savedpacket.getId() + ".png");
            this.packetService.create(savedpacket);
        } catch (WriterException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return ResponseEntity.ok(new ResultDto("Created Delivery !", savedDelivery, HttpStatus.OK.value(), null));
    }

    @GetMapping
    public ResponseEntity<ResultDto> getAllPacket(
            @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "20") int size
    ) {


        Page<Delivery> deliveries = deliveryService.getAll(page, size);

        if (deliveries == null) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(new ResultDto("List of deliveries !", deliveries, HttpStatus.OK.value(), null));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResultDto> getById(
            @PathVariable Long id
    ) {


        Optional<Delivery> delivery = deliveryService.getById(id);

        if (delivery.isEmpty()) {
            return ResponseEntity.notFound().build();
           // return new ResultDto("No delivery found  !", null, HttpStatus.NO_CONTENT.value(), null);
        }
        return ResponseEntity.ok(new ResultDto("delivery found by id!", delivery, HttpStatus.OK.value(), null));
    }


    @GetMapping("/{id}/packets/{packetId}")
    public ResponseEntity<ResultDto> getByDeliveryAndPacket(
            @PathVariable Long id,
            @PathVariable Long packetId
    ) {

        Optional<Delivery> delivery = deliveryService.getById(id);
        if (delivery.isEmpty()) {
            return ResponseEntity.badRequest().body(new ResultDto("No delivery found  !", null, HttpStatus.NOT_FOUND.value(), null));
        }
        Optional<Packet> packet = packetService.getById(packetId);

        if (packet.isEmpty()) {
            return ResponseEntity.badRequest().body(new ResultDto("No packet found  !", null, HttpStatus.NOT_FOUND.value(), null));
        }

        Optional<Delivery> deliveryFound = deliveryService.getByDeliveryAndPacket( delivery.get().getId(), packet.get().getId());

        if (deliveryFound.isEmpty()) {
            return ResponseEntity.badRequest().body(new ResultDto("No delivery by packet found  !", delivery, HttpStatus.BAD_REQUEST.value(), null));
        }
        return ResponseEntity.ok().body(new ResultDto("delivery found by packet!", delivery, HttpStatus.OK.value(), null));
    }

    @GetMapping("/packets/{id}")
    public ResponseEntity<ResultDto> getByPacket(
            @PathVariable Long id
    ) {

        Optional<Packet> packet = packetService.getById(id);

        if (packet.isEmpty()) {
            return ResponseEntity.badRequest().body(new ResultDto("No packet found  !", null, HttpStatus.NO_CONTENT.value(), null));
        }

        List<Delivery> delivery = deliveryService.getByPacket(packet.get().getId());

        if (delivery.isEmpty()) {
            return ResponseEntity.badRequest().body(new ResultDto("No delivery found  !", null, HttpStatus.NO_CONTENT.value(), null));
        }
        return ResponseEntity.ok(new ResultDto("delivery found by packet!", delivery, HttpStatus.OK.value(), null));
    }


    @PostMapping("/selected")
    public ResponseEntity<ResultDto> selectByLivreur(@RequestBody SelectDeliveryDtos request
    ) {
        Optional<Livreur> livreur = this.livreurService.getLivreurBy(request.getLivreurId());
        Optional<Delivery> delivery = this.deliveryService.getById(request.getDeliveryId());

        if (livreur.isEmpty()) {
            return ResponseEntity.badRequest().body(new ResultDto("Livreur Not found", null, HttpStatus.NOT_FOUND.value(), null));
        }
        if (delivery.isEmpty()) {
            return ResponseEntity.badRequest().body(new ResultDto("Delivery Not found", null, HttpStatus.NOT_FOUND.value(), null));
        }
        SelectedBy selectedBy = SelectedBy.builder().livreur(livreur.get()).date(LocalDateTime.now()).build();
        delivery.get().setSelectedBy(selectedBy);
        delivery.get().setStatus(DELIVERY_STATUS.SELECTED);
        Delivery savedDelivery = this.deliveryService.create(delivery.get());
        if (savedDelivery == null) {
            return ResponseEntity.badRequest().body(new ResultDto("No Delivery update !", null, HttpStatus.NO_CONTENT.value(), null));
        }
        return ResponseEntity.ok().body(new ResultDto(" Packet  Selected!", savedDelivery, HttpStatus.OK.value(), null));
    }

    @PostMapping("/ignored")
    public ResponseEntity<ResultDto> ignoredByLivreur(@RequestBody SelectDeliveryDtos request
    ) {
        Optional<Livreur> livreur = this.livreurService.getLivreurBy(request.getLivreurId());
        Optional<Delivery> delivery = this.deliveryService.getById(request.getDeliveryId());

        if (livreur.isEmpty()) {
            return ResponseEntity.badRequest().body(new ResultDto("Livreur Not found", null, HttpStatus.NOT_FOUND.value(), null));
        }
        if (delivery.isEmpty()) {
            return ResponseEntity.badRequest().body(new ResultDto("Delivery Not found", null, HttpStatus.NOT_FOUND.value(), null));
        }
        IgnoredBy inIgnoredBy = IgnoredBy.builder().livreur(livreur.get()).date(LocalDateTime.now()).build();
        delivery.get().setIgnoredBy(inIgnoredBy);
        Delivery savedDelivery = this.deliveryService.save(delivery.get());
        if (savedDelivery == null) {
            return ResponseEntity.badRequest().body(new ResultDto("No packet Ignored !", null, HttpStatus.NO_CONTENT.value(), null));
        }
        return ResponseEntity.ok(new ResultDto(" Delivery  Ignored!", savedDelivery, HttpStatus.OK.value(), null));
    }


    @PostMapping("/canceled")
    public ResponseEntity<ResultDto> canceledByLivreur(@RequestBody CancelDeliveryDto request
    ) {
        Optional<Livreur> livreur = this.livreurService.getLivreurBy(request.getLivreurId());
        Optional<Delivery> delivery = this.deliveryService.getById(request.getDeliveryId());

        if (livreur.isEmpty()) {
            return ResponseEntity.badRequest().body(new ResultDto("Livreur Not found", null, HttpStatus.NOT_FOUND.value(), null));
        }
        if (delivery.isEmpty()) {
            return ResponseEntity.badRequest().body(new ResultDto("Delivery Not found", null, HttpStatus.NOT_FOUND.value(), null));
        }

        try {
            this.deliveryService.cancelAcceptedDelivery(livreur.get(), delivery.get());
            return ResponseEntity.ok(new ResultDto(" Delivery  canceled!", null, HttpStatus.OK.value(), null));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(new ResultDto("No packet canceled !", null, HttpStatus.BAD_REQUEST.value(), null));

        }
//        if (res.isEmpty()) {
//        }
    }

    @PostMapping("/take")
    public ResponseEntity<ResultDto> create(@RequestBody TakeDto request
    ) {
        Optional<Livreur> livreur = livreurService.getLivreurBy(request.getLivreurId());

        if (livreur.isEmpty()) {
            return ResponseEntity.badRequest().body(new ResultDto("No livreur found  !", null, HttpStatus.NO_CONTENT.value(), null));
        }

        Optional<Delivery> delivery = deliveryService.getById(request.getDeliveryId());

        if (delivery.isEmpty()) {
            return ResponseEntity.badRequest().body(new ResultDto("No delivery found  !", null, HttpStatus.NO_CONTENT.value(), null));
        }

        TakenBy takenBy = TakenBy.builder().livreur(livreur.get()).date(LocalDateTime.now()).build();
        delivery.get().setTakenBy(takenBy);
        delivery.get().setStatus(DELIVERY_STATUS.TAKEN);

        Delivery savedDelivery = this.deliveryService.save(delivery.get());

        if (savedDelivery == null) {
            return ResponseEntity.badRequest().body(new ResultDto("No Delivery Deposed !", null, HttpStatus.NO_CONTENT.value(), null));
        }
        return ResponseEntity.ok(new ResultDto("Deposed Delivery !", savedDelivery, HttpStatus.OK.value(), null));
    }

    @PostMapping("/deposed")
    public ResponseEntity<ResultDto> create(@RequestBody DeposedDto request
    ) {
        Optional<POC> pocDeposed = pocService.getById(request.getPocDposedId());

        if (pocDeposed.isEmpty()) {
            return ResponseEntity.badRequest().body(new ResultDto("No pocDeposed found  !", null, HttpStatus.NO_CONTENT.value(), null));
        }

        Optional<Delivery> delivery = deliveryService.getById(request.getDeliveryId());

        if (delivery.isEmpty()) {
            return ResponseEntity.badRequest().body(new ResultDto("No delivery found  !", null, HttpStatus.NO_CONTENT.value(), null));
        }


        delivery.get().setStatus(DELIVERY_STATUS.DEPOSED);
        Delivery savedDelivery = this.deliveryService.deposedAt(delivery.get(), pocDeposed.get());
        if (savedDelivery == null) {
            return ResponseEntity.badRequest().body(new ResultDto("No Delivery Deposed !", null, HttpStatus.NO_CONTENT.value(), null));
        }

        return ResponseEntity.ok(new ResultDto("Deposed Delivery !", savedDelivery, HttpStatus.OK.value(), null));
    }

    @GetMapping("/available")
    public ResponseEntity<ResultDto> getAllAvailablePacket(
            @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "20") int size
    ) {

        Slice<Delivery> deliveries = deliveryService.getAllAvailableDeliveries(page, size);

        if (deliveries == null) {
            return ResponseEntity.badRequest().body(new ResultDto("No delivery content !", null, HttpStatus.NO_CONTENT.value(), null));
        }
        return ResponseEntity.ok().body(new ResultDto("List of available deliveries  !", deliveries, HttpStatus.OK.value(), null));
    }


    @GetMapping("/status/{status}")
    public ResponseEntity<ResultDto> getAllStats(
            @PathVariable Long status
    ) {

        Long count = deliveryService.countByStatus(status);

        if (count == null) {
            return ResponseEntity.badRequest().body(new ResultDto("No delivery count !", null, HttpStatus.NO_CONTENT.value(), null));
        }
        return ResponseEntity.ok().body(new ResultDto("count by status  ! " + status, count, HttpStatus.OK.value(), null));
    }

    @PostMapping("/findShortestPath")
    public ResponseEntity<ResultDto> findShortestPath(@RequestBody FindShortestPAthDto request) {
        Optional<Neighborhood> findSource = this.neighborhoodService.getById(request.getSourceId());
        Optional<Neighborhood> findTarget = this.neighborhoodService.getById(request.getTargetId());
        if(findSource.isEmpty() || findTarget.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResultDto("No source or target neighborhood found !", null, HttpStatus.NOT_FOUND.value(), null));
        }
        List<String> response = this.deliveryService.findShortestPath(findSource.get(), findTarget.get());
        return ResponseEntity.ok().body(new ResultDto("Shortest path !", response, HttpStatus.OK.value(), null));
    }

}

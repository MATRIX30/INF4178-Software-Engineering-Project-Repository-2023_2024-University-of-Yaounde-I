package com.actif.customer;


import com.actif.ResultDto;
import com.actif.customer.Dtos.CreateCustomerDto;
import com.actif.delivery.Delivery;
import com.actif.delivery.DeliveryService;
import com.actif.packet.Packet;
import com.actif.packet.PacketService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Slice;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Optional;

@CrossOrigin
@RestController
@Tag(name = "customers")
@RequestMapping(value = "/api/customers")
public class CustomerController {
@Autowired
CustomerService customerService;


    @Autowired
    PacketService packetService;

    @Autowired
    DeliveryService deliveryService;




//    @PostMapping
//    public ResultDto create(@RequestBody CreateCustomerDto request
//    ) {
//
//        Customer customer = Customer.builder()
//                .phone(request.getPhone())
//                .town(request.getTown())
//                .firstName(request.getFirstName())
//                .lastName(request.getLastName())
//
//                .createdAt(LocalDateTime.now())
//                .lastUpdatedOn(LocalDateTime.now())
//                .build();
//
//
//        Customer savedCustomer = this.customerService.create(customer);
//        if (savedCustomer == null) {
//            return new ResultDto("No customer created !", null, HttpStatus.NO_CONTENT.value(), null);
//        } else {
//
//        }
//        return new ResultDto("Created Customer  !", savedCustomer, HttpStatus.OK.value(), null);
//    }
    @GetMapping
    public ResponseEntity<ResultDto> getAll(
            @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "20") int size
    ) {

        Page<Customer> customers = customerService.getAll(page, size);

        if (customers == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(new ResultDto("List of customers !", customers, HttpStatus.OK.value(), null));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResultDto> getCustomerById(
            @PathVariable Long id

    ) {

        Optional<Customer> customer = customerService.getById(id);

        if (customer.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(new ResultDto(" customer details !", customer, HttpStatus.OK.value(), null));
    }

    @GetMapping("/{id}/packets")
    public ResponseEntity<ResultDto> getPacketsByCustomer(
            @PathVariable Long id,
            @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "20") int size

    ) {

        Optional<Customer> customer = customerService.getById(id);

        if (customer.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Slice<Packet> packets = this.packetService.getByAllPacketByCustomer(customer.get().getId(),page , size);
       if(packets.isEmpty()){
           return ResponseEntity.noContent().build();
       }
        return ResponseEntity.ok(new ResultDto(" List of packets all by customer !", packets, HttpStatus.OK.value(), null));
    }

    @GetMapping("/{id}/packets/sent")
    public ResponseEntity<ResultDto> getPacketsSentByCustomer(
            @PathVariable Long id,
            @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "20") int size

    ) {

        Optional<Customer> customer = customerService.getById(id);

        if (customer.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Slice<Packet> packets = this.packetService.getAllSentByCustomer(customer.get().getId(),page , size);
        if(packets.isEmpty()){
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(new ResultDto(" List of packets sent by customer !", packets, HttpStatus.OK.value(), null));
    }


    @GetMapping("/{id}/packets/arrived")
    public ResponseEntity<ResultDto> getPacketsArrivedByCustomer(
            @PathVariable Long id,
            @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "20") int size

    ) {

        Optional<Customer> customer = customerService.getById(id);

        if (customer.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Slice<Packet> packets = this.packetService.getAllArrivedByCustomer(customer.get().getId(),page , size);
        if(packets.isEmpty()){
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(new ResultDto(" List of packets arrived by customer !", packets, HttpStatus.OK.value(), null));
    }


    @GetMapping("/{id}/packets/{packetId}/deliveries")
    public ResponseEntity<ResultDto> getAllDeliveriesByPacket(
            @PathVariable Long id,
            @PathVariable Long packetId,
            @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "20") int size

    ) {

        Optional<Customer> customer = customerService.getById(id);

        if (customer.isEmpty()) {
            return ResponseEntity.badRequest().body(new ResultDto(" Customer not found !", null, HttpStatus.OK.value(), Collections.singletonList("Customer not found")));
        }

        Optional<Packet> packet = packetService.getById(packetId);

        if (packet.isEmpty()) {
            return ResponseEntity.badRequest().body(new ResultDto(" packet not found !", null, HttpStatus.OK.value(), Collections.singletonList("Packet not found")));
        }
   //     Slice<Delivery> deliveries = this.deliveryService.getAllByPacket(packet.get(), page , size);
        Slice<Delivery> deliveries = this.deliveryService.getAllByCustomerAndPacket(customer.get().getId(), packet.get().getId(), page , size);
        if(deliveries.isEmpty()){
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(new ResultDto(" List delivery by packet and customer !", deliveries, HttpStatus.OK.value(), null));
    }

}

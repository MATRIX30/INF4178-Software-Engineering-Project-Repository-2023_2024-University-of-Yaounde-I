package com.actif.packet;


import com.actif.POC.POC;
import com.actif.POC.POCService;
import com.actif.QRcode.QRCodeGeneratorService;
import com.actif.ResultDto;
import com.actif.customer.Customer;
import com.actif.customer.CustomerService;
import com.actif.item.Item;
import com.actif.item.ItemService;
import com.actif.item.dtos.CreateItemDtos;
import com.actif.livreur.LivreurService;
import com.actif.packet.dtos.CreatePaketDto;
import com.google.zxing.WriterException;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
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
@Tag(name = "packets")
@RequestMapping(value = "/api/packets")
public class PacketController {
    @Autowired
    PacketService packetService;

    @Autowired
    LivreurService livreurService;

    @Autowired
    ItemService itemService;

    @Autowired
    POCService pocService;

    @Autowired
    CustomerService customerService;

    @Autowired
    QRCodeGeneratorService qrCodeGeneratorService;

    @Value("${application.api.url}")
    private String API_URL;





    @PostMapping()
    public ResultDto create(@RequestBody CreatePaketDto request
    ) {

        Optional<POC> poc = this.pocService.getById(request.getPocId());
        if (poc.isEmpty()) {
            return new ResultDto("No poc found !", null, HttpStatus.NO_CONTENT.value(), null);
        }

        Optional<Customer> customer = this.customerService.getById(request.getCustomerId());
        if (customer.isEmpty()) {
            return new ResultDto("No customer found !", null, HttpStatus.NO_CONTENT.value(), null);
        }
        List<Item>  toCreateItems = new ArrayList<>();
        for (CreateItemDtos item :  request.getItems()){
            toCreateItems.add(Item.builder()
                            .type(item.getType())
                            .height(item.getHeight())
                            .width(item.getWidth())
                            .weight(item.getWeight())
                            .name(item.getName())

                    .createdAt(LocalDateTime.now())
                    .lastUpdatedOn(LocalDateTime.now())
                    .build());

        }

        List<Item> createdItems = this.itemService.createAll(toCreateItems);
        if (createdItems.isEmpty()) {
            return new ResultDto("No items created !", null, HttpStatus.NO_CONTENT.value(), null);
        }

        Packet packet = Packet.builder()
                .value(request.getPrice())
                .height(request.getHeight())
                .width(request.getWidth())
                .items(createdItems)
                .customerSender(customer.get())
                .poc(poc.get())
                .description(request.getDescription())
                .createdAt(LocalDateTime.now())
                .lastUpdatedOn(LocalDateTime.now())
                .build();


        Packet savedpacket = this.packetService.create(packet);
        if (savedpacket == null) {
            return new ResultDto("No packet content !", null, HttpStatus.NO_CONTENT.value(), null);
        }
      //  String LINK = API_URL + "packets/" + savedpacket.getId();
        String LINK = "packet-"+savedpacket.getId();

        try {
            this.qrCodeGeneratorService.generateQRCodeImage(LINK, "QRCODE" + savedpacket.getId() + ".png");
        // byte[] qrCodeData= this.qrCodeGeneratorService.getQRCodeImage(LINK);
         //savedpacket.setQrCodeData(qrCodeData);
            savedpacket.setQrCodePath("QRCODE" + savedpacket.getId() + ".png");
            this.packetService.create(savedpacket);
        } catch (WriterException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return new ResultDto("Created Packet !", savedpacket, HttpStatus.OK.value(), null);
    }

    @GetMapping
    public ResultDto getAllPacket(
            @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "20") int size
    ) {


        Page<Packet> packets = packetService.getAllPackets(page, size);

        if (packets == null) {
            return new ResultDto("No packet content !", null, HttpStatus.NO_CONTENT.value(), null);
        } else {

        }
        return new ResultDto("List of packets man !", packets, HttpStatus.OK.value(), null);
    }


    @GetMapping("{id}")
    public ResponseEntity<ResultDto> getAllPacketDetail(
            @PathVariable() Long id
    ) {

        Optional<Packet> packet = packetService.getById(id);

        if (packet.isEmpty()) {
            return  ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(new ResultDto("Packet found !", packet, HttpStatus.OK.value(), null));
    }





}

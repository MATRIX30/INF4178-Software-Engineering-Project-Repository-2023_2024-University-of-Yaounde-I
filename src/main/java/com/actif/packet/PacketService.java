package com.actif.packet;

import com.actif.POC.POC;
import com.actif.POC.POCService;
import com.actif.QRcode.QRCodeGeneratorService;
import com.actif.ResultDto;
import com.actif.customer.Customer;
import com.actif.customer.CustomerService;
import com.actif.estimations.Estimation;
import com.actif.estimations.EstimationService;
import com.actif.item.Item;
import com.actif.item.ItemService;
import com.actif.item.dtos.CreateItemDtos;
import com.actif.packet.dtos.CreatePaketDto;
import com.actif.packet.dtos.CreatePaketWithCustomerDto;
import com.actif.utils.Utils;
import com.google.zxing.WriterException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PacketService {

    @Autowired
    PacketRepository packetRepository;

    @Autowired
    POCService pocService;
    @Autowired
    ItemService itemService;

    @Autowired
    QRCodeGeneratorService qrCodeGeneratorService;

    @Autowired
    CustomerService customerService;

    @Autowired
    EstimationService estimationService;

    public Page<Packet> getAllPackets(int page, int size) {
        return this.packetRepository.findAll(PageRequest.of(page, size));
    }


    public Packet create(Packet packet) {
        packet.setCode(Utils.generateRandomString());
        return this.packetRepository.save(packet);
    }

    public ResultDto createWithItems(CreatePaketDto request) {
        Optional<POC> poc = this.pocService.getById(request.getPocId());
        if (poc.isEmpty()) {
            return new ResultDto("No poc found !", null, HttpStatus.NO_CONTENT.value(), null);
        }

        Optional<Customer> customer = this.customerService.getById(request.getCustomerId());
        if (customer.isEmpty()) {
            return new ResultDto("No customer found !", null, HttpStatus.NO_CONTENT.value(), null);
        }
        List<Item> toCreateItems = new ArrayList<>();
        for (CreateItemDtos item : request.getItems()) {
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


        Packet savedpacket = this.packetRepository.save(packet);
        if (savedpacket == null) {
            return new ResultDto("No packet content !", null, HttpStatus.NO_CONTENT.value(), null);
        }
        //  String LINK = API_URL + "packets/" + savedpacket.getId();
        String LINK = "packet-" + savedpacket.getId();

        try {
            this.qrCodeGeneratorService.generateQRCodeImage(LINK, "QRCODE" + savedpacket.getId() + ".png");
            savedpacket.setQrCodePath("QRCODE" + savedpacket.getId() + ".png");
            this.packetRepository.save(savedpacket);
        } catch (WriterException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return new ResultDto("Created Packet !", savedpacket, HttpStatus.OK.value(), null);

    }

    public ResultDto createWithItemsAndCustomers(CreatePaketWithCustomerDto request) {
        Optional<POC> poc = this.pocService.getById(request.getPocId());
        if (poc.isEmpty()) {
            return new ResultDto("No poc found !", null, HttpStatus.NO_CONTENT.value(), null);
        }
        Customer createdCustomerSender = null;
        Customer createdCustomerReceiver = null;
        Optional<Customer> customerSendedFound = this.customerService.getByPhone(request.getCustomerSender().getPhone());
        Customer cusSender;
        if (customerSendedFound.isPresent()) {
            System.out.println("customer sender already exist");
            createdCustomerSender = customerSendedFound.get();
        } else {
//            cusSender = Customer.builder()
//                    .phone(request.getCustomerSender().getPhone())
//                    .town(request.getCustomerSender().getTown())
//                    .district(request.getCustomerSender().getDistrict())
//                    .firstName(request.getCustomerSender().getFirstName())
//                    .lastName(request.getCustomerSender().getLastName())
//                    .build();
            createdCustomerSender = this.customerService.create(request.getCustomerSender());
            if (createdCustomerSender == null) {
                return new ResultDto("No customerSender created !", null, HttpStatus.NO_CONTENT.value(), null);
            }
        }
        Optional<Customer> customerReceiverFound = this.customerService.getByPhone(request.getCustomerSender().getPhone());
        Customer cusReceiver;

        if (customerReceiverFound.isPresent()) {
            System.out.println("customer receiver already exist");

            createdCustomerReceiver = customerReceiverFound.get();
        } else {
//            cusReceiver = Customer.builder()
//                    .phone(request.getCustomerReceiver().getPhone())
//                    .town(request.getCustomerReceiver().getTown())
//                    .district(request.getCustomerReceiver().getDistrict())
//                    .firstName(request.getCustomerReceiver().getFirstName())
//                    .lastName(request.getCustomerReceiver().getLastName())
//                    .build();
            createdCustomerReceiver = this.customerService.create(request.getCustomerReceiver());
            if (createdCustomerReceiver == null) {
                return new ResultDto("No customerReceiver created !", null, HttpStatus.NO_CONTENT.value(), null);
            }
        }


        List<Item> toCreateItems = new ArrayList<>();
        for (CreateItemDtos item : request.getItems()) {
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

        Optional<Estimation> estimation = Optional.empty();
        if(request.getEstimationId()!=null){

           estimation = this.estimationService.getById(request.getEstimationId());
            estimation.ifPresent(value -> value.setAccepted(true));
        }

        Packet packet = Packet.builder()
                .value(request.getValue())
                .height(request.getHeight())
                .width(request.getWidth())
                .items(createdItems)
                .customerSender(createdCustomerSender)
                .customerReceiver(createdCustomerReceiver)
                .poc(poc.get())
                .description(request.getDescription())
                .createdAt(LocalDateTime.now())
                .lastUpdatedOn(LocalDateTime.now())
                .estimation(estimation.orElse(null))
                .build();


        Packet savedpacket = this.packetRepository.save(packet);
        if (savedpacket == null) {
            return new ResultDto("No packet content !", null, HttpStatus.NO_CONTENT.value(), null);
        }
        //  String LINK = API_URL + "packets/" + savedpacket.getId();
        String LINK = "packet-" + savedpacket.getId();

        try {
            this.qrCodeGeneratorService.generateQRCodeImage(LINK, "QRCODE" + savedpacket.getId() + ".png");
            savedpacket.setQrCodePath("QRCODE" + savedpacket.getId() + ".png");
            this.packetRepository.save(savedpacket);
        } catch (WriterException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return new ResultDto("Created Packet !", savedpacket, HttpStatus.OK.value(), null);

    }

    public Optional<Packet> getById(Long id) {
        return this.packetRepository.findById(id);
    }

    public Slice<Packet> getByAllPacketByCustomer(Long customerSenderId, int page, int limit) {
        return this.packetRepository.findAllByCustomerSenderId(customerSenderId, PageRequest.of(page, limit));
    }

    public Slice<Packet> getAllSentByCustomer(Long customerId, int page , int size) {

        return this.packetRepository.findAllSendByCustomer( customerId, PageRequest.of(page, size));
    }

    public Slice<Packet> getAllArrivedByCustomer(Long customerId, int page , int size) {

        return this.packetRepository.findAllArrivedByCustomer( customerId, PageRequest.of(page, size));
    }



    //    public Iterable<Packet> getAllByLivreur(Livreur livreur, int page, int size) {
//        return this.packetRepository.findBySelectedByLivreur(livreur, PageRequest.of(page, size));
//    }


}

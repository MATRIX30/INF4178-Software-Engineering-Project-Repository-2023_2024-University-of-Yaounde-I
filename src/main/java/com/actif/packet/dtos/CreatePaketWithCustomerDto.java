package com.actif.packet.dtos;

import com.actif.customer.Dtos.CreateCustomerDto;
import com.actif.item.dtos.CreateItemDtos;
import lombok.Getter;

import java.util.List;

@Getter
public class CreatePaketWithCustomerDto {

    private Long value;
    private CreateCustomerDto customerSender;
    private CreateCustomerDto customerReceiver;
    private Long pocId;
    private Long height;
    private Long width;
    private String description;
    private List<CreateItemDtos> items;

    private Long estimationId;



}

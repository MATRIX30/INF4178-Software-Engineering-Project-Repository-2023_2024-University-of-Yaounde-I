package com.actif.packet.dtos;

import com.actif.item.Item;
import com.actif.item.dtos.CreateItemDtos;
import lombok.Getter;

import java.util.List;

@Getter
public class CreatePaketDto {

    private Long price;
    private Long customerId;
    private Long pocId;
    private Long height;
    private Long width;
    private String description;
    private List<CreateItemDtos> items;


}

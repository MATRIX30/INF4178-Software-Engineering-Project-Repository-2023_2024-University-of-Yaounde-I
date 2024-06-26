package com.actif.delivery.Dtos;

import com.actif.packet.dtos.CreatePaketDto;
import com.actif.packet.dtos.CreatePaketWithCustomerDto;
import lombok.Getter;

@Getter
public class CreateDelivyWithNewPacketAndCustomerDto {
    //private  Long cost;
    //private Long packetId;
    private CreatePaketWithCustomerDto packet;
    private Long pocSourceId;
    private Long pocIndentedId;
}

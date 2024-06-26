package com.actif.delivery.Dtos;

import com.actif.packet.dtos.CreatePaketDto;
import lombok.Getter;

@Getter
public class CreateDelivyWithNewPacketDto {
    //private  Long cost;
    //private Long packetId;
    private CreatePaketDto packet;
    private Long pocSourceId;
    private Long pocIndentedId;
}

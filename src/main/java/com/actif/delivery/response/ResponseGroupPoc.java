package com.actif.delivery.response;

import com.actif.POC.POC;
import lombok.Data;

@Data
public class ResponseGroupPoc {

    private POC poc;
    private Long numberOfDeliveries;
}

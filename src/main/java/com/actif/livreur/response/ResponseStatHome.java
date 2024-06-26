package com.actif.livreur.response;


import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ResponseStatHome {
    private Long countAvailable;
    private Long countSelected;
    private Long countTaken;
    private Long countDeposed;

}

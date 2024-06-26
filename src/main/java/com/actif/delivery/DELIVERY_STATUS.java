package com.actif.delivery;

import lombok.Getter;

@Getter
public  abstract class DELIVERY_STATUS {

    public static Long  AVAILABLE  = 0L;
    public static Long  SELECTED  = 1L;
    public static Long  TAKEN  = 2L;
    public static Long  DEPOSED  = 3L;



}

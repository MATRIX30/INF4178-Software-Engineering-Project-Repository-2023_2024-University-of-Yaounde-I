package com.actif;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class Response {
    private String message;
    private Object data;
}

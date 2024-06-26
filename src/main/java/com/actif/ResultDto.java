package com.actif;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.ResponseEntity;

import java.util.List;

@Data
public class ResultDto  {
    private String message;

    private Object result;

    private int status;

    private List<String> errors;


    public ResultDto(String message, Object result, int status, List<String> errors) {
        this.message = message;
        this.result = result;
        this.status = status;
        this.errors = errors;
    }
}

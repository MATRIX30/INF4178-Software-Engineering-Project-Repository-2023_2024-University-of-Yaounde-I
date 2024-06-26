package com.actif.config.auth.payload.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class updateSettingRequest {

    @NotBlank
    private Boolean showBadge;

    @NotBlank
    private Boolean autoSync;
}

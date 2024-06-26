package com.actif.config.auth.payload.request;


import com.actif.config.auth.authModels.User;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {

    @JsonProperty("access_token")
    private String accessToken;
    @JsonProperty("refresh_token")
    private String refreshToken;

    // private User user;
    private User user;

    private String message;

    private Long status;

    private long jwtExpiration;

    private long refreshExpiration;


}
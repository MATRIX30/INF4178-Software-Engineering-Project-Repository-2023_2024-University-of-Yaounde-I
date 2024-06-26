package com.actif.config.auth;


import com.google.common.net.HttpHeaders;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

import java.util.ArrayList;
import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableMethodSecurity
public class SecurityConfiguration {

    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        List<String> allowedOrigins = new ArrayList<>();
      //  allowedOrigins.add("http://localhost:3000");
        allowedOrigins.add("http://192.168.1.2");
        allowedOrigins.add("*");
enum ROLES {
    ADMIN,
    AGENT,
    DGSN,
    MINREX

        }

        http
                .cors(c -> c.configurationSource(request -> {
                    CorsConfiguration cors = new CorsConfiguration();
                  //  cors.setAllowedOrigins(List.of("*"));
                    cors.setAllowedOrigins(allowedOrigins);
                    cors.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                    cors.setAllowedHeaders(List.of("*"));
                    cors.setExposedHeaders(List.of(HttpHeaders.AUTHORIZATION, HttpHeaders.CONTENT_TYPE));
                    return cors;
                }))

                .authorizeHttpRequests()
                .requestMatchers("/api/auth/**")
                .permitAll()
                //.requestMatchers("/api/public-holidays").hasAnyRole(Role.ADMIN_CENTRE.name(), Role.USER.name())
                //.requestMatchers(GET, "/api/users/**").hasAnyAuthority(ADMIN_READ.getPermission())
              //  .requestMatchers( "/api/**").hasRole(String.valueOf(ROLES.ADMIN))
             //   .requestMatchers( "/api/enterprises/**").hasRole(String.valueOf(ROLES.ADMIN))
                .anyRequest()
                .permitAll()

                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()

                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
               .httpBasic().and()
               .csrf().disable()

        ;

        return http.build();
    }
}
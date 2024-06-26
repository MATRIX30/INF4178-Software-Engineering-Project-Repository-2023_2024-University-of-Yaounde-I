package com.actif.config.auth.authModels;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.springframework.data.neo4j.core.schema.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.beans.Transient;
import java.util.*;

@Data
//@Builder
@Node
//@AllArgsConstructor
//@NoArgsConstructor
public class User implements UserDetails {
    @Id
    @GeneratedValue
    private Long id;


    //@Column(nullable = false, unique = true)
    private String userId;
    //@Size(min=2,max=25)
    private String firstName;
    //@Size(min=2,max=25)
    private String lastName;

    //@Column(columnDefinition = "integer default 0")
    private Long status;

    @JsonIgnore
    //@Column(nullable = false, unique = true)
    private String verificationCode;

    //@Column(nullable = false, unique = true)
    @Size(min=6,max=17)
    private String phone;
    // @Email
   // @Column(nullable = false, unique = true)
    private String mail;


    //@Size(min=8,max=17)
    //@Column(nullable = false)
    private String password;

    private boolean isPhoneVerified;

    @Relationship("HAVE")
    AccountSetting accountSetting;

//    @Relationship(type = "HAS_ROLES" )
//    private List<Role> roles = new ArrayList<>();

//    @Relationship(type = "AUTHED" )
//    private Livreur livreur;

//    @Relationship(type = "AUTHED" )
//    private POC poc;



    private List<String> labels ;




    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
//        List<SimpleGrantedAuthority> auths = new ArrayList<>();
//        if (this.roles != null) {
//
//            for (Role role :
//                    this.roles) {
//
//                List<SimpleGrantedAuthority> res = role.getAuthorities();
//                auths.addAll(res);
//            }
//        }
//
//        return auths;

        return new ArrayList<>();
    }


    @Override
    public String getUsername() {
        return phone;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}

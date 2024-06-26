package com.actif.livreur;



import java.time.LocalDateTime;

import com.actif.config.auth.authModels.User;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.GeneratedValue;




//@Builder

@EqualsAndHashCode(callSuper = true)
//@Builder
@Getter
@Setter
@Node("Livreur")
public class Livreur extends User {

  //  @Id @GeneratedValue private Long id;

//    private String firstName;
//    private String lastName;
 //   private String phone;
    private String code;
    private String region;
    private String town;
    private String lat;
    private String lng;

   // private String password;

//    @Relationship(type = "AUTH" )
//    public Account account;

    @CreatedDate
    private LocalDateTime createdAt;
    @LastModifiedDate
    private LocalDateTime lastUpdatedOn;

//    public Livreur(String codeL, String town, String region, String lat, String lng,Long id, String userId, String firstName, String lastName, Long status, String code, @Size(min = 6, max = 17) String phone, String mail, String password, boolean isPhoneVerified, List<Role> roles, List<String> labels) {
//        super(id, userId, firstName, lastName, status, code, phone, mail, password, isPhoneVerified, roles, labels);
//        this.code=code;
//        this.town=town;
//        this.region=region;
//        this.lat=lat;
//        this.lng=lng;
//    }


//    public Livreur(Long id, String userId, String firstName, String lastName, Long status, String code, @Size(min = 6, max = 17) String phone, String mail, String password, boolean isPhoneVerified, List<Role> roles, List<String> labels) {
//        super(id, userId, firstName, lastName, status, code, phone, mail, password, isPhoneVerified, roles, labels);
//    }
}
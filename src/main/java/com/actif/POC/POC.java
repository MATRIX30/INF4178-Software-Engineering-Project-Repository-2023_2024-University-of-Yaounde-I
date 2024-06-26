package com.actif.POC;

import com.actif.POC.relationshipProperties.HasLocated;
import com.actif.config.auth.authModels.User;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;

import java.time.LocalDateTime;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Getter
@Setter
//@Builder
@Node("POC")
public class POC extends  User {
//    @Id
//    @GeneratedValue
//    private Long id;

    private String code;

    private List<String> pocPhones;
    private String region;
    private String town;
    private String district;
    private String lat;
    private String lng;

//    @Relationship(type = "AUTH" )
//    public User account;

    @Relationship(type = "HAS_LOCATED", direction = Relationship.Direction.OUTGOING)
    public HasLocated hasLocated;

    @CreatedDate
    private LocalDateTime createdAt;
    @LastModifiedDate
    private LocalDateTime lastUpdatedOn;

}

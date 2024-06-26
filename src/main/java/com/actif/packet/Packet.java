package com.actif.packet;

import com.actif.POC.POC;
import com.actif.customer.Customer;
import com.actif.delivery.relationshipProperties.RemovedBy;
import com.actif.estimations.Estimation;
import com.actif.item.Item;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@Node
public class Packet {
    @Id
    @GeneratedValue
    private Long id;

   // private byte[] qrCodeData;

    private Long value;
    private Long height;
    private Long width;

    private String code;
    private String description;
    private String qrCodePath;



    @Relationship(type = "CREATED_BY" )
    public POC poc;

    @Relationship(type = "OWNED_BY" )
    public Customer customerSender;

    @Relationship(type = "SENT_FOR" )
    public Customer customerReceiver;

    @Relationship(type = "REMOVED_BY")
    public RemovedBy removedBy;

    @Relationship(type = "GOT" )
    public List<Item> items ;

    @Relationship("ESTIMATED_AT")
    public Estimation estimation;

//    @Relationship(type = "INCLUDED_IN" )
//    public List<IncludedIn> includedIn ;


    @CreatedDate
    private LocalDateTime createdAt;
    @LastModifiedDate
    private LocalDateTime lastUpdatedOn;

}

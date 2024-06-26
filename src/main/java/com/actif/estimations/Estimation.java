package com.actif.estimations;

import com.actif.packet.Packet;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;

import java.time.LocalDateTime;

@Data
@Builder
@Node
public class Estimation {

    @Id
    @GeneratedValue
    private Long id;

    private Long cost;
    private Long weight;
    private Long height;
    private Long width;
    private String townSource;
    private String townIntented;
    private boolean isAccepted;



    @CreatedDate
    private LocalDateTime createdAt;
    @LastModifiedDate
    private LocalDateTime lastUpdatedOn;

}

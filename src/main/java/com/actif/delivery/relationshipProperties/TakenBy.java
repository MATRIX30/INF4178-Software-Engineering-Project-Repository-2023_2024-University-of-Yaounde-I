package com.actif.delivery.relationshipProperties;

import com.actif.livreur.Livreur;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.neo4j.core.schema.RelationshipId;
import org.springframework.data.neo4j.core.schema.RelationshipProperties;
import org.springframework.data.neo4j.core.schema.TargetNode;

import java.time.LocalDateTime;


//https://docs.spring.io/spring-data/neo4j/reference/appendix/custom-queries.html
@Data
@Builder
@RelationshipProperties
 public  class TakenBy {

    @RelationshipId
    private Long id;


    @TargetNode
    private Livreur livreur;

    private  LocalDateTime date;

    // Your properties
}

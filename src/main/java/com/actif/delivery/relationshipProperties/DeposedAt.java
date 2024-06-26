package com.actif.delivery.relationshipProperties;

import com.actif.POC.POC;
import com.actif.livreur.Livreur;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.neo4j.core.schema.RelationshipId;
import org.springframework.data.neo4j.core.schema.RelationshipProperties;
import org.springframework.data.neo4j.core.schema.TargetNode;

import java.time.LocalDateTime;



@Data
@Builder
@RelationshipProperties
public  class DeposedAt {

    @RelationshipId
    private Long id;


    @TargetNode
    private POC poc;

    private LocalDateTime date;

    // Your properties
}
package com.actif.packet.relationshipProperties;

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
public class IgnoredBy {

    @RelationshipId
    private Long id;


    @TargetNode
    private Livreur livreur;

    private LocalDateTime date;

}

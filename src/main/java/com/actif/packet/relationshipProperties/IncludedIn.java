package com.actif.packet.relationshipProperties;

import com.actif.delivery.Delivery;
import com.actif.livreur.Livreur;
import com.actif.packet.Packet;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.neo4j.core.schema.RelationshipId;
import org.springframework.data.neo4j.core.schema.RelationshipProperties;
import org.springframework.data.neo4j.core.schema.TargetNode;

import java.time.LocalDateTime;

@Data
@Builder
@RelationshipProperties
public class IncludedIn {

    @RelationshipId
    private Long id;

    @TargetNode
    private Packet packet;

    private LocalDateTime date;

}

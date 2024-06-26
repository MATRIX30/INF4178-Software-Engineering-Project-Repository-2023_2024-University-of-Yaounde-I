package com.actif.Neighborhood.relationshipProperties;

import com.actif.Neighborhood.Neighborhood;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.neo4j.core.schema.RelationshipId;
import org.springframework.data.neo4j.core.schema.RelationshipProperties;
import org.springframework.data.neo4j.core.schema.TargetNode;

import java.time.LocalDateTime;

@Data
@Builder
@RelationshipProperties
public class HasRoute {
    @RelationshipId
    private Long id;

    private int hour;
    private String traffic;
    private double distance;
    private String road;

    private double weight;

    @TargetNode
    private Neighborhood neighborhood;

    private LocalDateTime date;
}

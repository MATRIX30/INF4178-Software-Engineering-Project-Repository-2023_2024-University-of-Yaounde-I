package com.actif.Neighborhood.relationshipProperties;

import com.actif.city.City;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.neo4j.core.schema.RelationshipId;
import org.springframework.data.neo4j.core.schema.RelationshipProperties;
import org.springframework.data.neo4j.core.schema.TargetNode;

import java.time.LocalDateTime;

@Data
@Builder
@RelationshipProperties
public class LocatedAt {
    @RelationshipId
    private Long id;


    @TargetNode
    private City city;

    private LocalDateTime date;

}

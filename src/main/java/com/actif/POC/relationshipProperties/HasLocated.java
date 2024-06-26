package com.actif.POC.relationshipProperties;

import com.actif.Neighborhood.Neighborhood;
import com.actif.POC.POC;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.neo4j.core.schema.RelationshipId;
import org.springframework.data.neo4j.core.schema.RelationshipProperties;
import org.springframework.data.neo4j.core.schema.TargetNode;

@Data
@Builder
@RelationshipProperties
public class HasLocated {
    @RelationshipId
    private Long id;

    @TargetNode
    private Neighborhood neighborhood;
}

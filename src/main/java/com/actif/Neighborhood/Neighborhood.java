package com.actif.Neighborhood;

import com.actif.POC.relationshipProperties.HasLocated;
import com.actif.Neighborhood.relationshipProperties.HasRoute;
import com.actif.Neighborhood.relationshipProperties.LocatedAt;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Builder
@Node("Neighborhood")
public class Neighborhood {
    @Id
    @GeneratedValue
    private Long id;

    private String name;
    private String lat;
    private String lng;

    @Relationship(type = "LOCATED_AT", direction = Relationship.Direction.OUTGOING)
    public LocatedAt locatedAt;

    @JsonIgnoreProperties("entityIdr")
    @Relationship(type = "HAS_ROUTE", direction = Relationship.Direction.OUTGOING)
    public Set<HasRoute> hasRoutes = new HashSet<>();
}

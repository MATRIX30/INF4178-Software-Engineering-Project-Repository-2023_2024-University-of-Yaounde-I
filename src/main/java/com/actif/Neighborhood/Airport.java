package com.actif.Neighborhood;

import com.actif.Neighborhood.relationshipProperties.HasRout;
import com.actif.Neighborhood.relationshipProperties.HasRoute;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;

import java.util.HashSet;
import java.util.Set;

@Node
public class Airport {
    @Id
    private String name;

    @Relationship(type = "HAS_ROUT")
    private Set<HasRout> routes = new HashSet<>();

    public Airport() {}

    public Airport(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public Set<HasRout> getRoutes() {
        return routes;
    }

    public void addRoute(HasRout airport) {
        routes.add(airport);
    }
}

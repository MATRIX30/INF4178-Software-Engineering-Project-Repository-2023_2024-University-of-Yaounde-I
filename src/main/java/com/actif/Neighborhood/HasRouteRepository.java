package com.actif.Neighborhood;

import com.actif.Neighborhood.relationshipProperties.HasRoute;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HasRouteRepository extends Neo4jRepository<HasRoute, Long> {
}

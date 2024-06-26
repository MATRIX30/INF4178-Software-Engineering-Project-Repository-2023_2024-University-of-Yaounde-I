package com.actif.Neighborhood;

import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AirportRepository extends Neo4jRepository<Airport, String> {
}

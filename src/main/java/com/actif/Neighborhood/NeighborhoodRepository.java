package com.actif.Neighborhood;

import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NeighborhoodRepository extends Neo4jRepository<Neighborhood, Long> {
    @Query("MATCH (n:Neighborhood)-[:LOCATED_AT]->(c:City) \n" +
            "WHERE ID(c)=$cityId \n" +
            "RETURN n")
    List<Neighborhood> findByCityId(Long cityId);

    @Query("MATCH(n:Neighborhood)-[:HAS_ROTE]->(p:Neighborhood) \n" +
            "WHERE elementId(n)='4:998134f6-c91b-4c8a-b50d-20043eb6c049:$source' OR ID(p)='4:998134f6-c91b-4c8a-b50d-20043eb6c049:$target' \n" +
            "RETURN n"
    )
    Neighborhood findNeighborhoodRelation(Long source, Long target);
}

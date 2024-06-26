package com.actif.estimations;

import com.actif.packet.Packet;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EstimationRepository extends Neo4jRepository<Estimation, Long> {
}

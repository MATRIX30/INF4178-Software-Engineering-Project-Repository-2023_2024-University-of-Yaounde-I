package com.actif.livreur;

import org.springframework.data.neo4j.repository.Neo4jRepository;

import java.util.Optional;

public interface LivreurRepository extends Neo4jRepository<Livreur, Long> {

    Optional<Livreur> findOneByCode(String code);


}

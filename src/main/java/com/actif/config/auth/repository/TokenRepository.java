package com.actif.config.auth.repository;

import com.actif.config.auth.authModels.Token;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;

import java.util.List;
import java.util.Optional;


public interface TokenRepository extends Neo4jRepository<Token, Long> {
    @Query(value = "match (t:Token)-[to:TOKEN_FOR]->(u:User) where ID(u) =$id and (t.expired = true or t.revoked = false) return t")
    List<Token> findAllValidTokenByUser(Long id);

    Optional<Token> findByToken(String token);
}

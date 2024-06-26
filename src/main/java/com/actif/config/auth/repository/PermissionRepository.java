package com.actif.config.auth.repository;

import com.actif.config.auth.authModels.Permission;
import org.springframework.data.neo4j.repository.Neo4jRepository;

import java.util.Optional;

public interface PermissionRepository extends Neo4jRepository<Permission, Long> {
    Optional<Permission> findByName(String name);
}

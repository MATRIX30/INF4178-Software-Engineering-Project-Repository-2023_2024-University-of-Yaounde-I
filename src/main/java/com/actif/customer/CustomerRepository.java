package com.actif.customer;

import org.springframework.data.neo4j.repository.Neo4jRepository;

import java.util.Optional;

public interface CustomerRepository extends Neo4jRepository<Customer, Long> {

    Optional<Customer> findOneByPhone(String phone);
}

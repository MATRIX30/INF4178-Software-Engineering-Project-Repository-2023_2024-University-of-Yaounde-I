package com.actif.POC;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
    public interface POCRepository extends Neo4jRepository<POC, Long> {
        POC findByCode(String code);


        List<POC> findAllByCodeOrTownOrDistrict(String code, String town, String district);
    @Query("MATCH (poc:POC) " +
            " WHERE toUpper(poc.code) STARTS WITH toUpper($query) " +
            "OR toUpper(poc.code) ENDS WITH toUpper($query) " +

            "OR toUpper(poc.region) STARTS WITH toUpper($query) " +
            "OR toUpper(poc.region) ENDS WITH toUpper($query) " +

            "OR toUpper(poc.town) STARTS WITH toUpper($query) " +
            "OR toUpper(poc.town) ENDS WITH toUpper($query) " +

            "OR toUpper(poc.district) STARTS WITH toUpper($query) " +
            "OR toUpper(poc.district) ENDS WITH toUpper($query) " +

            "RETURN poc"
    )
    List<POC> search(String query);

    }

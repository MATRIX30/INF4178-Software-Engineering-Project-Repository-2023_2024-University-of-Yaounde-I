package com.actif.packet;


import com.actif.delivery.Delivery;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface PacketRepository extends Neo4jRepository<Packet, Long> {



    //Slice<Packet> findBySelectedByLivreur(Long id, Pageable pageable);
    Slice<Packet> findAllByCustomerSenderId(Long customerSenderId, Pageable pageable);

    @Query("MATCH (cus:Customer)<-[own:OWNED_BY]-(pk:Packet)" +
            "MATCH (pk)-[g:GOT]->(i:Item)\n" +
            "MATCH (pk)-[cre:CREATED_BY]->(poc:POC)" +
            "MATCH (d:Delivery)<-[inc:INCLUDED_IN]-(pk) " +
            "WHERE ID(cus)=$customerSenderId \n" +
            "AND NOT (d)-[:DEPOSED_AT]-()\n" +
            "RETURN pk,  collect(pk), collect(g), collect(i), collect(cre), collect(poc), collect(inc)  :#{orderBy(#pageable)} SKIP $skip LIMIT $limit")
    Slice<Packet> findAllSendByCustomer(Long customerSenderId, Pageable pageable);


    @Query("MATCH (d:Delivery)-[:DEPOSED_AT]-() " +
            "MATCH (cus:Customer)<-[own:OWNED_BY]-(pk:Packet) " +
            "MATCH (pk)-[g:GOT]->(i:Item) " +
            "MATCH (pk)-[cre:CREATED_BY]->(poc:POC) " +
            "MATCH (d)-[in:INTENDED_FOR]->(pocI:POC) " +
            "MATCH (d)-[sf:START_FROM]->(pocS:POC) " +
            "WHERE ID(cus)=$customerSenderId  " +
            "RETURN pk,  collect(pk), collect(g), collect(i), collect(cre), collect(poc), collect(in) ,collect(pocI),collect(pocS), collect(sf) :#{orderBy(#pageable)} SKIP $skip LIMIT $limit")
    Slice<Packet> findAllArrivedByCustomer(Long customerSenderId, Pageable pageable);


}

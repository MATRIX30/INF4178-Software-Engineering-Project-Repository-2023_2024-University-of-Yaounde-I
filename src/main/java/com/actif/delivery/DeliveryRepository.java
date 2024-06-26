package com.actif.delivery;

import com.actif.Neighborhood.repsonse.RouteResponse;
import com.actif.delivery.response.ResponseGroupPoc;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;

import java.util.List;
import java.util.Optional;

public interface DeliveryRepository extends Neo4jRepository<Delivery, Long> {


    Slice<Delivery> findAllByIncludedIn_Packet_Id(Long packetId , Pageable pageable);
    Slice<Delivery> findAllByIncludedIn_Packet_CustomerSender_IdOrIncludedIn_Packet_Id(Long customerSenderId, Long packetId , Pageable pageable);


    @Query("MATCH (d:Delivery)<-[c:INCLUDED_IN]-(p:Packet) \n" +
            "MATCH (p)-[g:GOT]->(i:Item) \n" +
            "MATCH (p)-[cre:CREATED_BY]->(poc:POC) \n" +
            "MATCH (d)-[in:INTENDED_FOR]->(pocI:POC) \n" +
            " MATCH (d)-[sf:START_FROM]->(pocS:POC) \n" +
            "WHERE NOT (d)-[:SELECTED_BY]-(:Livreur) \n" +
            "RETURN d, collect(c), collect(p), collect(g), collect(i), collect(cre), collect(poc), collect(in) ,collect(pocI),collect(pocS), collect(sf) :#{orderBy(#pageable)} SKIP $skip LIMIT $limit")
    Slice<Delivery> findAvailableDelivery(Pageable pageable);


    @Query("MATCH (d:Delivery)<-[c:INCLUDED_IN]-(p:Packet) \n" +
            "MATCH (p)-[g:GOT]->(i:Item)\n" +
            "MATCH (p)-[cre:CREATED_BY]->(poc:POC)\n" +
            "MATCH (d)-[in:INTENDED_FOR]->(pocI:POC)\n" +
            " MATCH (d)-[sf:START_FROM]->(pocS:POC)\n" +
            "MATCH (li:Livreur) \n" +
            "WHERE NOT (d)-[:SELECTED_BY]-(li) \n" +
            "AND   NOT (d)-[:IGNORED_BY]-(li)\n" +
            "AND   NOT (d)-[:TAKEN_BY]-(li)\n" +
            "AND  ID(li)=$LivreurId  \n" +
            "AND  d.status=0  \n" +
            "RETURN d, collect(c), collect(p), collect(g), collect(i), collect(cre), collect(poc), collect(in) ,collect(pocI),collect(pocS), collect(sf) :#{orderBy(#pageable)} SKIP $skip LIMIT $limit")
    Slice<Delivery> findAvailableDeliveryByLivreur(Long LivreurId, Pageable pageable);

//    @Query("MATCH (cus:Customer)<-[own:OWNED_BY]-(pk:Packet)" +
//            "MATCH (d:Delivery)<-[c:INCLUDED_IN]-(pk) \n" +
//            "MATCH (pk)-[g:GOT]->(i:Item)\n" +
//            "MATCH (pk)-[cre:CREATED_BY]->(poc:POC)\n" +
//            "MATCH (d)-[in:INTENDED_FOR]->(pocI:POC)\n" +
//            " MATCH (d)-[sf:START_FROM]->(pocS:POC)\n" +
//            "WHERE ID(cus)=$customerSenderId \n" +
//            "AND NOT (d)-[:DEPOSED_AT]-()\n" +
//            "RETURN d, collect(c), collect(pk), collect(g), collect(i), collect(cre), collect(poc), collect(in) ,collect(pocI),collect(pocS), collect(sf) :#{orderBy(#pageable)} SKIP $skip LIMIT $limit")
//    Slice<Delivery> findAllSendByCustomer(Long customerSenderId, Pageable pageable);


    @Query("MATCH (l:Livreur)<-[r:IGNORED_BY]-(p:Delivery) " +
            "WHERE ID(l)=$livreurId " +
            "RETURN p, collect(r), collect(l) :#{orderBy(#pageable)} SKIP $skip LIMIT $limit")
    Slice<Delivery> findAllIgnoredDeliveriesByLivreur(Long livreurId, Pageable pageable);



    @Query("match (d:Delivery)-[a:TAKEN_BY]->(l:Livreur) \n" +
            "match (d)-[i:INTENDED_FOR]->(pocI:POC)\n" +
            "MATCH (d)-[sf:START_FROM]->(pocS:POC) \n" +
            "match (d)<-[c:INCLUDED_IN]-(pk:Packet) \n" +
            "match (pk)-[got:GOT]->(item:Item)\n" +
            "where ID(l)=$livreurId \n" +
            "and NOT (d)-[:DEPOSED_AT]-() \n" +
            "and ID(pocI)=$pocId \n" +
            "return d,collect(a),collect(i),collect(l),collect(pocS), collect(pocI), collect(sf), collect(c), collect(pk) , collect(got), collect(item) :#{orderBy(#pageable)} SKIP $skip LIMIT $limit")
    Slice<Delivery> findAllTakenByLivreurToPoc(Long livreurId, Long pocId, Pageable pageable);


    @Query("match (d:Delivery)-[t:TAKEN_BY]->(l:Livreur) \n" +
            "MATCH (d)-[sf:START_FROM]->(pocS:POC) \n" +
            "match (d)-[i:INTENDED_FOR]->(p:POC)\n" +
            "match (d)<-[c:INCLUDED_IN]-(pk:Packet)\n" +
            "match (pk)-[got:GOT]->(item:Item)\n" +
            "where ID(l)=$livreurId \n" +
            "and NOT (d)-[:DEPOSED_AT]-() \n" +
            "return d,collect(i),collect(l),collect(p), collect(c), collect(pk) , collect(got), collect(item), collect(t) , " +
            "collect(pocS) , collect(sf)" +
            ":#{orderBy(#pageable)} SKIP $skip LIMIT $limit")
    Slice<Delivery> findAllTakenByLivreur(Long livreurId, Pageable pageable);

    @Query("match (d:Delivery)-[a:TAKEN_BY]->(l:Livreur) \n" +
            "match (d)-[i:INTENDED_FOR]->(p:POC) \n" +
            "match (d)<-[c:INCLUDED_IN]-(pk:Packet) \n" +
            "match (pk)-[got:GOT]->(item:Item) \n" +
            "where ID(l)=$livreurId \n" +
            "and NOT (d)-[:DEPOSED_AT]-(p) \n" +
            "WITH p AS pocIntended, d, collect(d) AS deliveries \n" +
            "return [{poc : pocIntended ,numberOfDeliveries: size(deliveries)}]" +
            ":#{orderBy(#pageable)} SKIP $skip LIMIT $limit")
    Slice<ResponseGroupPoc> findAllToDeposedGroupByPocAndLivreur(Long livreurId, Pageable pageable);

    @Query("MATCH (l:Livreur)<-[r:SELECTED_BY]-(d:Delivery) " +
            "MATCH (d)<-[c:INCLUDED_IN]-(p:Packet) \n" +
            "MATCH (p)-[g:GOT]->(i:Item) \n" +
            "MATCH (p)-[cre:CREATED_BY]->(poc:POC) \n" +
            "MATCH (d)-[in:INTENDED_FOR]->(pocI:POC) \n" +
            "MATCH (d)-[sf:START_FROM]->(pocS:POC) \n" +
            "WHERE ID(l)=$livreurId " +
            "AND   NOT (d)-[:TAKEN_BY]-(l) \n" +
            "RETURN d, collect(r), collect(l),  collect(c) , collect(p), " +
            " collect(g), collect(i),collect(poc) , collect(pocS) , collect(pocI), " +
            "collect(cre) , collect(in) , collect(sf) " +
            ":#{orderBy(#pageable)} SKIP $skip LIMIT $limit")
    Slice<Delivery> findAllAccepetedDeliveriesByLivreur(Long livreurId, Pageable pageable);

    @Query("MATCH (l:Livreur)<-[r:SELECTED_BY]-(d:Delivery) " +
            "MATCH (d)<-[c:INCLUDED_IN]-(p:Packet) \n" +
            "MATCH (p)-[g:GOT]->(i:Item) \n" +
            "MATCH (p)-[cre:CREATED_BY]->(poc:POC) \n" +
            "MATCH (d)-[in:INTENDED_FOR]->(pocI:POC) \n" +
            "MATCH (d)-[sf:START_FROM]->(pocS:POC) \n" +
            "WHERE ID(l)=$livreurId " +
            "AND   NOT (d)-[:TAKEN_BY]-(l) \n" +
            "WITH pocI AS pocIntended, d, collect(DISTINCT d) AS deliveries\n" +
            "return [{poc : pocIntended ,numberOfDeliveries: size(deliveries)}]" +
            ":#{orderBy(#pageable)} SKIP $skip LIMIT $limit")
    Slice<ResponseGroupPoc> findAllAccepetedDeliveriesGroupByPOCAndLivreur(Long livreurId, Pageable pageable);


    @Query("MATCH (l:Livreur)<-[r:SELECTED_BY]-(d:Delivery) " +
            "MATCH (d)<-[c:INCLUDED_IN]-(p:Packet) \n" +
            "MATCH (p)-[g:GOT]->(i:Item) \n" +
            "MATCH (p)-[cre:CREATED_BY]->(poc:POC) \n" +
            "MATCH (d)-[in:INTENDED_FOR]->(pocI:POC) \n" +
            "MATCH (d)-[sf:START_FROM]->(pocS:POC) \n" +
            "WHERE ID(l)=$livreurId " +
            "AND ID(pocI)=$pocId \n" +
            "AND NOT (d)-[:TAKEN_BY]-(l) \n" +
            "RETURN d, collect(r), collect(l),  collect(c) , collect(p), " +
            " collect(g), collect(i),collect(poc) , collect(pocS) , collect(pocI), " +
            "collect(cre) , collect(in) , collect(sf) " +
            ":#{orderBy(#pageable)} SKIP $skip LIMIT $limit")
    Slice<Delivery> findAllAccepetdByLivreurByPoc(Long livreurId, Long pocId, Pageable pageable);


    @Query("match (d:Delivery)-[dep:DEPOSED_AT]->(p:POC)  \n" +
            "match (d)<-[c:INCLUDED_IN]-(pk:Packet)\n" +
            "MATCH (pk)-[cre:CREATED_BY]->(poc:POC) \n" +
            "MATCH (d)-[in:INTENDED_FOR]->(pocI:POC) \n" +
            "MATCH (d)-[sf:START_FROM]->(pocS:POC) \n" +
            "match (d)-[as:TAKEN_BY]->(l:Livreur)\n" +
            "match (pk)-[got:GOT]->(item:Item)\n" +
            "where ID(l)=$livreurId\n" +
            "return d,collect(dep),collect(p),collect(l), collect(c), collect(pk) , " +
            "collect(got), collect(item), collect(pocI) , collect(pocS), collect(cre) , collect(in), " +
            "collect(sf) " +
            ":#{orderBy(#pageable)} SKIP $skip LIMIT $limit")
    Slice<Delivery> findAllDeposedByLivreur(Long livreurId, Pageable pageable);




    @Query("match (p:Delivery)-[s:SELECTED_BY]->(l:Livreur) where ID(l)=$livreurId and ID(p)=$deliveryId  delete s")
    void cancelAcceptedDeliveries(Long livreurId, Long deliveryId);


        @Query("MATCH (n:Delivery)<-[c:INCLUDED_IN]-(p:Packet) \n" +
            "WHERE ID(p)=$packetId\n" +
            "RETURN  n , collect(c) ,collect(p)")
    List<Delivery> findByPacketId(Long packetId);


    @Query("MATCH (d:Delivery)<-[c:INCLUDED_IN]-(p:Packet) \n" +
            "WHERE ID(p)=$packetId\n" +
            "AND ID(d)=$deliveryId\n" +
            "RETURN  d , collect(c) ,collect(p)")
    Optional<Delivery> findByDeliveryIdAndPacketId(Long deliveryId, Long packetId);

    Long countByStatus(Long status);
    Long countByStatusAndSelectedByLivreurId(Long status, Long livreurId);
    Long countByStatusAndTakenByLivreurId(Long status, Long livreurId);

@Query("match(d:Delivery)-[dep:DEPOSED_AT]-(poc:POC)\n" +
        "match (d)-[tk:TAKEN_BY]-(l:Livreur)\n" +
        "where ID(l)=$livreurId \n" +
       " and d.status=$status "+
        "return count(DISTINCT d)")
    Long countByStatusAndDeposedAtLivreurId(Long status, Long livreurId);

// calcul shortest path between two pocs
@Query("MATCH (source:Neighborhood {name: '$source'}), \n" +
        "(target:Neighborhood {name: '$target'}) ]\n" +
        "CALL gds.shortestPath.dijkstra.stream('itineraires', {sourceNode: source, targetNode: target, relationshipWeightProperty: 'distance'}) \n" +
        "YIELD nodeIds, costs, totalCost \n" +
        "RETURN [nodeId in nodeIds | gds.util.asNode(nodeId).name] AS neighboroods, costs, totalCost"
)
List<String> findShortestPath(String source, String target);


////////
    /////////////////////
    //////////POC//////////////
    //////////////

    @Query("MATCH (d:Delivery)<-[c:INCLUDED_IN]-(p:Packet) " +
            "MATCH (p)-[g:GOT]->(i:Item) \n" +
            "MATCH (p)-[cre:CREATED_BY]->(poc:POC) \n" +
            "Optional MATCH(d)-[dep:DEPOSED_AT]->(poc) \n" +
            "MATCH (d)-[in:INTENDED_FOR]->(pocI:POC) \n" +
            " MATCH (d)-[sf:START_FROM]->(pocS:POC) \n" +
            "WHERE NOT (d)-[:TAKEN_BY]-(:Livreur) " +
            "or not (d)-[:REMOVED_BY]-()" +
            "AND ID(poc)=$pocId \n" +
            "RETURN d, collect(c), collect(p), collect(g), collect(i), collect(cre), collect(poc), collect(in) ,collect(pocI),collect(pocS), collect(sf) :#{orderBy(#pageable)} SKIP $skip LIMIT $limit")
    Slice<Delivery> findAllInStockByPoc(Long pocId,Pageable pageable);


    @Query("MATCH (d:Delivery)<-[c:INCLUDED_IN]-(p:Packet) " +
            "MATCH (p)-[g:GOT]->(i:Item) \n" +
            "MATCH (p)-[cre:CREATED_BY]->(poc:POC) \n" +
            "MATCH (d)-[tk:TAKEN_BY]->(l:Livreur) \n" +
            "MATCH (d)-[in:INTENDED_FOR]->(pocI:POC) \n" +
            "MATCH (d)-[sf:START_FROM]->(pocS:POC) \n" +
            "WHERE NOT (d)-[:DEPOSED_AT]-() " +
            "or not (d)-[:REMOVED_BY]-()" +
            "AND ID(poc)=$pocId \n" +
            "RETURN d, collect(c), collect(p), collect(g), collect(i), collect(cre), collect(poc), collect(in) ,collect(pocI),collect(pocS), collect(sf) :#{orderBy(#pageable)} SKIP $skip LIMIT $limit")
    Slice<Delivery> findAllInProcessByPoc(Long pocId,Pageable pageable);

    @Query("MATCH (d:Delivery)<-[c:INCLUDED_IN]-(p:Packet) " +
            "MATCH (p)-[g:GOT]->(i:Item) \n" +
            "OPTIONAL MATCH (p)-[cre:CREATED_BY]->(poc:POC) \n" +
            "OPTIONAL MATCH (d)-[in:INTENDED_FOR]->(pocI:POC) \n" +
            "OPTIONAL MATCH (d)-[sf:START_FROM]->(pocS:POC) \n" +
            "MATCH (d)-[tk:DEPOSED_AT]->() \n" +
            "WHERE ID(pocS)=$pocId \n" +
            "RETURN d, collect(c), collect(p), collect(g), collect(i), collect(cre), collect(poc), collect(in) ,collect(pocI),collect(pocS), collect(sf) :#{orderBy(#pageable)} SKIP $skip LIMIT $limit")
    Slice<Delivery> findAllTerminedByPoc(Long pocId,Pageable pageable);
}

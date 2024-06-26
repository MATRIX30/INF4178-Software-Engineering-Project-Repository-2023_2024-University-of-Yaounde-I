package com.actif.delivery;

import com.actif.Neighborhood.Neighborhood;
import com.actif.Neighborhood.repsonse.RouteResponse;
import com.actif.POC.POC;
import com.actif.delivery.relationshipProperties.DeposedAt;
import com.actif.delivery.response.ResponseGroupPoc;
import com.actif.livreur.Livreur;
import com.actif.livreur.response.ResponseStatHome;
import com.actif.packet.Packet;
import com.actif.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class DeliveryService {
    @Autowired
    DeliveryRepository deliveryRepository;


    public Delivery create(Delivery delivery){
        return this.deliveryRepository.save(delivery);
    }

    public Delivery save(Delivery delivery){
        return this.deliveryRepository.save(delivery);
    }


    public Page<Delivery> getAllStats(int page , int size){
        return this.deliveryRepository.findAll(PageRequest.of(page, size));
    }
    public Page<Delivery> getAll(int page , int size){
        return this.deliveryRepository.findAll(PageRequest.of(page, size));
    }

    public Optional<Delivery> getById(Long id){
        return this.deliveryRepository.findById(id);
    }
    public List<Delivery> getByPacket(Long packetId){
        return this.deliveryRepository.findByPacketId(packetId);
    }

    public Optional<Delivery> getByDeliveryAndPacket(Long deliveryId, Long packetId){
        return this.deliveryRepository.findByDeliveryIdAndPacketId(deliveryId, packetId);
    }


    public Delivery deposedAt(Delivery delivery, POC pocDropping){
//        List <DeposedAt> droppings = delivery.getDeposedAts();
        DeposedAt deposedAt = DeposedAt.builder()
                .poc(pocDropping)
                .date(LocalDateTime.now())
                .build();
//        droppings.add(deposedAt);
//        delivery.setDeposedAts(droppings);
        delivery.setDeposedAt(deposedAt);
        return this.deliveryRepository.save(delivery);
    }

    public Slice<Delivery> getAllAvailableDeliveries(int page , int size) {

        return this.deliveryRepository.findAvailableDelivery(PageRequest.of(page, size));
    }

    public Slice<Delivery> getAllAvailableDeliveries(Long livreurId, int page , int size) {

        return this.deliveryRepository.findAvailableDeliveryByLivreur( livreurId, PageRequest.of(page, size));
    }

    public Slice<Delivery> getAllAcceptedByLivreur(Livreur livreur, int page, int size) {
        return this.deliveryRepository.findAllAccepetedDeliveriesByLivreur(livreur.getId(), PageRequest.of(page, size));
    }

    public Slice<Delivery> getAllIgnoredByLivreur(Livreur livreur, int page, int size) {
        return this.deliveryRepository.findAllIgnoredDeliveriesByLivreur(livreur.getId(), PageRequest.of(page, size));
    }


    public void cancelAcceptedDelivery(Livreur livreur, Delivery delivery) {

        this.deliveryRepository.cancelAcceptedDeliveries(livreur.getId(), delivery.getId());
    }


    public Slice<Delivery> getAllToDeposedByLivreurToPoc(Livreur livreur, POC poc, int page, int size){
        return this.deliveryRepository.findAllTakenByLivreurToPoc(livreur.getId(),poc.getId(), PageRequest.of(page,size));
    }
    public Slice<Delivery> getAllAcceptedByLivreurByPoc(Livreur livreur, POC poc, int page, int size){
        return this.deliveryRepository.findAllAccepetdByLivreurByPoc(livreur.getId(),poc.getId(), PageRequest.of(page,size));
    }


    public Slice<ResponseGroupPoc> getAllToDeposedGroupByPocAndLivreurToPoc(Livreur livreur, int page, int size){
        return this.deliveryRepository.findAllToDeposedGroupByPocAndLivreur(livreur.getId(), PageRequest.of(page, size));
    }

    public Slice<ResponseGroupPoc> getALLAccepetedDeliveriesGroupByPOCAndLivreur(Livreur livreur,int page, int size){
        return this.deliveryRepository.findAllAccepetedDeliveriesGroupByPOCAndLivreur(livreur.getId(), PageRequest.of(page, size));
    }

    public Slice<Delivery> getAllToDeposedByLivreur(Livreur livreur, int page, int size){
        return this.deliveryRepository.findAllTakenByLivreur(livreur.getId(), PageRequest.of(page,size));
    }

    public Slice<Delivery> getAllDeposedByLivreur(Livreur livreur, int page, int size){
        return this.deliveryRepository.findAllDeposedByLivreur(livreur.getId(), PageRequest.of(page,size));
    }

    public LocalDateTime computeEstimatedDeliveryDate() {
        return LocalDateTime.now().plusHours(Long.parseLong(Utils.generatedRamdomCode(1)));
    }

    public Long getRoadDistance() {
        return Long.valueOf(Utils.generatedRamdomCode(2));
    }
    public Long getComputedPrice() {
        return Long.valueOf(Utils.generatedRamdomCode(4));
    }
    public Long getComputedPrice(Long width, Long heigth, Long weight, String townS, String townI) {
        return Long.valueOf(Utils.generatedRamdomCode(4));
    }
    public Long countByStatus(Long status) {
        return deliveryRepository.countByStatus(status);
    }

    public ResponseStatHome  getstats(Livreur livreur) {
        ResponseStatHome res = ResponseStatHome.builder()
                .countAvailable(deliveryRepository.countByStatus(DELIVERY_STATUS.AVAILABLE))
                .countSelected(deliveryRepository.countByStatusAndSelectedByLivreurId(DELIVERY_STATUS.SELECTED, livreur.getId()))
                .countTaken(deliveryRepository.countByStatusAndTakenByLivreurId(DELIVERY_STATUS.TAKEN, livreur.getId()))
                .countDeposed(deliveryRepository.countByStatusAndDeposedAtLivreurId(DELIVERY_STATUS.DEPOSED, livreur.getId()))
                .build();
        return res;
    }

    public List<String> findShortestPath(Neighborhood source, Neighborhood target) {
        return this.deliveryRepository.findShortestPath(source.getName(), target.getName());
    }


//
//    POC ROUTES


    public Slice<Delivery> getAllInStockByPoc(POC poc, int page, int size){
        return this.deliveryRepository.findAllInStockByPoc(poc.getId(), PageRequest.of(page,size));
    }


    public Slice<Delivery> getAllInProcessByPoc(POC poc, int page, int size){
        return this.deliveryRepository.findAllInProcessByPoc(poc.getId(), PageRequest.of(page,size));
    }

    public Slice<Delivery> getAlltermicedByPoc(POC poc, int page, int size){
        return this.deliveryRepository.findAllTerminedByPoc(poc.getId(), PageRequest.of(page,size));
    }



    //////////////////////////
    ////////////CUSTOMER//////////////////////
    ///////////////////////////

    public Slice<Delivery> getAllByPacket(Packet packetId, int page, int size){
        return this.deliveryRepository.findAllByIncludedIn_Packet_Id(packetId.getId(), PageRequest.of(page,size));
    }


    public Slice<Delivery> getAllByCustomerAndPacket( Long customerId, Long packetId, int page, int size){
        return this.deliveryRepository.findAllByIncludedIn_Packet_CustomerSender_IdOrIncludedIn_Packet_Id(customerId, packetId, PageRequest.of(page,size));
    }

}

package com.actif.livreur;


import com.actif.POC.POC;
import com.actif.POC.POCService;
import com.actif.ResultDto;
import com.actif.delivery.Delivery;
import com.actif.delivery.DeliveryService;
import com.actif.delivery.response.ResponseGroupPoc;
import com.actif.livreur.response.ResponseStatHome;
import com.actif.packet.PacketService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Slice;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin
@RestController
@Tag(name = "Livreurs")
@RequestMapping(value = "/api/livreurs")
public class LivreurController {

    @Autowired
    LivreurService livreurService;

    @Autowired
    PacketService packetService;

    @Autowired
    POCService pocService;

    @Autowired
    DeliveryService deliveryService;
    @GetMapping("/{id}")
    public ResponseEntity<ResultDto> getLivreurId(
            @PathVariable Long id
    ) {

        Optional<Livreur> livreur = livreurService.getLivreurBy(id);

        if (livreur.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(new ResultDto(" delyver man !", livreur, HttpStatus.OK.value(), null));
    }

    @GetMapping("/get-by-code/{code}")
    public ResponseEntity<ResultDto> getLivreurByCode(
            @PathVariable String code
    ) {

        Optional<Livreur> livreur = livreurService.getLivreurByCode(code);

        if (livreur.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(new ResultDto(" delyver man !", livreur, HttpStatus.OK.value(), null));
    }
    @Value("${file.qrcode.path}")
    String path;
    @GetMapping
    public ResponseEntity<ResultDto> getLivreur(
            @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "20") int size
    ) {

        Page<Livreur> livreurs = livreurService.getAllLivreur(page, size);

        if (livreurs.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(new ResultDto("List of delyver man !", livreurs, HttpStatus.OK.value(), null));
    }


//    @PostMapping
//    public ResultDto create(@RequestBody CreateLivreurDto createLivreurDto
//    ) {
//
//        Livreur livreur = Livreur.builder()
////                .firstName(createLivreurDto.getFirstName())
////                .lastName(createLivreurDto.getLastName())
////.phone(createLivreurDto.getPhone())
//                .region(createLivreurDto.getPhone())
//                .town(createLivreurDto.getTown())
//                .lat(createLivreurDto.getLat())
//                .lng(createLivreurDto.getLng())
//
//                .createdAt(LocalDateTime.now())
//                .lastUpdatedOn(LocalDateTime.now())
//           //     .password(createLivreurDto.getPassword())
//                .build();
//
//
//        Livreur savedLivreur = this.livreurService.create(livreur);
//        if (livreur == null) {
//            return new ResultDto("No delyver man content !", null, HttpStatus.NO_CONTENT.value(), null);
//        } else {
//
//        }
//        return new ResultDto("Created delyver man !", savedLivreur, HttpStatus.OK.value(), null);
//    }

//    @GetMapping("/{id}/packets")
//    public ResultDto getAllPackets(
//            @PathVariable Long id,
//            @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "20") int size
//
//    ) {
//        Optional<Livreur> livreur = livreurService.getLivreurBy(id);
//
//        if (livreur.isEmpty()) {
//            return new ResultDto("No livreur found !", null, HttpStatus.NO_CONTENT.value(), null);
//        } else {
//
//            Iterable<Packet> packets = packetService.getAllByLivreur(livreur.get(), page, size);
//
//            if (packets == null) {
//                return new ResultDto("No packet  content !", null, HttpStatus.NO_CONTENT.value(), null);
//            } else {
//
//            }
//            return new ResultDto("List of packets  !", packets, HttpStatus.OK.value(), null);
//        }
//
//    }

    @GetMapping("/{id}/deliveries/available")
    public ResponseEntity<ResultDto> getAllAvailableDeliveryByLivreur(
            @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "20") int size,
            @PathVariable Long id

    ) {


        Optional<Livreur> livreur = livreurService.getLivreurBy(id);
        if (livreur.isEmpty()) {
            return  ResponseEntity.badRequest().body(new ResultDto("Livreur not found", null, 400, null));
        }
        Slice<Delivery> deliveries = deliveryService.getAllAvailableDeliveries(livreur.get().getId(),page, size);

        if (deliveries == null) {
            return ResponseEntity.badRequest().body(new ResultDto("No delivery content !", null, HttpStatus.NO_CONTENT.value(), null));
        }
        return ResponseEntity.ok().body(new ResultDto("List of available deliveries  !", deliveries, HttpStatus.OK.value(), null));
    }


    @GetMapping("/{id}/deliveries/accepted")
    public ResultDto getAllAcceptedPacketsByLivreur(
            @PathVariable Long id,
            @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "20") int size

    ) {
        Optional<Livreur> livreur = livreurService.getLivreurBy(id);

        if (livreur.isEmpty()) {
            return new ResultDto("No livreur found !", null, HttpStatus.NO_CONTENT.value(), null);
        } else {

            Slice<Delivery> deliveries = deliveryService.getAllAcceptedByLivreur(livreur.get(), page, size);

            if (deliveries == null) {
                return new ResultDto("No deliveries  content !", null, HttpStatus.NO_CONTENT.value(), null);
            }
            return new ResultDto("List of deliveries accepted by the livreur !", deliveries, HttpStatus.OK.value(), null);
        }

    }

    @GetMapping("/{id}/deliveries/acceptedGroupByPoc")
    public ResultDto getAllPacketacceptedTGroupByPOcLivreur(
            @PathVariable Long id,
            @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "20") int size

    ) {
        Optional<Livreur> livreur = livreurService.getLivreurBy(id);

        if (livreur.isEmpty()) {
            return new ResultDto("No livreur found !", null, HttpStatus.NO_CONTENT.value(), null);
        }



        Slice<ResponseGroupPoc> deliveries = deliveryService.getALLAccepetedDeliveriesGroupByPOCAndLivreur(livreur.get(), page, size);

        if (deliveries == null) {
            return new ResultDto("No deliveries  content !", null, HttpStatus.NO_CONTENT.value(), null);
        }
        return new ResultDto("List of deliveries accepted by livreur  group by poc  !", deliveries, HttpStatus.OK.value(), null);

    }

    @GetMapping("/{id}/pocs/{pocId}/deliveries/accepted")
    public ResultDto getAllDeliveryTakenToThePOCByLivreur(
            @PathVariable Long id,
            @PathVariable Long pocId,
            @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "20") int size

    ) {
        Optional<Livreur> livreur = livreurService.getLivreurBy(id);

        if (livreur.isEmpty()) {
            return new ResultDto("No livreur found !", null, HttpStatus.NO_CONTENT.value(), null);
        }

        Optional<POC> poc = pocService.getById(pocId);

        if (poc.isEmpty()) {
            return new ResultDto("No poc found !", null, HttpStatus.NO_CONTENT.value(), null);
        }

        Slice<Delivery> deliveries = deliveryService.getAllAcceptedByLivreurByPoc(livreur.get(),poc.get(), page, size);

        if (deliveries == null) {
            return new ResultDto("No deliveries  content !", null, HttpStatus.NO_CONTENT.value(), null);
        }
        return new ResultDto("List of deliveries accepted to withdraw by the livreur to poc !", deliveries, HttpStatus.OK.value(), null);

    }

    @GetMapping("/{id}/deliveries/ignored")
    public ResultDto getAllIgnoredPacketsByLivreur(
            @PathVariable Long id,
            @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "20") int size

    ) {
        Optional<Livreur> livreur = livreurService.getLivreurBy(id);

        if (livreur.isEmpty()) {
            return new ResultDto("No livreur found !", null, HttpStatus.NO_CONTENT.value(), null);
        } else {

            Slice<Delivery> deliveries = deliveryService.getAllIgnoredByLivreur(livreur.get(), page, size);

            if (deliveries == null) {
                return new ResultDto("No deliveries  content !", null, HttpStatus.NO_CONTENT.value(), null);
            }
            return new ResultDto("List of deliveries ignored by the livreur !", deliveries, HttpStatus.OK.value(), null);
        }

    }



    @GetMapping("/{id}/deliveries/toDeposed")
    public ResultDto getAllPacketToDeposedTByLivreur(
            @PathVariable Long id,
            @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "20") int size

    ) {
        Optional<Livreur> livreur = livreurService.getLivreurBy(id);

        if (livreur.isEmpty()) {
            return new ResultDto("No livreur found !", null, HttpStatus.NO_CONTENT.value(), null);
        }



        Slice<Delivery> deliveries = deliveryService.getAllToDeposedByLivreur(livreur.get(), page, size);

        if (deliveries == null) {
            return new ResultDto("No deliveries  content !", null, HttpStatus.NO_CONTENT.value(), null);
        } else {

        }
        return new ResultDto("List of deliveries to deposed by the livreur !", deliveries, HttpStatus.OK.value(), null);

    }



    @GetMapping("/{id}/deliveries/toDeposedGroupByPoc")
    public ResultDto getAllPacketToDeposedTGroupByPOcLivreur(
            @PathVariable Long id,
            @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "20") int size

    ) {
        Optional<Livreur> livreur = livreurService.getLivreurBy(id);

        if (livreur.isEmpty()) {
            return new ResultDto("No livreur found !", null, HttpStatus.NO_CONTENT.value(), null);
        }



        Slice<ResponseGroupPoc> deliveries = deliveryService.getAllToDeposedGroupByPocAndLivreurToPoc(livreur.get(), page, size);

        if (deliveries == null) {
            return new ResultDto("No deliveries  content !", null, HttpStatus.NO_CONTENT.value(), null);
        } else {

        }
        return new ResultDto("List of deliveries to deposed by the livreur !", deliveries, HttpStatus.OK.value(), null);

    }

    @GetMapping("/{id}/pocs/{pocId}/deliveries/toDeposed")
    public ResultDto getAllPacketToDeposedToThePOCByLivreur(
            @PathVariable Long id,
            @PathVariable Long pocId,
            @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "20") int size

    ) {
        Optional<Livreur> livreur = livreurService.getLivreurBy(id);

        if (livreur.isEmpty()) {
            return new ResultDto("No livreur found !", null, HttpStatus.NO_CONTENT.value(), null);
        }

        Optional<POC> poc = pocService.getById(pocId);

        if (poc.isEmpty()) {
            return new ResultDto("No poc found !", null, HttpStatus.NO_CONTENT.value(), null);
        }

        Slice<Delivery> deliveries = deliveryService.getAllToDeposedByLivreurToPoc(livreur.get(),poc.get(), page, size);

            if (deliveries == null) {
                return new ResultDto("No deliveries  content !", null, HttpStatus.NO_CONTENT.value(), null);
            } else {

            }
            return new ResultDto("List of deliveries to deposed by the livreur to poc !", deliveries, HttpStatus.OK.value(), null);

    }


    @GetMapping("/{id}/deliveries/deposed")
    public ResultDto getAllPacketDeposedTByLivreur(
            @PathVariable Long id,
            @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "20") int size

    ) {
        Optional<Livreur> livreur = livreurService.getLivreurBy(id);

        if (livreur.isEmpty()) {
            return new ResultDto("No livreur found !", null, HttpStatus.NO_CONTENT.value(), null);
        }



        Slice<Delivery> deliveries = deliveryService.getAllDeposedByLivreur(livreur.get(), page, size);

        if (deliveries == null) {
            return new ResultDto("No deliveries  content !", null, HttpStatus.NO_CONTENT.value(), null);
        }
        return new ResultDto("List of deliveries  deposed by the livreur !", deliveries, HttpStatus.OK.value(), null);

    }



    @GetMapping("/{id}/deliveries/stats")
    public ResultDto getAllPacketDeposedTByLivreur(
            @PathVariable Long id

    ) {
        Optional<Livreur> livreur = livreurService.getLivreurBy(id);

        if (livreur.isEmpty()) {
            return new ResultDto("No livreur found !", null, HttpStatus.NO_CONTENT.value(), null);
        }



        ResponseStatHome count = deliveryService.getstats(livreur.get());

        if (count == null) {
            return new ResultDto("No deliveries  count !", null, HttpStatus.NO_CONTENT.value(), null);
        }
        return new ResultDto("Count delivry by status !", count, HttpStatus.OK.value(), null);

    }

}
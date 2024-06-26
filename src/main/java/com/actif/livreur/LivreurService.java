package com.actif.livreur;


import com.actif.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LivreurService {

    @Autowired
    LivreurRepository livreurRepository;


    public Page<Livreur> getAllLivreur(int page, int limit){


        return this.livreurRepository.findAll(PageRequest.of(page,limit));
    }
    public Optional<Livreur> getLivreurBy(Long id ){
        return this.livreurRepository.findById(id);
    }
    public Optional<Livreur> getLivreurByCode(String  code ){
        return this.livreurRepository.findOneByCode(code);
    }

    public Livreur create(Livreur livreur){
        livreur.setVerificationCode(Utils.generateRandomString());
        return this.livreurRepository.save(livreur);
    }
}

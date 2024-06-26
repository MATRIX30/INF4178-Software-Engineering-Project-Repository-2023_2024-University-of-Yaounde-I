package com.actif.POC;

import com.actif.POC.dtos.SearchPocQuery;
import com.actif.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class POCService {

    @Autowired
    private POCRepository pocRepository;
    public POC create(POC poc){
        poc.setCode(Utils.generateRandomString(5));
        return this.pocRepository.save(poc);
    }


    public Page<POC> getAll(int page, int limit){
        return this.pocRepository.findAll(PageRequest.of(page, limit));
    }

    public List<POC> search(SearchPocQuery searchPocQuery){
        return this.pocRepository.search(searchPocQuery.getQuery());
    }


    public POC getByCode(String code){
        return this.pocRepository.findByCode(code);
    }

    public Optional<POC> getById(Long id){
        return this.pocRepository.findById(id);
    }


}

package com.actif.item;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemService {
    @Autowired
    ItemRepository itemRepository;
    public List<Item> createAll(List<Item> items){
        return this.itemRepository.saveAll(items);
    }
}

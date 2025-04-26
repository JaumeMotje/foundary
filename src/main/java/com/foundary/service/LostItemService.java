package com.foundary.service;

import com.foundary.model.LostItem;
import com.foundary.repository.LostItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LostItemService {

    @Autowired
    private LostItemRepository lostItemRepository;

    public LostItem createLostItem(LostItem lostItem) {
        return lostItemRepository.save(lostItem);
    }

    public LostItem getLostItemByUniqueCode(String uniqueCode) {
        return lostItemRepository.findByUniqueCode(uniqueCode);
    }
}

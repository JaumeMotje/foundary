package com.foundary.repository;

import com.foundary.model.LostItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LostItemRepository extends JpaRepository<LostItem, Long> {
    LostItem findByUniqueCode(String uniqueCode);  // Optional: find lost item by code
}

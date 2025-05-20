package com.foundary.repository;

import com.foundary.model.LostItem;
import com.foundary.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface LostItemRepository extends JpaRepository<LostItem, Long> {
    LostItem findByUniqueCode(String uniqueCode);  // Optional: find lost item by code

    List<LostItem> findByUser(User user);
}

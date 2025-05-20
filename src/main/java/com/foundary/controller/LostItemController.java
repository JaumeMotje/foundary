package com.foundary.controller;

import com.foundary.dto.LostItemDTO;
import com.foundary.dto.UserDTO;
import com.foundary.model.LostItem;
import com.foundary.model.User;
import com.foundary.service.LostItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/lost-items")
public class LostItemController {

    @Autowired
    private LostItemService lostItemService;

    // POST /api/lost-items
    @PostMapping
    public ResponseEntity<LostItemDTO> createLostItem(@RequestBody LostItem lostItem) {
        LostItem createdLostItem = lostItemService.createLostItem(lostItem);
        User owner = createdLostItem.getUser();
        UserDTO ownerDTO = new UserDTO(owner.getId(), owner.getUsername(), owner.getEmail());
        LostItemDTO LostItemDTO = new LostItemDTO(createdLostItem.getId(), createdLostItem.getDescription(), createdLostItem.getUniqueCode(), ownerDTO);
        return ResponseEntity.ok(LostItemDTO);
    }

    // GET /api/lost-items/{code}
    @GetMapping("/{code}")
    public ResponseEntity<LostItemDTO> getLostItemByCode(@PathVariable String code) {
        LostItem lostItem = lostItemService.getLostItemByUniqueCode(code);
        if (lostItem == null) {
            return ResponseEntity.notFound().build();
        }
        User owner = lostItem.getUser();
        UserDTO ownerDTO = new UserDTO(owner.getId(), owner.getUsername(), owner.getEmail());
        LostItemDTO lostItemDTO = new LostItemDTO(lostItem.getId(), lostItem.getDescription(), lostItem.getUniqueCode(), ownerDTO);
        return ResponseEntity.ok(lostItemDTO);
    }
}

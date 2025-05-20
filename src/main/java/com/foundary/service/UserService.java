package com.foundary.service;

import com.foundary.model.LostItem;
import com.foundary.model.User;
import com.foundary.repository.LostItemRepository;
import com.foundary.repository.UserRepository;

import java.util.List;
import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private LostItemRepository lostItemRepository;

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public List<LostItem> getLostItemsByUserId(Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            return Collections.emptyList();
        }
        return lostItemRepository.findByUser(user);
    }
}

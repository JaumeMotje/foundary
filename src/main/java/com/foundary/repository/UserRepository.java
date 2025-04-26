package com.foundary.repository;

import com.foundary.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);  // Optional: to find a user by username
}

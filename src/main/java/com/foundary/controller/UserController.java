package com.foundary.controller;

import com.foundary.dto.UserDTO;
import com.foundary.dto.LostItemDTO;
import com.foundary.model.LostItem;
import com.foundary.model.User;
import com.foundary.request.LoginRequest;
import com.foundary.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    // POST /api/users/register
    @PostMapping("/register")
    public ResponseEntity<UserDTO> registerUser(@RequestBody User user) {
        User createdUser = userService.createUser(user);
        UserDTO userDTO = new UserDTO(createdUser.getId(), createdUser.getUsername(), createdUser.getEmail());
        return ResponseEntity.ok(userDTO);
    }

    // POST /api/users/login
    @PostMapping("/login")
    public ResponseEntity<UserDTO> loginUser(@RequestBody LoginRequest loginRequest) {
        User user = userService.getUserByUsername(loginRequest.getUsername());

        if (user == null || !user.getPassword().equals(loginRequest.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        UserDTO userDTO = new UserDTO(user.getId(), user.getUsername(), user.getEmail());
        return ResponseEntity.ok(userDTO);
    }

    // GET /api/users/{username}  
    @GetMapping("/{username}")
    public ResponseEntity<UserDTO> getUserByUsername(@PathVariable String username) {
        User user = userService.getUserByUsername(username);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        UserDTO userDTO = new UserDTO(user.getId(), user.getUsername(), user.getEmail());
        return ResponseEntity.ok(userDTO);
    }
    
    @GetMapping("/{userId}/objects")
    public ResponseEntity<List<LostItem>> getObjectsByUserId(@PathVariable Long userId) {
        List<LostItem> items = userService.getLostItemsByUserId(userId);
        return ResponseEntity.ok(items);
    }
}

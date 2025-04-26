package com.foundary.controller;

import java.time.LocalDateTime;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.foundary.model.ChatRoom;
import com.foundary.model.LostItem;
import com.foundary.model.Message;
import com.foundary.repository.ChatRoomRepository;
import com.foundary.repository.LostItemRepository;
import com.foundary.repository.MessageRepository;

@RestController
@RequestMapping("/chat")
public class ChatController {

    private final ChatRoomRepository chatRoomRepository;
    private final MessageRepository messageRepository;
    private final LostItemRepository lostItemRepository;

    public ChatController(ChatRoomRepository chatRoomRepository,
                          MessageRepository messageRepository,
                          LostItemRepository lostItemRepository) {
        this.chatRoomRepository = chatRoomRepository;
        this.messageRepository = messageRepository;
        this.lostItemRepository = lostItemRepository;
    }

    @PostMapping("/object/{uniqueCode}/message")
    public ResponseEntity<Message> sendMessageToObject(
            @PathVariable String uniqueCode,
            @RequestBody Message message) {

        // 1. Find LostItem by uniqueCode
        LostItem lostItem = lostItemRepository.findByUniqueCode(uniqueCode);
        if (lostItem == null) {
            return ResponseEntity.notFound().build();  // Return 404 if the LostItem is not found
        }

        Long objectId = lostItem.getId();

        // 2. Find or create ChatRoom associated with the LostItem
        ChatRoom chatRoom = chatRoomRepository.findByObjectId(objectId);
        if (chatRoom == null) {
            chatRoom = new ChatRoom();
            chatRoom.setObjectId(objectId);
            chatRoom = chatRoomRepository.save(chatRoom);  // Save the new ChatRoom
        }

        // 3. Save the Message
        message.setChatRoomId(chatRoom.getId());
        message.setTimestamp(LocalDateTime.now());
        Message savedMessage = messageRepository.save(message);

        return ResponseEntity.ok(savedMessage);
    }

    @GetMapping("/object/{uniqueCode}/messages")
    public ResponseEntity<List<Message>> getMessagesForObject(@PathVariable String uniqueCode) {

        // 1. Find LostItem by uniqueCode
        LostItem lostItem = lostItemRepository.findByUniqueCode(uniqueCode);
        if (lostItem == null) {
            return ResponseEntity.notFound().build();  // Return 404 if no object is found
        }

        Long objectId = lostItem.getId();

        // 2. Find ChatRoom by objectId
        ChatRoom chatRoom = chatRoomRepository.findByObjectId(objectId);
        if (chatRoom == null) {
            return ResponseEntity.notFound().build();  // Return 404 if no chat room exists for this object
        }

        // 3. Retrieve messages linked to the chat room
        List<Message> messages = messageRepository.findByChatRoomIdOrderByTimestampAsc(chatRoom.getId());
        return ResponseEntity.ok(messages);  // Return the list of messages
    }
}

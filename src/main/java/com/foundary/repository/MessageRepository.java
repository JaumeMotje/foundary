package com.foundary.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.foundary.model.Message;

public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findByChatRoomIdOrderByTimestampAsc(Long chatRoomId);
}

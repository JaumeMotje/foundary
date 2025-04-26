package com.foundary.dto;

public class LostItemDTO {
    private Long id;
    private String description;
    private String uniqueCode;
    private UserDTO owner;

    // Constructor
    public LostItemDTO(Long id, String description, String uniqueCode, UserDTO owner) {
        this.id = id;
        this.description = description;
        this.uniqueCode = uniqueCode;
        this.owner = owner;
    }

    // Getters
    public Long getId() { return id; }
    public String getDescription() { return description; }
    public String getUniqueCode() { return uniqueCode; }
    public UserDTO getOwner() { return owner; }
}

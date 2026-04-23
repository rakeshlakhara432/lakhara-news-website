package com.lakhara.news.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "members")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String name;
    private String fatherName;
    private String birthDate;
    private String gender;
    private String phone;
    private String email;
    private String bloodGroup;
    private String occupation;

    // Address
    private String state;
    private String district;
    private String city;
    private String pincode;

    private String familyType;
    private String photoUrl;
    private String anniversaryDate;
    private String memberNumber;
    private String memberId;

    private boolean isApproved;
    private String uid; // Linked to User account

    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}

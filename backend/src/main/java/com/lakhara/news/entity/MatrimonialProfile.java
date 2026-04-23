package com.lakhara.news.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "matrimonial_profiles")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MatrimonialProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String uid; // Linked to User

    private String name;
    private int age;
    private String gender; // वर / वधु
    private String caste;
    private String religion;
    private String height;
    private String education;
    private String occupation;
    private String income;
    private String city;
    
    @Column(columnDefinition = "TEXT")
    private String address;
    
    private String familyType;
    private String fatherName;
    private String motherName;
    private String phone;
    private String email;
    
    @Column(columnDefinition = "TEXT")
    private String bio;

    @ElementCollection
    private List<String> photos;

    private String kundliUrl;
    private String idProofUrl;

    private String ageRangePreference;
    private String educationPreference;
    private String cityPreference;

    private boolean hideContact;
    private boolean searchable;

    private boolean isApproved;
    private boolean isVerified;

    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}

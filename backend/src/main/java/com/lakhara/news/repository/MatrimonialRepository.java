package com.lakhara.news.repository;

import com.lakhara.news.entity.MatrimonialProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MatrimonialRepository extends JpaRepository<MatrimonialProfile, String> {
    List<MatrimonialProfile> findByIsApproved(boolean isApproved);
}

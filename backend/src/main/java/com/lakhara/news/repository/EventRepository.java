package com.lakhara.news.repository;

import com.lakhara.news.entity.SamajEvent;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<SamajEvent, String> {
}

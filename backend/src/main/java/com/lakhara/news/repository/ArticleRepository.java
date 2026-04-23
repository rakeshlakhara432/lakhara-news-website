package com.lakhara.news.repository;

import com.lakhara.news.entity.Article;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ArticleRepository extends JpaRepository<Article, String> {
    Optional<Article> findBySlug(String slug);
}

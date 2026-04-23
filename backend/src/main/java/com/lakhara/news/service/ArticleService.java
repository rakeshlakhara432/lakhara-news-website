package com.lakhara.news.service;

import com.lakhara.news.entity.Article;
import com.lakhara.news.repository.ArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ArticleService {

    @Autowired
    private ArticleRepository articleRepository;

    public List<Article> getAllArticles() {
        return articleRepository.findAll();
    }

    public Article getArticleBySlug(String slug) {
        return articleRepository.findBySlug(slug).orElse(null);
    }

    public Article createArticle(Article article) {
        return articleRepository.save(article);
    }

    public Article updateArticle(String id, Article articleDetails) {
        Article article = articleRepository.findById(id).orElseThrow();
        article.setTitle(articleDetails.getTitle());
        article.setContent(articleDetails.getContent());
        article.setExcerpt(articleDetails.getExcerpt());
        article.setImageUrl(articleDetails.getImageUrl());
        article.setBreaking(articleDetails.isBreaking());
        article.setTrending(articleDetails.isTrending());
        article.setTags(articleDetails.getTags());
        return articleRepository.save(article);
    }

    public void deleteArticle(String id) {
        articleRepository.deleteById(id);
    }
}

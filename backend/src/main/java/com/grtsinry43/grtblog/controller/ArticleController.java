package com.grtsinry43.grtblog.controller;

import com.grtsinry43.grtblog.dto.ApiResponse;
import com.grtsinry43.grtblog.dto.ArticleDTO;
import com.grtsinry43.grtblog.entity.Article;
import com.grtsinry43.grtblog.service.impl.ArticleServiceImpl;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.*;
import org.springframework.stereotype.Controller;

/**
 * <p>
 * 前端控制器
 * </p>
 *
 * @author grtsinry43
 * @since 2024-10-09
 */
@RestController
@RequestMapping("/article")
public class ArticleController {
    private final ArticleServiceImpl articleService;

    public ArticleController(ArticleServiceImpl articleService) {
        this.articleService = articleService;
    }

    @PostMapping
    public ApiResponse<Article> addArticleApi(@RequestBody ArticleDTO articleDTO, HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        // TODO test
        userId = 1844694783080140802L;
        Article article = articleService.addArticle(articleDTO, userId);
        return ApiResponse.success(article);
    }

}

package com.grtsinry43.grtblog.controller;

import com.grtsinry43.grtblog.dto.ApiResponse;
import com.grtsinry43.grtblog.dto.ArticleDTO;
import com.grtsinry43.grtblog.entity.Article;
import com.grtsinry43.grtblog.service.impl.ArticleServiceImpl;
import com.grtsinry43.grtblog.vo.ArticlePreview;
import com.grtsinry43.grtblog.vo.ArticleVO;
import com.grtsinry43.grtblog.vo.ArticleView;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public ApiResponse<ArticleVO> addArticleApi(@RequestBody ArticleDTO articleDTO, HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        // TODO test
        userId = 1850462330131976194L;
        ArticleVO article = articleService.addArticle(articleDTO, userId);
        return ApiResponse.success(article);
    }

    /**
     * 获取所有文章 id 的列表
     */
    @GetMapping("/ids")
    public ApiResponse<List<String>> getAllArticleIds() {
        List<Long> articleIds = articleService.getAllArticleIds();
        // 转成字符串防止精度丢失
        List<String> articleIdStr = articleIds.stream().map(String::valueOf).toList();
        return ApiResponse.success(articleIdStr);
    }


    @GetMapping("/{id}")
    public ApiResponse<ArticleView> viewOneArticleApi(@PathVariable String id) {
        Long idLong = Long.parseLong(id);
        ArticleView articleView = articleService.viewOneArticle(idLong);
        return ApiResponse.success(articleView);
    }

    @GetMapping("/lastFive")
    public ApiResponse<List<ArticlePreview>> getLastFiveArticles() {
        System.out.println("getLastFiveArticles");
        List<ArticlePreview> lastFiveArticles = articleService.getLastFiveArticleList();
        return ApiResponse.success(lastFiveArticles);
    }

    @GetMapping("/recommend/{id}")
    public ApiResponse<List<ArticlePreview>> getRecommendArticles(@PathVariable String id) {
        Long idLong = Long.parseLong(id);
        List<ArticlePreview> recommendArticles = articleService.getRecommendArticleList(idLong);
        return ApiResponse.success(recommendArticles);
    }

}

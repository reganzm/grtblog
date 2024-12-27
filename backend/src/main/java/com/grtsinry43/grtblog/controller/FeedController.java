package com.grtsinry43.grtblog.controller;

import com.grtsinry43.grtblog.dto.ApiResponse;
import com.grtsinry43.grtblog.entity.Article;
import com.grtsinry43.grtblog.entity.StatusUpdate;
import com.grtsinry43.grtblog.service.impl.ArticleServiceImpl;
import com.grtsinry43.grtblog.service.impl.StatusUpdateServiceImpl;
import com.grtsinry43.grtblog.service.impl.WebsiteInfoServiceImpl;
import com.grtsinry43.grtblog.vo.FeedPostItem;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @author grtsinry43
 * @date 2024/12/27 11:23
 * @description 热爱可抵岁月漫长
 */
@RestController
@RequestMapping("/feed")
public class FeedController {
    private final ArticleServiceImpl articleService;
    private final StatusUpdateServiceImpl statusUpdateService;
    private final WebsiteInfoServiceImpl websiteInfoService;

    public FeedController(ArticleServiceImpl articleService, StatusUpdateServiceImpl statusUpdateService, WebsiteInfoServiceImpl websiteInfoService) {
        this.articleService = articleService;
        this.statusUpdateService = statusUpdateService;
        this.websiteInfoService = websiteInfoService;
    }

    @GetMapping
    public ApiResponse<List<FeedPostItem>> getFeed() {
        List<Article> articles = articleService.list();
        List<StatusUpdate> statusUpdates = statusUpdateService.list();
        return ApiResponse.success(FeedPostItem.buildFeed(articles, statusUpdates, websiteInfoService.getWebsiteInfo("WEBSITE_URL")));
    }
}

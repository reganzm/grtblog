package com.grtsinry43.grtblog.util;

import com.grtsinry43.grtblog.entity.Article;
import com.grtsinry43.grtblog.entity.Category;
import com.grtsinry43.grtblog.entity.Page;
import com.grtsinry43.grtblog.entity.StatusUpdate;
import com.grtsinry43.grtblog.service.PageService;
import com.grtsinry43.grtblog.service.impl.ArticleServiceImpl;
import com.grtsinry43.grtblog.service.impl.CategoryServiceImpl;
import com.grtsinry43.grtblog.service.impl.StatusUpdateServiceImpl;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * @author grtsinry43
 * @date 2024/11/21 08:32
 * @description 热爱可抵岁月漫长
 */
@Component
public class PageMatcher {

    private final PageService pageService;
    private final ArticleServiceImpl articleService;
    public final StatusUpdateServiceImpl statusUpdateService;
    private final CategoryServiceImpl categoryService;

    public PageMatcher(PageService pageService, ArticleServiceImpl articleService, StatusUpdateServiceImpl statusUpdateService, CategoryServiceImpl categoryService) {
        this.pageService = pageService;
        this.articleService = articleService;
        this.statusUpdateService = statusUpdateService;
        this.categoryService = categoryService;
    }


    /**
     * 根据给定的路径匹配页面或文章详情。
     *
     * @param path 要匹配的路径
     * @return 匹配的页面或文章详情
     */
    public String matchPath(String path) {
        if (path.startsWith("/posts/")) {
            Article matchedArticle = articleService.getBaseMapper().getArticleByShortUrl(path.substring(7));
            return "文章：" + (matchedArticle != null ? matchedArticle.getTitle().length() > 15 ? matchedArticle.getTitle().substring(0, 15) + "..." : matchedArticle.getTitle() : "未知 (屮゜Д゜)屮");
        } else if (path.startsWith("/moments/")) {
            StatusUpdate matchedStatusUpdate = statusUpdateService.getBaseMapper().getStatusUpdateByShortUrl(path.substring(9));
            return "记录：" + (matchedStatusUpdate != null ? matchedStatusUpdate.getTitle().length() > 15 ? matchedStatusUpdate.getTitle().substring(0, 15) + "..." : matchedStatusUpdate.getTitle() : "未知 (屮゜Д゜)屮");
        } else if (path.isEmpty() || "/".equals(path)) {
            return "主页";
        } else if (path.startsWith("/categories/")) {
            Category matchedCategory = categoryService.getCategoryByShortUrl(path.substring(12));
            return "分类：" + (matchedCategory != null ? matchedCategory.getName() : "未知 (屮゜Д゜)屮");
        } else {
            Page matchedPage = pageService.getPageByPath(path);
            return "页面：" + (matchedPage != null ? matchedPage.getTitle() : "未知 (屮゜Д゜)屮");
        }
    }
}
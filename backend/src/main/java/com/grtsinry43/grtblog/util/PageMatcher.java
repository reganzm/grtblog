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

import java.net.InetSocketAddress;
import java.net.SocketAddress;
import java.util.concurrent.ConcurrentHashMap;

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
    private final ConcurrentHashMap<String, ConcurrentHashMap<String, Long>> ipAccessMap = new ConcurrentHashMap<>();
    private static final long ACCESS_INTERVAL = 600000; // 这里设置为 10 分钟，也就是说同一个 IP 地址 10 分钟内只能记录一次访问

    public PageMatcher(PageService pageService, ArticleServiceImpl articleService, StatusUpdateServiceImpl statusUpdateService, CategoryServiceImpl categoryService) {
        this.pageService = pageService;
        this.articleService = articleService;
        this.statusUpdateService = statusUpdateService;
        this.categoryService = categoryService;
    }

    public String matchPath(String path, SocketAddress socketAddress) {
        String ipAddress = ((InetSocketAddress) socketAddress).getAddress().getHostAddress();
        long currentTime = System.currentTimeMillis();

        ipAccessMap.putIfAbsent(ipAddress, new ConcurrentHashMap<>());
        ConcurrentHashMap<String, Long> pathAccessMap = ipAccessMap.get(ipAddress);

        if (pathAccessMap.containsKey(path) && (currentTime - pathAccessMap.get(path)) < ACCESS_INTERVAL) {
            return getPageTitle(path);
        }

        pathAccessMap.put(path, currentTime);

        if (path.startsWith("/posts/")) {
            Article matchedArticle = articleService.getBaseMapper().getArticleByShortUrl(path.substring(7));
            if (matchedArticle != null) {
                matchedArticle.setViews(matchedArticle.getViews() + 1);
                articleService.updateById(matchedArticle);
            }
            return "文章：" + (matchedArticle != null ? matchedArticle.getTitle().length() > 15 ? matchedArticle.getTitle().substring(0, 15) + "..." : matchedArticle.getTitle() : "未知 (屮゜Д゜)屮");
        } else if (path.startsWith("/moments/")) {
            StatusUpdate matchedStatusUpdate = statusUpdateService.getBaseMapper().getStatusUpdateByShortUrl(path.substring(9));
            if (matchedStatusUpdate != null) {
                matchedStatusUpdate.setViews(matchedStatusUpdate.getViews() + 1);
                statusUpdateService.updateById(matchedStatusUpdate);
            }
            return "记录：" + (matchedStatusUpdate != null ? matchedStatusUpdate.getTitle().length() > 15 ? matchedStatusUpdate.getTitle().substring(0, 15) + "..." : matchedStatusUpdate.getTitle() : "未知 (屮゜Д゜)屮");
        } else if (path.isEmpty() || "/".equals(path)) {
            return "主页";
        } else if (path.startsWith("/categories/")) {
            Category matchedCategory = categoryService.getCategoryByShortUrl(path.substring(12));
            return "分类：" + (matchedCategory != null ? matchedCategory.getName() : "未知 (屮゜Д゜)屮");
        } else {
            Page matchedPage = pageService.getPageByPath(path);
            if (matchedPage != null) {
                matchedPage.setViews(matchedPage.getViews() + 1);
                pageService.updateById(matchedPage);
            }
            return "页面：" + (matchedPage != null ? matchedPage.getTitle() : "未知 (屮゜Д゜)屮");
        }
    }

    private String getPageTitle(String path) {
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
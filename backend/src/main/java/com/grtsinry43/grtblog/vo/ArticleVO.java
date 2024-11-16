package com.grtsinry43.grtblog.vo;

import com.grtsinry43.grtblog.entity.Article;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * @author grtsinry43
 * @date 2024/10/27 18:47
 * @description 热爱可抵岁月漫长
 */
@Data
public class ArticleVO {
    private String id;

    private String title;

    private String summary;

    private String toc;

    private String content;

    private String author;

    private String cover;

    private String category;

    private Integer views;

    private Integer likes;

    private Integer comments;

    private String shortUrl;

    private Boolean isPublished;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private LocalDateTime deletedAt;

    private Boolean isTop;

    private Boolean isHot;

    private Boolean isOriginal;
}

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
    /**
     * 文章 ID，会由雪花算法生成
     */
    private String id;

    /**
     * 文章标题
     */
    private String title;

    /**
     * 文章内容，markdown 格式，交由前端解析
     */
    private String content;

    /**
     * 作者 ID
     */
    private String authorName;

    /**
     * 文章封面
     */
    private String cover;

    /**
     * 文章浏览量
     */
    private Integer views;

    /**
     * 文章点赞量
     */
    private Integer likes;

    /**
     * 文章评论量
     */
    private Integer comments;

    /**
     * 文章状态（PUBLISHED, DRAFT）
     */
    private String status;

    /**
     * 文章创建时间
     */
    private LocalDateTime createdAt;

    /**
     * 文章更新时间
     */
    private LocalDateTime updatedAt;

    /**
     * 文章删除时间（软删除），如果不为空则表示已删除
     */
    private LocalDateTime deletedAt;
}

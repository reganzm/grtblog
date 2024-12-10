package com.grtsinry43.grtblog.entity;

import com.baomidou.mybatisplus.annotation.FieldStrategy;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;

import lombok.Data;

/**
 * <p>
 *
 * </p>
 *
 * @author grtsinry43
 * @since 2024-10-09
 */
@Data
public class Article implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.ASSIGN_ID)
    private Long id;

    @TableField("title")
    private String title;

    @TableField("summary")
    private String summary;

    @TableField("toc")
    private String toc;

    @TableField("content")
    private String content;

    @TableField("author_id")
    private Long authorId;

    @TableField("cover")
    private String cover;

    @TableField("category_id")
    private Long categoryId;

    @TableField("views")
    private Integer views;

    @TableField("likes")
    private Integer likes;

    @TableField("comments")
    private Integer comments;

    @TableField("comment_id")
    private Long commentId;

    @TableField("short_url")
    private String shortUrl;

    @TableField("is_published")
    private Boolean isPublished;

    @TableField(value = "created_at", insertStrategy = FieldStrategy.NEVER)
    private LocalDateTime createdAt;
    @TableField(value = "updated_at", insertStrategy = FieldStrategy.NEVER, updateStrategy = FieldStrategy.NEVER)
    private LocalDateTime updatedAt;

    @TableField("deleted_at")
    private LocalDateTime deletedAt;

    @TableField("is_top")
    private Boolean isTop;

    @TableField("is_hot")
    private Boolean isHot;

    @TableField("is_original")
    private Boolean isOriginal;
}
package com.grtsinry43.grtblog.entity;

import com.baomidou.mybatisplus.annotation.*;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

/**
 * <p>
 *
 * </p>
 *
 * @author grtsinry43
 * @since 2024-10-09
 */
@Data
@TableName("status_update")
public class StatusUpdate implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    /**
     * 分享 ID，会由雪花算法生成
     */
    @TableId(value = "id", type = IdType.ASSIGN_ID)
    private Long id;

    /**
     * 分享标题
     */
    private String title;

    /**
     * 分享摘要
     */
    private String summary;

    /**
     * 分享内容，markdown 格式，交由前端解析
     */
    private String content;

    /**
     * 作者 ID，逻辑限制
     */
    private Long authorId;

    /**
     * 分享图片，多个图片用逗号分隔
     */
    private String img;

    /**
     * 分类 ID
     */
    private Long categoryId;

    /**
     * 分享浏览量
     */
    private Integer views;

    /**
     * 分享点赞量
     */
    private Integer likes;

    /**
     * 分享评论量
     */
    private Integer comments;

    /**
     * 挂载的评论 ID
     */
    private Long commentId;

    /**
     * 分享短链接
     */
    private String shortUrl;

    /**
     * 是否发布（0：否，1：是）
     */
    private Boolean isPublished;

    @TableField(value = "created_at", insertStrategy = FieldStrategy.NEVER, updateStrategy = FieldStrategy.NEVER)
    private LocalDateTime createdAt;
    @TableField(value = "updated_at", insertStrategy = FieldStrategy.NEVER, updateStrategy = FieldStrategy.NEVER)
    private LocalDateTime updatedAt;

    /**
     * 分享删除时间（软删除），如果不为空则表示已删除
     */
    private LocalDateTime deletedAt;

    /**
     * 是否置顶（0：否，1：是）
     */
    private Boolean isTop;

    /**
     * 是否热门（0：否，1：是）
     */
    private Boolean isHot;

    /**
     * 是否原创（0：否，1：是）
     */
    private Boolean isOriginal;
}
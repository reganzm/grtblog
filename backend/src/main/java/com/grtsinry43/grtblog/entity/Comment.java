package com.grtsinry43.grtblog.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;
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
@Getter
@Setter
public class Comment implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    /**
     * 评论ID，会由雪花算法生成
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    /**
     * 文章ID
     */
    private Long articleId;

    /**
     * 评论内容（markdown格式）
     */
    private String content;

    /**
     * 评论者ID
     */
    private Long authorId;

    /**
     * 评论者IP地址
     */
    private String ip;

    /**
     * 评论者归属地
     */
    private String location;

    /**
     * 评论者User-Agent
     */
    private String ua;

    /**
     * 评论者邮箱
     */
    private String email;

    /**
     * 评论者网站
     */
    private String website;

    /**
     * 评论状态（PUBLISHED, DRAFT）
     */
    private String status;

    /**
     * 评论创建时间
     */
    private LocalDateTime createdAt;

    /**
     * 评论更新时间
     */
    private LocalDateTime updatedAt;

    /**
     * 评论删除时间（软删除），如果不为空则表示已删除
     */
    private LocalDateTime deletedAt;

    /**
     * 父评论ID，如果为空则表示是顶级评论，否则是回复评论
     */
    private Long parentId;
}

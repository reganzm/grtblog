package com.grtsinry43.grtblog.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
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
public class Article implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 文章ID，会由雪花算法生成
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    /**
     * 文章标题
     */
    private String title;

    /**
     * 文章内容，markdown格式，交由前端解析
     */
    private String content;

    /**
     * 作者ID，逻辑限制
     */
    private Long authorId;

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
    private LocalDateTime created;

    /**
     * 文章更新时间
     */
    private LocalDateTime updated;

    /**
     * 文章删除时间（软删除），如果不为空则表示已删除
     */
    private LocalDateTime deleted;
}

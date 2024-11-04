package com.grtsinry43.grtblog.vo;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * @author grtsinry43
 * @date 2024/11/2 22:49
 * @description 热爱可抵岁月漫长
 */
@Data
public class CommentVO {
    private String id;

    /**
     * 文章 ID
     */
    private String articleId;

    /**
     * 评论内容（markdown 格式）
     */
    private String content;

    /**
     * 评论者头像
     */
    private String avatarUrl;

    /**
     * 评论者昵称
     */
    private String userName;

    /**
     * 评论者归属地
     */
    private String location;

    /**
     * 评论者网站
     */
    private String website;

    /**
     * 评论创建时间
     */
    private LocalDateTime createdAt;

    /**
     * 评论更新时间
     */
    private LocalDateTime updatedAt;

    private String parentId;

    /**
     * 查看时候存储子评论，而存储时候存储父评论 id
     */
    private List<CommentVO> children = new ArrayList<>();
}

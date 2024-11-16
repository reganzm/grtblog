package com.grtsinry43.grtblog.dto;

import lombok.Data;

/**
 * @author grtsinry43
 * @date 2024/11/2 22:54
 * @description 热爱可抵岁月漫长
 */
@Data
public class CommentNotLoginForm {
    /**
     * 文章ID
     */
    private String shortUrl;

    /**
     * 评论内容（markdown格式）
     */
    private String content;

    /**
     * 评论者昵称
     */
    private String userName;

    /**
     * 评论者邮箱
     */
    private String email;

    /**
     * 评论者网站
     */
    private String website;

    /**
     * 父评论ID，如果为空则表示是顶级评论，否则是回复评论
     */
    private String parentId;
}

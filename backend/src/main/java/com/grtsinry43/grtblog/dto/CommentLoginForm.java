package com.grtsinry43.grtblog.dto;

import lombok.Data;

/**
 * @author grtsinry43
 * @date 2024/11/26 15:11
 * @description 热爱可抵岁月漫长
 */
@Data
public class CommentLoginForm {
    /**
     * 评论区 id
     */
    private String areaId;

    /**
     * 评论内容（markdown 格式）
     */
    private String content;

    /**
     * 父评论 ID，如果为空则表示是顶级评论，否则是回复评论
     */
    private String parentId;
}

package com.grtsinry43.grtblog.vo;

import lombok.Data;

import java.time.LocalDateTime;

/**
 * @author grtsinry43
 * @date 2024/11/1 13:04
 * @description 热爱可抵岁月漫长
 */
@Data
public class StatusUpdatePreview {
    /**
     * 说说短链接
     */
    private String shortUrl;

    /**
     * 作者名字
     */
    private String authorName;

    /**
     * 图片
     */
    private String[] images;

    /**
     * 说说标题
     */
    private String title;

    /**
     * 说说摘要
     */
    private String summary;

    /**
     * 查看次数
     */
    private Integer views;

    /**
     * 评论次数
     */
    private Integer comments;

    /**
     * 点赞次数
     */
    private Integer likes;

    /**
     * 说说创建时间
     */
    private LocalDateTime createdAt;

    /**
     * 说说更新时间
     */
    private LocalDateTime updatedAt;
}

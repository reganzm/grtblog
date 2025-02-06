package com.grtsinry43.grtblog.vo;

import lombok.Data;

import java.time.LocalDateTime;

/**
 * @author grtsinry43
 * @date 2024/11/22 11:02
 * @description 热爱可抵岁月漫长
 */
@Data
public class PageVO {
    private String id;
    private String title;
    private String description;
    private String aiSummary;
    private String refPath;
    private String toc;
    private String content;
    private Integer views;
    private Integer likes;
    private Integer comments;
    private String commentId;
    private Boolean enable;
    private Boolean canDelete;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

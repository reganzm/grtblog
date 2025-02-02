package com.grtsinry43.grtblog.vo;

import lombok.Data;

import java.time.LocalDateTime;

/**
 * @author grtsinry43
 * @date 2025/2/1 23:21
 * @description 热爱可抵岁月漫长
 */
@Data
public class CommentAreaVO {
    private String id;
    private String areaName;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

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
     * 说说 ID，会由雪花算法生成
     */
    private String id;

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
     * 说说创建时间
     */
    private LocalDateTime createdAt;

    /**
     * 说说更新时间
     */
    private LocalDateTime updatedAt;
}

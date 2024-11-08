package com.grtsinry43.grtblog.vo;

import lombok.Data;

import java.time.LocalDateTime;

/**
 * @author grtsinry43
 * @date 2024/11/8 17:23
 * @description 热爱可抵岁月漫长
 */
@Data
public class StatusUpdateView {
    private String id;

    /**
     * 用户名字
     */
    private String authorName;

    /**
     * 图片
     */
    private String[] images;

    /**
     * 说说内容（markdown 格式，交由前端解析）
     */
    private String content;

    /**
     * 说说创建时间
     */
    private LocalDateTime createdAt;

    /**
     * 说说更新时间
     */
    private LocalDateTime updatedAt;
}

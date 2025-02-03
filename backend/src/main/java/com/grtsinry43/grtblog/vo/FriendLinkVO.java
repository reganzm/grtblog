package com.grtsinry43.grtblog.vo;

import lombok.Data;

import java.time.LocalDateTime;

/**
 * @author grtsinry43
 * @date 2025/2/3 11:03
 * @description 热爱可抵岁月漫长
 */
@Data
public class FriendLinkVO {
    private String id;

    /**
     * 友链名称
     */
    private String name;

    /**
     * 友链URL
     */
    private String url;

    /**
     * 友链Logo
     */
    private String logo;

    /**
     * 友链描述
     */
    private String description;

    private String userId;

    /**
     * 是否激活
     */
    private Boolean isActive;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    /**
     * 友链删除时间（软删除），如果不为空则表示已删除
     */
    private LocalDateTime deletedAt;
}

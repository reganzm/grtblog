package com.grtsinry43.grtblog.dto;

import lombok.Data;

/**
 * @author grtsinry43
 * @date 2024/12/12 09:06
 * @description 热爱可抵岁月漫长
 */
@Data
public class FriendLinkRequest {
    /**
     * 友链名称
     */
    private String name;

    /**
     * 友链 URL
     */
    private String url;

    /**
     * 友链 Logo
     */
    private String logo;

    /**
     * 友链描述
     */
    private String description;
}

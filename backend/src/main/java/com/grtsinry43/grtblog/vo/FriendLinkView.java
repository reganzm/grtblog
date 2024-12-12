package com.grtsinry43.grtblog.vo;

import lombok.Data;

/**
 * @author grtsinry43
 * @date 2024/12/12 09:01
 * @description 热爱可抵岁月漫长
 */
@Data
public class FriendLinkView {
    /**
     * 友链 ID，会由雪花算法生成
     */
    private String id;

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

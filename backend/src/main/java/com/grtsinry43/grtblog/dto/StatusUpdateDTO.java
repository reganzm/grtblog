package com.grtsinry43.grtblog.dto;

import lombok.Data;

/**
 * @author grtsinry43
 * @date 2024/11/21 20:12
 * @description 热爱可抵岁月漫长
 */
@Data
public class StatusUpdateDTO {
    /**
     * 分享标题
     */
    private String title;

    /**
     * 分享摘要
     */
    private String summary;

    /**
     * 分享内容，markdown 格式，交由前端解析
     */
    private String content;

    /**
     * 分享图片，多个图片用逗号分隔
     */
    private String img;

    /**
     * 分类 ID
     */
    private String categoryId;

    /**
     * 分享短链接
     */
    private String shortUrl;

    /**
     * 是否发布（0：否，1：是）
     */
    private Boolean isPublished;

    /**
     * 是否置顶（0：否，1：是）
     */
    private Boolean isTop;

    /**
     * 是否热门（0：否，1：是）
     */
    private Boolean isHot;

    /**
     * 是否原创（0：否，1：是）
     */
    private Boolean isOriginal;
}

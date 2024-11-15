package com.grtsinry43.grtblog.vo;

import lombok.Data;

/**
 * @author grtsinry43
 * @date 2024/11/15 12:00
 * @description 热爱可抵岁月漫长
 */
@Data
public class TagVO {
    private String tagId;
    private String tagName;
    private Integer articleCount;
}

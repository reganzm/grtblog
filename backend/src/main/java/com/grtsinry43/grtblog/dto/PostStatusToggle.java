package com.grtsinry43.grtblog.dto;

import lombok.Data;

/**
 * @author grtsinry43
 * @date 2024/11/28 08:44
 * @description 热爱可抵岁月漫长
 */
@Data
public class PostStatusToggle {
    private Boolean isPublished;
    private Boolean isTop;
    private Boolean isHot;
    private Boolean isOriginal;

    public PostStatusToggle() {
    }
}

package com.grtsinry43.grtblog.dto;

import lombok.Data;

/**
 * @author grtsinry43
 * @date 2024/11/22 11:14
 * @description 热爱可抵岁月漫长
 */
@Data
public class PageDTO {
    private String title;
    private String description;
    private String refPath;
    private String content;
    private Boolean enable;
    private Boolean canComment;
}

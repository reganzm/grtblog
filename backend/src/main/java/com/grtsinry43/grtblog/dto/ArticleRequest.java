package com.grtsinry43.grtblog.dto;

import com.grtsinry43.grtblog.common.ContentType;
import lombok.Data;

/**
 * @author grtsinry43
 * @date 2025/2/6 13:28
 * @description 热爱可抵岁月漫长
 */
@Data
public class ArticleRequest {
    private String model;
    private ContentType type;
    private String targetId;
}


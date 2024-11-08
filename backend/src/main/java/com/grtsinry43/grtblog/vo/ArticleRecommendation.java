package com.grtsinry43.grtblog.vo;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

/**
 * @author grtsinry43
 * @date 2024/11/8 00:31
 * @description 热爱可抵岁月漫长
 */
@Data
public class ArticleRecommendation {
    @JsonProperty("article_id")
    private Long articleId;

    @JsonProperty("recommendation")
    private String[] recommendation;
}

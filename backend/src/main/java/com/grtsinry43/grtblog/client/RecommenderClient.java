package com.grtsinry43.grtblog.client;

import com.grtsinry43.grtblog.dto.ApiResponse;
import com.grtsinry43.grtblog.vo.ArticleRecommendation;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * @author grtsinry43
 * @date 2024/11/8 00:24
 * @description 热爱可抵岁月漫长
 */

@FeignClient(name = "recommender-service", url = "http://localhost:8001/article")
public interface RecommenderClient {

    @GetMapping("/{article_id}")
    ApiResponse<ArticleRecommendation> getRecommendations(@PathVariable("article_id") String articleId, @RequestParam("count") Integer size);
}
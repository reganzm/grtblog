package com.grtsinry43.grtblog.service;

/**
 * @author grtsinry43
 * @date 2024/11/8 00:26
 * @description 热爱可抵岁月漫长
 */

import com.grtsinry43.grtblog.client.RecommenderClient;
import com.grtsinry43.grtblog.dto.ApiResponse;
import com.grtsinry43.grtblog.vo.ArticleRecommendation;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecommendationService {

    private final RecommenderClient recommenderClient;

    public RecommendationService(RecommenderClient recommenderClient) {
        this.recommenderClient = recommenderClient;
    }

    public String[] getRecommendations(Long articleId, Integer count) {
        ApiResponse<ArticleRecommendation> res = recommenderClient.getRecommendations(articleId.toString(), count);
        if (res.getCode() == 0) {
            return res.getData().getRecommendation();
        } else {
            return new String[0];
        }
    }
}


package com.grtsinry43.grtblog.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.grtsinry43.grtblog.entity.Article;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

/**
 * @author grtsinry43
 * @date 2024/10/9 19:10
 * @description 用于封装提交文章请求的 DTO
 */
@Data
public class ArticleDTO {
    private String title;
    private String content;
    private String cover;
    private Long categoryId;
    private String tags;
    private Article.Status status;

    public ArticleDTO() {
    }
}
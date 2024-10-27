package com.grtsinry43.grtblog.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
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
    private String tags;
    private String status;

    public ArticleDTO() {
    }

    @JsonCreator
    public ArticleDTO(String title, String content, String status) {
        this.title = title;
        this.content = content;
        this.status = status;
    }
}
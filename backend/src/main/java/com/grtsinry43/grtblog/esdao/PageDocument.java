package com.grtsinry43.grtblog.esdao;


import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

/**
 * @author grtsinry43
 * @date 2024/11/23 18:26
 * @description 热爱可抵岁月漫长
 */
@Data
@Document(indexName = "page")
public class PageDocument {
    @Id
    private Long id;

    @Field(type = FieldType.Text, analyzer = "ik_max_word", searchAnalyzer = "ik_smart")
    private String title;

    @Field(type = FieldType.Text, analyzer = "ik_max_word", searchAnalyzer = "ik_smart")
    private String description;

    @Field(type = FieldType.Text, analyzer = "ik_max_word", searchAnalyzer = "ik_smart")
    private String content;

    private String shortUrl;

    public PageDocument(Long id, String title, String description, String content, String shortUrl) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.content = content;
        this.shortUrl = shortUrl;
    }

    public PageDocument() {
    }
}
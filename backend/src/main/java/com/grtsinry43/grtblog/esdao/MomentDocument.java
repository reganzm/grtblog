package com.grtsinry43.grtblog.esdao;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

/**
 * @author grtsinry43
 * @date 2024/11/23 18:28
 * @description 热爱可抵岁月漫长
 */
@Data
@Document(indexName = "moment")
public class MomentDocument {
    @Id
    private Long id;
    private String title;
    private String summary;
    private String content;
    private String shortUrl;

    public MomentDocument(Long id, String title, String summary, String content, String shortUrl) {
        this.id = id;
        this.title = title;
        this.summary = summary;
        this.content = content;
        this.shortUrl = shortUrl;
    }

    public MomentDocument() {
    }
}

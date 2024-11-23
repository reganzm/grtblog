package com.grtsinry43.grtblog.dto;

import com.grtsinry43.grtblog.esdao.ArticleDocument;
import com.grtsinry43.grtblog.esdao.MomentDocument;
import com.grtsinry43.grtblog.esdao.PageDocument;
import lombok.Data;

import java.util.List;

/**
 * @author grtsinry43
 * @date 2024/11/23 18:31
 * @description 热爱可抵岁月漫长
 */
@Data
public class AggregatedSearchResult {
    private List<HighlightedPageDocument> pages;
    private List<HighlightedArticleDocument> articles;
    private List<HighlightedMomentDocument> moments;

    @Data
    public static class HighlightedPageDocument extends PageDocument {
        private String highlightedContent;
        private String shortUrl;

        public HighlightedPageDocument(PageDocument pageDocument, String highlightedContent, String shortUrl) {
            super(null, pageDocument.getTitle(), pageDocument.getDescription(), null, shortUrl);
            this.highlightedContent = highlightedContent;
            this.shortUrl = shortUrl;
        }
    }

    @Data
    public static class HighlightedArticleDocument extends ArticleDocument {
        private String highlightedContent;
        private String shortUrl;

        public HighlightedArticleDocument(ArticleDocument articleDocument, String highlightedContent, String shortUrl) {
            super(null, articleDocument.getTitle(), articleDocument.getSummary(), null, shortUrl);
            this.highlightedContent = highlightedContent;
            this.shortUrl = shortUrl;
        }
    }

    @Data
    public static class HighlightedMomentDocument extends MomentDocument {
        private String highlightedContent;
        private String shortUrl;

        public HighlightedMomentDocument(MomentDocument momentDocument, String highlightedContent, String shortUrl) {
            super(null, momentDocument.getTitle(), momentDocument.getSummary(), null, shortUrl);
            this.highlightedContent = highlightedContent;
            this.shortUrl = shortUrl;
        }
    }
}
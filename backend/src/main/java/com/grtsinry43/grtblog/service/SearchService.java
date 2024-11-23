package com.grtsinry43.grtblog.service;


import com.grtsinry43.grtblog.dto.AggregatedSearchResult;
import com.grtsinry43.grtblog.esdao.ArticleDocument;
import com.grtsinry43.grtblog.esdao.MomentDocument;
import com.grtsinry43.grtblog.esdao.PageDocument;
import com.grtsinry43.grtblog.esrepo.ArticleRepository;
import com.grtsinry43.grtblog.esrepo.MomentRepository;
import com.grtsinry43.grtblog.esrepo.PageRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * @author grtsinry43
 * @date 2024/11/23 18:32
 * @description 热爱可抵岁月漫长
 */
@Service
public class SearchService {
    private final PageRepository pageRepository;
    private final ArticleRepository articleRepository;
    private final MomentRepository momentRepository;

    public SearchService(PageRepository pageRepository, ArticleRepository articleRepository, MomentRepository momentRepository) {
        this.pageRepository = pageRepository;
        this.articleRepository = articleRepository;
        this.momentRepository = momentRepository;
    }

    public AggregatedSearchResult searchAll(String keyword) {
        AggregatedSearchResult result = new AggregatedSearchResult();
        result.setPages(highlightPageResults(pageRepository.findByTitleContainingOrContentContainingOrDescriptionContaining(keyword, keyword, keyword), keyword));
        result.setArticles(highlightArticleResults(articleRepository.findByTitleContainingOrContentContainingOrSummaryContaining(keyword, keyword, keyword), keyword));
        result.setMoments(highlightMomentResults(momentRepository.findByTitleContainingOrContentContainingOrSummaryContaining(keyword, keyword, keyword), keyword));

        return result;
    }

    private List<AggregatedSearchResult.HighlightedPageDocument> highlightPageResults(List<PageDocument> pages, String keyword) {
        return pages.stream()
                .map(page -> new AggregatedSearchResult.HighlightedPageDocument(page, getHighlightedSnippet(page.getContent(), keyword), page.getShortUrl()))
                .collect(Collectors.toList());
    }

    private List<AggregatedSearchResult.HighlightedArticleDocument> highlightArticleResults(List<ArticleDocument> articles, String keyword) {
        return articles.stream()
                .map(article -> new AggregatedSearchResult.HighlightedArticleDocument(article, getHighlightedSnippet(article.getContent(), keyword), article.getShortUrl()))
                .collect(Collectors.toList());
    }

    private List<AggregatedSearchResult.HighlightedMomentDocument> highlightMomentResults(List<MomentDocument> moments, String keyword) {
        return moments.stream()
                .map(moment -> new AggregatedSearchResult.HighlightedMomentDocument(moment, getHighlightedSnippet(moment.getContent(), keyword), moment.getShortUrl()))
                .collect(Collectors.toList());
    }

    private String getHighlightedSnippet(String content, String keyword) {
        int snippetLength = 100;
        int keywordIndex = content.toLowerCase().indexOf(keyword.toLowerCase());
        if (keywordIndex == -1) {
            return content;
        }

        int start = Math.max(0, keywordIndex - snippetLength / 2);
        int end = Math.min(content.length(), keywordIndex + keyword.length() + snippetLength / 2);

        String snippet = content.substring(start, end);
        return snippet.replaceAll("(?i)(" + keyword + ")", "<em>$1</em>");
    }
}
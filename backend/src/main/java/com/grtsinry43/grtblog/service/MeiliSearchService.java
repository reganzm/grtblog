package com.grtsinry43.grtblog.service;

import com.grtsinry43.grtblog.dto.AggregatedSearchResult;
import com.grtsinry43.grtblog.dto.AggregatedSearchResult.HighlightedArticleDocument;
import com.grtsinry43.grtblog.dto.AggregatedSearchResult.HighlightedMomentDocument;
import com.grtsinry43.grtblog.dto.AggregatedSearchResult.HighlightedPageDocument;
import com.grtsinry43.grtblog.esdao.ArticleDocument;
import com.grtsinry43.grtblog.esdao.MomentDocument;
import com.grtsinry43.grtblog.esdao.PageDocument;
import com.meilisearch.sdk.Client;
import com.meilisearch.sdk.SearchRequest;
import com.meilisearch.sdk.model.Searchable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MeiliSearchService {
    private final Client meiliSearchClient;

    @Autowired
    public MeiliSearchService(Client meiliSearchClient) {
        this.meiliSearchClient = meiliSearchClient;
    }

    public AggregatedSearchResult searchAll(String keyword) {
        AggregatedSearchResult result = new AggregatedSearchResult();
        result.setPages(searchPages(keyword));
        result.setArticles(searchArticles(keyword));
        result.setMoments(searchMoments(keyword));

        return result;
    }

    private List<HighlightedPageDocument> searchPages(String keyword) {
        Searchable searchResponse = meiliSearchClient.index("pages").search(new SearchRequest(keyword));
        return searchResponse.getHits().stream()
                .map(hit -> new HighlightedPageDocument(
                        new PageDocument(
                                0L,
                                hit.get("title") != null ? hit.get("title").toString() : "",
                                hit.get("description") != null ? hit.get("description").toString() : "",
                                hit.get("content") != null ? hit.get("content").toString() : "",
                                hit.get("shortUrl") != null ? hit.get("shortUrl").toString() : ""),
                        getHighlightedSnippet(hit.get("content") != null ? hit.get("content").toString() : "", hit.get("summary") != null ? hit.get("summary").toString() : "", keyword),
                        hit.get("shortUrl") != null ? hit.get("shortUrl").toString() : ""))
                .collect(Collectors.toList());
    }

    private List<HighlightedArticleDocument> searchArticles(String keyword) {
        Searchable searchResponse = meiliSearchClient.index("articles").search(new SearchRequest(keyword));
        return searchResponse.getHits().stream()
                .map(hit -> new HighlightedArticleDocument(
                        new ArticleDocument(
                                0L,
                                hit.get("title") != null ? hit.get("title").toString() : "",
                                hit.get("summary") != null ? hit.get("summary").toString() : "",
                                hit.get("content") != null ? hit.get("content").toString() : "",
                                hit.get("shortUrl") != null ? hit.get("shortUrl").toString() : ""),
                        getHighlightedSnippet(hit.get("content") != null ? hit.get("content").toString() : "", hit.get("summary") != null ? hit.get("summary").toString() : "", keyword),
                        hit.get("shortUrl") != null ? hit.get("shortUrl").toString() : ""))
                .collect(Collectors.toList());
    }

    private List<HighlightedMomentDocument> searchMoments(String keyword) {
        Searchable searchResponse = meiliSearchClient.index("moments").search(new SearchRequest(keyword));
        return searchResponse.getHits().stream()
                .map(hit -> new HighlightedMomentDocument(
                        new MomentDocument(
                                0L,
                                hit.get("title") != null ? hit.get("title").toString() : "",
                                hit.get("summary") != null ? hit.get("summary").toString() : "",
                                hit.get("content") != null ? hit.get("content").toString() : "",
                                hit.get("shortUrl") != null ? hit.get("shortUrl").toString() : ""),
                        getHighlightedSnippet(hit.get("content") != null ? hit.get("content").toString() : "", hit.get("summary") != null ? hit.get("summary").toString() : "", keyword),
                        hit.get("shortUrl") != null ? hit.get("shortUrl").toString() : ""))
                .collect(Collectors.toList());
    }

    private String getHighlightedSnippet(String content, String summary, String keyword) {
        int snippetLength = 100;
        int keywordIndex = content.toLowerCase().indexOf(keyword.toLowerCase());
        if (keywordIndex == -1) {
            return summary;
        }

        int start = Math.max(0, keywordIndex - snippetLength / 2);
        int end = Math.min(content.length(), keywordIndex + keyword.length() + snippetLength / 2);

        String snippet = content.substring(start, end);
        return snippet.replaceAll("(?i)(" + keyword + ")", "<em>$1</em>");
    }
}
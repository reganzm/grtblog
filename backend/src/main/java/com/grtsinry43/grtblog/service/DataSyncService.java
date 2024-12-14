package com.grtsinry43.grtblog.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.grtsinry43.grtblog.entity.Article;
import com.grtsinry43.grtblog.entity.Page;
import com.grtsinry43.grtblog.entity.StatusUpdate;
import com.grtsinry43.grtblog.esdao.ArticleDocument;
import com.grtsinry43.grtblog.esdao.MomentDocument;
import com.grtsinry43.grtblog.esdao.PageDocument;
import com.grtsinry43.grtblog.esrepo.ArticleRepository;
import com.grtsinry43.grtblog.esrepo.MomentRepository;
import com.grtsinry43.grtblog.esrepo.PageRepository;
import com.grtsinry43.grtblog.mapper.ArticleMapper;
import com.grtsinry43.grtblog.mapper.PageMapper;
import com.grtsinry43.grtblog.mapper.StatusUpdateMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

/**
 * @author grtsinry43
 * @date 2024/11/23 18:42
 * @description 热爱可抵岁月漫长
 */
@Service
public class DataSyncService {
    private final ArticleMapper articleMapper;
    private final ArticleRepository articleRepository;
    private final StatusUpdateMapper statusUpdateMapper;
    private final MomentRepository momentRepository;
    private final PageMapper pageMapper;
    private final PageRepository pageRepository;

    public DataSyncService(ArticleMapper articleMapper, ArticleRepository articleRepository, StatusUpdateMapper statusUpdateMapper, MomentRepository momentRepository, PageMapper pageMapper, PageRepository pageRepository) {
        this.articleMapper = articleMapper;
        this.articleRepository = articleRepository;
        this.statusUpdateMapper = statusUpdateMapper;
        this.momentRepository = momentRepository;
        this.pageMapper = pageMapper;
        this.pageRepository = pageRepository;
    }

    /**
     * 查询最近 5 分钟的数据，同步到 ES
     */
    public void syncAllRecent() {
        List<Article> articles = articleMapper.selectList(new QueryWrapper<Article>().lambda().ge(Article::getUpdatedAt, LocalDateTime.now().minusMinutes(5)));
        List<ArticleDocument> articleDocuments = articles.stream()
                .filter(article -> article.getIsPublished() && article.getDeletedAt() == null)
                .map(article -> new ArticleDocument(article.getId(), article.getTitle(), article.getSummary(), article.getContent(), article.getShortUrl()))
                .toList();
        articleRepository.saveAll(articleDocuments);
        List<StatusUpdate> statusUpdates = statusUpdateMapper.selectList(new QueryWrapper<StatusUpdate>().lambda().ge(StatusUpdate::getUpdatedAt, LocalDateTime.now().minusMinutes(5)));
        List<MomentDocument> statusUpdateDocuments = statusUpdates.stream()
                .filter(statusUpdate -> statusUpdate.getIsPublished() && statusUpdate.getDeletedAt() == null)
                .map(statusUpdate -> new MomentDocument(statusUpdate.getId(), statusUpdate.getTitle(), statusUpdate.getSummary(), statusUpdate.getContent(), statusUpdate.getShortUrl()))
                .toList();
        momentRepository.saveAll(statusUpdateDocuments);
        List<Page> pages = pageMapper.selectList(new QueryWrapper<Page>().lambda().ge(Page::getUpdatedAt, LocalDateTime.now().minusMinutes(5)));
        List<PageDocument> pageDocuments = pages.stream()
                .filter(page -> page.getDeletedAt() == null)
                .map(page -> new PageDocument(page.getId(), page.getTitle(), page.getDescription(), page.getContent(), page.getRefPath()))
                .toList();
        pageRepository.saveAll(pageDocuments);
    }

    /**
     * 查询所有数据，同步到 ES
     */
    public void syncAll() {
        List<Article> articles = articleMapper.selectList(null);
        List<ArticleDocument> articleDocuments = articles.stream()
                .map(article -> new ArticleDocument(article.getId(), article.getTitle(), article.getSummary(), article.getContent(), article.getShortUrl()))
                .toList();
        articleRepository.saveAll(articleDocuments);
        List<StatusUpdate> statusUpdates = statusUpdateMapper.selectList(null);
        List<MomentDocument> statusUpdateDocuments = statusUpdates.stream()
                .map(statusUpdate -> new MomentDocument(statusUpdate.getId(), statusUpdate.getTitle(), statusUpdate.getSummary(), statusUpdate.getContent(), statusUpdate.getShortUrl()))
                .toList();
        momentRepository.saveAll(statusUpdateDocuments);
        List<Page> pages = pageMapper.selectList(null);
        List<PageDocument> pageDocuments = pages.stream()
                .map(page -> new PageDocument(page.getId(), page.getTitle(), page.getDescription(), page.getContent(), page.getRefPath()))
                .toList();
        pageRepository.saveAll(pageDocuments);
    }
}

package com.grtsinry43.grtblog.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.grtsinry43.grtblog.common.ErrorCode;
import com.grtsinry43.grtblog.dto.ArticleDTO;
import com.grtsinry43.grtblog.entity.Article;
import com.grtsinry43.grtblog.exception.BusinessException;
import com.grtsinry43.grtblog.mapper.ArticleMapper;
import com.grtsinry43.grtblog.service.IArticleService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.grtsinry43.grtblog.service.RecommendationService;
import com.grtsinry43.grtblog.util.ArticleParser;
import com.grtsinry43.grtblog.vo.ArticlePreview;
import com.grtsinry43.grtblog.vo.ArticleVO;
import com.grtsinry43.grtblog.vo.ArticleView;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

/**
 * <p>
 * 服务实现类
 * </p>
 *
 * @author grtsinry43
 * @since 2024-10-09
 */
@Service
public class ArticleServiceImpl extends ServiceImpl<ArticleMapper, Article> implements IArticleService {
    private final ArticleTagServiceImpl articleTagService;
    private final TagServiceImpl tagService;
    private final CategoryServiceImpl categoryService;
    private final UserServiceImpl userService;
    private final RecommendationService recommendationService;

    public ArticleServiceImpl(ArticleTagServiceImpl articleTagService, TagServiceImpl tagService, CategoryServiceImpl categoryService, UserServiceImpl userService, RecommendationService recommendationService) {
        this.articleTagService = articleTagService;
        this.tagService = tagService;
        this.categoryService = categoryService;
        this.userService = userService;
        this.recommendationService = recommendationService;
    }

    @Override
    public ArticleVO addArticle(ArticleDTO articleDTO, Long userId) {
        Article article = new Article();
        BeanUtils.copyProperties(articleDTO, article);
        article.setAuthorId(userId);
        // 解析文章并生成目录
        String toc = null;
        try {
            toc = ArticleParser.generateToc(articleDTO.getContent());
        } catch (JsonProcessingException e) {
            throw new BusinessException(ErrorCode.OPERATION_ERROR);
        }
        article.setToc(toc);
        if (!categoryService.isCategoryExist(articleDTO.getCategoryId())) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        // 处理标签
        String[] tagNames = articleDTO.getTags().split(",");
        Long[] tagIds = Arrays.stream(tagNames)
                .map(tagService::getOrCreateTagId)
                .toArray(Long[]::new);
        if (article.getSummary() == null) {
            article.setSummary(article.getContent().length() > 200 ? article.getContent().substring(0, 200) : article.getContent());
        }
        this.baseMapper.insert(article);
        articleTagService.syncArticleTag(article.getId(), tagIds);
        recommendationService.updateArticleStatus(article);
        ArticleVO articleVO = new ArticleVO();
        BeanUtils.copyProperties(article, articleVO);
        articleVO.setId(article.getId().toString());
        articleVO.setAuthorName(userService.getById(userId).getNickname());
        return articleVO;
    }

    @Override
    public ArticleView viewOneArticle(Long id) {
        Article article = this.baseMapper.selectById(id);
        if (article == null) {
            throw new BusinessException(ErrorCode.NOT_FOUND);
        }
        ArticleView articleView = new ArticleView();
        BeanUtils.copyProperties(article, articleView);
        articleView.setId(article.getId().toString());
        articleView.setAuthorName(userService.getById(article.getAuthorId()).getNickname());
        return articleView;
    }


    @Override
    public List<Long> getAllArticleIds() {
        return this.list().stream().map(Article::getId).collect(Collectors.toList());
    }

    @Override
    public List<ArticlePreview> getLastFiveArticleList() {
        try {
            List<Article> articles = this.baseMapper.getLastFiveArticles();
            return articles.stream().map(article -> {
                ArticlePreview articlePreview = new ArticlePreview();
                BeanUtils.copyProperties(article, articlePreview);
                articlePreview.setId(article.getId().toString());
                articlePreview.setAvatar(userService.getById(article.getAuthorId()).getAvatar());
                articlePreview.setAuthorName(userService.getById(article.getAuthorId()).getNickname());
                return articlePreview;
            }).collect(Collectors.toList());
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return null;
    }

    @Override
    public List<ArticlePreview> getRecommendArticleList(Long articleId) {
        String[] recommendArticleIdsArray = recommendationService.getRecommendations(articleId, 5);
        List<Long> recommendArticleIds = Arrays.stream(recommendArticleIdsArray)
                .map(Long::parseLong)
                .toList();
        return recommendArticleIds.stream().map(id -> {
            Article article = this.baseMapper.selectById(id);
            ArticlePreview articlePreview = new ArticlePreview();
            BeanUtils.copyProperties(article, articlePreview);
            articlePreview.setId(article.getId().toString());
            articlePreview.setAvatar(userService.getById(article.getAuthorId()).getAvatar());
            articlePreview.setAuthorName(userService.getById(article.getAuthorId()).getNickname());
            return articlePreview;
        }).collect(Collectors.toList());
    }

    @Override
    public List<ArticlePreview> getArticleListByPage(Integer page, Integer pageSize) {
        List<Article> articles = this.baseMapper.getArticleListByPage((page - 1) * pageSize, pageSize);
        return articles.stream().map(article -> {
            ArticlePreview articlePreview = new ArticlePreview();
            BeanUtils.copyProperties(article, articlePreview);
            articlePreview.setId(article.getId().toString());
            articlePreview.setSummary(!"".equals(article.getSummary()) ? article.getSummary() : article.getContent().length() > 200 ?
                    article.getContent().substring(0, 200) + "..." : article.getContent());
            articlePreview.setCategoryName(article.getCategoryId() != null ? categoryService.getById(article.getCategoryId()).getName() : "未分类");
            articlePreview.setAvatar(userService.getById(article.getAuthorId()).getAvatar());
            articlePreview.setAuthorName(userService.getById(article.getAuthorId()).getNickname());
            return articlePreview;
        }).collect(Collectors.toList());
    }
}

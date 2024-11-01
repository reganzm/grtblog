package com.grtsinry43.grtblog.service.impl;

import com.grtsinry43.grtblog.common.ErrorCode;
import com.grtsinry43.grtblog.dto.ArticleDTO;
import com.grtsinry43.grtblog.entity.Article;
import com.grtsinry43.grtblog.exception.BusinessException;
import com.grtsinry43.grtblog.mapper.ArticleMapper;
import com.grtsinry43.grtblog.service.IArticleService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.grtsinry43.grtblog.vo.ArticlePreview;
import com.grtsinry43.grtblog.vo.ArticleVO;
import com.grtsinry43.grtblog.vo.ArticleView;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

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
    private final UserServiceImpl userService;

    public ArticleServiceImpl(ArticleTagServiceImpl articleTagService, TagServiceImpl tagService, UserServiceImpl userService) {
        this.articleTagService = articleTagService;
        this.tagService = tagService;
        this.userService = userService;
    }

    @Override
    public ArticleVO addArticle(ArticleDTO articleDTO, Long userId) {
        Article article = new Article();
        BeanUtils.copyProperties(articleDTO, article);
        article.setAuthorId(userId);
        this.baseMapper.insert(article);
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
        List<Article> articles = this.baseMapper.getLastFiveArticles();
        return articles.stream().map(article -> {
            ArticlePreview articlePreview = new ArticlePreview();
            BeanUtils.copyProperties(article, articlePreview);
            articlePreview.setId(article.getId().toString());
            articlePreview.setAvatar(userService.getById(article.getAuthorId()).getAvatar());
            articlePreview.setAuthorName(userService.getById(article.getAuthorId()).getNickname());
            return articlePreview;
        }).collect(Collectors.toList());
    }
}

package com.grtsinry43.grtblog.service;

import com.grtsinry43.grtblog.dto.ArticleDTO;
import com.grtsinry43.grtblog.entity.Article;
import com.baomidou.mybatisplus.extension.service.IService;
import com.grtsinry43.grtblog.vo.ArticlePreview;
import com.grtsinry43.grtblog.vo.ArticleVO;
import com.grtsinry43.grtblog.vo.ArticleView;

import java.util.List;

/**
 * <p>
 * 服务类
 * </p>
 *
 * @author grtsinry43
 * @since 2024-10-09
 */
public interface IArticleService extends IService<Article> {
    ArticleVO addArticle(ArticleDTO articleDTO, Long userId);

    ArticleView viewOneArticle(Long id);

    List<Long> getAllArticleIds();

    List<ArticlePreview> getLastFiveArticleList();

    List<ArticlePreview> getRecommendArticleList(Long articleId);
}

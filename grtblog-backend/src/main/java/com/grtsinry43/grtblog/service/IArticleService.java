package com.grtsinry43.grtblog.service;

import com.grtsinry43.grtblog.dto.ArticleDTO;
import com.grtsinry43.grtblog.entity.Article;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * <p>
 * 服务类
 * </p>
 *
 * @author grtsinry43
 * @since 2024-10-09
 */
public interface IArticleService extends IService<Article> {
    Article addArticle(ArticleDTO articleDTO, Long userId);
}

package com.grtsinry43.grtblog.service.impl;

import com.grtsinry43.grtblog.dto.ArticleDTO;
import com.grtsinry43.grtblog.entity.Article;
import com.grtsinry43.grtblog.mapper.ArticleMapper;
import com.grtsinry43.grtblog.service.IArticleService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author grtsinry43
 * @since 2024-10-09
 */
@Service
public class ArticleServiceImpl extends ServiceImpl<ArticleMapper, Article> implements IArticleService {

    @Override
    public Article addArticle(ArticleDTO articleDTO, Long userId) {
        Article article = new Article();
        BeanUtils.copyProperties(articleDTO, article);
        article.setAuthorId(userId);
        save(article);
        return article;
    }
}

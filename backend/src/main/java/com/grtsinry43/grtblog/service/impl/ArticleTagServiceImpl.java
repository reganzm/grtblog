package com.grtsinry43.grtblog.service.impl;

import com.grtsinry43.grtblog.entity.ArticleTag;
import com.grtsinry43.grtblog.mapper.ArticleTagMapper;
import com.grtsinry43.grtblog.service.IArticleTagService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 服务实现类
 * </p>
 *
 * @author grtsinry43
 * @since 2024-10-09
 */
@Service
public class ArticleTagServiceImpl extends ServiceImpl<ArticleTagMapper, ArticleTag> implements IArticleTagService {
    /**
     * 同步文章标签（先删除原有标签再添加新标签）
     *
     * @param articleId 文章 ID
     * @param tagIds    标签 ID 数组
     */
    @Override
    public void syncArticleTag(Long articleId, Long[] tagIds) {
        lambdaUpdate().eq(ArticleTag::getArticleId, articleId).remove();
        for (Long tagId : tagIds) {
            ArticleTag articleTag = new ArticleTag();
            articleTag.setArticleId(articleId);
            articleTag.setTagId(tagId);
            save(articleTag);
        }
    }
}

package com.grtsinry43.grtblog.mapper;

import com.grtsinry43.grtblog.entity.ArticleTag;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Select;

/**
 * <p>
 * Mapper 接口
 * </p>
 *
 * @author grtsinry43
 * @since 2024-10-09
 */
public interface ArticleTagMapper extends BaseMapper<ArticleTag> {

    @Select("SELECT COUNT(*) FROM article_tag WHERE tag_id = #{tagId}")
    int countArticlesByTagId(Long tagId);

    @Select("SELECT t.name FROM tag t JOIN article_tag at ON t.id = at.tag_id WHERE at.article_id = #{articleId}")
    String[] getTagNamesByArticleId(Long articleId);
}

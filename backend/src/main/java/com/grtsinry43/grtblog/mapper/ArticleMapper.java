package com.grtsinry43.grtblog.mapper;

import com.grtsinry43.grtblog.entity.Article;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.grtsinry43.grtblog.vo.ArticleVO;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * <p>
 * Mapper 接口
 * </p>
 *
 * @author grtsinry43
 * @since 2024-10-09
 */
public interface ArticleMapper extends BaseMapper<Article> {
    @Select("SELECT * FROM article WHERE is_published = 1 ORDER BY created_at DESC LIMIT 5")
    public List<Article> getLastFiveArticles();
}

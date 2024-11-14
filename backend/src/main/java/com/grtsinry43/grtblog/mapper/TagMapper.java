package com.grtsinry43.grtblog.mapper;

import com.grtsinry43.grtblog.entity.Tag;
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
public interface TagMapper extends BaseMapper<Tag> {
    @Select("SELECT article_id FROM article_tag WHERE tag_id = #{tagId}")
    Long[] getArticlesByTagId(Long tagId);
}

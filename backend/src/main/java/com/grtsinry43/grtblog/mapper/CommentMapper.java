package com.grtsinry43.grtblog.mapper;

import com.grtsinry43.grtblog.entity.Comment;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
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
public interface CommentMapper extends BaseMapper<Comment> {

    @Select("select * from comment where article_id = #{articleId}")
    public List<Comment> selectByArticleId(Long articleId);

}

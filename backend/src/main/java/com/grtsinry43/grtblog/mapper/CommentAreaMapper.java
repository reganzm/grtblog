package com.grtsinry43.grtblog.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.grtsinry43.grtblog.entity.CommentArea;
import org.apache.ibatis.annotations.Mapper;

/**
 * @author grtsinry43
 * @date 2024/11/15 23:46
 * @description 热爱可抵岁月漫长
 */
@Mapper
public interface CommentAreaMapper extends BaseMapper<CommentArea> {
    /**
     * 通过评论区名字查询评论区
     */
}

package com.grtsinry43.grtblog.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.grtsinry43.grtblog.entity.NavMenu;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

/**
 * @author grtsinry43
 * @date 2024/11/16 00:07
 * @description 热爱可抵岁月漫长
 */
@Mapper
public interface NavMenuMapper extends BaseMapper<NavMenu> {
    @Select("SELECT MAX(sort) FROM nav_menu WHERE parent_id = #{parentId}")
    Integer selectMaxSortByParent(Long parentId);
}

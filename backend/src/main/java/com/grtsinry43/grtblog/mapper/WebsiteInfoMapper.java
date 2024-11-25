package com.grtsinry43.grtblog.mapper;

import com.grtsinry43.grtblog.entity.WebsiteInfo;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author grtsinry43
 * @since 2024-10-09
 */
@Mapper
public interface WebsiteInfoMapper extends BaseMapper<WebsiteInfo> {

    @Select("SELECT id, `key`, value, created_at, updated_at FROM website_info")
    List<WebsiteInfo> selectAllWebsiteInfo();

    @Select("SELECT id, `key`, value, created_at, updated_at FROM website_info WHERE `key` = #{key}")
    WebsiteInfo selectOneByKey(String key);

    @Update("UPDATE website_info SET `key`=#{key}, value=#{value}, created_at=#{createdAt}, updated_at=#{updatedAt} WHERE id=#{id}")
    int updateById(WebsiteInfo websiteInfo);
}

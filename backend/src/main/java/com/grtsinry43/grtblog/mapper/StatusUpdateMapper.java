package com.grtsinry43.grtblog.mapper;

import com.grtsinry43.grtblog.entity.StatusUpdate;
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
public interface StatusUpdateMapper extends BaseMapper<StatusUpdate> {
    /**
     * 获取最近的四条说说
     */
    @Select("SELECT * FROM status_update WHERE is_published = 1 AND deleted_at is null ORDER BY created_at DESC LIMIT 4")
    public List<StatusUpdate> selectLastFourStatusUpdates();

    /**
     * 获取最近的一条
     */
    @Select("SELECT * FROM status_update WHERE is_published = 1 AND deleted_at is null ORDER BY created_at DESC LIMIT 1")
    public StatusUpdate selectLastStatusUpdate();

    /**
     * 分页获取所有说说
     */
    @Select("SELECT * FROM status_update WHERE is_published = 1 AND deleted_at is null ORDER BY is_top DESC, created_at DESC LIMIT #{page}, #{pageSize}")
    public List<StatusUpdate> listStatusUpdatesByPage(int page, int pageSize);

    /**
     * 根据分类获取说说
     */
    @Select("SELECT * FROM status_update WHERE is_published = 1 AND deleted_at is null AND category_id = (SELECT id FROM category WHERE short_url = #{shortUrl}) ORDER BY is_top DESC, created_at DESC LIMIT #{page}, #{pageSize}")
    public List<StatusUpdate> getStatusUpdatesByCategory(int page, int pageSize, String shortUrl);

    /**
     * 根据短链接获取说说
     */
    @Select("SELECT * FROM status_update WHERE short_url = #{shortUrl}")
    public StatusUpdate getStatusUpdateByShortUrl(String shortUrl);

    /**
     * 获取所有短链接
     */
    @Select("SELECT short_url FROM status_update WHERE is_published = 1 AND deleted_at is null")
    public List<String> getAllShortLinks();

    /**
     * 管理员获取所有说说
     */
    @Select("SELECT * FROM status_update ORDER BY is_top DESC, created_at DESC LIMIT #{page}, #{pageSize}")
    public List<StatusUpdate> getStatusUpdateListAdmin(int page, int pageSize);
}

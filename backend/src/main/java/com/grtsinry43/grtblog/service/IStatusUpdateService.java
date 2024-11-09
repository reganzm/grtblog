package com.grtsinry43.grtblog.service;

import com.grtsinry43.grtblog.entity.StatusUpdate;
import com.baomidou.mybatisplus.extension.service.IService;
import com.grtsinry43.grtblog.vo.StatusUpdatePreview;

import java.util.List;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author grtsinry43
 * @since 2024-10-09
 */
public interface IStatusUpdateService extends IService<StatusUpdate> {
    /**
     * 获取最近的四条说说
     */
    public List<StatusUpdatePreview> getLastFourStatusUpdates();

    /**
     * 获取最近的一条
     */
    public StatusUpdatePreview getLastStatusUpdate();
}

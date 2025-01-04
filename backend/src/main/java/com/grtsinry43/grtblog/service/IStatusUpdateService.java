package com.grtsinry43.grtblog.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.grtsinry43.grtblog.dto.PostStatusToggle;
import com.grtsinry43.grtblog.dto.StatusUpdateDTO;
import com.grtsinry43.grtblog.entity.StatusUpdate;
import com.baomidou.mybatisplus.extension.service.IService;
import com.grtsinry43.grtblog.security.LoginUserDetails;
import com.grtsinry43.grtblog.vo.StatusUpdatePreview;
import com.grtsinry43.grtblog.vo.StatusUpdateVO;
import com.grtsinry43.grtblog.vo.StatusUpdateView;

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

    /**
     * 分页获取所有说说
     */
    public List<StatusUpdatePreview> listStatusUpdatesByPage(int page, int pageSize);

    /**
     * 根据分类获取说说
     */
    public List<StatusUpdatePreview> getStatusUpdatesByCategory(int page, int pageSize, String shortUrl);

    /**
     * 根据短链接获取说说
     */
    public StatusUpdateView getStatusUpdateByShortUrl(String shortUrl);

    /**
     * 获取所有说说的短链接
     */
    public List<String> getAllStatusUpdateShortLinks();


    List<StatusUpdateVO> getStatusUpdateListAdmin(int page, int pageSize);

    StatusUpdateVO addStatusUpdate(StatusUpdateDTO statusUpdateDTO, Long userId) throws JsonProcessingException;

    void deleteStatusUpdate(Long id, LoginUserDetails principal);

    StatusUpdateVO updateStatusUpdate(Long id, StatusUpdateDTO statusUpdateDTO, Long userId) throws JsonProcessingException;

    StatusUpdateVO toggleStatusUpdate(Long id, PostStatusToggle postStatusToggle);

    StatusUpdateVO getStatusUpdateById(Long id);
}

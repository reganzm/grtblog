package com.grtsinry43.grtblog.service.impl;

import com.grtsinry43.grtblog.common.ErrorCode;
import com.grtsinry43.grtblog.dto.StatusUpdateDTO;
import com.grtsinry43.grtblog.entity.StatusUpdate;
import com.grtsinry43.grtblog.exception.BusinessException;
import com.grtsinry43.grtblog.mapper.StatusUpdateMapper;
import com.grtsinry43.grtblog.mapper.UserMapper;
import com.grtsinry43.grtblog.security.LoginUserDetails;
import com.grtsinry43.grtblog.service.IStatusUpdateService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.grtsinry43.grtblog.vo.StatusUpdatePreview;
import com.grtsinry43.grtblog.vo.StatusUpdateVO;
import com.grtsinry43.grtblog.vo.StatusUpdateView;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

/**
 * <p>
 * 服务实现类
 * </p>
 *
 * @author grtsinry43
 * @since 2024-10-09
 */
@Service
public class StatusUpdateServiceImpl extends ServiceImpl<StatusUpdateMapper, StatusUpdate> implements IStatusUpdateService {
    private final UserMapper userMapper;
    private final CategoryServiceImpl categoryService;

    public StatusUpdateServiceImpl(UserMapper userMapper, CategoryServiceImpl categoryService) {
        this.userMapper = userMapper;
        this.categoryService = categoryService;
    }

    @Override
    public List<StatusUpdatePreview> getLastFourStatusUpdates() {
        List<StatusUpdate> statusUpdates = baseMapper.selectLastFourStatusUpdates();
        return statusUpdates.stream()
                .map(statusUpdate -> {
                    StatusUpdatePreview preview = new StatusUpdatePreview();
                    BeanUtils.copyProperties(statusUpdate, preview);
                    preview.setAuthorName(this.userMapper.selectById(statusUpdate.getAuthorId()).getNickname());
                    preview.setAuthorAvatar(this.userMapper.selectById(statusUpdate.getAuthorId()).getAvatar());
                    preview.setImages(statusUpdate.getImg() != null ? statusUpdate.getImg().split(",") : new String[0]);
                    return preview;
                })
                .collect(Collectors.toList());
    }

    @Override
    public StatusUpdatePreview getLastStatusUpdate() {
        StatusUpdate statusUpdate = baseMapper.selectLastStatusUpdate();
        StatusUpdatePreview preview = new StatusUpdatePreview();
        BeanUtils.copyProperties(statusUpdate, preview);
        preview.setImages(statusUpdate.getImg() != null ? statusUpdate.getImg().split(",") : new String[0]);
        preview.setAuthorName(this.userMapper.selectById(statusUpdate.getAuthorId()).getNickname());
        preview.setAuthorAvatar(this.userMapper.selectById(statusUpdate.getAuthorId()).getAvatar());
        return preview;
    }

    @Override
    public List<StatusUpdatePreview> listStatusUpdatesByPage(int page, int pageSize) {
        int offset = (page - 1) * pageSize;
        List<StatusUpdate> statusUpdates = baseMapper.listStatusUpdatesByPage(offset, pageSize);
        return statusUpdates.stream()
                .map(statusUpdate -> {
                    StatusUpdatePreview preview = new StatusUpdatePreview();
                    BeanUtils.copyProperties(statusUpdate, preview);
                    preview.setAuthorName(this.userMapper.selectById(statusUpdate.getAuthorId()).getNickname());
                    preview.setAuthorAvatar(this.userMapper.selectById(statusUpdate.getAuthorId()).getAvatar());
                    preview.setImages(statusUpdate.getImg() != null ? statusUpdate.getImg().split(",") : new String[0]);
                    preview.setSummary(statusUpdate.getSummary() != null ? statusUpdate.getSummary() : statusUpdate.getContent().length() > 200 ? statusUpdate.getContent().substring(0, 200) : statusUpdate.getContent());
                    return preview;
                })
                .collect(Collectors.toList());
    }

    @Override
    public List<StatusUpdatePreview> getStatusUpdatesByCategory(int page, int pageSize, String shortUrl) {
        int offset = (page - 1) * pageSize;
        List<StatusUpdate> statusUpdates = baseMapper.getStatusUpdatesByCategory(offset, pageSize, shortUrl);
        return statusUpdates.stream()
                .map(statusUpdate -> {
                    StatusUpdatePreview preview = new StatusUpdatePreview();
                    BeanUtils.copyProperties(statusUpdate, preview);
                    preview.setAuthorName(this.userMapper.selectById(statusUpdate.getAuthorId()).getNickname());
                    preview.setAuthorAvatar(this.userMapper.selectById(statusUpdate.getAuthorId()).getAvatar());
                    preview.setImages(statusUpdate.getImg() != null ? statusUpdate.getImg().split(",") : new String[0]);
                    preview.setSummary(statusUpdate.getSummary() != null ? statusUpdate.getSummary() : statusUpdate.getContent().length() > 200 ? statusUpdate.getContent().substring(0, 200) : statusUpdate.getContent());
                    return preview;
                })
                .collect(Collectors.toList());
    }

    @Override
    public StatusUpdateView getStatusUpdateByShortUrl(String shortUrl) {
        StatusUpdate statusUpdate = baseMapper.getStatusUpdateByShortUrl(shortUrl);
        StatusUpdateView preview = new StatusUpdateView();
        BeanUtils.copyProperties(statusUpdate, preview);
        preview.setImages(statusUpdate.getImg() != null ? statusUpdate.getImg().split(",") : new String[0]);
        preview.setAuthorName(this.userMapper.selectById(statusUpdate.getAuthorId()).getNickname());
        preview.setAuthorAvatar(this.userMapper.selectById(statusUpdate.getAuthorId()).getAvatar());
        preview.setCommentId(statusUpdate.getCommentId() != null ? statusUpdate.getCommentId().toString() : null);
        return preview;
    }

    @Override
    public List<String> getAllStatusUpdateShortLinks() {
        return this.baseMapper.getAllShortLinks();
    }

    @Override
    public List<StatusUpdateVO> getStatusUpdateListAdmin(int page, int pageSize) {
        int offset = (page - 1) * pageSize;
        List<StatusUpdate> statusUpdates = baseMapper.getStatusUpdateListAdmin(offset, pageSize);
        return statusUpdates.stream()
                .map(statusUpdate -> {
                    StatusUpdateVO statusUpdateVO = new StatusUpdateVO();
                    BeanUtils.copyProperties(statusUpdate, statusUpdateVO);
                    statusUpdateVO.setId(statusUpdate.getId().toString());
                    statusUpdateVO.setAuthorName(this.userMapper.selectById(statusUpdate.getAuthorId()).getNickname());
                    statusUpdateVO.setCategoryId(statusUpdate.getCategoryId() != null ? statusUpdate.getCategoryId().toString() : null);
                    return statusUpdateVO;
                })
                .collect(Collectors.toList());
    }

    @Override
    public StatusUpdateVO addStatusUpdate(StatusUpdateDTO statusUpdateDTO, Long userId) {
        StatusUpdate statusUpdate = new StatusUpdate();
        BeanUtils.copyProperties(statusUpdateDTO, statusUpdate);
        statusUpdate.setAuthorId(userId);
        if (!categoryService.isCategoryExist(Long.valueOf(statusUpdateDTO.getCategoryId()))) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        statusUpdate.setCategoryId(Long.valueOf(statusUpdateDTO.getCategoryId()));
        this.save(statusUpdate);
        StatusUpdateVO statusUpdateVO = new StatusUpdateVO();
        BeanUtils.copyProperties(statusUpdate, statusUpdateVO);
        statusUpdateVO.setAuthorName(userMapper.selectById(userId).getNickname());
        return statusUpdateVO;
    }

    @Override
    public void deleteStatusUpdate(Long id, LoginUserDetails principal) {
        StatusUpdate statusUpdate = this.getById(id);
        if (Objects.equals(statusUpdate.getAuthorId(), principal.getUser().getId())) {
            this.removeById(id);
        } else {
            throw new BusinessException(ErrorCode.UNAUTHORIZED);
        }
    }

    @Override
    public StatusUpdateVO updateStatusUpdate(Long id, StatusUpdateDTO statusUpdateDTO, Long userId) {
        StatusUpdate statusUpdate = this.getById(id);
        if (Objects.equals(statusUpdate.getAuthorId(), userId)) {
            BeanUtils.copyProperties(statusUpdateDTO, statusUpdate);
            if (!categoryService.isCategoryExist(Long.valueOf(statusUpdateDTO.getCategoryId()))) {
                throw new BusinessException(ErrorCode.PARAMS_ERROR);
            }
            statusUpdate.setCategoryId(Long.valueOf(statusUpdateDTO.getCategoryId()));
            this.updateById(statusUpdate);
            StatusUpdateVO statusUpdateVO = new StatusUpdateVO();
            BeanUtils.copyProperties(statusUpdate, statusUpdateVO);
            statusUpdateVO.setAuthorName(userMapper.selectById(userId).getNickname());
            return statusUpdateVO;
        } else {
            throw new BusinessException(ErrorCode.UNAUTHORIZED);
        }
    }

    @Override
    public StatusUpdateVO getStatusUpdateById(Long id) {
        StatusUpdate statusUpdate = this.getById(id);
        StatusUpdateVO statusUpdateVO = new StatusUpdateVO();
        BeanUtils.copyProperties(statusUpdate, statusUpdateVO);
        statusUpdateVO.setAuthorName(userMapper.selectById(statusUpdate.getAuthorId()).getNickname());
        statusUpdateVO.setId(statusUpdate.getId().toString());
        statusUpdateVO.setCategoryId(statusUpdate.getCategoryId() != null ? statusUpdate.getCategoryId().toString() : null);
        return statusUpdateVO;
    }
}

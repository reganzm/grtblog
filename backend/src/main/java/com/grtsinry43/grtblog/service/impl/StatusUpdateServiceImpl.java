package com.grtsinry43.grtblog.service.impl;

import com.grtsinry43.grtblog.entity.StatusUpdate;
import com.grtsinry43.grtblog.mapper.StatusUpdateMapper;
import com.grtsinry43.grtblog.mapper.UserMapper;
import com.grtsinry43.grtblog.service.IStatusUpdateService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.grtsinry43.grtblog.vo.StatusUpdatePreview;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
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

    public StatusUpdateServiceImpl(UserMapper userMapper) {
        this.userMapper = userMapper;
    }

    @Override
    public List<StatusUpdatePreview> getLastFourStatusUpdates() {
        List<StatusUpdate> statusUpdates = baseMapper.selectLastFourStatusUpdates();
        return statusUpdates.stream()
                .map(statusUpdate -> {
                    StatusUpdatePreview preview = new StatusUpdatePreview();
                    BeanUtils.copyProperties(statusUpdate, preview);
                    preview.setId(statusUpdate.getId().toString());
                    preview.setAuthorName(this.userMapper.selectById(statusUpdate.getUserId()).getNickname());
                    preview.setDescription(statusUpdate.getContent().length() > 50 ? statusUpdate.getContent().substring(0, 50) + "..." : statusUpdate.getContent());
                    preview.setImages(statusUpdate.getImages() != null ? statusUpdate.getImages().split(",") : new String[0]);
                    return preview;
                })
                .collect(Collectors.toList());
    }

    @Override
    public StatusUpdatePreview getLastStatusUpdate() {
        StatusUpdate statusUpdate = baseMapper.selectLastStatusUpdate();
        StatusUpdatePreview preview = new StatusUpdatePreview();
        BeanUtils.copyProperties(statusUpdate, preview);
        preview.setId(statusUpdate.getId().toString());
        preview.setDescription(statusUpdate.getContent().substring(0, 50) + "...");
        preview.setImages(statusUpdate.getImages() != null ? statusUpdate.getImages().split(",") : new String[0]);
        preview.setAuthorName(this.userMapper.selectById(statusUpdate.getUserId()).getNickname());
        return preview;
    }

    @Override
    public List<Long> getAllStatusUpdateIds() {
        return this.list().stream().map(StatusUpdate::getId).collect(Collectors.toList());
    }

    @Override
    public StatusUpdatePreview viewOneStatusUpdate(Long id) {
        StatusUpdate statusUpdate = this.getById(id);
        if (statusUpdate == null) {
            return null;
        }
        StatusUpdatePreview preview = new StatusUpdatePreview();
        BeanUtils.copyProperties(statusUpdate, preview);
        preview.setId(statusUpdate.getId().toString());
        preview.setAuthorName(this.userMapper.selectById(statusUpdate.getUserId()).getNickname());
        preview.setImages(statusUpdate.getImages() != null ? statusUpdate.getImages().split(",") : new String[0]);
        return preview;
    }
}

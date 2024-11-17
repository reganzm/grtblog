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
    public StatusUpdatePreview getStatusUpdateByShortUrl(String shortUrl) {
        StatusUpdate statusUpdate = baseMapper.getStatusUpdateByShortUrl(shortUrl);
        StatusUpdatePreview preview = new StatusUpdatePreview();
        BeanUtils.copyProperties(statusUpdate, preview);
        preview.setImages(statusUpdate.getImg() != null ? statusUpdate.getImg().split(",") : new String[0]);
        preview.setAuthorName(this.userMapper.selectById(statusUpdate.getAuthorId()).getNickname());
        preview.setAuthorAvatar(this.userMapper.selectById(statusUpdate.getAuthorId()).getAvatar());
        return preview;
    }
}

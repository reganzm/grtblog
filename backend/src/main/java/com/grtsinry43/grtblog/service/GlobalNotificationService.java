package com.grtsinry43.grtblog.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.grtsinry43.grtblog.entity.GlobalNotification;
import com.grtsinry43.grtblog.mapper.GlobalNotificationMapper;
import com.grtsinry43.grtblog.vo.GlobalNotificationVO;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.Date;

/**
 * @author grtsinry43
 * @date 2025/1/1 13:20
 * @description 热爱可抵岁月漫长
 */
@Service
public class GlobalNotificationService extends ServiceImpl<GlobalNotificationMapper, GlobalNotification> {
    private final GlobalNotificationMapper globalNotificationMapper;

    public GlobalNotificationService(GlobalNotificationMapper globalNotificationMapper) {
        this.globalNotificationMapper = globalNotificationMapper;
    }

    public GlobalNotificationVO getLatestGlobalNotification() {
        GlobalNotification globalNotification = globalNotificationMapper.selectOne(
                new QueryWrapper<GlobalNotification>()
                        .orderByDesc("publish_at")
                        .gt("expire_at", new Date())
                        .last("limit 1"));
        if (globalNotification == null) {
            return null;
        }
        GlobalNotificationVO globalNotificationVO = new GlobalNotificationVO();
        BeanUtils.copyProperties(globalNotification, globalNotificationVO);
        globalNotificationVO.setId(globalNotification.getId().toString());
        return globalNotificationVO;
    }
}

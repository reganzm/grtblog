package com.grtsinry43.grtblog.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.grtsinry43.grtblog.entity.WebsiteInfo;
import com.grtsinry43.grtblog.mapper.WebsiteInfoMapper;
import com.grtsinry43.grtblog.service.IWebsiteInfoService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * <p>
 * 服务实现类
 * </p>
 *
 * @author grtsinry43
 * @since 2024-10-09
 */
@Service
public class WebsiteInfoServiceImpl extends ServiceImpl<WebsiteInfoMapper, WebsiteInfo> implements IWebsiteInfoService {
    private final WebsiteInfoMapper websiteInfoMapper;

    @Autowired
    public WebsiteInfoServiceImpl(WebsiteInfoMapper websiteInfoMapper) {
        this.websiteInfoMapper = websiteInfoMapper;
    }

    @Override
    public Map<String, String> getAllWebsiteInfo() {
        List<WebsiteInfo> websiteInfoList = websiteInfoMapper.selectAllWebsiteInfo();
        Map<String, String> websiteInfoMap = new HashMap<>();
        for (WebsiteInfo info : websiteInfoList) {
            websiteInfoMap.put(info.getKey(), info.getValue());
        }
        return websiteInfoMap;
    }

    @Override
    public boolean updateWebsiteInfo(String key, String value) {
        WebsiteInfo websiteInfo = websiteInfoMapper.selectOneByKey(key);
        if (websiteInfo != null) {
            websiteInfo.setValue(value);
            return websiteInfoMapper.updateById(websiteInfo) > 0;
        }
        return false;
    }
}
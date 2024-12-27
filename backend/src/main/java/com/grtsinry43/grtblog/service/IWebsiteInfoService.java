package com.grtsinry43.grtblog.service;

import com.grtsinry43.grtblog.entity.WebsiteInfo;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.Map;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author grtsinry43
 * @since 2024-10-09
 */
public interface IWebsiteInfoService extends IService<WebsiteInfo> {

    String getWebsiteInfo(String key);

    Map<String, String> getAllWebsiteInfo();

    boolean updateWebsiteInfo(String key, String value);
}

package com.grtsinry43.grtblog.service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.grtsinry43.grtblog.entity.Page;
import com.grtsinry43.grtblog.mapper.PageMapper;
import org.springframework.stereotype.Service;

/**
 * @author grtsinry43
 * @date 2024/11/21 08:36
 * @description 热爱可抵岁月漫长
 */
@Service
public class PageService extends ServiceImpl<PageMapper, Page> {
    public Page getPageByPath(String path) {
        return this.lambdaQuery().eq(Page::getRefPath, path).one();
    }
}
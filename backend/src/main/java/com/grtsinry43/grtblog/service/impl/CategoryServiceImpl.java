package com.grtsinry43.grtblog.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.grtsinry43.grtblog.entity.Category;
import com.grtsinry43.grtblog.mapper.CategoryMapper;
import com.grtsinry43.grtblog.service.ICategoryService;
import org.springframework.stereotype.Service;

/**
 * @author grtsinry43
 * @date 2024/11/12 16:12
 * @description 热爱可抵岁月漫长
 */
@Service
public class CategoryServiceImpl extends ServiceImpl<CategoryMapper, Category> implements ICategoryService {
}

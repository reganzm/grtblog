package com.grtsinry43.grtblog.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.grtsinry43.grtblog.entity.Category;
import com.grtsinry43.grtblog.mapper.CategoryMapper;
import com.grtsinry43.grtblog.service.ICategoryService;
import com.grtsinry43.grtblog.vo.CategoryVO;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * @author grtsinry43
 * @date 2024/11/12 16:12
 * @description 热爱可抵岁月漫长
 */
@Service
public class CategoryServiceImpl extends ServiceImpl<CategoryMapper, Category> implements ICategoryService {
    @Override
    public Boolean isCategoryExist(Long categoryId) {
        return getById(categoryId) != null;
    }

    @Override
    public Category addNewCategory(String categoryName) {
        Category category = new Category();
        category.setName(categoryName);
        save(category);
        return category;
    }

    @Override
    public String removeCategory(Long categoryId) {
        removeById(categoryId);
        return "success";
    }

    @Override
    public List<CategoryVO> listAllCategories() {
        List<Category> categories = list();
        return categories.stream().map(category -> {
            CategoryVO categoryVO = new CategoryVO();
            categoryVO.setId(category.getId().toString());
            categoryVO.setName(category.getName());
            return categoryVO;
        }).collect(Collectors.toList());
    }
}

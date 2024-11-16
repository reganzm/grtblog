package com.grtsinry43.grtblog.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.grtsinry43.grtblog.entity.Category;
import com.grtsinry43.grtblog.entity.NavMenu;
import com.grtsinry43.grtblog.mapper.NavMenuMapper;
import com.grtsinry43.grtblog.service.INavMenuService;
import com.grtsinry43.grtblog.vo.CategoryVO;
import com.grtsinry43.grtblog.vo.NavMenuVO;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * @author grtsinry43
 * @date 2024/11/16 00:09
 * @description 热爱可抵岁月漫长
 */
@Service
public class NavMenuServiceImpl implements INavMenuService {
    private final NavMenuMapper navMenuMapper;
    private final CategoryServiceImpl categoryService;

    public NavMenuServiceImpl(NavMenuMapper navMenuMapper, CategoryServiceImpl categoryService) {
        this.navMenuMapper = navMenuMapper;
        this.categoryService = categoryService;
    }

    @Override
    public List<NavMenuVO> getNavMenu() {
        List<NavMenu> navMenus = navMenuMapper.selectList(new QueryWrapper<NavMenu>().orderByAsc("sort"));
        List<CategoryVO> categories = categoryService.listAllCategories();
        return buildNavMenuTree(navMenus, categories, 0L);
    }

    private List<NavMenuVO> buildNavMenuTree(List<NavMenu> navMenus, List<CategoryVO> categories, Long parentId) {
        return navMenus.stream()
                .filter(navMenu -> parentId.equals(navMenu.getParentId()))
                .map(navMenu -> {
                    NavMenuVO navMenuVO = new NavMenuVO();
                    BeanUtils.copyProperties(navMenu, navMenuVO);
                    navMenuVO.setHref(navMenu.getUrl());
                    navMenuVO.setChildren(buildNavMenuTree(navMenus, categories, navMenu.getId()));

                    // 如果是文章分类，添加分类列表
                    if ("/posts".equals(navMenu.getUrl())) {
                        List<NavMenuVO> categoryVOs = categories.stream()
                                .map(category -> {
                                    NavMenuVO categoryNavMenuVO = new NavMenuVO();
                                    categoryNavMenuVO.setName(category.getName());
                                    categoryNavMenuVO.setHref("/categories/" + category.getShortUrl());
                                    return categoryNavMenuVO;
                                })
                                .toList();
                        navMenuVO.getChildren().addAll(categoryVOs);
                    }

                    return navMenuVO;
                })
                .collect(Collectors.toList());
    }
}
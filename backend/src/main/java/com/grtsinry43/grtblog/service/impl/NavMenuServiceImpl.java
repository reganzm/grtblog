package com.grtsinry43.grtblog.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.grtsinry43.grtblog.common.ErrorCode;
import com.grtsinry43.grtblog.dto.NavMenuBatchUpdateDTO;
import com.grtsinry43.grtblog.dto.NavMenuDTO;
import com.grtsinry43.grtblog.entity.NavMenu;
import com.grtsinry43.grtblog.exception.BusinessException;
import com.grtsinry43.grtblog.mapper.NavMenuMapper;
import com.grtsinry43.grtblog.service.INavMenuService;
import com.grtsinry43.grtblog.vo.NavMenuVO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

/**
 * @author grtsinry43
 * @date 2024/11/16 00:09
 * @description 热爱可抵岁月漫长
 */
@Service
@RequiredArgsConstructor
public class NavMenuServiceImpl implements INavMenuService {

    private final NavMenuMapper navMenuMapper;
    private final CategoryServiceImpl categoryService;

    @Override
    public List<NavMenuVO> getNavMenu() {
        List<NavMenu> navMenus = navMenuMapper.selectList(
                new QueryWrapper<NavMenu>()
                        .orderByAsc("parent_id", "sort"));
        return buildNavMenuTree(navMenus, 0L);
    }

    private List<NavMenuVO> buildNavMenuTree(List<NavMenu> navMenus, Long parentId) {
        return navMenus.stream()
                .filter(navMenu -> parentId.equals(navMenu.getParentId()))
                .map(navMenu -> {
                    NavMenuVO vo = new NavMenuVO();
                    BeanUtils.copyProperties(navMenu, vo);
                    vo.setHref(navMenu.getUrl());
                    vo.setChildren(buildNavMenuTree(navMenus, navMenu.getId()));
                    return vo;
                })
                .sorted(Comparator.comparingInt(NavMenuVO::getSort))
                .collect(Collectors.toList());
    }

    @Transactional
    @Override
    public NavMenu createNavMenu(NavMenuDTO dto) {
        validateParent(dto.getParentId());

        NavMenu navMenu = new NavMenu();
        BeanUtils.copyProperties(dto, navMenu);

        // 设置排序值
        Integer maxSort = navMenuMapper.selectMaxSortByParent(dto.getParentId());
        navMenu.setSort(maxSort != null ? maxSort + 1 : 0);

        navMenuMapper.insert(navMenu);
        return navMenu;
    }

    @Transactional
    @Override
    public NavMenu updateNavMenu(Long id, NavMenuDTO dto) {
        NavMenu existing = navMenuMapper.selectById(id);
        if (existing == null) {
            throw new BusinessException(ErrorCode.NOT_FOUND);
        }

        if (!Objects.equals(dto.getParentId(), existing.getParentId())) {
            validateParent(dto.getParentId());
        }

        NavMenu updateMenu = new NavMenu();
        BeanUtils.copyProperties(dto, updateMenu);
        updateMenu.setId(id);
        navMenuMapper.updateById(updateMenu);
        return updateMenu;
    }

    @Transactional
    @Override
    public void deleteNavMenu(Long id) {
        // 检查是否存在子菜单
        Long childCount = navMenuMapper.selectCount(
                new QueryWrapper<NavMenu>().eq("parent_id", id));
        if (childCount > 0) {
            throw new RuntimeException("请先删除子菜单");
        }
        navMenuMapper.deleteById(id);
    }

    @Transactional
    @Override
    public void batchUpdateNavMenus(List<NavMenuBatchUpdateDTO> updates) {
        updates.forEach(dto -> {
            // 验证父级是否合法
            if (dto.getParentId() != null) {
                validateParent(dto.getParentId());
            }

            NavMenu menu = new NavMenu();
            menu.setId(dto.getId());
            menu.setParentId(dto.getParentId());
            menu.setSort(dto.getSort());
            navMenuMapper.updateById(menu);
        });
    }

    private void validateParent(Long parentId) {
        if (parentId == null || parentId == 0) return;

        NavMenu parent = navMenuMapper.selectById(parentId);
        if (parent == null) {
            throw new RuntimeException("父级菜单不存在");
        }

        // 检查循环嵌套
        Set<Long> parentIds = new HashSet<>();
        Long currentParentId = parent.getParentId();
        while (currentParentId != null && currentParentId != 0) {
            if (parentIds.contains(currentParentId)) {
                throw new RuntimeException("检测到循环嵌套");
            }
            parentIds.add(currentParentId);
            NavMenu current = navMenuMapper.selectById(currentParentId);
            currentParentId = current != null ? current.getParentId() : null;
        }
    }
}
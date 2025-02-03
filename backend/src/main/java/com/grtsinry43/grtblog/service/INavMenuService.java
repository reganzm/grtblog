package com.grtsinry43.grtblog.service;

import com.grtsinry43.grtblog.dto.NavMenuBatchUpdateDTO;
import com.grtsinry43.grtblog.dto.NavMenuDTO;
import com.grtsinry43.grtblog.entity.NavMenu;
import com.grtsinry43.grtblog.vo.NavMenuVO;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @author grtsinry43
 * @date 2024/11/16 00:08
 * @description 热爱可抵岁月漫长
 */
public interface INavMenuService {
    /**
     * 获取导航菜单
     *
     * @return 导航菜单
     */
    List<NavMenuVO> getNavMenu();

    @Transactional
    NavMenu createNavMenu(NavMenuDTO dto);

    @Transactional
    NavMenu updateNavMenu(Long id, NavMenuDTO dto);

    @Transactional
    void deleteNavMenu(Long id);

    @Transactional
    void batchUpdateNavMenus(List<NavMenuBatchUpdateDTO> updates);
}

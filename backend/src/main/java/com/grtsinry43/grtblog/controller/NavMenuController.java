package com.grtsinry43.grtblog.controller;

import com.grtsinry43.grtblog.dto.ApiResponse;
import com.grtsinry43.grtblog.dto.NavMenuBatchUpdateDTO;
import com.grtsinry43.grtblog.dto.NavMenuDTO;
import com.grtsinry43.grtblog.entity.NavMenu;
import com.grtsinry43.grtblog.service.impl.NavMenuServiceImpl;
import com.grtsinry43.grtblog.vo.NavMenuVO;
import jakarta.annotation.security.PermitAll;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 导航菜单控制器
 *
 * @author grtsinry43
 * @date 2024/11/16 00:09
 * @description 热爱可抵岁月漫长
 */
@RestController
@RequestMapping("/nav")
public class NavMenuController {

    @Autowired
    private NavMenuServiceImpl navMenuService;

    @GetMapping
    public ApiResponse<List<NavMenuVO>> getNavMenuTree() {
        return ApiResponse.success(navMenuService.getNavMenu());
    }

    @PostMapping
    public ApiResponse<NavMenu> createNavMenu(@Valid @RequestBody NavMenuDTO dto) {
        return ApiResponse.success(navMenuService.createNavMenu(dto));
    }

    @PutMapping("/{id}")
    public ApiResponse<NavMenu> updateNavMenu(
            @PathVariable Long id,
            @Valid @RequestBody NavMenuDTO dto) {
        return ApiResponse.success(navMenuService.updateNavMenu(id, dto));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> deleteNavMenu(@PathVariable Long id) {
        navMenuService.deleteNavMenu(id);
        return ApiResponse.success();
    }

    @PutMapping("/batch")
    public ApiResponse<Void> batchUpdateNavMenus(
            @Valid @RequestBody List<NavMenuBatchUpdateDTO> updates) {
        navMenuService.batchUpdateNavMenus(updates);
        return ApiResponse.success();
    }
}

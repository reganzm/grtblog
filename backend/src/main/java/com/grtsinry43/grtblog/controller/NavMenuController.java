package com.grtsinry43.grtblog.controller;

import com.grtsinry43.grtblog.dto.ApiResponse;
import com.grtsinry43.grtblog.service.impl.NavMenuServiceImpl;
import com.grtsinry43.grtblog.vo.NavMenuVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * 导航菜单控制器
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
    public ApiResponse<List<NavMenuVO>> getNavMenu() {
        return ApiResponse.success(navMenuService.getNavMenu());
    }
}

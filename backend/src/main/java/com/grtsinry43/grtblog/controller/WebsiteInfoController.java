package com.grtsinry43.grtblog.controller;

import com.grtsinry43.grtblog.dto.ApiResponse;
import com.grtsinry43.grtblog.service.impl.WebsiteInfoServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/**
 * <p>
 * 前端控制器
 * </p>
 *
 * @author grtsinry43
 * @since 2024-10-09
 */
@RestController
@RequestMapping("/websiteInfo")
public class WebsiteInfoController {

    private final WebsiteInfoServiceImpl websiteInfoService;

    @Autowired
    public WebsiteInfoController(WebsiteInfoServiceImpl websiteInfoService) {
        this.websiteInfoService = websiteInfoService;
    }

    @GetMapping
    public ApiResponse<Map<String, String>> getWebsiteInfo() {
        return ApiResponse.success(websiteInfoService.getAllWebsiteInfo());
    }
}

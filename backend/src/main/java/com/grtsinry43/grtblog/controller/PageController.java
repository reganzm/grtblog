package com.grtsinry43.grtblog.controller;

import com.grtsinry43.grtblog.dto.ApiResponse;
import com.grtsinry43.grtblog.service.PageService;
import com.grtsinry43.grtblog.vo.PageVO;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author grtsinry43
 * @date 2024/11/22 10:46
 * @description 热爱可抵岁月漫长
 */
@RestController
@RequestMapping("/page")
public class PageController {
    private final PageService pageService;

    public PageController(PageService pageService) {
        this.pageService = pageService;
    }

    @GetMapping("/shortLinks")
    public ApiResponse<String[]> getShortLinksApi() {
        return ApiResponse.success(pageService.getAllPageRefPath());
    }

    @GetMapping("/{refPath}")
    public ApiResponse<PageVO> getPageContentApi(@PathVariable String refPath) {
        return ApiResponse.success(pageService.getPageByShortUrl(refPath));
    }

}

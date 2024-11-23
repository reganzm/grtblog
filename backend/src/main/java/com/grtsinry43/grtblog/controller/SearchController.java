package com.grtsinry43.grtblog.controller;

import com.grtsinry43.grtblog.dto.AggregatedSearchResult;
import com.grtsinry43.grtblog.dto.ApiResponse;
import com.grtsinry43.grtblog.service.SearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author grtsinry43
 * @date 2024/11/23 18:37
 * @description 热爱可抵岁月漫长
 */
@RestController
public class SearchController {
    private final SearchService searchService;

    @Autowired
    public SearchController(SearchService searchService) {
        this.searchService = searchService;
    }

    @GetMapping("/search")
    public ApiResponse<AggregatedSearchResult> search(@RequestParam String keyword) {
        return ApiResponse.success(searchService.searchAll(keyword));
    }
}

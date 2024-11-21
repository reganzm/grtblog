package com.grtsinry43.grtblog.controller;

import com.grtsinry43.grtblog.dto.ApiResponse;
import com.grtsinry43.grtblog.service.SocketIOService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * @author grtsinry43
 * @date 2024/11/21 09:05
 * @description 热爱可抵岁月漫长
 */
@RestController
@RequestMapping("/page-view")
public class PageViewController {

    private final SocketIOService socketIOService;

    @Autowired
    public PageViewController(SocketIOService socketIOService) {
        this.socketIOService = socketIOService;
    }

    @GetMapping
    public ApiResponse<List<Map<String, Object>>> getPageViews() {
        List<Map<String, Object>> detail = socketIOService.getPageUserMap().entrySet().stream()
                .map(entry -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("name", entry.getKey());
                    map.put("count", entry.getValue().size());
                    return map;
                })
                .toList();
        return ApiResponse.success(detail);
    }
}

package com.grtsinry43.grtblog.controller;

import com.grtsinry43.grtblog.dto.ApiResponse;
import com.grtsinry43.grtblog.service.impl.StatusUpdateServiceImpl;
import com.grtsinry43.grtblog.vo.StatusUpdatePreview;
import com.grtsinry43.grtblog.vo.StatusUpdateView;
import jakarta.annotation.security.PermitAll;
import org.springframework.web.bind.annotation.*;
import org.springframework.stereotype.Controller;

import java.util.List;

/**
 * 记录更新控制器
 *
 * @author grtsinry43
 * @since 2024-10-09
 */
@RestController
@RequestMapping("/statusUpdate")
public class StatusUpdateController {
    private final StatusUpdateServiceImpl statusUpdateService;

    public StatusUpdateController(StatusUpdateServiceImpl statusUpdateService) {
        this.statusUpdateService = statusUpdateService;
    }

    @PermitAll
    @GetMapping("/last")
    public ApiResponse<StatusUpdatePreview> getLastStatusUpdate() {
        StatusUpdatePreview lastStatusUpdate = statusUpdateService.getLastStatusUpdate();
        return ApiResponse.success(lastStatusUpdate);
    }

    @PermitAll
    @GetMapping("/lastFour")
    public ApiResponse<List<StatusUpdatePreview>> getLastFourStatusUpdates() {
        List<StatusUpdatePreview> lastFourStatusUpdates = statusUpdateService.getLastFourStatusUpdates();
        return ApiResponse.success(lastFourStatusUpdates);
    }

    @PermitAll
    @GetMapping("/all")
    public ApiResponse<List<StatusUpdatePreview>> getAllStatusUpdates(@RequestParam(value = "page", defaultValue = "1") int page,
                                                                      @RequestParam(value = "pageSize", defaultValue = "10") int pageSize) {
        List<StatusUpdatePreview> allStatusUpdates = statusUpdateService.listStatusUpdatesByPage(page, pageSize);
        return ApiResponse.success(allStatusUpdates);
    }

    @PermitAll
    @GetMapping("/shortLinks")
    public ApiResponse<List<String>> getAllStatusUpdateShortLinksApi() {
        List<String> shortLinks = statusUpdateService.getAllStatusUpdateShortLinks();
        return ApiResponse.success(shortLinks);
    }

    @PermitAll
    @GetMapping("/category/{shortUrl}")
    public ApiResponse<List<StatusUpdatePreview>> getStatusUpdatesByCategory(@RequestParam(value = "page", defaultValue = "1") int page,
                                                                             @RequestParam(value = "pageSize", defaultValue = "10") int pageSize,
                                                                             @PathVariable String shortUrl) {
        List<StatusUpdatePreview> statusUpdatesByCategory = statusUpdateService.getStatusUpdatesByCategory(page, pageSize, shortUrl);
        return ApiResponse.success(statusUpdatesByCategory);
    }

    @PermitAll
    @GetMapping("/{shortUrl}")
    public ApiResponse<StatusUpdateView> viewOneStatusUpdate(@PathVariable String shortUrl) {
        StatusUpdateView statusUpdateByShortUrl = statusUpdateService.getStatusUpdateByShortUrl(shortUrl);
        return ApiResponse.success(statusUpdateByShortUrl);
    }

}

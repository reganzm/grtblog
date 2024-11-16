package com.grtsinry43.grtblog.controller;

import com.grtsinry43.grtblog.dto.ApiResponse;
import com.grtsinry43.grtblog.service.impl.StatusUpdateServiceImpl;
import com.grtsinry43.grtblog.vo.StatusUpdatePreview;
import jakarta.annotation.security.PermitAll;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * <p>
 * 前端控制器
 * </p>
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
    @GetMapping("/category/{shortUrl}")
    public ApiResponse<List<StatusUpdatePreview>> getStatusUpdatesByCategory(@RequestParam(value = "page", defaultValue = "1") int page,
                                                                             @RequestParam(value = "pageSize", defaultValue = "10") int pageSize,
                                                                             @RequestParam String shortUrl) {
        List<StatusUpdatePreview> statusUpdatesByCategory = statusUpdateService.getStatusUpdatesByCategory(page, pageSize, shortUrl);
        return ApiResponse.success(statusUpdatesByCategory);
    }

    @PermitAll
    @GetMapping("/{shortUrl}")
    public ApiResponse<StatusUpdatePreview> getStatusUpdateByShortUrl(@RequestParam String shortUrl) {
        StatusUpdatePreview statusUpdateByShortUrl = statusUpdateService.getStatusUpdateByShortUrl(shortUrl);
        return ApiResponse.success(statusUpdateByShortUrl);
    }

}

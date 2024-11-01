package com.grtsinry43.grtblog.controller;

import com.grtsinry43.grtblog.dto.ApiResponse;
import com.grtsinry43.grtblog.service.impl.StatusUpdateServiceImpl;
import com.grtsinry43.grtblog.vo.StatusUpdatePreview;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.stereotype.Controller;
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

    @GetMapping("/last")
    public ApiResponse<StatusUpdatePreview> getLastStatusUpdate() {
        StatusUpdatePreview lastStatusUpdate = statusUpdateService.getLastStatusUpdate();
        return ApiResponse.success(lastStatusUpdate);
    }

    @GetMapping("/lastFour")
    public ApiResponse<List<StatusUpdatePreview>> getLastFourStatusUpdates() {
        List<StatusUpdatePreview> lastFourStatusUpdates = statusUpdateService.getLastFourStatusUpdates();
        return ApiResponse.success(lastFourStatusUpdates);
    }

}

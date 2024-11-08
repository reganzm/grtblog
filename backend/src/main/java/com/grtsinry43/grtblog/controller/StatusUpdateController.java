package com.grtsinry43.grtblog.controller;

import com.grtsinry43.grtblog.dto.ApiResponse;
import com.grtsinry43.grtblog.service.impl.StatusUpdateServiceImpl;
import com.grtsinry43.grtblog.vo.StatusUpdatePreview;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

    @GetMapping("/ids")
    public ApiResponse<List<String>> getAllStatusUpdateIds() {
        List<Long> allStatusUpdateIds = statusUpdateService.getAllStatusUpdateIds();
        // 转成字符串防止精度丢失
        List<String> allStatusUpdateIdsStr = allStatusUpdateIds.stream().map(String::valueOf).toList();
        return ApiResponse.success(allStatusUpdateIdsStr);
    }

    @GetMapping("/{id}")
    public ApiResponse<StatusUpdatePreview> viewOneStatusUpdateApi(@PathVariable String id) {
        Long idLong = Long.parseLong(id);
        StatusUpdatePreview statusUpdatePreview = statusUpdateService.viewOneStatusUpdate(idLong);
        return ApiResponse.success(statusUpdatePreview);
    }

}

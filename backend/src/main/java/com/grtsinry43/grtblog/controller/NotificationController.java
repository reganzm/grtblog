package com.grtsinry43.grtblog.controller;

import com.grtsinry43.grtblog.dto.ApiResponse;
import com.grtsinry43.grtblog.service.GlobalNotificationService;
import com.grtsinry43.grtblog.vo.GlobalNotificationVO;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author grtsinry43
 * @date 2025/1/1 13:24
 * @description 热爱可抵岁月漫长
 */
@RestController
@RequestMapping("/notification")
public class NotificationController {
    private final GlobalNotificationService globalNotificationService;

    public NotificationController(GlobalNotificationService globalNotificationService) {
        this.globalNotificationService = globalNotificationService;
    }

    @GetMapping
    public ApiResponse<GlobalNotificationVO> getLatestGlobalNotificationApi() {
        return ApiResponse.success(globalNotificationService.getLatestGlobalNotification());
    }
}

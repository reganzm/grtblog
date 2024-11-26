package com.grtsinry43.grtblog.controller;

import com.grtsinry43.grtblog.service.UserBehaviorService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author grtsinry43
 * @date 2024/11/26 14:39
 * @description 热爱可抵岁月漫长
 */
@RestController
@RequestMapping("/userBehavior")
public class UserBehaviorController {
    private final UserBehaviorService userBehaviorService;

    public UserBehaviorController(UserBehaviorService userBehaviorService) {
        this.userBehaviorService = userBehaviorService;
    }
}

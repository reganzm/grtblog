package com.grtsinry43.grtblog.controller;

import com.grtsinry43.grtblog.dto.ApiResponse;
import com.grtsinry43.grtblog.service.EmailService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

/**
 * 测试控制器
 *
 * @author grtsinry43
 * @date 2024/10/27 00:08
 * @description 热爱可抵岁月漫长
 */
@RestController
@RequestMapping("/test")
public class TestController {
    private final EmailService emailService;

    public TestController(EmailService emailService) {
        this.emailService = emailService;
    }

    @GetMapping("/hello")
    public ApiResponse<Object> hello() {
        HashMap<Object, Object> objectObjectHashMap = new HashMap<>();
        objectObjectHashMap.put("msg", "我们终此一生，就是摆脱他人的期待，找到真正的自己");
        objectObjectHashMap.put("date", "2024-10-27");
        return ApiResponse.success(objectObjectHashMap);
    }

    @GetMapping("/sendEmail")
    public ApiResponse<Object> sendEmail() {
        emailService.sendEmail("grtsinry43@outlook.com", "测试邮件", "这是一封测试邮件");
        return ApiResponse.success();
    }
}

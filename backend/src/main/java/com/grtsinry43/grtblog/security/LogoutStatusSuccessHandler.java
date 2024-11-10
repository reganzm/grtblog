package com.grtsinry43.grtblog.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.grtsinry43.grtblog.dto.ApiResponse;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.io.IOException;

/**
 * @author grtsinry43
 * @date 2024/11/9 11:23
 * @description 热爱可抵岁月漫长
 */
@Component
public class LogoutStatusSuccessHandler implements LogoutSuccessHandler {
    private final ObjectMapper objectMapper;

    public LogoutStatusSuccessHandler(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    @Override
    public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
        String token = request.getHeader("token");
        // 大部分情况下都是前端触发登出, 所以这里... 其实没什么用
        response.setCharacterEncoding("utf-8");
        response.setContentType("application/json");
        ApiResponse<Object> result = ApiResponse.success("用户登出成功");
        // 将消息 json 化
        String json = objectMapper.writeValueAsString(result);
        // 送到客户端
        response.getWriter().print(json);
    }
}

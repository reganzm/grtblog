package com.grtsinry43.grtblog.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.grtsinry43.grtblog.dto.ApiResponse;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

/**
 * @author grtsinry43
 * @date 2024/11/9 11:21
 * @description 用户权限不足时的处理类
 */
@Component
public class LoginUnAccessDeniedHandler implements AccessDeniedHandler {
    @Resource
    private ObjectMapper objectMapper;

    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException {
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        ApiResponse<Object> result = ApiResponse.error(403, "用户权限不足，无法访问此资源");
        // 将消息 json 化
        String json = objectMapper.writeValueAsString(result);
        // 送到客户端
        response.getWriter().print(json);
    }
}

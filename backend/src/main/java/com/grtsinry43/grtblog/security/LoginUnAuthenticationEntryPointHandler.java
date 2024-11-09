package com.grtsinry43.grtblog.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.grtsinry43.grtblog.dto.ApiResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;

/**
 * @author grtsinry43
 * @date 2024/11/9 10:22
 * @description 在未认证或者认证错误的情况下访问需要认证的资源时的处理类
 */
@Component
public class LoginUnAuthenticationEntryPointHandler implements AuthenticationEntryPoint {
    private final ObjectMapper objectMapper = new ObjectMapper();

    /*
     * 当访问一个需要认证的资源时因为当前用户没有认证或者认证失败，直接访问资源会交给此函数进行处理
     * 因为架构是前后端分离的项目, 所以给客户端的提示保持和控制器的返回值格式相同
     */
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException {
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        ApiResponse<Object> result = ApiResponse.error(401, "用户未认证或登录已过期，请重新登录后再访问");
        // 将消息 json 化
        String json = objectMapper.writeValueAsString(result);
        // 送到客户端
        response.getWriter().print(json);
    }
}

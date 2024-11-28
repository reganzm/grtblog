package com.grtsinry43.grtblog.security;

import com.grtsinry43.grtblog.util.JwtUtil;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

/**
 * @author grtsinry43
 * @date 2024/11/25 19:37
 * @description 热爱可抵岁月漫长
 */
@Component
public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        // 获取 redirect_uri 参数
        String redirectUri = request.getParameter("redirect_uri");

        // 如果没有指定 redirect_uri，设置默认跳转地址
        if (redirectUri == null || redirectUri.isEmpty()) {
            redirectUri = "https://next.blog.grtsinry43.com/";
        }

        // 获取 principal 对象
        Object principal = authentication.getPrincipal();
        String email;

        if (principal instanceof OAuth2User) {
            email = ((OAuth2User) principal).getAttribute("email");
        } else if (principal instanceof LoginUserDetails) {
            email = ((LoginUserDetails) principal).getUser().getEmail();
        } else {
            throw new ServletException("Unexpected principal type");
        }

        // 生成 Token
        String token = JwtUtil.generateToken(email);

        // 创建 Cookie 来存储 token
        Cookie cookie = new Cookie("token", token);
        cookie.setSecure(true);    // 在生产环境中使用 HTTPS 时，启用此选项
        cookie.setPath("/");       // 设置 Cookie 可在整个站点有效
        cookie.setMaxAge(3600 * 24 * 7);  // 设置 Cookie 的有效期为 7 天

        // 将 Cookie 添加到响应中
        response.addCookie(cookie);

        // 重定向到指定的地址
        response.sendRedirect(redirectUri);
    }
}
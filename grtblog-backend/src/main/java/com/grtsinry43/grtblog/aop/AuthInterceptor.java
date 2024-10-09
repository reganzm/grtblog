package com.grtsinry43.grtblog.aop;

import com.grtsinry43.grtblog.annotation.AuthCheck;
import com.grtsinry43.grtblog.common.ErrorCode;
import com.grtsinry43.grtblog.common.UserRole;
import com.grtsinry43.grtblog.exception.BusinessException;
import com.grtsinry43.grtblog.util.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import java.util.List;

/**
 * @author grtsinry43
 * @date 2024/9/8 14:48
 * @description 少年负壮气，奋烈自有时！
 */
@Component
public class AuthInterceptor implements HandlerInterceptor {

    private static final List<String> ADMIN_LIST = List.of("grtsinry43", "admin2");

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        if (handler instanceof HandlerMethod) {
            HandlerMethod method = (HandlerMethod) handler;
            AuthCheck authCheck = method.getMethodAnnotation(AuthCheck.class);
            if (authCheck != null) {
                // 根据传入的注解获取所需的权限
                UserRole requiredRole = authCheck.requiredRole();
                String token = request.getHeader("Authorization");

                if (requiredRole == UserRole.NOT_LOGIN) {
                    // 未登录可以访问无需登录的接口
                    return true;
                }

                if (token == null || token.isEmpty()) {
                    // 未登录访问需要登录的接口，返回未授权
                    System.out.println("未登录访问：" + request.getRequestURI());
                    throw new BusinessException(ErrorCode.NOT_LOGIN);

                }
                token = token.substring(7);

                // 先判断是否过期
                if (JwtUtil.isTokenExpired(token)) {
                    System.out.println("token过期");
                    throw new BusinessException(ErrorCode.NOT_LOGIN);
                }

                String openid = JwtUtil.getUserFromToken(token);
                if (openid == null) {
                    throw new BusinessException(ErrorCode.NOT_LOGIN);
                }

                System.out.println("++++++++++++++++++++++++++");
                System.out.println(openid);
                System.out.println(ADMIN_LIST.contains(openid));

                if (ADMIN_LIST.contains(openid)) {
                    // 管理员可以访问所有接口
                    request.setAttribute("openid", openid);
                    return true;
                }

                if (requiredRole == UserRole.ADMIN) {
                    // 非管理员访问管理员接口，返回无权限
                    throw new BusinessException(ErrorCode.UNAUTHORIZED);
                }

                request.setAttribute("openid", openid);

                return true;
            }
        }
        request.setAttribute("openid", "test");
        return true;
    }
}

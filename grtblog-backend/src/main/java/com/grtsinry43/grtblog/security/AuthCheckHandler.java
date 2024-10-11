package com.grtsinry43.grtblog.security;

import com.grtsinry43.grtblog.annotation.AuthCheck;
import com.grtsinry43.grtblog.common.ErrorCode;
import com.grtsinry43.grtblog.common.UserRole;
import com.grtsinry43.grtblog.exception.BusinessException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;

/**
 * @author grtsinry43
 * @date 2024/10/10 17:28
 * @description 热爱可抵岁月漫长
 */
@Component
public class AuthCheckHandler {

    public void checkAuth(HttpServletRequest request, Object handler) {
        if (handler instanceof HandlerMethod) {
            HandlerMethod handlerMethod = (HandlerMethod) handler;
            AuthCheck authCheck = handlerMethod.getMethodAnnotation(AuthCheck.class);

            if (authCheck != null) {
                UserRole requiredRole = authCheck.requiredRole();
                Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

                if (authentication == null || !hasRequiredRole(authentication, requiredRole)) {
                    throw new BusinessException(ErrorCode.UNAUTHORIZED);
                }
            }
        }
    }

    private boolean hasRequiredRole(Authentication authentication, UserRole requiredRole) {
        // Implement your logic to check if the authenticated user has the required role
        // This is a placeholder implementation
        return authentication.getAuthorities().stream()
                .anyMatch(grantedAuthority -> grantedAuthority.getAuthority().equals(requiredRole.name()));
    }
}
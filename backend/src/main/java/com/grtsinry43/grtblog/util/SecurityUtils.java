package com.grtsinry43.grtblog.util;

import com.grtsinry43.grtblog.entity.User;
import com.grtsinry43.grtblog.security.LoginUserDetails;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

/**
 * @author grtsinry43
 * @date 2024/11/14 18:38
 * @description 热爱可抵岁月漫长
 */
public class SecurityUtils {
    public static User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof LoginUserDetails) {
            return ((LoginUserDetails) authentication.getPrincipal()).getUser();
        }
        return null;
    }
}

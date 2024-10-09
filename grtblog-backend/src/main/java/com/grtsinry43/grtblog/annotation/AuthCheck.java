package com.grtsinry43.grtblog.annotation;

import com.grtsinry43.grtblog.common.UserRole;

import java.lang.annotation.*;

/**
 * @author grtsinry43
 * @date 2024/9/8 14:41
 * @description 少年负壮气，奋烈自有时！
 */
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface AuthCheck {
    UserRole requiredRole() default UserRole.USER;
    // 默认需要登录吧，这里防止会出现问题
}

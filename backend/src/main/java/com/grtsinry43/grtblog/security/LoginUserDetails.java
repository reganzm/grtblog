package com.grtsinry43.grtblog.security;

import lombok.Data;
import com.grtsinry43.grtblog.entity.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.util.CollectionUtils;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

/**
 * @author grtsinry43
 * @date 2024/11/9 19:15
 * @description 为 Spring Security 提供登录用户信息上下文的实现类
 */
@Data
public class LoginUserDetails implements UserDetails {

    private User user;

    // 角色名称列表，用于授权
    private List<String> roleNames;
    // 权限名称列表，用户授权
    private List<String> permissionNames;

    public LoginUserDetails(User user, List<String> roleNames, List<String> permissionNames) {
        this.user = user;
        this.roleNames = roleNames;
        this.permissionNames = permissionNames;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> authorities = new ArrayList<>();
        // 添加角色
        if (!CollectionUtils.isEmpty(roleNames)) {
            // 将角色设置到 GrantedAuthority 中，官网要求角色要加上前缀 ROLE_xxx 区分其它权限
            for (String roleName : roleNames) {
                authorities.add(new SimpleGrantedAuthority("ROLE_" + roleName));
            }
        }
        // 添加权限
        if (!CollectionUtils.isEmpty(permissionNames)) {
            // 将权限设置到 GrantedAuthority 中
            for (String permissionName : permissionNames) {
                authorities.add(new SimpleGrantedAuthority(permissionName));
            }
        }
        return authorities;
    }

    // 装配密码
    @Override
    public String getPassword() {
        return user.getPassword();
    }

    // 装配账户, 使用用户 ID 作为登录账号
    @Override
    public String getUsername() {
        return user.getId().toString();
    }

    // 账号是否过期, 在数据库中没有设置, 给默认值不过期
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    // 账号是否锁定, 在数据库中没有设置, 给默认值不锁定
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    // 密码是否过期, 在数据库中没有设置, 给默认值不过期
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    // 账号是否可用, 对应数据库激活字段
    @Override
    public boolean isEnabled() {
        return user.getIsActive();
    }
}


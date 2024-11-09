package com.grtsinry43.grtblog.entity;

import lombok.Data;

/**
 * @author grtsinry43
 * @date 2024/11/9 09:42
 * @description 热爱可抵岁月漫长
 */
@Data
public class RolePermission {
    /**
     * 角色ID
     */
    private Long roleId;
    /**
     * 权限ID
     */
    private Long permissionId;
}
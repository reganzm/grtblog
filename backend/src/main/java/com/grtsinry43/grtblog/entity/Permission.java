package com.grtsinry43.grtblog.entity;

import lombok.Data;

/**
 * @author grtsinry43
 * @date 2024/11/9 09:41
 * @description 热爱可抵岁月漫长
 */
@Data
public class Permission {
    /**
     * 权限ID
     */
    private Long permissionId;
    /**
     * 权限名称
     */
    private String permissionName;
}

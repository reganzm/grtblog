package com.grtsinry43.grtblog.mapper;

import com.grtsinry43.grtblog.entity.Permission;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * @author grtsinry43
 * @date 2024/11/9 11:13
 * @description 热爱可抵岁月漫长
 */
@Mapper
public interface PermissionMapper {
    /**
     * 通过权限 ID 列表查询权限列表
     *
     * @param permissionIds 权限 ID 列表
     * @return 权限列表
     */
    List<Permission> batchGetPermissionsByPermissionIds(List<Long> permissionIds);
}

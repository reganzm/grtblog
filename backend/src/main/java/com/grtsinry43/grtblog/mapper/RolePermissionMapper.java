package com.grtsinry43.grtblog.mapper;

import com.grtsinry43.grtblog.entity.RolePermission;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * @author grtsinry43
 * @date 2024/11/9 11:09
 * @description 热爱可抵岁月漫长
 */
@Mapper
public interface RolePermissionMapper {

    /**
     * 通过角色ID列表查询权限角色权限列表
     * @param roleIds 角色IDs
     * @return 角色权限列表
     */
    List<RolePermission> getRolePermissionsByRoleIds(List<Long> roleIds);
}

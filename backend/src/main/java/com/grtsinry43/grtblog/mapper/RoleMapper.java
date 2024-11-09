package com.grtsinry43.grtblog.mapper;

import com.grtsinry43.grtblog.entity.Role;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * @author grtsinry43
 * @date 2024/11/9 11:16
 * @description 热爱可抵岁月漫长
 */
@Mapper
public interface RoleMapper {
    /**
     * 批量查询
     *
     * @param roleIds 角色 ID 列表
     * @return 角色列表
     */
    List<Role> batchGetRolesByRoleIds(List<Long> roleIds);

    /**
     * 通过角色名称列表获取角色 ID 列表
     *
     * @param roleNames 角色名称列表
     * @return 角色 ID 列表
     */
    List<Long> getRoleIdsByRoleNames(List<String> roleNames);
}

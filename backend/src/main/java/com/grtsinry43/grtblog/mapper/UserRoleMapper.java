package com.grtsinry43.grtblog.mapper;

import com.grtsinry43.grtblog.entity.UserRole;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * @author grtsinry43
 * @date 2024/11/9 10:57
 * @description 热爱可抵岁月漫长
 */
@Mapper
public interface UserRoleMapper {
    /**
     * 通过用户ID查询用户角色列表
     * @param userId 用户ID
     * @return 用户角色列表
     */
    List<UserRole> getUserRolesByUserId(Long userId);
}


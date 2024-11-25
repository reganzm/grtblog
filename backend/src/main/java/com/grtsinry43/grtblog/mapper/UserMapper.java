package com.grtsinry43.grtblog.mapper;

import com.grtsinry43.grtblog.entity.User;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;

/**
 * <p>
 * Mapper 接口
 * </p>
 *
 * @author grtsinry43
 * @since 2024-10-09
 */
@Mapper
public interface UserMapper extends BaseMapper<User> {
    /**
     * 通过邮箱获取用户信息
     *
     * @param userEmail 用户邮箱
     * @return 用户信息
     */
    User getUserByUserEmail(String userEmail);

    /**
     * 通过 OAuth 提供商和 ID 获取用户信息
     *
     * @param oauthProvider
     * @param oauthUserId
     * @return
     */
    User getUserByOAuthProviderAndId(String oauthProvider, String oauthUserId);
}

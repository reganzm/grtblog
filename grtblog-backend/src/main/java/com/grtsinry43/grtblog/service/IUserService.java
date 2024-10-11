package com.grtsinry43.grtblog.service;

import com.grtsinry43.grtblog.entity.User;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * <p>
 * 服务类
 * </p>
 *
 * @author grtsinry43
 * @since 2024-10-09
 */
public interface IUserService extends IService<User> {
    void loginByGithub(String code);
}

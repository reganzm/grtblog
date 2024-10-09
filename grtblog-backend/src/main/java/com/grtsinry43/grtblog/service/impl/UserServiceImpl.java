package com.grtsinry43.grtblog.service.impl;

import com.grtsinry43.grtblog.entity.User;
import com.grtsinry43.grtblog.mapper.UserMapper;
import com.grtsinry43.grtblog.service.IUserService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author grtsinry43
 * @since 2024-10-09
 */
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements IUserService {

}

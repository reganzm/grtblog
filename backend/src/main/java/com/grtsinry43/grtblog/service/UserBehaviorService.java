package com.grtsinry43.grtblog.service;

import com.grtsinry43.grtblog.entity.UserBehavior;
import com.grtsinry43.grtblog.repository.UserBehaviorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author grtsinry43
 * @date 2024/11/26 14:37
 * @description 热爱可抵岁月漫长
 */
@Service
public class UserBehaviorService {
    private final UserBehaviorRepository userBehaviorRepository;

    @Autowired
    public UserBehaviorService(UserBehaviorRepository mongoEntityRepository) {
        this.userBehaviorRepository = mongoEntityRepository;
    }

    public List<UserBehavior> findAll() {
        return userBehaviorRepository.findAll();
    }

    public UserBehavior save(UserBehavior entity) {
        return userBehaviorRepository.save(entity);
    }

    public void deleteById(String id) {
        userBehaviorRepository.deleteById(id);
    }
}

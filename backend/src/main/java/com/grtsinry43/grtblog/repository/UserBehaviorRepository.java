package com.grtsinry43.grtblog.repository;

import com.grtsinry43.grtblog.entity.UserBehavior;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * @author grtsinry43
 * @date 2024/11/26 14:36
 * @description 热爱可抵岁月漫长
 */
public interface UserBehaviorRepository extends MongoRepository<UserBehavior, String> {
}

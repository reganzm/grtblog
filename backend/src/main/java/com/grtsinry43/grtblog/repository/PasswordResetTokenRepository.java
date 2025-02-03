package com.grtsinry43.grtblog.repository;

import com.grtsinry43.grtblog.entity.PasswordResetToken;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * @author grtsinry43
 * @date 2025/2/3 14:26
 * @description 热爱可抵岁月漫长
 */
public interface PasswordResetTokenRepository extends MongoRepository<PasswordResetToken, String> {
    PasswordResetToken findByToken(String token);
}

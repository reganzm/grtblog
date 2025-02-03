package com.grtsinry43.grtblog.service;

import com.grtsinry43.grtblog.entity.PasswordResetToken;
import com.grtsinry43.grtblog.repository.PasswordResetTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * @author grtsinry43
 * @date 2025/2/3 14:26
 * @description 热爱可抵岁月漫长
 */
@Service
public class PasswordResetTokenService {

    @Autowired
    private PasswordResetTokenRepository tokenRepository;

    public PasswordResetToken createToken(String email) {
        String token = UUID.randomUUID().toString();
        LocalDateTime expiryDate = LocalDateTime.now().plusMinutes(10);

        PasswordResetToken resetToken = new PasswordResetToken();
        resetToken.setEmail(email);
        resetToken.setToken(token);
        resetToken.setExpiryDate(expiryDate);

        return tokenRepository.save(resetToken);
    }

    public PasswordResetToken getToken(String token) {
        return tokenRepository.findByToken(token);
    }
}
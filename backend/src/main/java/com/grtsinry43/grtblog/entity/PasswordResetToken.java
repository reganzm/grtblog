package com.grtsinry43.grtblog.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

/**
 * @author grtsinry43
 * @date 2025/2/3 14:25
 * @description 热爱可抵岁月漫长
 */
@Data
@Document(collection = "password_reset_tokens")
public class PasswordResetToken {
    @Id
    private String id;
    private String email;
    private String token;
    private LocalDateTime expiryDate;
}

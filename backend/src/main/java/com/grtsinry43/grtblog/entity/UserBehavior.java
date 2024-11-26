package com.grtsinry43.grtblog.entity;


import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

/**
 * @author grtsinry43
 * @date 2024/11/26 14:28
 * @description 热爱可抵岁月漫长
 */
@Data
@Document(collection = "user_behavior")
public class UserBehavior {
    private String userId;
    private String articleId;
    private String type;
    private Number value;
    private LocalDateTime date;
}

package com.grtsinry43.grtblog.vo;

import lombok.Data;

import java.time.LocalDateTime;

/**
 * @author grtsinry43
 * @date 2025/1/1 13:17
 * @description 热爱可抵岁月漫长
 */
@Data
public class GlobalNotificationVO {
    private String id;
    private String content;
    private LocalDateTime publishAt;
    private LocalDateTime expireAt;
    private Boolean allowClose;
}

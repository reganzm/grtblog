package com.grtsinry43.grtblog.dto;

import lombok.Data;

import java.time.LocalDateTime;

/**
 * @author grtsinry43
 * @date 2025/2/3 17:02
 * @description 热爱可抵岁月漫长
 */
@Data
public class LikeRecordRequest {
    private String type;
    private String targetId;
    private String fingerprint;
}

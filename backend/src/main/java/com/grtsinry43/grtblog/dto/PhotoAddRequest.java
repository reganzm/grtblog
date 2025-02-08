package com.grtsinry43.grtblog.dto;

import lombok.Data;

import java.time.LocalDateTime;

/**
 * @author grtsinry43
 * @date 2025/2/8 16:20
 * @description 热爱可抵岁月漫长
 */
@Data
public class PhotoAddRequest {
    private String url;
    private String device;
    private String location;
    private String description;
    private String shade;
    private LocalDateTime time;
}

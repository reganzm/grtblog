package com.grtsinry43.grtblog.vo;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * @author grtsinry43
 * @date 2025/2/8 12:53
 * @description 热爱可抵岁月漫长
 */
@Data
public class PhotoPreview {
    private String id;
    private String url;
    private String device;
    private String location;
    private String description;
    private LocalDateTime date;
    private String shade;
}

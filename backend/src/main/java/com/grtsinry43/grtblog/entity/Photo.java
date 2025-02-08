package com.grtsinry43.grtblog.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * @author grtsinry43
 * @date 2025/2/8 12:51
 * @description 热爱可抵岁月漫长
 */
@Data
public class Photo {
    @TableId(type = IdType.ASSIGN_ID)
    private Long id;
    private String url;
    private String device;
    private String location;
    private String description;
    private LocalDateTime createdAt;
    private String shade;
}

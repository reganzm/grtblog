package com.grtsinry43.grtblog.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * @author grtsinry43
 * @date 2025/1/1 13:12
 * @description 热爱可抵岁月漫长
 */
@Data
@TableName("global_notification")
public class GlobalNotification {
    @TableId(value = "id",type = IdType.ASSIGN_ID)
    private Long id;
    private String content;
    private LocalDateTime publishAt;
    private LocalDateTime expireAt;
    private Boolean allowClose;
}

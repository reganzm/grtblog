package com.grtsinry43.grtblog.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * @author grtsinry43
 * @date 2025/2/3 16:58
 * @description 热爱可抵岁月漫长
 */
@Data
@TableName("like_record")
public class LikeRecord {
    @TableId(value = "id", type = IdType.ASSIGN_ID)
    private Long id;
    private String type;
    private Long targetId;
    private String userId;
    private LocalDateTime createdAt;
}

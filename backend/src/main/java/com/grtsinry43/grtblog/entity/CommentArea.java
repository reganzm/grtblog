package com.grtsinry43.grtblog.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

import java.sql.Timestamp;
import java.time.LocalDateTime;

/**
 * @author grtsinry43
 * @date 2024/11/15 23:43
 * @description 热爱可抵岁月漫长
 */
@Data
@TableName("comment_area")
public class CommentArea {
    @TableId(value = "id", type = IdType.ASSIGN_ID)
    private Long id;
    private String areaName;
    @TableField(value = "created_at", insertStrategy = FieldStrategy.NEVER, updateStrategy = FieldStrategy.NEVER)
    private LocalDateTime createdAt;
    @TableField(value = "updated_at", insertStrategy = FieldStrategy.NEVER, updateStrategy = FieldStrategy.NEVER)
    private LocalDateTime updatedAt;
}

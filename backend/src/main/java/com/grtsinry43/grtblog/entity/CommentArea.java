package com.grtsinry43.grtblog.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.sql.Timestamp;

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
    private Timestamp createdAt;
    private Timestamp updatedAt;
}

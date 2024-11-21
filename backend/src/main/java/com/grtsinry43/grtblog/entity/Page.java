package com.grtsinry43.grtblog.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.security.Timestamp;

/**
 * @author grtsinry43
 * @date 2024/11/21 08:33
 * @description 热爱可抵岁月漫长
 */
@Data
@TableName("page")
public class Page {
    @TableId(type = IdType.ASSIGN_ID)
    private Long id;
    private String title;
    private String refPath;
    private Boolean enable;
    private Boolean canDelete;
    private String toc;
    private String content;
    private Integer views;
    private Integer likes;
    private Integer comments;
    private Long commentId;
    private Timestamp createdAt;
    private Timestamp updatedAt;
    private Timestamp deletedAt;
}

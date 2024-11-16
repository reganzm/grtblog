package com.grtsinry43.grtblog.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

import java.sql.Timestamp;

/**
 * @author grtsinry43
 * @date 2024/11/16 00:05
 * @description 热爱可抵岁月漫长
 */
@Data
@TableName("nav_menu")
public class NavMenu {
    @TableId(type = IdType.AUTO)
    private Long id;

    private String name;
    private String url;
    private Integer sort;
    private Long parentId;

    @TableField(fill = FieldFill.INSERT)
    private Timestamp createdAt;

    @TableField(fill = FieldFill.INSERT_UPDATE)
    private Timestamp updatedAt;

    private Timestamp deletedAt;
}

package com.grtsinry43.grtblog.entity;

import com.baomidou.mybatisplus.annotation.*;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

/**
 * <p>
 *
 * </p>
 *
 * @author grtsinry43
 * @since 2024-10-09
 */
@Data
@TableName("website_info")
public class WebsiteInfo implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    /**
     * 网站信息 ID，会由雪花算法生成
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    /**
     * 信息键
     */
    private String key;

    /**
     * 信息值
     */
    private String value;

    @TableField(value = "created_at", insertStrategy = FieldStrategy.NEVER, updateStrategy = FieldStrategy.NEVER)
    private LocalDateTime createdAt;
    @TableField(value = "updated_at", insertStrategy = FieldStrategy.NEVER, updateStrategy = FieldStrategy.NEVER)
    private LocalDateTime updatedAt;
}

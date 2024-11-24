package com.grtsinry43.grtblog.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;

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
     * 网站信息ID，会由雪花算法生成
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

    /**
     * 信息创建时间
     */
    private LocalDateTime createdAt;

    /**
     * 信息更新时间
     */
    private LocalDateTime updatedAt;
}

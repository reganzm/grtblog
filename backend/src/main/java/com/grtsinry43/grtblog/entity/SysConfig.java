package com.grtsinry43.grtblog.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;
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
@Getter
@Setter
@TableName("sys_config")
public class SysConfig implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    /**
     * 系统配置ID，会由雪花算法生成
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    /**
     * 配置键
     */
    private String key;

    /**
     * 配置值
     */
    private String value;

    /**
     * 配置创建时间
     */
    private LocalDateTime created;

    /**
     * 配置更新时间
     */
    private LocalDateTime updated;
}

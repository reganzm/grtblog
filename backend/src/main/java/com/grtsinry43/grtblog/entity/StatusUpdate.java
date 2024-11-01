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
@TableName("status_update")
public class StatusUpdate implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    /**
     * 说说ID，会由雪花算法生成
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    /**
     * 用户ID
     */
    private Long userId;

    /**
     * 图片
     */
    private String images;

    /**
     * 说说内容
     */
    private String content;

    /**
     * 说说创建时间
     */
    private LocalDateTime createdAt;

    /**
     * 说说更新时间
     */
    private LocalDateTime updatedAt;

    /**
     * 说说删除时间（软删除），如果不为空则表示已删除
     */
    private LocalDateTime deletedAt;
}

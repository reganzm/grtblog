package com.grtsinry43.grtblog.entity;

import com.baomidou.mybatisplus.annotation.*;

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
@TableName("user_like")
public class UserLike implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 用户点赞关系ID，会由雪花算法生成
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    /**
     * 用户ID，可以为空
     */
    private Long userId;

    /**
     * 文章ID
     */
    private Long articleId;

    /**
     * 唯一会话ID，用于标识未登录用户
     */
    private String sessionId;

    /**
     * 点赞关系创建时间
     */
    @TableField(value = "created_at", insertStrategy = FieldStrategy.NEVER, updateStrategy = FieldStrategy.NEVER)
    private LocalDateTime createdAt;
}

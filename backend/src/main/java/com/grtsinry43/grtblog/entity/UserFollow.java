package com.grtsinry43.grtblog.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
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
@TableName("user_follow")
public class UserFollow implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 用户关注关系ID，会由雪花算法生成
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    /**
     * 关注者ID
     */
    private Long followerId;

    /**
     * 被关注者ID
     */
    private Long followeeId;

    /**
     * 关注关系创建时间
     */
    private LocalDateTime created;
}

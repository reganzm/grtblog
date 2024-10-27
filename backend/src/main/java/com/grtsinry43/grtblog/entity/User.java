package com.grtsinry43.grtblog.entity;

import com.baomidou.mybatisplus.annotation.FieldStrategy;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;

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
public class User implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    /**
     * 用户ID，会由雪花算法生成
     */
    @TableId(value = "id", type = IdType.ASSIGN_ID)
    private Long id;

    /**
     * 用户昵称
     */
    private String nickname;

    /**
     * 用户邮箱，用于登录
     */
    private String email;

    /**
     * 用户密码（BCrypt），可以为空
     */
    private String password;

    /**
     * 用户角色（USER, WRITER, ADMIN）
     */
    private String role;

    /**
     * 用户头像
     */
    private String avatar;

    /**
     * 用户状态（ACTIVE, INACTIVE）
     */
    private String status;

    /**
     * 用户创建时间
     */
    @TableField(value = "created_at", insertStrategy = FieldStrategy.NEVER, updateStrategy = FieldStrategy.NEVER)
    private LocalDateTime createdAt;

    /**
     * 用户更新时间
     */
    @TableField(value = "created_at", insertStrategy = FieldStrategy.NEVER, updateStrategy = FieldStrategy.NEVER)
    private LocalDateTime updatedAt;

    /**
     * 用户删除时间（软删除），如果不为空则表示已删除
     */
    private LocalDateTime deletedAt;

    /**
     * OAuth2.0提供者（如google, github）
     */
    private String oauthProvider;

    /**
     * OAuth2.0用户ID
     */
    private String oauthId;
}

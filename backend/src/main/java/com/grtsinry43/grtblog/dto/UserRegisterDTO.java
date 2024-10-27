package com.grtsinry43.grtblog.dto;

import lombok.Data;

/**
 * @author grtsinry43
 * @date 2024/10/11 18:53
 * @description 热爱可抵岁月漫长
 * 用户注册 DTO
 */
@Data
public class UserRegisterDTO {
    private String nickname;
    private String email;
    private String password;
}

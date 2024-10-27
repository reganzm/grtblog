package com.grtsinry43.grtblog.vo;

import lombok.Data;

/**
 * @author grtsinry43
 * @date 2024/10/11 18:55
 * @description 热爱可抵岁月漫长
 */
@Data
public class UserVO {
    private String id;
    private String nickname;
    private String email;
    private String avatar;
    private String created;
    private String oauthProvider;
}

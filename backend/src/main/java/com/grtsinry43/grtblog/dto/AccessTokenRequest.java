package com.grtsinry43.grtblog.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author grtsinry43
 * @date 2024/10/9 17:16
 * @description 热爱可抵岁月漫长
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AccessTokenRequest {
    private String clientId;
    private String clientSecret;
    private String code;
    private String redirectUri;
}

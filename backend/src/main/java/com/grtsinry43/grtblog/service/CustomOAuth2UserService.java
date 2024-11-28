package com.grtsinry43.grtblog.service;

import com.grtsinry43.grtblog.entity.User;
import com.grtsinry43.grtblog.mapper.UserMapper;
import com.grtsinry43.grtblog.util.JwtUtil;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

/**
 * @author grtsinry43
 * @date 2024/11/9 23:00
 * @description 热爱可抵岁月漫长
 */
@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    @Autowired
    private UserMapper userMapper;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);
        String provider = userRequest.getClientRegistration().getRegistrationId();
        String oauthId = oAuth2User.getAttribute("sub") == null ? oAuth2User.getAttribute("id") + "" : oAuth2User.getAttribute("sub") + "";
        String email = oAuth2User.getAttribute("email");
        String avatar = oAuth2User.getAttribute("avatar_url") == null ? oAuth2User.getAttribute("picture") + "" : oAuth2User.getAttribute("avatar_url") + "";

        // Fetch or create user in the database
        User user = userMapper.getUserByOAuthProviderAndId(provider, oauthId);
        if (user == null) {
            user = new User();
            user.setEmail(email);
            user.setNickname(oAuth2User.getAttribute("login") == null ? oAuth2User.getAttribute("name") + "" : oAuth2User.getAttribute("login") + "");
            user.setOauthProvider(provider);
            user.setAvatar(avatar);
            user.setOauthId(oauthId);
            userMapper.insert(user);
        }

//        // You can add additional logic here if needed
//
//        // 生成 Token
//        String token = JwtUtil.generateToken(user.getId().toString());
//
//        // 将 Token 添加到 response 的 header 或直接返回给前端
//        // 这里需要通过上下文获取 response
//        HttpServletResponse response = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getResponse();
//        if (response != null) {
//            response.setHeader("Authorization", token);
//            response.addCookie(new Cookie("token", token));
//        }

        return oAuth2User;
    }
}

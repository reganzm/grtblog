package com.grtsinry43.grtblog.service;

import com.grtsinry43.grtblog.entity.User;
import com.grtsinry43.grtblog.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

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
        System.out.println("==============================");
        System.out.println(userRequest);
        OAuth2User oAuth2User = super.loadUser(userRequest);
        System.out.println(oAuth2User.getAttributes());
        String provider = userRequest.getClientRegistration().getRegistrationId();
        String oauthId = oAuth2User.getAttribute("sub");  // Google uses 'sub', GitHub uses 'id'
        if (oauthId == null) {
            oauthId = oAuth2User.getAttribute("id");
        }
        String email = oAuth2User.getAttribute("email");

        // Fetch or create user in the database
        User user = userMapper.getUserByOAuthProviderAndId(provider, oauthId);
        if (user == null) {
            user = new User();
            user.setEmail(email);
            user.setOauthProvider(provider);
            user.setOauthId(oauthId);
            userMapper.insert(user);
        }

        // You can add additional logic here if needed

        return oAuth2User;
    }
}

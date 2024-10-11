package com.grtsinry43.grtblog.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.grtsinry43.grtblog.common.ErrorCode;
import com.grtsinry43.grtblog.dto.AccessTokenRequest;
import com.grtsinry43.grtblog.dto.GithubOAuthUserDTO;
import com.grtsinry43.grtblog.entity.User;
import com.grtsinry43.grtblog.exception.BusinessException;
import com.grtsinry43.grtblog.mapper.UserMapper;
import com.grtsinry43.grtblog.service.IUserService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements IUserService {
    private final UserMapper userMapper;
    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    @Value("${com.grtsinry43.github.clientId}")
    private String githubClientId;

    @Value("${com.grtsinry43.github.clientSecret}")
    private String githubClientSecret;

    @Value("${com.grtsinry43.github.redirectUri}")
    private String githubRedirectUri;

    public UserServiceImpl(UserMapper userMapper, RestTemplate restTemplate, ObjectMapper objectMapper) {
        this.userMapper = userMapper;
        this.restTemplate = restTemplate;
        this.objectMapper = objectMapper;
    }

    /**
     * 通过 Github 登录
     *
     * @param code GitHub 返回的授权码
     */
    @Override
    public void loginByGithub(String code) {
        String accessTokenUrl = "https://github.com/login/oauth/access_token";
        String userUrl = "https://api.github.com/user";

        // 设置请求头
        HttpHeaders headers = new HttpHeaders();
        headers.set("Accept", "application/json");

        // 创建 HttpEntity 包含请求头和请求体
        HttpEntity<AccessTokenRequest> requestEntity = new HttpEntity<>(
                new AccessTokenRequest(githubClientId, githubClientSecret, code, githubRedirectUri), headers);

        // 使用 RestTemplate 发送请求
        ResponseEntity<String> accessTokenResponse = restTemplate.postForEntity(accessTokenUrl, requestEntity, String.class);
        if (accessTokenResponse.getBody() == null) {
            throw new BusinessException(ErrorCode.OPERATION_ERROR);
        }

        // 提取 access token
        String accessToken = extractAccessTokenFromJson(accessTokenResponse.getBody());

        // 使用 access token 获取用户信息
        headers.set("Authorization", "token " + accessToken);
        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<GithubOAuthUserDTO> userInfoResponse = restTemplate.exchange(userUrl, HttpMethod.GET, entity, GithubOAuthUserDTO.class);
        GithubOAuthUserDTO userInfo = userInfoResponse.getBody();

        // 处理用户信息，这里先简单插入数据库
        if (userInfo != null) {
            User user = new User();
            user.setOauthId(String.valueOf(userInfo.getId()));
            user.setOauthProvider("github");
            user.setNickname(userInfo.getLogin());
            user.setEmail(userInfo.getEmail());
            user.setAvatar(userInfo.getAvatar_url());

            userMapper.insert(user);
        }
    }

    /**
     * 从 JSON 响应中提取 access token
     *
     * @param response JSON 响应字符串
     * @return 提取的 access token
     */
    private String extractAccessTokenFromJson(String response) {
        try {
            JsonNode rootNode = objectMapper.readTree(response);
            return rootNode.path("access_token").asText();
        } catch (Exception e) {
            throw new BusinessException(ErrorCode.OPERATION_ERROR);
        }
    }
}
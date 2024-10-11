package com.grtsinry43.grtblog.dto;

import lombok.Data;

/**
 * {
 *   "id": 123456,
 *   "login": "username",
 *   "name": "User Name",
 *   "email": "user@example.com",
 *   "avatar_url": "https://avatars.githubusercontent.com/u/123456?v=4",
 *   "html_url": "https://github.com/username",
 *   "followers": 50,
 *   "following": 10,
 *   "public_repos": 20
 * }
 */

/**
 * @author grtsinry43
 * @date 2024/10/9 16:33
 * @description 少年负壮气，奋烈自有时！
 */
@Data
public class GithubOAuthUserDTO {
    private Long id;
    private String login;
    private String name;
    private String email;
    private String avatar_url;
}

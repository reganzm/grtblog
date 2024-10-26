package com.grtsinry43.grtblog.controller;

import com.grtsinry43.grtblog.dto.ApiResponse;
import com.grtsinry43.grtblog.dto.ArticleDTO;
import com.grtsinry43.grtblog.dto.UserRegisterDTO;
import com.grtsinry43.grtblog.entity.Article;
import com.grtsinry43.grtblog.entity.User;
import com.grtsinry43.grtblog.service.impl.UserServiceImpl;
import com.grtsinry43.grtblog.vo.UserVO;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.*;

/**
 * <p>
 * 前端控制器
 * </p>
 *
 * @author grtsinry43
 * @since 2024-10-09
 */
@RestController
@RequestMapping("/user")
public class UserController {
    private final UserServiceImpl userService;

    public UserController(UserServiceImpl userService) {
        this.userService = userService;
    }

    // TODO test
    @PostMapping("/register")
    public ApiResponse<UserVO> registerApi(@RequestBody UserRegisterDTO user) {
        User user1 = new User();
        BeanUtils.copyProperties(user, user1);
        userService.save(user1);
        UserVO userVO = new UserVO();
        BeanUtils.copyProperties(user1, userVO);
        return ApiResponse.success(userVO);
    }

}

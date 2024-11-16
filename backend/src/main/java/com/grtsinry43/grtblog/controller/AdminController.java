package com.grtsinry43.grtblog.controller;

import com.grtsinry43.grtblog.dto.AddCategory;
import com.grtsinry43.grtblog.dto.ApiResponse;
import com.grtsinry43.grtblog.dto.ArticleDTO;
import com.grtsinry43.grtblog.entity.Category;
import com.grtsinry43.grtblog.entity.User;
import com.grtsinry43.grtblog.security.LoginUserDetails;
import com.grtsinry43.grtblog.service.impl.ArticleServiceImpl;
import com.grtsinry43.grtblog.service.impl.CategoryServiceImpl;
import com.grtsinry43.grtblog.service.impl.UserServiceImpl;
import com.grtsinry43.grtblog.util.JwtUtil;
import com.grtsinry43.grtblog.util.SecurityUtils;
import com.grtsinry43.grtblog.vo.ArticleVO;
import com.grtsinry43.grtblog.vo.CategoryVO;
import com.grtsinry43.grtblog.vo.UserVO;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.BeanUtils;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

/**
 * @author grtsinry43
 * @date 2024/11/14 08:31
 * @description 热爱可抵岁月漫长
 */
@RestController
@RequestMapping("/admin")
public class AdminController {
    private final UserServiceImpl userService;
    private final AuthenticationManager authenticationManager;
    private final ArticleServiceImpl articleService;
    private final CategoryServiceImpl categoryService;

    public AdminController(UserServiceImpl userService, AuthenticationManager authenticationManager, ArticleServiceImpl articleService, CategoryServiceImpl categoryService) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.articleService = articleService;
        this.categoryService = categoryService;
    }

    @PostMapping("/login")
    public ApiResponse<UserVO> login(String userEmail, String password, HttpServletResponse response) {
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userEmail, password);
        try {
            Authentication authenticate = authenticationManager.authenticate(authenticationToken);
            if (authenticate.isAuthenticated()) {
                LoginUserDetails principal = (LoginUserDetails) authenticate.getPrincipal();
                if (Objects.isNull(principal)) {
                    return ApiResponse.error(400, "登录失败，请检查用户名和密码");
                }
                // 这里说明登录成功，终于能获取到 User 对象了
                User user = principal.getUser();
                // TODO 这里需要检查权限
                System.out.println(principal.getPermissionNames().toString());
                // 转成 VO 对象
                UserVO userVO = new UserVO();
                BeanUtils.copyProperties(user, userVO);
                userVO.setId(user.getId().toString());
                // 生成 token
                String token = JwtUtil.generateToken(user.getEmail());
                response.setHeader("Authorization", token);
                return ApiResponse.success(userVO);
            }
        } catch (Exception e) {
            return ApiResponse.error(402, "登录失败，请检查用户名和密码");
        }
        return ApiResponse.error(402, "登录失败，请检查用户名和密码");
    }

    @GetMapping("/userInfo")
    public ApiResponse<UserVO> getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        LoginUserDetails principal = (LoginUserDetails) authentication.getPrincipal();
        System.out.println(principal);
        if (Objects.isNull(principal)) {
            return ApiResponse.error(400, "登录失败，请检查用户名和密码");
        }
        // 这里说明登录成功，终于能获取到 User 对象了
        User user = principal.getUser();
        UserVO userVO = new UserVO();
        BeanUtils.copyProperties(user, userVO);
        userVO.setId(user.getId().toString());
        return ApiResponse.success(userVO);
    }

    @PreAuthorize("hasAuthority('article:add')")
    @PostMapping("/article")
    public ApiResponse<ArticleVO> addArticleApi(@RequestBody ArticleDTO articleDTO, HttpServletRequest request) {
        Long userId = Objects.requireNonNull(SecurityUtils.getCurrentUser()).getId();
        ArticleVO articleVO = articleService.addArticle(articleDTO, userId);
        return ApiResponse.success(articleVO);
    }

    @GetMapping("/category")
    public ApiResponse<List<CategoryVO>> listAllCategories() {
        return ApiResponse.success(categoryService.listAllCategories());
    }

    @PreAuthorize("hasAuthority('article:edit')")
    @PatchMapping("/article/{id}")
    public ApiResponse<ArticleVO> updateArticleApi(@PathVariable Long id, @RequestBody ArticleDTO articleDTO) {
        Long userId = Objects.requireNonNull(SecurityUtils.getCurrentUser()).getId();
        ArticleVO articleVO = articleService.updateArticle(id, articleDTO, userId);
        return ApiResponse.success(articleVO);
    }

    @PreAuthorize("hasAuthority('category:add')")
    @PostMapping("/category")
    public ApiResponse<CategoryVO> addCategoryApi(@RequestBody AddCategory addCategory) {
        CategoryVO categoryVO = categoryService.addNewCategory(addCategory.getName());
        return ApiResponse.success(categoryVO);
    }

    @PreAuthorize("hasAuthority('article:edit')")
    @GetMapping("/article/all")
    public ApiResponse<List<ArticleVO>> listAllArticlesByPageAdmin(@RequestParam Integer page, @RequestParam Integer pageSize) {
        return ApiResponse.success(articleService.getArticleListAdmin(page, pageSize));
    }

}

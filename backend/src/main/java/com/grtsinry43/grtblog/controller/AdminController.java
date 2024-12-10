package com.grtsinry43.grtblog.controller;

import com.grtsinry43.grtblog.dto.*;
import com.grtsinry43.grtblog.entity.Category;
import com.grtsinry43.grtblog.entity.User;
import com.grtsinry43.grtblog.security.LoginUserDetails;
import com.grtsinry43.grtblog.service.PageService;
import com.grtsinry43.grtblog.service.impl.*;
import com.grtsinry43.grtblog.util.JwtUtil;
import com.grtsinry43.grtblog.util.SecurityUtils;
import com.grtsinry43.grtblog.vo.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.BeanUtils;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Objects;

/**
 * 后台管理控制器
 *
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
    private final StatusUpdateServiceImpl statusUpdateService;
    private final PageService pageService;
    private final WebsiteInfoServiceImpl websiteInfoService;

    public AdminController(UserServiceImpl userService, AuthenticationManager authenticationManager, ArticleServiceImpl articleService, CategoryServiceImpl categoryService, StatusUpdateServiceImpl statusUpdateService, PageService pageService, WebsiteInfoServiceImpl websiteInfoService) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.articleService = articleService;
        this.categoryService = categoryService;
        this.statusUpdateService = statusUpdateService;
        this.pageService = pageService;
        this.websiteInfoService = websiteInfoService;
    }

    @PostMapping("/login")
    public ApiResponse<UserVO> login(HttpServletRequest request, String userEmail, String password, HttpServletResponse response) {
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userEmail, password);
        try {
            String sessionCaptcha = (String) request.getSession().getAttribute("captcha");
            if (sessionCaptcha == null || !sessionCaptcha.equals(request.getParameter("captcha"))) {
                return ApiResponse.error(401, "验证码错误");
            }
            Authentication authenticate = authenticationManager.authenticate(authenticationToken);
            if (authenticate.isAuthenticated()) {
                LoginUserDetails principal = (LoginUserDetails) authenticate.getPrincipal();
                if (Objects.isNull(principal)) {
                    return ApiResponse.error(400, "登录失败，请检查用户名和密码");
                }
                // 这里说明登录成功，终于能获取到 User 对象了
                User user = principal.getUser();
                // TODO 这里需要检查权限
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

    @PreAuthorize("hasAuthority('article:view')")
    @GetMapping("/userInfo")
    public ApiResponse<UserVO> getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        LoginUserDetails principal = (LoginUserDetails) authentication.getPrincipal();
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

    @PreAuthorize("hasAuthority('article:add')")
    @PostMapping("/article/import")
    public ApiResponse<ArticleVO> importArticleFromHexoMdApi(@RequestParam("file") MultipartFile file) {
        Long userId = Objects.requireNonNull(SecurityUtils.getCurrentUser()).getId();
        try {
            ArticleVO articleVO = articleService.importFromHexoMd(file, userId);
            return ApiResponse.success(articleVO);
        } catch (Exception e) {
            return ApiResponse.error(400, "Failed to import article: " + e.getMessage());
        }
    }


    @PreAuthorize("hasAuthority('article:delete')")
    @DeleteMapping("/article/{id}")
    public ApiResponse<String> deleteArticleApi(@PathVariable Long id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        LoginUserDetails principal = (LoginUserDetails) authentication.getPrincipal();
        articleService.deleteArticle(id, principal);
        return ApiResponse.success("删除成功");
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

    @PreAuthorize("hasAuthority('article:edit')")
    @PatchMapping("/article/toggle/{id}")
    public ApiResponse<ArticleVO> updateArticleApi(@PathVariable Long id, @RequestBody PostStatusToggle postStatusToggle) {
        ArticleVO articleVO = articleService.updateArticleStatus(id, postStatusToggle);
        return ApiResponse.success(articleVO);
    }

    @PreAuthorize("hasAuthority('category:add')")
    @PostMapping("/category")
    public ApiResponse<CategoryVO> addCategoryApi(@RequestBody AddCategory addCategory) {
        CategoryVO categoryVO = categoryService.addNewCategory(addCategory);
        return ApiResponse.success(categoryVO);
    }

    @PreAuthorize("hasAuthority('article:edit')")
    @GetMapping("/article/all")
    public ApiResponse<List<ArticleVO>> listAllArticlesByPageAdmin(@RequestParam Integer page, @RequestParam Integer pageSize) {
        return ApiResponse.success(articleService.getArticleListAdmin(page, pageSize));
    }

    @PreAuthorize("hasAuthority('article:edit')")
    @GetMapping("/article/{id}")
    public ApiResponse<ArticleVO> getArticleById(@PathVariable Long id) {
        return ApiResponse.success(articleService.getArticleByIdAdmin(id));
    }

    @PreAuthorize("hasAuthority('share:edit')")
    @PatchMapping("/statusUpdate/toggle/{id}")
    public ApiResponse<StatusUpdateVO> toggleStatusUpdateApi(@PathVariable Long id, @RequestBody PostStatusToggle postStatusToggle) {
        StatusUpdateVO statusUpdateVO = statusUpdateService.toggleStatusUpdate(id, postStatusToggle);
        return ApiResponse.success(statusUpdateVO);
    }

    @PreAuthorize("hasAuthority('share:edit')")
    @GetMapping("/statusUpdate/all")
    public ApiResponse<List<StatusUpdateVO>> listAllStatusUpdatesByPageAdmin(@RequestParam Integer page, @RequestParam Integer pageSize) {
        return ApiResponse.success(statusUpdateService.getStatusUpdateListAdmin(page, pageSize));
    }

    @PreAuthorize("hasAuthority('share:add')")
    @PostMapping("/statusUpdate")
    public ApiResponse<StatusUpdateVO> addStatusUpdateApi(@RequestBody StatusUpdateDTO statusUpdateDTO) {
        Long userId = Objects.requireNonNull(SecurityUtils.getCurrentUser()).getId();
        StatusUpdateVO statusUpdateVO = statusUpdateService.addStatusUpdate(statusUpdateDTO, userId);
        return ApiResponse.success(statusUpdateVO);
    }

    @PreAuthorize("hasAuthority('share:delete')")
    @DeleteMapping("/statusUpdate/{id}")
    public ApiResponse<String> deleteStatusUpdateApi(@PathVariable Long id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        LoginUserDetails principal = (LoginUserDetails) authentication.getPrincipal();
        statusUpdateService.deleteStatusUpdate(id, principal);
        return ApiResponse.success("删除成功");
    }

    @PreAuthorize("hasAuthority('share:edit')")
    @PatchMapping("/statusUpdate/{id}")
    public ApiResponse<StatusUpdateVO> updateStatusUpdateApi(@PathVariable Long id, @RequestBody StatusUpdateDTO statusUpdateDTO) {
        Long userId = Objects.requireNonNull(SecurityUtils.getCurrentUser()).getId();
        StatusUpdateVO statusUpdateVO = statusUpdateService.updateStatusUpdate(id, statusUpdateDTO, userId);
        return ApiResponse.success(statusUpdateVO);
    }

    @PreAuthorize("hasAuthority('share:edit')")
    @GetMapping("/statusUpdate/{id}")
    public ApiResponse<StatusUpdateVO> getStatusUpdateById(@PathVariable Long id) {
        StatusUpdateVO statusUpdateVO = statusUpdateService.getStatusUpdateById(id);
        return ApiResponse.success(statusUpdateVO);
    }

    @PreAuthorize("hasAuthority('page:add')")
    @PostMapping("/page")
    public ApiResponse<PageVO> addPageApi(@RequestBody PageDTO pageDTO) {
        PageVO pageVO = pageService.addPage(pageDTO);
        return ApiResponse.success(pageVO);
    }

    @PreAuthorize("hasAuthority('page:edit')")
    @PatchMapping("/page/{id}")
    public ApiResponse<PageVO> updatePageApi(@PathVariable String id, @RequestBody PageDTO pageDTO) {
        PageVO pageVO = pageService.updatePage(id, pageDTO);
        return ApiResponse.success(pageVO);
    }

    @PreAuthorize("hasAuthority('page:delete')")
    @DeleteMapping("/page/{id}")
    public ApiResponse<String> deletePageApi(@PathVariable String id) {
        pageService.deletePage(id);
        return ApiResponse.success("删除成功");
    }

    @PreAuthorize("hasAuthority('page:edit')")
    @GetMapping("/page/all")
    public ApiResponse<List<PageVO>> listAllPagesByPageAdmin(@RequestParam Integer page, @RequestParam Integer pageSize) {
        return ApiResponse.success(pageService.getPageListAdmin(page, pageSize));
    }

    @PreAuthorize("hasAuthority('page:edit')")
    @GetMapping("/page/{id}")
    public ApiResponse<PageVO> getPageById(@PathVariable String id) {
        return ApiResponse.success(pageService.getPageByIdAdmin(id));
    }

    @PreAuthorize("hasAuthority('page:edit')")
    @PatchMapping("/page/toggle/{id}")
    public ApiResponse<PageVO> togglePageApi(@PathVariable Long id, @RequestBody PostStatusToggle postStatusToggle) {
        PageVO pageVO = pageService.togglePage(id, postStatusToggle);
        return ApiResponse.success(pageVO);
    }

    @PreAuthorize("hasAuthority('config:edit')")
    @PutMapping("/config")
    public ApiResponse<String> updateWebsiteInfo(@RequestParam String key, @RequestParam String value) {
        boolean success = websiteInfoService.updateWebsiteInfo(key, value);
        if (success) {
            return ApiResponse.success("Website information updated successfully");
        } else {
            return ApiResponse.error(400, "Failed to update website information");
        }
    }


}

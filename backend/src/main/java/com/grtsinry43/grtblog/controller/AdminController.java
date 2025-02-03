package com.grtsinry43.grtblog.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.grtsinry43.grtblog.GrtblogBackendApplication;
import com.grtsinry43.grtblog.common.ErrorCode;
import com.grtsinry43.grtblog.common.PagedResponse;
import com.grtsinry43.grtblog.dto.*;
import com.grtsinry43.grtblog.entity.Category;
import com.grtsinry43.grtblog.entity.Comment;
import com.grtsinry43.grtblog.entity.FriendLink;
import com.grtsinry43.grtblog.entity.User;
import com.grtsinry43.grtblog.exception.BusinessException;
import com.grtsinry43.grtblog.security.LoginUserDetails;
import com.grtsinry43.grtblog.service.CommentAreaService;
import com.grtsinry43.grtblog.service.PageService;
import com.grtsinry43.grtblog.service.impl.*;
import com.grtsinry43.grtblog.util.JwtUtil;
import com.grtsinry43.grtblog.util.SecurityUtils;
import com.grtsinry43.grtblog.vo.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.concurrent.TimeUnit;

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
    @Autowired
    private ApplicationContext applicationContext;

    private final UserServiceImpl userService;
    private final AuthenticationManager authenticationManager;
    private final ArticleServiceImpl articleService;
    private final CategoryServiceImpl categoryService;
    private final StatusUpdateServiceImpl statusUpdateService;
    private final PageService pageService;
    private final WebsiteInfoServiceImpl websiteInfoService;
    private final CommentServiceImpl commentServiceImpl;
    private final CommentAreaService commentAreaService;
    @Autowired
    private FriendLinkServiceImpl friendLinkServiceImpl;

    public AdminController(UserServiceImpl userService, AuthenticationManager authenticationManager, ArticleServiceImpl articleService, CategoryServiceImpl categoryService, StatusUpdateServiceImpl statusUpdateService, PageService pageService, WebsiteInfoServiceImpl websiteInfoService, CommentServiceImpl commentServiceImpl, CommentAreaService commentAreaService) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.articleService = articleService;
        this.categoryService = categoryService;
        this.statusUpdateService = statusUpdateService;
        this.pageService = pageService;
        this.websiteInfoService = websiteInfoService;
        this.commentServiceImpl = commentServiceImpl;
        this.commentAreaService = commentAreaService;
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
    public ApiResponse<PagedResponse<ArticleVO>> listAllArticlesByPageAdmin(@RequestParam Integer page, @RequestParam Integer pageSize) {
        List<ArticleVO> articles = articleService.getArticleListAdmin(page, pageSize);
        long total = articleService.countAllArticles();
        return ApiResponse.success(new PagedResponse<>(articles, total));
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
    public ApiResponse<PagedResponse<StatusUpdateVO>> listAllStatusUpdatesByPageAdmin(@RequestParam Integer page, @RequestParam Integer pageSize) {
        List<StatusUpdateVO> statusUpdates = statusUpdateService.getStatusUpdateListAdmin(page, pageSize);
        long total = statusUpdateService.getStatusUpdateCount();
        return ApiResponse.success(new PagedResponse<>(statusUpdates, total));
    }

    @PreAuthorize("hasAuthority('share:add')")
    @PostMapping("/statusUpdate")
    public ApiResponse<StatusUpdateVO> addStatusUpdateApi(@RequestBody StatusUpdateDTO statusUpdateDTO) throws JsonProcessingException {
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
    public ApiResponse<StatusUpdateVO> updateStatusUpdateApi(@PathVariable Long id, @RequestBody StatusUpdateDTO statusUpdateDTO) throws JsonProcessingException {
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
    public ApiResponse<PagedResponse<PageVO>> listAllPagesByPageAdmin(@RequestParam Integer page, @RequestParam Integer pageSize) {
        List<PageVO> pages = pageService.getPageListAdmin(page, pageSize);
        long total = pageService.getPageCount();
        return ApiResponse.success(new PagedResponse<>(pages, total));
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

    @PreAuthorize("hasAuthority('system:core')")
    @PostMapping("/update")
    public ApiResponse<String> uploadJar(@RequestParam("file") MultipartFile file) {
        try {
            // 备份当前 JAR 包
            backupCurrentJar();

            // 保存新的 JAR 包
            String savedNewJar = saveNewJar(file);

            // 重启应用
            restartApplication(savedNewJar);

            return ApiResponse.success("更新成功");
        } catch (Exception e) {
            e.printStackTrace();
            return ApiResponse.error(500, "更新失败: " + e.getMessage());
        }
    }

    private void backupCurrentJar() throws IOException {
        String jarPath = System.getProperty("user.dir") + "/app.jar";
        String backupPath = System.getProperty("user.dir") + "/sys-backup/app-backup.jar";
        File currentJar = new File(jarPath);
        File backupJar = new File(backupPath);

        // Ensure the backup directory exists
        File backupDir = backupJar.getParentFile();
        if (!backupDir.exists()) {
            backupDir.mkdirs();
        }

        Files.copy(currentJar.toPath(), backupJar.toPath(), StandardCopyOption.REPLACE_EXISTING);
    }

    private String saveNewJar(MultipartFile file) throws IOException {
        String jarPath = System.getProperty("user.dir") + "/app.jar";
        File newJar = new File(jarPath);
        Files.copy(file.getInputStream(), newJar.toPath(), StandardCopyOption.REPLACE_EXISTING);
        return jarPath;
    }

    public void restartApplication(String jarPath) {
        Thread thread = new Thread(() -> {
            try {
                Thread.sleep(1000); // 等待 1 秒，确保当前应用程序有足够的时间进行清理

                // 退出当前应用程序
                SpringApplication.exit(applicationContext, () -> 0);

                // 获取 Java 运行环境
                String javaBin = System.getProperty("java.home") + File.separator + "bin" + File.separator + "java";

                // 构建新的进程启动命令
                List<String> command = new ArrayList<>();
                command.add(javaBin);
                command.add("-jar");
                command.add(jarPath);

                // 创建日志文件以捕获新进程的输出
                File logFile = new File("restart.log");
                File errorFile = new File("restart_error.log");

                // 启动新的应用程序进程，并将输出重定向到文件
                ProcessBuilder builder = new ProcessBuilder(command);
                builder.redirectOutput(logFile); // 标准输出重定向到文件
                builder.redirectError(errorFile); // 标准错误重定向到文件
                Process process = builder.start();

                // 退出当前进程
                System.exit(0);

            } catch (Exception e) {
                e.printStackTrace(); // 打印异常信息
            }
        });

        thread.setDaemon(false);
        thread.start();
    }

    @PreAuthorize("hasAuthority('comment:admin')")
    @GetMapping("/comment/allArea")
    public ApiResponse<List<CommentAreaVO>> listAllCommentAreasByPageAdmin() {
        return ApiResponse.success(commentAreaService.listAllCommentArea());
    }

    @PreAuthorize("hasAuthority('comment:admin')")
    @GetMapping("/comment/all")
    public ApiResponse<PagedResponse<CommentVO>> listAllCommentsByPageAdmin(@RequestParam Integer page, @RequestParam Integer pageSize,@RequestParam Boolean notRead) {
        List<CommentVO> comments = notRead ? commentServiceImpl.listAllNotReadAdmin(page, pageSize) : commentServiceImpl.listAllAdmin(page, pageSize);
        long total = notRead ? commentServiceImpl.countAllNotReadAdmin() : commentServiceImpl.countAllAdmin();
        return ApiResponse.success(new PagedResponse<>(comments, total));
    }

    @PreAuthorize("hasAuthority('comment:admin')")
    @GetMapping("/comment/{areaId}")
    public ApiResponse<PagedResponse<CommentVO>> listCommentsByIdByPageAdmin(@PathVariable Long areaId, @RequestParam Integer page, @RequestParam Integer pageSize, @RequestParam Boolean notRead) {
        List<CommentVO> comments = notRead ? commentServiceImpl.listByAreaIdNotReadAdmin(areaId, page, pageSize) : commentServiceImpl.listByAreaIdAdmin(areaId, page, pageSize);
        long total = notRead ? commentServiceImpl.countByAreaIdNotReadAdmin(areaId) : commentServiceImpl.countByAreaIdAdmin(areaId);
        return ApiResponse.success(new PagedResponse<>(comments, total));
    }

    // 删除评论 API
    @PreAuthorize("hasAuthority('comment:admin')")
    @DeleteMapping("/comment/{id}")
    public ApiResponse<String> deleteComment(@PathVariable Long id) {
        // 如果有子评论，则递归删除
        Comment comment = commentServiceImpl.getById(id);
        comment.setDeletedAt(LocalDateTime.now());
        commentServiceImpl.updateById(comment);
        return ApiResponse.success("删除成功");
    }

    // 置顶评论 API
    @PreAuthorize("hasAuthority('comment:admin')")
    @PatchMapping("/comment/top/{id}")
    public ApiResponse<String> topComment(@PathVariable Long id) {
        Comment comment = commentServiceImpl.getById(id);
        if (comment != null) {
            comment.setIsTop(!comment.getIsTop());
            commentServiceImpl.updateById(comment);
            return ApiResponse.success(comment.getIsTop() ? "置顶成功" : "取消置顶成功");
        } else {
            return ApiResponse.error(404, "评论不存在");
        }
    }

    // 标记评论为已读 API
    @PreAuthorize("hasAuthority('comment:admin')")
    @PatchMapping("/comment/read/{id}")
    public ApiResponse<String> markCommentAsRead(@PathVariable Long id) {
        Comment comment = commentServiceImpl.getById(id);
        if (comment != null) {
            comment.setIsViewed(true);
            commentServiceImpl.updateById(comment);
            return ApiResponse.success("标记为已读成功");
        } else {
            return ApiResponse.error(404, "评论不存在");
        }
    }

    @PreAuthorize("hasAuthority('friend_link:edit')")
    @GetMapping("/friendLink/all")
    public ApiResponse<PagedResponse<FriendLinkVO>> listAllFriendLinksByPageAdmin(@RequestParam Integer page, @RequestParam Integer pageSize) {
        List<FriendLinkVO> friendLinks = friendLinkServiceImpl.getFriendLinkListAdmin(page, pageSize);
        long total = friendLinkServiceImpl.getFriendLinkCount();
        return ApiResponse.success(new PagedResponse<>(friendLinks, total));
    }

    @PreAuthorize("hasAuthority('friend_link:add')")
    @PostMapping("/friendLink")
    public ApiResponse<FriendLinkView> addFriendLink(@RequestBody FriendLinkRequest friendLinkRequest) {
        Long userId = Objects.requireNonNull(SecurityUtils.getCurrentUser()).getId();
        FriendLinkView friendLinkView = friendLinkServiceImpl.addFriendLinkAdmin(friendLinkRequest, userId);
        return ApiResponse.success(friendLinkView);
    }

    @PreAuthorize("hasAuthority('friend_link:edit')")
    @PatchMapping("/friendLink/{id}")
    public ApiResponse<FriendLinkView> updateFriendLink(@PathVariable Long id, @RequestBody FriendLinkRequest friendLinkRequest) {
        FriendLinkView friendLinkView = friendLinkServiceImpl.updateFriendLinkAdmin(id, friendLinkRequest);
        return ApiResponse.success(friendLinkView);
    }

    @PreAuthorize("hasAuthority('friend_link:edit')")
    @PatchMapping("/friendLink/toggle/{id}")
    public ApiResponse<String> toggleFriendLink(@PathVariable Long id) {
        FriendLink friendLink = friendLinkServiceImpl.getById(id);
        if (friendLink == null) {
            throw new BusinessException(ErrorCode.NOT_FOUND);
        } else {
            friendLink.setIsActive(!friendLink.getIsActive());
            friendLinkServiceImpl.updateById(friendLink);
        }
        return ApiResponse.success(friendLink.getIsActive() ? "启用成功" : "禁用成功");
    }

    @PreAuthorize("hasAuthority('friend_link:delete')")
    @DeleteMapping("/friendLink/{id}")
    public ApiResponse<String> deleteFriendLink(@PathVariable Long id) {
        FriendLink friendLink = friendLinkServiceImpl.getById(id);
        if (friendLink == null) {
            throw new BusinessException(ErrorCode.NOT_FOUND);
        } else {
            friendLink.setDeletedAt(LocalDateTime.now());
            friendLinkServiceImpl.updateById(friendLink);
        }
        return ApiResponse.success("删除成功");
    }
}

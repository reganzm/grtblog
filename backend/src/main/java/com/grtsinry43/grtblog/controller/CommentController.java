package com.grtsinry43.grtblog.controller;

import com.grtsinry43.grtblog.common.ErrorCode;
import com.grtsinry43.grtblog.dto.ApiResponse;
import com.grtsinry43.grtblog.dto.CommentLoginForm;
import com.grtsinry43.grtblog.dto.CommentNotLoginForm;
import com.grtsinry43.grtblog.entity.Article;
import com.grtsinry43.grtblog.entity.User;
import com.grtsinry43.grtblog.entity.UserBehavior;
import com.grtsinry43.grtblog.exception.BusinessException;
import com.grtsinry43.grtblog.service.UserBehaviorService;
import com.grtsinry43.grtblog.service.impl.ArticleServiceImpl;
import com.grtsinry43.grtblog.service.impl.CommentServiceImpl;
import com.grtsinry43.grtblog.util.IPLocationUtil;
import com.grtsinry43.grtblog.util.SecurityUtils;
import com.grtsinry43.grtblog.vo.CommentVO;
import jakarta.annotation.security.PermitAll;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.*;
import org.springframework.stereotype.Controller;

import java.time.LocalDateTime;
import java.util.List;

/**
 * 评论控制器
 *
 * @author grtsinry43
 * @since 2024-10-09
 */
@RestController
@RequestMapping("/comment")
public class CommentController {
    private final CommentServiceImpl commentService;
    private final UserBehaviorService userBehaviorService;
    private final ArticleServiceImpl articleService;

    public CommentController(CommentServiceImpl commentService, UserBehaviorService userBehaviorService, ArticleServiceImpl articleService) {
        this.commentService = commentService;
        this.userBehaviorService = userBehaviorService;
        this.articleService = articleService;
    }

    @PermitAll
    @GetMapping("/article/{shortUrl}")
    public ApiResponse<List<CommentVO>> listCommentByArticleId(@PathVariable String shortUrl) {
        return ApiResponse.success(commentService.listCommentByArticleId(shortUrl));
    }

    @PermitAll
    @GetMapping("/{id}")
    public ApiResponse<List<CommentVO>> getCommentListById(@PathVariable String id,@RequestParam(value = "page", defaultValue = "1") int page,
                                                          @RequestParam(value = "pageSize", defaultValue = "10") int pageSize) {
        try {
            Long idLong = Long.parseLong(id);
            return ApiResponse.success(commentService.getListById(idLong, page, pageSize));
        } catch (NumberFormatException e) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
    }

    @PermitAll
    @PostMapping
    public ApiResponse<CommentVO> addNewComment(@RequestBody CommentNotLoginForm form, HttpServletRequest request) {
        String location = IPLocationUtil.getIp2region(IPLocationUtil.getIp(request));
        String ua = request.getHeader("User-Agent");
        CommentVO comment =  commentService.addNewComment(form, IPLocationUtil.getIp(request), location, ua);
        // 这里看一下评论区对应的是不是文章，如果是文章的话，就记录一下用户行为
        if (articleService.lambdaQuery().eq(Article::getCommentId, form.getAreaId()).count() > 0) {
            UserBehavior userBehavior = new UserBehavior();
            userBehavior.setUserId(request.getSession().getId());
            userBehavior.setArticleId(articleService.lambdaQuery().eq(Article::getCommentId, form.getAreaId()).one().getId().toString());
            userBehavior.setType("3");
            userBehavior.setDate(LocalDateTime.now());
            userBehaviorService.save(userBehavior);
        }
        return ApiResponse.success(comment);
    }

    @PostMapping("/add")
    public ApiResponse<CommentVO> addNewCommentLogin(@RequestBody CommentLoginForm form, HttpServletRequest request) {
        User user = SecurityUtils.getCurrentUser();
        String location = IPLocationUtil.getIp2region(IPLocationUtil.getIp(request));
        String ua = request.getHeader("User-Agent");
        CommentVO comment =  commentService.addNewCommentLogin(user,form, IPLocationUtil.getIp(request), location, ua);
        // 这里看一下评论区对应的是不是文章，如果是文章的话，就记录一下用户行为
        if (articleService.lambdaQuery().eq(Article::getCommentId, form.getAreaId()).count() > 0) {
            UserBehavior userBehavior = new UserBehavior();
            userBehavior.setUserId(request.getSession().getId());
            userBehavior.setArticleId(articleService.lambdaQuery().eq(Article::getCommentId, form.getAreaId()).one().getId().toString());
            userBehavior.setType("3");
            userBehavior.setDate(LocalDateTime.now());
            userBehaviorService.save(userBehavior);
        }
        return ApiResponse.success(comment);
    }
}

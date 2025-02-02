package com.grtsinry43.grtblog.controller;

import com.grtsinry43.grtblog.common.ErrorCode;
import com.grtsinry43.grtblog.dto.ApiResponse;
import com.grtsinry43.grtblog.dto.CommentLoginForm;
import com.grtsinry43.grtblog.dto.CommentNotLoginForm;
import com.grtsinry43.grtblog.entity.*;
import com.grtsinry43.grtblog.exception.BusinessException;
import com.grtsinry43.grtblog.service.CommentAreaService;
import com.grtsinry43.grtblog.service.PageService;
import com.grtsinry43.grtblog.service.UserBehaviorService;
import com.grtsinry43.grtblog.service.impl.ArticleServiceImpl;
import com.grtsinry43.grtblog.service.impl.CommentServiceImpl;
import com.grtsinry43.grtblog.service.impl.StatusUpdateServiceImpl;
import com.grtsinry43.grtblog.util.IPLocationUtil;
import com.grtsinry43.grtblog.util.SecurityUtils;
import com.grtsinry43.grtblog.vo.CommentView;
import jakarta.annotation.security.PermitAll;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.*;

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
    private final StatusUpdateServiceImpl statusUpdateService;
    private final PageService pageService;
    private final CommentAreaService commentAreaService;

    public CommentController(CommentServiceImpl commentService, UserBehaviorService userBehaviorService, ArticleServiceImpl articleService, StatusUpdateServiceImpl statusUpdateService, PageService pageService, CommentAreaService commentAreaService) {
        this.commentService = commentService;
        this.userBehaviorService = userBehaviorService;
        this.articleService = articleService;
        this.statusUpdateService = statusUpdateService;
        this.pageService = pageService;
        this.commentAreaService = commentAreaService;
    }

    @PermitAll
    @GetMapping("/article/{shortUrl}")
    public ApiResponse<List<CommentView>> listCommentByArticleId(@PathVariable String shortUrl) {
        return ApiResponse.success(commentService.listCommentByArticleId(shortUrl));
    }

    @PermitAll
    @GetMapping("/{id}")
    public ApiResponse<List<CommentView>> getCommentListById(@PathVariable String id, @RequestParam(value = "page", defaultValue = "1") int page,
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
    public ApiResponse<CommentView> addNewComment(@RequestBody CommentNotLoginForm form, HttpServletRequest request) {
        String location = IPLocationUtil.getIp2region(IPLocationUtil.getIp(request));
        String ua = request.getHeader("User-Agent");
        CommentView comment = commentService.addNewComment(form, IPLocationUtil.getIp(request), location, ua);
        // 这里看一下评论区对应的是不是文章，如果是文章的话，就记录一下用户行为
        if (articleService.lambdaQuery().eq(Article::getCommentId, form.getAreaId()).count() > 0) {
            UserBehavior userBehavior = new UserBehavior();
            userBehavior.setUserId(request.getSession().getId());
            userBehavior.setArticleId(articleService.lambdaQuery().eq(Article::getCommentId, form.getAreaId()).one().getId().toString());
            userBehavior.setType("3");
            userBehavior.setDate(LocalDateTime.now());
            userBehaviorService.save(userBehavior);
        }
        // 这里找到对应的评论区，把评论数更新到对应的文章、动态、页面上
        CommentArea commentArea = commentAreaService.lambdaQuery().eq(CommentArea::getId, form.getAreaId()).one();
        if (commentArea != null) {
            if (commentArea.getAreaName().startsWith("文章")) {
                Article article = articleService.lambdaQuery().eq(Article::getCommentId, commentArea.getId()).one();
                if (article != null) {
                    article.setComments(article.getComments() + 1);
                    articleService.updateById(article);
                }
            } else if (commentArea.getAreaName().startsWith("分享")) {
                StatusUpdate statusUpdate = statusUpdateService.lambdaQuery().eq(StatusUpdate::getCommentId, commentArea.getId()).one();
                if (statusUpdate != null) {
                    statusUpdate.setComments(statusUpdate.getComments() + 1);
                    statusUpdateService.updateById(statusUpdate);
                }
            } else if (commentArea.getAreaName().startsWith("页面")) {
                Page page = pageService.lambdaQuery().eq(Page::getCommentId, commentArea.getId()).one();
                if (page != null) {
                    page.setComments(page.getComments() + 1);
                    pageService.updateById(page);
                }
            }
        }


        return ApiResponse.success(comment);
    }

    @PostMapping("/add")
    public ApiResponse<CommentView> addNewCommentLogin(@RequestBody CommentLoginForm form, HttpServletRequest request) {
        User user = SecurityUtils.getCurrentUser();
        String location = IPLocationUtil.getIp2region(IPLocationUtil.getIp(request));
        String ua = request.getHeader("User-Agent");
        CommentView comment = commentService.addNewCommentLogin(user, form, IPLocationUtil.getIp(request), location, ua);
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

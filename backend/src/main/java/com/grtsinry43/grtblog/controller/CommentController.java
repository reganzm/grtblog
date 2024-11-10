package com.grtsinry43.grtblog.controller;

import com.grtsinry43.grtblog.dto.ApiResponse;
import com.grtsinry43.grtblog.dto.CommentNotLoginForm;
import com.grtsinry43.grtblog.service.impl.CommentServiceImpl;
import com.grtsinry43.grtblog.util.IPLocationUtil;
import com.grtsinry43.grtblog.vo.CommentVO;
import jakarta.annotation.security.PermitAll;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.*;
import org.springframework.stereotype.Controller;

import java.util.List;

/**
 * <p>
 * 前端控制器
 * </p>
 *
 * @author grtsinry43
 * @since 2024-10-09
 */
@RestController
@RequestMapping("/comment")
@CrossOrigin(origins = "*", maxAge = 3600)
public class CommentController {
    private final CommentServiceImpl commentService;

    public CommentController(CommentServiceImpl commentService) {
        this.commentService = commentService;
    }

    @PermitAll
    @GetMapping("/article/{articleId}")
    public ApiResponse<List<CommentVO>> listCommentByArticleId(@PathVariable String articleId) {
        Long articleIdLong = Long.parseLong(articleId);
        return ApiResponse.success(commentService.listCommentByArticleId(articleIdLong));
    }

    @PermitAll
    @PostMapping
    public ApiResponse<CommentVO> addNewComment(@RequestBody CommentNotLoginForm form, HttpServletRequest request) {
        String ip = request.getRemoteAddr();
        String location = IPLocationUtil.getIp2region(IPLocationUtil.getIp(request));
        String ua = request.getHeader("User-Agent");
        return ApiResponse.success(commentService.addNewComment(form, ip, location, ua));
    }
}

package com.grtsinry43.grtblog.controller;

import com.grtsinry43.grtblog.dto.CommentNotLoginForm;
import com.grtsinry43.grtblog.service.impl.CommentServiceImpl;
import com.grtsinry43.grtblog.vo.CommentVO;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.stereotype.Controller;

/**
 * <p>
 * 前端控制器
 * </p>
 *
 * @author grtsinry43
 * @since 2024-10-09
 */
@Controller
@RequestMapping("/comment")
public class CommentController {
    private final CommentServiceImpl commentService;

    public CommentController(CommentServiceImpl commentService) {
        this.commentService = commentService;
    }

    @GetMapping("/article/{articleId}")
    public Object listCommentByArticleId(Long articleId) {
        return commentService.listCommentByArticleId(articleId);
    }

    @PostMapping
    public CommentVO addNewComment(@RequestBody CommentNotLoginForm form, HttpServletRequest request) {
        String ip = request.getRemoteAddr();
        String location = request.getHeader("X-Real-IP");
        String ua = request.getHeader("User-Agent");
        return commentService.addNewComment(form, ip, location, ua);
    }


}

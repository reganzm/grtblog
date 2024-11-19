package com.grtsinry43.grtblog.controller;

import com.grtsinry43.grtblog.common.ErrorCode;
import com.grtsinry43.grtblog.dto.ApiResponse;
import com.grtsinry43.grtblog.dto.CommentNotLoginForm;
import com.grtsinry43.grtblog.exception.BusinessException;
import com.grtsinry43.grtblog.service.impl.CommentServiceImpl;
import com.grtsinry43.grtblog.util.IPLocationUtil;
import com.grtsinry43.grtblog.vo.CommentVO;
import jakarta.annotation.security.PermitAll;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.*;
import org.springframework.stereotype.Controller;

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

    public CommentController(CommentServiceImpl commentService) {
        this.commentService = commentService;
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
        String ip = request.getRemoteAddr();
        String location = IPLocationUtil.getIp2region(IPLocationUtil.getIp(request));
        String ua = request.getHeader("User-Agent");
        return ApiResponse.success(commentService.addNewComment(form, ip, location, ua));
    }
}

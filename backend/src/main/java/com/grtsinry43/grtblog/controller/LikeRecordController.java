package com.grtsinry43.grtblog.controller;

import com.grtsinry43.grtblog.dto.ApiResponse;
import com.grtsinry43.grtblog.dto.LikeRecordRequest;
import com.grtsinry43.grtblog.entity.*;
import com.grtsinry43.grtblog.service.LikeRecordService;
import com.grtsinry43.grtblog.service.PageService;
import com.grtsinry43.grtblog.service.impl.ArticleServiceImpl;
import com.grtsinry43.grtblog.service.impl.StatusUpdateServiceImpl;
import com.grtsinry43.grtblog.util.SecurityUtils;
import jakarta.annotation.security.PermitAll;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author grtsinry43
 * @date 2025/2/3 17:00
 * @description 热爱可抵岁月漫长
 */
@RestController
@RequestMapping("/like-record")
public class LikeRecordController {
    private final LikeRecordService likeRecordService;
    private final ArticleServiceImpl articleServiceImpl;
    private final StatusUpdateServiceImpl statusUpdateServiceImpl;
    private final PageService pageService;

    public LikeRecordController(LikeRecordService likeRecordService, ArticleServiceImpl articleServiceImpl, StatusUpdateServiceImpl statusUpdateServiceImpl, PageService pageService) {
        this.likeRecordService = likeRecordService;
        this.articleServiceImpl = articleServiceImpl;
        this.statusUpdateServiceImpl = statusUpdateServiceImpl;
        this.pageService = pageService;
    }

//    @GetMapping
//    public ApiResponse<List<LikeRecord>> getAllLikeRecords() {
//        return ApiResponse.success(likeRecordService.list());
//    }

    @PermitAll
    @PostMapping
    public ApiResponse<Long> createLikeRecord(@RequestBody LikeRecordRequest request) {
        LikeRecord likeRecord = new LikeRecord();
        User currentUser = SecurityUtils.getCurrentUser();
        if (currentUser == null) {
            likeRecord.setUserId(request.getFingerprint());
        } else {
            likeRecord.setUserId(currentUser.getId().toString());
        }
        likeRecord.setType(request.getType());
        likeRecord.setTargetId(Long.parseLong(request.getTargetId()));
        likeRecordService.saveLikeRecord(likeRecord);
        long count = 0;
        switch (request.getType()) {
            case "article" -> {
                count = likeRecordService.getByTypeAndTargetId(request.getType(), Long.parseLong(request.getTargetId()));
                Article article = articleServiceImpl.getById(Long.parseLong(request.getTargetId()));
                if (article == null) {
                    return ApiResponse.error(404, "文章不存在");
                } else {
                    article.setLikes((int) count);
                    articleServiceImpl.updateById(article);
                }
            }
            case "moment" -> {
                count = likeRecordService.getByTypeAndTargetId(request.getType(), Long.parseLong(request.getTargetId()));
                StatusUpdate byId = statusUpdateServiceImpl.getById(Long.parseLong(request.getTargetId()));
                if (byId == null) {
                    return ApiResponse.error(404, "动态不存在");
                } else {
                    byId.setLikes((int) count);
                    statusUpdateServiceImpl.updateById(byId);
                }
            }
            case "page" -> {
                Page byId = pageService.getById(Long.parseLong(request.getTargetId()));
                if (byId == null) {
                    return ApiResponse.error(404, "页面不存在");
                } else {
                    count = likeRecordService.getByTypeAndTargetId(request.getType(), Long.parseLong(request.getTargetId()));
                    byId.setLikes((int) count);
                    pageService.updateById(byId);
                }
            }
            default -> {
                return ApiResponse.error(400, "类型错误");
            }
        }
        return ApiResponse.success(count);
    }

    @GetMapping("/{id}")
    public ApiResponse<LikeRecord> getLikeRecordById(@PathVariable Long id) {
        return ApiResponse.success(likeRecordService.getById(id));
    }
}

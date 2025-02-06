package com.grtsinry43.grtblog.controller;

import com.grtsinry43.grtblog.common.ErrorCode;
import com.grtsinry43.grtblog.common.SummaryResult;
import com.grtsinry43.grtblog.dto.ApiResponse;
import com.grtsinry43.grtblog.dto.ArticleRequest;
import com.grtsinry43.grtblog.common.ContentType;
import com.grtsinry43.grtblog.entity.Article;
import com.grtsinry43.grtblog.entity.Page;
import com.grtsinry43.grtblog.entity.StatusUpdate;
import com.grtsinry43.grtblog.exception.BusinessException;
import com.grtsinry43.grtblog.service.PageService;
import com.grtsinry43.grtblog.service.SummaryService;
import com.grtsinry43.grtblog.service.impl.ArticleServiceImpl;
import com.grtsinry43.grtblog.service.impl.StatusUpdateServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.HashMap;
import java.util.UUID;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

/**
 * @author grtsinry43
 * @date 2025/2/6 13:24
 * @description 热爱可抵岁月漫长
 */
@RestController
@RequestMapping("/summary")
public class SummaryController {

    @Autowired
    private SummaryService summaryService;
    @Autowired
    private ArticleServiceImpl articleServiceImpl;
    @Autowired
    private StatusUpdateServiceImpl statusUpdateServiceImpl;
    @Autowired
    private PageService pageService;

    // 提交总结任务
    @PostMapping
    public ApiResponse<HashMap<String, String>> createSummaryTask(@RequestBody ArticleRequest request) {
        String taskId = UUID.randomUUID().toString();
        String content = null;
        if (request.getType() == ContentType.ARTICLE) {
            Article byId = articleServiceImpl.getById(request.getTargetId());
            if (byId == null) {
                throw new BusinessException(ErrorCode.NOT_FOUND);
            } else {
                content = byId.getContent();
            }
        } else if (request.getType() == ContentType.MOMENT) {
            StatusUpdate byId = statusUpdateServiceImpl.getById(request.getTargetId());
            if (byId == null) {
                throw new BusinessException(ErrorCode.NOT_FOUND);
            } else {
                content = byId.getContent();
            }
        } else if (request.getType() == ContentType.PAGE) {
            Page byId = pageService.getById(request.getTargetId());
            if (byId == null) {
                throw new BusinessException(ErrorCode.NOT_FOUND);
            } else {
                content = byId.getContent();
            }
        } else {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        summaryService.processSummaryAsync(taskId, content, request.getType(), request.getTargetId(), request.getModel());
        return ApiResponse.success(new HashMap<String, String>() {{
            put("taskId", taskId);
        }});
    }

    // 查询任务状态
    @GetMapping("/{taskId}")
    public ApiResponse<SummaryResult> getSummaryResult(@PathVariable String taskId) {
        return summaryService.getResult(taskId)
                .map(ApiResponse::success)
                .orElse(ApiResponse.error(HttpStatus.PROCESSING.value(), "Task is still processing"));
    }

    // 在 Controller 添加
    @GetMapping(value = "/stream/{taskId}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter streamSummary(@PathVariable String taskId) {
        SseEmitter emitter = new SseEmitter(120_000L);
        Executors.newSingleThreadScheduledExecutor().scheduleAtFixedRate(() -> {
            SummaryResult result = summaryService.getTaskCache().get(taskId);
            if (result != null) {
                try {
                    emitter.send(SseEmitter.event().data(result).build());
                    emitter.send(SseEmitter.event().comment("flush").build()); // This will flush the event
                    if (result.getStatus().equals("COMPLETED")) { // Assuming there is a method to check if the task is complete
                        emitter.complete();
                    }
                } catch (IOException e) {
                    emitter.completeWithError(e);
                }
            }
        }, 0, 1, TimeUnit.SECONDS);
        return emitter;
    }
}

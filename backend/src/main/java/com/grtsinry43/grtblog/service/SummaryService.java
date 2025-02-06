package com.grtsinry43.grtblog.service;

import com.grtsinry43.grtblog.common.ContentType;
import com.grtsinry43.grtblog.common.SummaryResult;
import com.grtsinry43.grtblog.common.SummaryUpdateEvent;
import com.grtsinry43.grtblog.entity.Article;
import com.grtsinry43.grtblog.entity.Page;
import com.grtsinry43.grtblog.entity.StatusUpdate;
import com.grtsinry43.grtblog.service.impl.ArticleServiceImpl;
import com.grtsinry43.grtblog.service.impl.StatusUpdateServiceImpl;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

/**
 * @author grtsinry43
 * @date 2025/2/6 13:25
 * @description 热爱可抵岁月漫长
 */
@Service
public class SummaryService {
    @Getter
    private final Map<String, SummaryResult> taskCache = new ConcurrentHashMap<>();

    @Autowired
    private ArticleServiceImpl articleServiceImpl;
    @Autowired
    private StatusUpdateServiceImpl statusUpdateServiceImpl;
    @Autowired
    private PageService pageService;

    @Autowired
    private AIClient aiClient;

    @Async("aiTaskExecutor")
    public void processSummaryAsync(String taskId, String content, ContentType type, String targetId,String model) {
        try {
            taskCache.put(taskId, new SummaryResult("PROCESSING", ""));
            String summary = aiClient.generateSummary(taskId, content,model);
            taskCache.put(taskId, new SummaryResult("COMPLETED", summary));
            if (!summary.isBlank()) {
                if (type == ContentType.ARTICLE) {
                    Article byId = articleServiceImpl.getById(targetId);
                    byId.setAiSummary(summary);
                    articleServiceImpl.updateById(byId);
                } else if (type == ContentType.MOMENT) {
                    StatusUpdate byId = statusUpdateServiceImpl.getById(targetId);
                    byId.setAiSummary(summary);
                    statusUpdateServiceImpl.updateById(byId);
                } else if (type == ContentType.PAGE) {
                    Page byId = pageService.getById(targetId);
                    byId.setAiSummary(summary);
                    pageService.updateById(byId);
                }
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
            taskCache.put(taskId, new SummaryResult("FAILED", null));
        }
    }

    @EventListener
    public void handleSummaryUpdateEvent(SummaryUpdateEvent event) {
        String taskId = event.getTaskId();
        String content = event.getContent();
        taskCache.put(taskId, new SummaryResult("PROCESSING", content));
    }

    public Optional<SummaryResult> getResult(String taskId) {
        return Optional.ofNullable(taskCache.get(taskId));
    }
}

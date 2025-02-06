package com.grtsinry43.grtblog.common;

import lombok.Getter;
import org.springframework.context.ApplicationEvent;

/**
 * @author grtsinry43
 * @date 2025/2/6 17:19
 * @description 热爱可抵岁月漫长
 */
@Getter
public class SummaryUpdateEvent extends ApplicationEvent {
    private final String taskId;
    private final String content;

    public SummaryUpdateEvent(Object source, String taskId, String content) {
        super(source);
        this.taskId = taskId;
        this.content = content;
    }

}

package com.grtsinry43.grtblog.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

import java.util.concurrent.Executor;

/**
 * @author grtsinry43
 * @date 2025/2/6 13:27
 * @description 热爱可抵岁月漫长
 */
@Configuration
@EnableAsync
public class AsyncConfig {
    @Bean("aiTaskExecutor")
    public Executor taskExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(5);
        executor.setMaxPoolSize(10);
        executor.setQueueCapacity(500);
        executor.setThreadNamePrefix("AI-Summary-");
        executor.initialize();
        return executor;
    }
}

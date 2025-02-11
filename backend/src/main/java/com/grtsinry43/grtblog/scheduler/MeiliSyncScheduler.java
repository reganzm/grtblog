package com.grtsinry43.grtblog.scheduler;

import com.grtsinry43.grtblog.service.MeiliDataSyncService;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

/**
 * @author grtsinry43
 * @date 2024/11/23 18:52
 * @description 热爱可抵岁月漫长
 */
@Component
public class MeiliSyncScheduler {
    private final MeiliDataSyncService dataSyncService;

    public MeiliSyncScheduler(MeiliDataSyncService dataSyncService) {
        this.dataSyncService = dataSyncService;
    }

    // 每分钟同步最新的
    @Scheduled(cron = "0 * * * * ?")
    public void syncRecentData() {
        dataSyncService.syncAllRecent();
    }

    @Scheduled(cron = "0 0 * * * ?")
    public void syncData() {
        dataSyncService.syncAll();
    }
}

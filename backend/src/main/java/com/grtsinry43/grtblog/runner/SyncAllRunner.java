package com.grtsinry43.grtblog.runner;

import com.grtsinry43.grtblog.service.DataSyncService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

/**
 * @author grtsinry43
 * @date 2024/11/23 19:38
 * @description 热爱可抵岁月漫长
 */
@Component
public class SyncAllRunner implements CommandLineRunner {

    private final DataSyncService dataSyncService;

    @Autowired
    public SyncAllRunner(DataSyncService dataSyncService) {
        this.dataSyncService = dataSyncService;
    }

    @Override
    public void run(String... args) throws Exception {
        dataSyncService.syncAll();
    }
}
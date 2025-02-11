//package com.grtsinry43.grtblog.scheduler;
//
//import com.grtsinry43.grtblog.service.DataSyncService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.scheduling.annotation.Scheduled;
//import org.springframework.stereotype.Component;
//
///**
// * @author grtsinry43
// * @date 2024/11/23 18:52
// * @description 热爱可抵岁月漫长
// */
//@Component
//public class ESSyncScheduler {
//    private final DataSyncService dataSyncService;
//
//    public ESSyncScheduler(DataSyncService dataSyncService) {
//        this.dataSyncService = dataSyncService;
//    }
//
//    // 每分钟同步最新的
//    @Scheduled(cron = "0 * * * * ?")
//    public void syncRecentData() {
//        dataSyncService.syncAllRecent();
//    }
//
//    @Scheduled(cron = "0 0 * * * ?")
//    public void syncData() {
//        dataSyncService.syncAll();
//    }
//}

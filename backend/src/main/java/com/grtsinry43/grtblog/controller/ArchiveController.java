package com.grtsinry43.grtblog.controller;

import com.grtsinry43.grtblog.dto.ApiResponse;
import com.grtsinry43.grtblog.service.ArchiveService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Year;
import java.util.Map;

/**
 * @author grtsinry43
 * @date 2024/11/17 10:12
 * @description 热爱可抵岁月漫长
 */
@RestController
@RequestMapping("/archive")
public class ArchiveController {
    private final ArchiveService archiveService;

    public ArchiveController(ArchiveService archiveService) {
        this.archiveService = archiveService;
    }

    @GetMapping
    public ApiResponse<Map<Year, ArchiveService.ArchiveSummary>> getArchiveApi() {
        Map<Year, ArchiveService.ArchiveSummary> achieve = archiveService.getArchive();
        return ApiResponse.success(achieve);
    }
}

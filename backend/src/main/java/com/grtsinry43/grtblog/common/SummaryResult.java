package com.grtsinry43.grtblog.common;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * @author grtsinry43
 * @date 2025/2/6 13:28
 * @description 热爱可抵岁月漫长
 */
@Data
@AllArgsConstructor
public class SummaryResult {
    private String status; // PROCESSING, COMPLETED, FAILED
    private String content;
}

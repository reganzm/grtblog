package com.grtsinry43.grtblog.util;


import java.util.regex.*;

/**
 * @author grtsinry43
 * @date 2024/11/28 17:16
 * @description 热爱可抵岁月漫长
 */
public class UserAgentUtil {
    // 匹配操作系统的正则
    private static final String OS_PATTERN = "\\(([^)]+)\\)";
    // 匹配浏览器的正则（考虑主流浏览器优先）
    private static final String BROWSER_PATTERN = "(Chrome/[0-9\\.]+|Firefox/[0-9\\.]+|Safari/[0-9\\.]+|Edge/[0-9\\.]+|Opera/[0-9\\.]+|MSIE\\s[0-9\\.]+|Trident/[0-9\\.]+)";

    /**
     * 从 User-Agent 中提取操作系统信息
     *
     * @param userAgent 用户代理字符串
     * @return 操作系统信息，未知返回 "Unknown OS"
     */
    public static String extractOS(String userAgent) {
        Pattern pattern = Pattern.compile(OS_PATTERN);
        Matcher matcher = pattern.matcher(userAgent);
        return matcher.find() ? matcher.group(1) : "Unknown OS";
    }

    /**
     * 从 User-Agent 中提取浏览器信息
     *
     * @param userAgent 用户代理字符串
     * @return 浏览器信息，未知返回 "Unknown Browser"
     */
    public static String extractBrowser(String userAgent) {
        Pattern pattern = Pattern.compile(BROWSER_PATTERN);
        Matcher matcher = pattern.matcher(userAgent);
        return matcher.find() ? matcher.group(1) : "Unknown Browser";
    }
}


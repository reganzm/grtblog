package com.grtsinry43.grtblog.util;

import jakarta.servlet.http.HttpServletRequest;
import org.apache.commons.lang3.StringUtils;
import org.lionsoul.ip2region.xdb.Searcher;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.FileCopyUtils;

import java.io.IOException;
import java.io.InputStream;
import java.net.InetAddress;
import java.net.UnknownHostException;

/**
 * Utility class for getting address by IP using ip2region library.
 *
 * @date 2024/11/2 23:58
 * @description 热爱可抵岁月漫长
 */
public class IPLocationUtil {

    private static final Logger logger = LoggerFactory.getLogger(IPLocationUtil.class);
    private static final String LOCAL_IP = "127.0.0.1";

    private static final Searcher searcher;

    static {
        try {
            InputStream ris = IPLocationUtil.class.getResourceAsStream("/ip2region.xdb");
            byte[] dbBinStr = FileCopyUtils.copyToByteArray(ris);
            searcher = Searcher.newWithBuffer(dbBinStr);
            logger.debug("ip2region 数据库加载成功");
        } catch (IOException e) {
            logger.error("无法创建搜索器: {}", e.getMessage());
            throw new RuntimeException("无法加载 ip2region 数据库", e);
        }
    }

    /**
     * 获取用户真实 IP 地址
     *
     * @param request HttpServletRequest
     * @return 用户真实 IP 地址
     */
    public static String getIp(HttpServletRequest request) {
        String ipAddress = request.getHeader("X-Original-Forwarded-For");

        if (StringUtils.isBlank(ipAddress) || "unknown".equalsIgnoreCase(ipAddress)) {
            ipAddress = request.getHeader("X-Forwarded-For");
        }
        if (StringUtils.isBlank(ipAddress) || "unknown".equalsIgnoreCase(ipAddress)) {
            ipAddress = request.getRemoteAddr();
            if (LOCAL_IP.equals(ipAddress)) {
                try {
                    InetAddress inet = InetAddress.getLocalHost();
                    ipAddress = inet.getHostAddress();
                } catch (UnknownHostException e) {
                    logger.error("获取IP地址失败: {}", e.getMessage());
                }
            }
        }

        if (ipAddress != null && ipAddress.length() > 15) {
            int commaIndex = ipAddress.indexOf(",");
            if (commaIndex > 0) {
                ipAddress = ipAddress.substring(0, commaIndex);
            }
        }
        return "0:0:0:0:0:0:0:1".equals(ipAddress) ? LOCAL_IP : ipAddress;
    }

    /**
     * 获取用户代理信息
     *
     * @param request HttpServletRequest
     * @return UserAgent 对象
     */
    public static String getUserAgent(HttpServletRequest request) {
        return request.getHeader("User-Agent");
    }

    /**
     * 根据 IP 获取城市信息
     *
     * @param ipAddress IP 地址
     * @return 城市信息
     */
    public static String getCityInfo(String ipAddress) {
        try {
            return searcher.search(ipAddress);
        } catch (Exception e) {
            logger.error("搜索IP失败: {} - {}", ipAddress, e.getMessage());
            return null;
        }
    }

    /**
     * 根据 IP 获取 ip2region 信息
     *
     * @param ip IP 地址
     * @return 解析后的信息
     */
    public static String getIp2region(String ip) {
        if (searcher == null) {
            logger.error("搜索器未初始化");
            return null;
        }

        try {
            String ipInfo = searcher.search(ip);
            if (!StringUtils.isEmpty(ipInfo)) {
                return ipInfo.replace("|0", "").replace("0|", "").replace("|", "");
            }
        } catch (Exception e) {
            logger.error("解析IP信息失败: {}", e.getMessage());
        }
        return null;
    }

    /**
     * 获取本地 IP 地址
     *
     * @return 本地 IP 地址
     */
    public static String getHostIp() {
        try {
            return InetAddress.getLocalHost().getHostAddress();
        } catch (UnknownHostException e) {
            logger.error("获取本地IP失败: {}", e.getMessage());
            return LOCAL_IP;
        }
    }

    /**
     * 获取本地主机名
     *
     * @return 本地主机名
     */
    public static String getHostName() {
        try {
            return InetAddress.getLocalHost().getHostName();
        } catch (UnknownHostException e) {
            logger.error("获取本地主机名失败: {}", e.getMessage());
            return "未知";
        }
    }
}

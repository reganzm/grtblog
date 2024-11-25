package com.grtsinry43.grtblog.controller;

import com.grtsinry43.grtblog.dto.ApiResponse;
import jakarta.servlet.http.HttpServletRequest;
import lombok.Data;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.TimeUnit;

/**
 * @author grtsinry43
 * @date 2024/8/19 07:49
 * @description 文件上传相关
 */

@RestController
@RequestMapping("/upload")
public class UploadFileController {

    private static final int MAX_REQUESTS_PER_MINUTE = 10;
    private static final ConcurrentHashMap<String, UserRequestInfo> userRequestMap = new ConcurrentHashMap<>();
    private static final ConcurrentHashMap<String, String> fileHashMap = new ConcurrentHashMap<>();

    @PostMapping
    public ApiResponse<String> handleFileUpload(@RequestParam("file") MultipartFile file, HttpServletRequest request) {
        if (file.isEmpty()) {
            return ApiResponse.error(400, "文件为空");
        }

        String username = request.getSession().getId();
        UserRequestInfo userRequestInfo = userRequestMap.computeIfAbsent(username, k -> new UserRequestInfo());
        synchronized (userRequestInfo) {
            long currentTime = System.currentTimeMillis();
            if (currentTime - userRequestInfo.getLastRequestTime() > TimeUnit.MINUTES.toMillis(1)) {
                userRequestInfo.resetRequestCount();
            }
            userRequestInfo.incrementRequestCount();
            userRequestInfo.setLastRequestTime(currentTime);

            if (userRequestInfo.getRequestCount() > MAX_REQUESTS_PER_MINUTE) {
                return ApiResponse.error(429, "请求过于频繁，请稍后再试");
            }
        }

        String originalFileName = file.getOriginalFilename();
        assert originalFileName != null;
        String fileExtension = getFileExtension(originalFileName);
        if (!isAllowedExtension(fileExtension)) {
            return ApiResponse.error(400, "不支持的文件类型");
        }

        try {
            String fileHash = getFileHash(file);
            if (fileHashMap.containsKey(fileHash)) {
                return ApiResponse.success(fileHashMap.get(fileHash));
            }

            LocalDateTime now = LocalDateTime.now();
            DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy/MM/dd");
            String datePath = now.format(dateFormatter);

            String uploadDir = "uploads/" + datePath + "/";
            File uploadDirFile = new File(uploadDir);
            if (!uploadDirFile.exists() && !uploadDirFile.mkdirs()) {
                return ApiResponse.error(500, "文件上传失败：无法创建目录");
            }

            String uuid = UUID.randomUUID().toString();
            String baseName = originalFileName.replaceAll("\\s+", "_").replaceAll("[^a-zA-Z0-9_\\-\\.]", "");
            String fileName = baseName + "_" + uuid + fileExtension;

            String filePath = uploadDir + fileName;
            File destFile = new File(filePath);
            file.transferTo(destFile);
            fileHashMap.put(fileHash, filePath);
            return ApiResponse.success("/" + filePath);
        } catch (IOException | NoSuchAlgorithmException e) {
            System.out.println(e.getMessage());
            return ApiResponse.error(500, "文件上传失败");
        }
    }

    private String getFileExtension(String fileName) {
        int dotIndex = fileName.lastIndexOf('.');
        return (dotIndex == -1) ? "" : fileName.substring(dotIndex);
    }

    private boolean isAllowedExtension(String extension) {
        String[] allowedExtensions = {".jpg", ".png", ".pdf", ".jpeg", ".gif"};
        for (String allowed : allowedExtensions) {
            if (extension.equalsIgnoreCase(allowed)) {
                return true;
            }
        }
        return false;
    }

    private String getFileHash(MultipartFile file) throws IOException, NoSuchAlgorithmException {
        MessageDigest digest = MessageDigest.getInstance("SHA-256");
        byte[] fileBytes = file.getBytes();
        byte[] hashBytes = digest.digest(fileBytes);
        StringBuilder sb = new StringBuilder();
        for (byte b : hashBytes) {
            sb.append(String.format("%02x", b));
        }
        return sb.toString();
    }

    @Data
    private static class UserRequestInfo {
        private int requestCount;
        private long lastRequestTime;

        public void incrementRequestCount() {
            this.requestCount++;
        }

        public void resetRequestCount() {
            this.requestCount = 0;
        }
    }
}
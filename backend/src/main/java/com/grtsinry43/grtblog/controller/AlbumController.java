package com.grtsinry43.grtblog.controller;

import com.grtsinry43.grtblog.dto.ApiResponse;
import com.grtsinry43.grtblog.dto.PhotoAddRequest;
import com.grtsinry43.grtblog.service.PhotoService;
import com.grtsinry43.grtblog.vo.PhotoPreview;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

/**
 * @author grtsinry43
 * @date 2025/2/8 12:56
 * @description 热爱可抵岁月漫长
 */
@RestController
@RequestMapping("/photos")
public class AlbumController {
    private final PhotoService photoService;

    public AlbumController(PhotoService photoService) {
        this.photoService = photoService;
    }

    @GetMapping
    public ApiResponse<List<PhotoPreview>> getPhotos(@RequestParam Integer page, @RequestParam Integer pageSize) {
        return ApiResponse.success(photoService.getPhotos(page, pageSize));
    }

    @PostMapping("/upload")
    public ApiResponse<PhotoPreview> uploadPhoto(@RequestBody PhotoAddRequest request) {
        return ApiResponse.success(photoService.uploadPhoto(request));
    }
}

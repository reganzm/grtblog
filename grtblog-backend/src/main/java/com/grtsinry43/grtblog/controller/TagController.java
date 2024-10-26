package com.grtsinry43.grtblog.controller;

import com.grtsinry43.grtblog.annotation.AuthCheck;
import com.grtsinry43.grtblog.common.UserRole;
//import com.grtsinry43.grtblog.config.MyBatisPlusConfig;
import com.grtsinry43.grtblog.dto.ApiResponse;
import com.grtsinry43.grtblog.entity.Tag;
import com.grtsinry43.grtblog.service.impl.TagServiceImpl;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * <p>
 * 前端控制器
 * </p>
 *
 * @author grtsinry43
 * @since 2024-10-09
 */
@Slf4j
@Validated
@RestController
@RequestMapping("/tag")
public class TagController {
    private final TagServiceImpl tagService;

    public TagController(TagServiceImpl tagService) {
        this.tagService = tagService;
    }

    //    @AuthCheck(requiredRole = UserRole.ADMIN)
    @PostMapping("/add")
    public ApiResponse<Tag> addNewTagApi(@NotNull @NotBlank @RequestParam String tagName) {
        System.out.println("addNewTagApi");
        Tag tag = tagService.addNewTag(tagName);
        System.out.println(GlobalExceptionHandler.getBusinessExceptionCount());
        return ApiResponse.success(tag);
    }
}

package com.grtsinry43.grtblog.controller;

import com.grtsinry43.grtblog.dto.ApiResponse;
import com.grtsinry43.grtblog.service.impl.CategoryServiceImpl;
import com.grtsinry43.grtblog.vo.CategoryVO;
import jakarta.annotation.security.PermitAll;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * 分类控制器
 * @author grtsinry43
 * @date 2024/11/16 14:04
 * @description 热爱可抵岁月漫长
 */
@RestController
@RequestMapping("/category")
public class CategoryController {
    private final CategoryServiceImpl categoryService;

    public CategoryController(CategoryServiceImpl categoryService) {
        this.categoryService = categoryService;
    }

    @PermitAll
    @GetMapping("/all")
    public ApiResponse<List<CategoryVO>> getAllCategories() {
        List<CategoryVO> allCategories = categoryService.listAllCategories();
        return ApiResponse.success(allCategories);
    }
}

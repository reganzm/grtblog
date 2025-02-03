package com.grtsinry43.grtblog.controller;

import com.grtsinry43.grtblog.dto.ApiResponse;
import com.grtsinry43.grtblog.entity.FooterSection;
import com.grtsinry43.grtblog.service.FooterSectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author grtsinry43
 * @date 2025/2/3 21:41
 * @description 热爱可抵岁月漫长
 */
@RestController
@RequestMapping("/footer")
public class FooterLinkController {
    @Autowired
    private FooterSectionService footerSectionService;

    @GetMapping("/all")
    public ApiResponse<List<FooterSection>> getAll() {
        return ApiResponse.success(footerSectionService.list());
    }

    @PostMapping
    public ApiResponse<FooterSection> create(@RequestBody FooterSection section) {
        footerSectionService.save(section);
        return ApiResponse.success(section);
    }

    @PutMapping("/{id}")
    public ApiResponse<FooterSection> update(@PathVariable Long id, @RequestBody FooterSection section) {
        section.setId(id);
        footerSectionService.updateById(section);
        return ApiResponse.success(section);
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> delete(@PathVariable Long id) {
        footerSectionService.removeById(id);
        return ApiResponse.success();
    }
}

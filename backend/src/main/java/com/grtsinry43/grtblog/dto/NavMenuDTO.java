package com.grtsinry43.grtblog.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

/**
 * @author grtsinry43
 * @date 2025/2/3 19:21
 * @description 热爱可抵岁月漫长
 */
@Data
public class NavMenuDTO {
    private Long id;
    @NotBlank(message = "菜单名称不能为空")
    private String name;
    @NotBlank(message = "URL不能为空")
    private String url;
    private Long parentId;
}


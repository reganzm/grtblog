package com.grtsinry43.grtblog.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class NavMenuBatchUpdateDTO {
    @NotNull(message = "ID不能为空")
    private Long id;
    private Long parentId;
    @NotNull(message = "排序值不能为空")
    private Integer sort;
}

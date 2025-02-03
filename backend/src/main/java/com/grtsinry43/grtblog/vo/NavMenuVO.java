package com.grtsinry43.grtblog.vo;

import lombok.Data;

import java.util.List;

/**
 * @author grtsinry43
 * @date 2024/11/16 00:07
 * @description 热爱可抵岁月漫长
 */
@Data
public class NavMenuVO {
    private Long id;
    private String name;
    private Boolean isArticle;
    private String href;
    private Integer sort;
    private Long parentId;
    private List<NavMenuVO> children;
}

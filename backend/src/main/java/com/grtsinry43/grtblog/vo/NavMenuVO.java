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
    private String name;
    private String href;
    private List<NavMenuVO> children;
}

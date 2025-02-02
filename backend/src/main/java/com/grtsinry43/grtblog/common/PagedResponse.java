package com.grtsinry43.grtblog.common;

import lombok.Data;

import java.util.List;

/**
 * @author grtsinry43
 * @date 2025/2/2 22:01
 * @description 热爱可抵岁月漫长
 */
@Data
public class PagedResponse<T> {
    private List<T> data;
    private long total;

    public PagedResponse(List<T> data, long total) {
        this.data = data;
        this.total = total;
    }

}

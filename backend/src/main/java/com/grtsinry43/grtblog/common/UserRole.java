package com.grtsinry43.grtblog.common;

import com.baomidou.mybatisplus.core.toolkit.ObjectUtils;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

/**
 * 用户角色枚举
 *
 * @author grtsinry43
 * @date 2024/9/1 16:14
 */
public enum UserRole {
    NOT_LOGIN("未登录", "not_login"),
    USER("默认角色", "user"),
    WRITER("作者角色", "writer"),
    ADMIN("管理员角色", "admin"),
    BAN("被封禁用户", "ban");

    private final String text;

    private final String value;

    UserRole(String text, String value) {
        this.text = text;
        this.value = value;
    }

    /**
     * 获取值列表
     */
    public static List<String> getValues() {
        return Arrays.stream(values()).map(item -> item.value).collect(Collectors.toList());
    }

    /**
     * 根据 value 获取枚举
     */
    public static UserRole getEnumByValue(String value) {
        if (ObjectUtils.isEmpty(value)) {
            return null;
        }
        for (UserRole anEnum : UserRole.values()) {
            if (anEnum.value.equals(value)) {
                return anEnum;
            }
        }
        return null;
    }

    public String getValue() {
        return value;
    }

    public String getText() {
        return text;
    }
}

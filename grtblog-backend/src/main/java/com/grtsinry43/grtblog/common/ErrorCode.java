package com.grtsinry43.grtblog.common;

import lombok.Getter;

/**
 * @author grtsinry43
 * @date 2024/9/1 15:44
 * @description 少年负壮气，奋烈自有时！
 */
@Getter
public enum ErrorCode {
    SUCCESS(0, "成功"),
    PARAMS_ERROR(400, "参数错误"),
    NOT_LOGIN(401, "未登录或登录已过期"),
    UNAUTHORIZED(403, "你没有访问该资源的权限"),
    NOT_FOUND(404, "请求的资源不存在"),
    SERVER_ERROR(500, "服务器内部错误"),
    OPERATION_ERROR(501, "操作失败");

    private final int code;
    private final String msg;

    ErrorCode(int code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    public String getMessage() {
        return msg;
    }

}

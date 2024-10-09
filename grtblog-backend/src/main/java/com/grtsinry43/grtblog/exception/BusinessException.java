package com.grtsinry43.grtblog.exception;

import com.grtsinry43.grtblog.common.ErrorCode;
import lombok.Getter;

/**
 * @author grtsinry43
 * @date 2024/9/8 14:55
 * @description 少年负壮气，奋烈自有时！
 */
@Getter
public class BusinessException extends RuntimeException {
    private final ErrorCode errorCode;
    private final String message;

    public BusinessException(ErrorCode errorCode) {
        this.errorCode = errorCode;
        this.message = errorCode.getMessage();
    }
}

package com.grtsinry43.grtblog.util;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

/**
 * @author grtsinry43
 * @date 2025/1/5 20:57
 * @description 热爱可抵岁月漫长
 */

public class MD5Util {
    public static String getMD5(String input) {
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            byte[] messageDigest = md.digest(input.getBytes());
            StringBuilder sb = new StringBuilder();
            for (byte b : messageDigest) {
                sb.append(String.format("%02x", b));
            }
            return sb.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }
}

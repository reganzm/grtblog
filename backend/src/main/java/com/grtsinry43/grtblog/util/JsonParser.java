package com.grtsinry43.grtblog.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * @author grtsinry43
 * @date 2024/10/27 10:31
 * @description 热爱可抵岁月漫长
 */

public class JsonParser {

    private static final ObjectMapper objectMapper = new ObjectMapper();

    /**
     * 将对象转换为 JSON 字符串
     *
     * @param object 要转换的对象
     * @return 对象的 JSON 字符串表示
     * @throws JsonProcessingException 如果对象无法转换为 JSON
     */
    public static String toJson(Object object) throws JsonProcessingException {
        return objectMapper.writeValueAsString(object);
    }

    /**
     * 将 JSON 字符串转换为指定类的对象
     *
     * @param json  JSON 字符串
     * @param clazz 对象的类
     * @param <T>   对象的类型
     * @return 转换后的对象
     * @throws JsonProcessingException 如果 JSON 字符串无法转换为对象
     */
    public static <T> T fromJson(String json, Class<T> clazz) throws JsonProcessingException {
        return objectMapper.readValue(json, clazz);
    }

    /**
     * 处理 JSON 字符串中的引号和换行符
     *
     * @param jsonString 原始 JSON 字符串
     * @return 处理后的 JSON 字符串
     */
    public static String escapeJsonString(String jsonString) {
        return jsonString.replace("\n", "\\n").replace("\"", "\\\"");
    }
}
package com.grtsinry43.grtblog.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Data;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * @auther grtsinry43
 * @date 2024/11/10 21:55
 * @description 热爱可抵岁月漫长
 */

public class ArticleParser {

    public static String generateToc(String content) throws JsonProcessingException {
        List<Heading> headings = new ArrayList<>();
        Pattern pattern = Pattern.compile("^(#{1,6})\\s*(.+)$", Pattern.MULTILINE);
        Matcher matcher = pattern.matcher(content);
        Map<String, Integer> anchorCount = new HashMap<>();

        int lineNumber = 0;
        while (matcher.find()) {
            lineNumber++;
            int level = matcher.group(1).length();
            String text = matcher.group(2);
            String anchor = "line-" + lineNumber;

            headings.add(new Heading(level, text, anchor));
        }

        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.writeValueAsString(headings);
    }

    @Data
    public static class Heading {
        private final int level;
        private final String text;
        private final String anchor;

        public Heading(int level, String text, String anchor) {
            this.level = level;
            this.text = text;
            this.anchor = anchor;
        }
    }
}
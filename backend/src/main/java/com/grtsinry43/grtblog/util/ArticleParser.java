package com.grtsinry43.grtblog.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Data;
import net.sourceforge.pinyin4j.PinyinHelper;

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
        List<HeadingNode> toc = new ArrayList<>();
        Pattern pattern = Pattern.compile("^(#{1,6})\\s*(.+)$", Pattern.MULTILINE);
        Matcher matcher = pattern.matcher(content);
        Map<Integer, List<HeadingNode>> levelMap = new HashMap<>();
        int anchorIndex = 1;
        int minLevel = Integer.MAX_VALUE;

        // 找出最小的标题级别
        while (matcher.find()) {
            int level = matcher.group(1).length();
            minLevel = Math.min(minLevel, level);
        }
        matcher.reset();  // 重置匹配器以重新开始解析

        // 根据最小标题级别构建 TOC，这样是为了防止我这种不写一级标题的（）
        while (matcher.find()) {
            int level = matcher.group(1).length();
            String text = matcher.group(2);
            String anchor = "article-md-title-" + anchorIndex++;
            HeadingNode node = new HeadingNode(text, anchor);

//            System.out.println("Matched heading: " + text + " with level: " + level);

            if (level == minLevel) {
                toc.add(node);
            } else {
                List<HeadingNode> parentList = levelMap.get(level - 1);
                if (parentList != null && !parentList.isEmpty()) {
                    HeadingNode parent = parentList.get(parentList.size() - 1);
                    parent.getChildren().add(node);
                }
            }

            levelMap.computeIfAbsent(level, k -> new ArrayList<>()).add(node);
        }

        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.writeValueAsString(toc);
    }

    @Data
    public static class HeadingNode {
        private final String name;
        private final String anchor;
        private final List<HeadingNode> children = new ArrayList<>();

        public HeadingNode(String name, String anchor) {
            this.name = name;
            this.anchor = anchor;
        }
    }

    public static String generateShortUrl(String title) {
        // 去掉标题中非英文字符，空格替换为 -，汉字替换为拼音，所有字母小写
        StringBuilder pinyinTitle = new StringBuilder();
        for (char c : title.toCharArray()) {
            if (Character.toString(c).matches("[\\u4e00-\\u9fa5]")) {
                String[] pinyinArray = PinyinHelper.toHanyuPinyinStringArray(c);
                if (pinyinArray != null) {
                    pinyinTitle.append(pinyinArray[0]);
                }
            } else {
                pinyinTitle.append(c);
            }
        }

        return pinyinTitle.toString().replaceAll("[^a-zA-Z0-9]", "")
                .replace(" ", "-")
                .toLowerCase();
    }
}

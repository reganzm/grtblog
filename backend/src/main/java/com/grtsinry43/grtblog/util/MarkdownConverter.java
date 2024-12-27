package com.grtsinry43.grtblog.util;

import org.commonmark.node.Node;
import org.commonmark.parser.Parser;
import org.commonmark.renderer.html.HtmlRenderer;

/**
 * @author grtsinry43
 * @date 2024/12/27 11:50
 * @description 热爱可抵岁月漫长
 */
public class MarkdownConverter {
    public static String convertMarkdownToHtml(String markdown) {
        Parser parser = Parser.builder().build();
        Node document = parser.parse(markdown);
        HtmlRenderer renderer = HtmlRenderer.builder().build();
        return renderer.render(document);
    }
}

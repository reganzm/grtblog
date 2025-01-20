package com.grtsinry43.grtblog.util;

import com.vladsch.flexmark.ext.tables.TablesExtension;
import com.vladsch.flexmark.html.HtmlRenderer;
import com.vladsch.flexmark.parser.Parser;
import com.vladsch.flexmark.ext.gfm.strikethrough.StrikethroughExtension;
import com.vladsch.flexmark.util.ast.Node;

import java.util.Arrays;

/**
 * @author grtsinry43
 * @date 2024/12/27 11:50
 * @description 热爱可抵岁月漫长
 */
public class MarkdownConverter {
    public static String convertMarkdownToHtml(String markdown) {
        Parser parser = Parser.builder().extensions(Arrays.asList(TablesExtension.create(), StrikethroughExtension.create())).build();
        Node document = parser.parse(markdown);
        HtmlRenderer renderer = HtmlRenderer.builder().extensions(Arrays.asList(TablesExtension.create(), StrikethroughExtension.create())).build();
        return renderer.render(document);
    }
}

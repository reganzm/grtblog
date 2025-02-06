package com.grtsinry43.grtblog.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.grtsinry43.grtblog.common.SummaryUpdateEvent;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class AIClient {
//    private static final String API_URL = "https://api.deepseek.com/chat/completions";
    private static final String API_URL = "https://ark.cn-beijing.volces.com/api/v3/chat/completions";

    @Value("${com.grtsinry43.deepseek-api-key}")
    private String apiKey;

    private final ObjectMapper objectMapper = new ObjectMapper();

    private final ApplicationEventPublisher eventPublisher;

    public AIClient(ApplicationEventPublisher eventPublisher) {
        this.eventPublisher = eventPublisher;
    }

    public String generateSummary(String taskId, String content, String model) throws IOException {
        // 构造 JSON 请求体
        Map<String, Object> requestBody = new HashMap<>();
//        requestBody.put("model", model);
        requestBody.put("model", "ep-20250127215805-dbdr8");
        requestBody.put("messages", List.of(
                Map.of("role", "system", "content", "你是DeepSeek-R1，作为先进的语言模型，在接下来的所有聊天中，我将会给你一篇博客文章（md格式），你需要分析这个博文的内容，给出总结，总结内容尽量在200字左右，你可以使用加粗斜体链接代码块等markdown语法，条例清晰，总结概括完整，有先导和总结的意义，要求开头用诗意和深刻的语言，写几句骈句作为开头，下面的内容若文章技术类则总结偏向逻辑，如果偏向生活类则总结偏向文学唯美，注意要 pangu 混排格式化，保证观感舒适"),
                Map.of("role", "user", "content", content)
        ));
        requestBody.put("stream", true);

        // 序列化为 JSON
        String jsonRequest = objectMapper.writeValueAsString(requestBody);

        // 创建 HTTP 请求
        HttpPost post = new HttpPost(API_URL);
        post.setHeader("Authorization", "Bearer " + apiKey);
        post.setHeader("Content-Type", "application/json; charset=UTF-8"); // 明确指定请求编码

        // 使用 UTF-8 编码的请求体
        post.setEntity(new StringEntity(jsonRequest, StandardCharsets.UTF_8));

        try (CloseableHttpClient httpClient = HttpClients.createDefault();
             CloseableHttpResponse response = httpClient.execute(post);
             BufferedReader reader = new BufferedReader(new InputStreamReader(response.getEntity().getContent(), StandardCharsets.UTF_8))) {

            StringBuilder result = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                if (line.endsWith("[DONE]")) {
                    break;
                } else if (line.endsWith("keep-alive")) {
                    continue;
                }
                JsonNode rootNode = objectMapper.readTree(line.replace("data:", ""));
                JsonNode choicesNode = rootNode.path("choices");
                if (choicesNode.isArray() && !choicesNode.isEmpty()) {
                    JsonNode deltaNode = choicesNode.get(0).path("delta");
                    if (deltaNode.has("content")) {
                        result.append(deltaNode.path("content").asText().equals("null") ? "" : deltaNode.path("content").asText());
                        eventPublisher.publishEvent(new SummaryUpdateEvent(this, taskId, result.toString()));
                    }
                }
            }

            return result.isEmpty() ? "" : result.toString();
        }
    }
}
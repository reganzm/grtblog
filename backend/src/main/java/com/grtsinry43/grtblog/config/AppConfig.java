package com.grtsinry43.grtblog.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

/**
 * @author grtsinry43
 * @date 2024/8/2 下午9:38
 * @description 少年负壮气，奋烈自有时！
 */
@Configuration
public class AppConfig {

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}

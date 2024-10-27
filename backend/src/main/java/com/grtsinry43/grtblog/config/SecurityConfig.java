package com.grtsinry43.grtblog.config;

//import com.grtsinry43.grtblog.security.JwtAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * @author grtsinry43
 * @date 2024/10/10 16:42
 * @description 热爱可抵岁月漫长
 */

@Configuration
@EnableWebSecurity
public class SecurityConfig {

//    private final JwtAuthenticationFilter jwtAuthenticationFilter;
//
//    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
//        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
//    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authorize -> authorize
//                        .requestMatchers("/login", "/register").permitAll()
                        .anyRequest().permitAll()
                );
//                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

}
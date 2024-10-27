//package com.grtsinry43.grtblog.security;
//
//
//import com.auth0.jwt.JWT;
//import com.auth0.jwt.algorithms.Algorithm;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.grtsinry43.grtblog.common.ErrorCode;
//import com.grtsinry43.grtblog.dto.ApiResponse;
//import com.grtsinry43.grtblog.exception.BusinessException;
//import jakarta.servlet.FilterChain;
//import jakarta.servlet.ServletException;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
//import org.springframework.stereotype.Component;
//import org.springframework.web.filter.OncePerRequestFilter;
//
//import java.io.IOException;
//
///**
// * @author grtsinry43
// * @date 2024/10/10 16:39
// * @description 热爱可抵岁月漫长
// */
//
//@Component
//public class JwtAuthenticationFilter extends OncePerRequestFilter {
//
//    @Value("${com.grtsinry43.secret_key}")
//    private static String SECRET_KEY;
//
//    @Override
//    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
//            throws ServletException, IOException {
//        String token = request.getHeader("Authorization");
//
//        try {
//            if (token != null && token.startsWith("Bearer ")) {
//                token = token.substring(7);
//                String username = JWT.require(Algorithm.HMAC512(SECRET_KEY)).build().verify(token).getSubject();
//
//                if (username != null) {
//                    UsernamePasswordAuthenticationToken authentication =
//                            new UsernamePasswordAuthenticationToken(username, null, null);
//                    authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
//                    SecurityContextHolder.getContext().setAuthentication(authentication);
//                }
//            } else {
//                throw new BusinessException(ErrorCode.NOT_LOGIN);
//            }
//
//            filterChain.doFilter(request, response);
//        } catch (BusinessException ex) {
//            // 设置响应类型为JSON
//            response.setContentType("application/json;charset=UTF-8");
//            response.setStatus(HttpServletResponse.SC_OK);
//
//            // 将ApiResponse转换为JSON并写入响应
//            ApiResponse<Object> apiResponse = ApiResponse.error(ex.getErrorCode().getCode(), ex.getMessage());
//            String jsonResponse = new ObjectMapper().writeValueAsString(apiResponse); // 使用Jackson的ObjectMapper将对象转换为JSON
//
//            response.getWriter().write(jsonResponse);
//        } catch (Exception e) {
//            // 设置响应类型为JSON
//            response.setContentType("application/json;charset=UTF-8");
//            response.setStatus(HttpServletResponse.SC_OK);
//
//            // 将ApiResponse转换为JSON并写入响应
//            ApiResponse<Object> apiResponse = ApiResponse.error(500, "Internal Server Error");
//            String jsonResponse = new ObjectMapper().writeValueAsString(apiResponse); // 使用Jackson的ObjectMapper将对象转换为JSON
//
//            response.getWriter().write(jsonResponse);
//        }
//    }
//
//}

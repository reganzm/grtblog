//package com.grtsinry43.grtblog.security;
//
//import jakarta.servlet.FilterChain;
//import jakarta.servlet.ServletException;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.AuthenticationException;
//import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
//import org.springframework.stereotype.Component;
//
//import java.io.IOException;
//
///**
// * @author grtsinry43
// * @date 2024/11/27 20:09
// * @description 热爱可抵岁月漫长
// */
//@Component
//public class CaptchaValidationFilter extends UsernamePasswordAuthenticationFilter {
//
//    public CaptchaValidationFilter(AuthenticationManager authenticationManager) {
//        super.setAuthenticationManager(authenticationManager);
//    }
//
//    @Override
//    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
//        String captcha = request.getParameter("captcha");
//        String sessionCaptcha = (String) request.getSession().getAttribute("captcha");
//        System.out.println("验证码检查触发");
//        System.out.println(sessionCaptcha + " " + captcha);
//
//        if (sessionCaptcha == null || !sessionCaptcha.equals(captcha)) {
//            throw new AuthenticationException("Captcha validation failed") {};
//        }
//
//        return super.attemptAuthentication(request, response);
//    }
//
//    @Override
//    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
//        request.getSession().removeAttribute("captcha");
//        super.successfulAuthentication(request, response, chain, authResult);
//    }
//}

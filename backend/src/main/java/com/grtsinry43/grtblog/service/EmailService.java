package com.grtsinry43.grtblog.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.util.HashMap;

/**
 * @author grtsinry43
 * @date 2025/1/1 23:04
 * @description 热爱可抵岁月漫长
 */
@Service
public class EmailService {
    private final JavaMailSender mailSender;
    private final TemplateEngine templateEngine;

    public EmailService(JavaMailSender mailSender, TemplateEngine templateEngine) {
        this.mailSender = mailSender;
        this.templateEngine = templateEngine;
    }

    @Async
    public void sendEmail(String to, String subject, HashMap<String,String> info) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        Context context = new Context();
        context.setVariable("name", info.getOrDefault("name", " "));
        context.setVariable("type", info.getOrDefault("type", " "));
        context.setVariable("title", info.getOrDefault("title", " "));
        context.setVariable("avatarUrl", info.getOrDefault("avatarUrl", " "));
        context.setVariable("replyName", info.getOrDefault("replyName", " "));
        context.setVariable("replyTime", info.getOrDefault("replyTime", " "));
        context.setVariable("replyContent", info.getOrDefault("replyContent", " "));
        context.setVariable("commentContent", info.getOrDefault("commentContent", " "));
        context.setVariable("url", info.getOrDefault("url", " "));
        String html = templateEngine.process("emailTemplate", context);

        helper.setFrom("notification@grtsinry43.com");
        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(html, true);

        mailSender.send(message);

        System.out.println("邮件发送成功" + to);
    }
}

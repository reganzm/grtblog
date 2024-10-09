package com.grtsinry43.grtblog.util;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

/**
 * @author grtsinry43
 * @date 2024/8/11 21:23
 * @description 少年负壮气，奋烈自有时！
 */
@Slf4j
@Component
public class JwtUtil {

    private static String SECRET_KEY;

    @Value("${com.grtsinry43.secret_key}")
    public void setSecretKey(String secretKey) {
        SECRET_KEY = secretKey;
    }

    private static final long EXPIRATION_TIME = 86400000;

    public static String generateToken(String openid) {
        log.info(SECRET_KEY);
        Algorithm algorithm = Algorithm.HMAC512(SECRET_KEY);
        return JWT.create()
                .withSubject(openid)
                .withExpiresAt(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .sign(algorithm);
    }

    public static DecodedJWT getDecodedJWT(String token) {
        try {
            log.info("Decoding token: {}", token);
            Algorithm algorithm = Algorithm.HMAC512(SECRET_KEY);
            JWTVerifier verifier = JWT.require(algorithm).build();
            return verifier.verify(token);
        } catch (JWTDecodeException e) {
            log.error("Invalid token: {}", token, e);
            throw e;
        }
    }

    public static boolean isTokenExpired(String token) {
        return getDecodedJWT(token).getExpiresAt().before(new Date());
    }

    public static String getUserFromToken(String token) {
        return getDecodedJWT(token).getSubject();
    }
}
package com.grtsinry43.grtblog.config;

import com.baomidou.mybatisplus.core.incrementer.IdentifierGenerator;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.concurrent.locks.ReentrantLock;

/**
 * @author grtsinry43
 * @date 2024/10/10 18:15
 * @description 热爱可抵岁月漫长
 */

@Configuration
public class MyBatisPlusConfig {
    @Value("${snowflake.data-center-id}")
    private long dataCenterId;

    @Value("${snowflake.machine-id}")
    private long machineId;

    @Bean
    public IdentifierGenerator idGenerator() {
        return new MySnowflakeIdGenerator(dataCenterId, machineId); // 使用自定义的 ID 生成器
    }

    public static class MySnowflakeIdGenerator implements IdentifierGenerator {
        private final long dataCenterId; // 数据中心 ID
        private final long machineId; // 机器 ID
        private long sequence = 0; // 序列号
        private long lastTimestamp = -1L;
        private final ReentrantLock lock = new ReentrantLock(); // 使用 ReentrantLock

        public MySnowflakeIdGenerator(long dataCenterId, long machineId) {
            this.dataCenterId = dataCenterId;
            this.machineId = machineId;
        }

        @Override
        public Long nextId(Object entity) {
            lock.lock(); // 加锁
            try {
                long timestamp = System.currentTimeMillis();

                // 检查时间戳是否回退
                if (timestamp < lastTimestamp) {
                    throw new RuntimeException("Clock moved backwards. Refusing to generate id for " + (lastTimestamp - timestamp) + " milliseconds");
                }

                // 当前时间戳与上次相同，序列号加一
                if (lastTimestamp == timestamp) {
                    sequence = (sequence + 1) & 0xFFF; // 序列号最多为 4095
                    // 当序列号达到上限时，等待下一毫秒
                    if (sequence == 0) {
                        timestamp = waitNextMillis(lastTimestamp);
                    }
                } else {
                    sequence = 0; // 新的一毫秒，重置序列号
                }
                lastTimestamp = timestamp;

                // 生成 ID
                return ((timestamp << 22) | (dataCenterId << 17) | (machineId << 12) | sequence);
            } finally {
                lock.unlock(); // 确保解锁
            }
        }

        // 等待下一个毫秒
        private long waitNextMillis(long lastTimestamp) {
            long timestamp = System.currentTimeMillis();
            while (timestamp <= lastTimestamp) {
                timestamp = System.currentTimeMillis();
            }
            return timestamp;
        }
    }

}
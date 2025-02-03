package com.grtsinry43.grtblog.service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.grtsinry43.grtblog.entity.LikeRecord;
import com.grtsinry43.grtblog.mapper.LikeRecordMapper;
import org.springframework.stereotype.Service;

/**
 * @author grtsinry43
 * @date 2025/2/3 16:59
 * @description 热爱可抵岁月漫长
 */
@Service
public class LikeRecordService extends ServiceImpl<LikeRecordMapper, LikeRecord> {
    // 根据 type 和 targetId 查询点赞记录
    public long getByTypeAndTargetId(String type, Long targetId) {
        return this.lambdaQuery().eq(LikeRecord::getType, type).eq(LikeRecord::getTargetId, targetId).count();
    }

    public void saveLikeRecord(LikeRecord likeRecord) {
        System.out.println(likeRecord);
        // 先查询有没有点过赞
        Long count = lambdaQuery()
                .eq(LikeRecord::getType, likeRecord.getType())
                .eq(LikeRecord::getTargetId, likeRecord.getTargetId())
                .eq(LikeRecord::getUserId, likeRecord.getUserId()).count();
        System.out.println(count);
        if (count > 0) {
            throw new RuntimeException("已经点过赞了");
        }
        save(likeRecord);
    }
}

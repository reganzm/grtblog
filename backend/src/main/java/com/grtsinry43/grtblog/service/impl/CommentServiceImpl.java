package com.grtsinry43.grtblog.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.grtsinry43.grtblog.dto.CommentNotLoginForm;
import com.grtsinry43.grtblog.entity.Comment;
import com.grtsinry43.grtblog.mapper.CommentMapper;
import com.grtsinry43.grtblog.service.ICommentService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.grtsinry43.grtblog.vo.CommentVO;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * <p>
 * 服务实现类
 * </p>
 *
 * @author grtsinry43
 * @since 2024-10-09
 */
@Service
public class CommentServiceImpl extends ServiceImpl<CommentMapper, Comment> implements ICommentService {

    @Override
    public CommentVO addNewComment(CommentNotLoginForm form, String ip, String location, String ua) {
        Comment comment = new Comment();
        BeanUtils.copyProperties(comment, form);
        comment.setIp(ip);
        comment.setLocation(location);
        comment.setUa(ua);
        save(comment);
        CommentVO vo = new CommentVO();
        BeanUtils.copyProperties(vo, comment);
        return vo;
    }

    @Override
    public Object listCommentByArticleId(Long articleId) {
        // 这里比较复杂，根据文章 ID 查询评论列表，然后将评论列表转换为树形结构
        // 1. 查询指定文章的所有评论
        List<Comment> comments = this.baseMapper.selectByArticleId(articleId);

        // 2. 将 Comment 转换为 CommentVO
        List<CommentVO> commentVOList = comments.stream().map(comment -> {
            CommentVO commentVO = new CommentVO();
            BeanUtils.copyProperties(comment, commentVO);
            commentVO.setId(comment.getId().toString());
            commentVO.setParentId(comment.getParentId() == null ? null : comment.getParentId().toString());
            return commentVO;
        }).toList();

        // 3. 构建评论映射
        Map<String, CommentVO> commentVOMap = commentVOList.stream()
                .collect(Collectors.toMap(CommentVO::getId, commentVO -> commentVO));

        // 4. 组装评论树
        List<CommentVO> commentTree = new ArrayList<>();
        for (CommentVO commentVO : commentVOList) {
            String parentId = commentVO.getParentId();
            if (parentId == null) {
                // 顶级评论
                commentTree.add(commentVO);
            } else {
                // 子评论，添加到父评论的子评论列表
                CommentVO parentComment = commentVOMap.get(parentId);
                if (parentComment != null) {
                    parentComment.getChildren().add(commentVO);
                }
            }
        }

        // 5. 返回评论树
        return commentTree;
    }
}

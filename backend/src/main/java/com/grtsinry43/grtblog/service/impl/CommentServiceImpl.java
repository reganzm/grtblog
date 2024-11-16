package com.grtsinry43.grtblog.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.grtsinry43.grtblog.dto.CommentNotLoginForm;
import com.grtsinry43.grtblog.entity.Article;
import com.grtsinry43.grtblog.entity.Comment;
import com.grtsinry43.grtblog.mapper.CommentMapper;
import com.grtsinry43.grtblog.service.ICommentService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.grtsinry43.grtblog.vo.CommentVO;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
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
    private final ArticleServiceImpl articleService;

    public CommentServiceImpl(ArticleServiceImpl articleService) {
        this.articleService = articleService;
    }

    @Override
    public CommentVO addNewComment(CommentNotLoginForm form, String ip, String location, String ua) {
        System.out.println(form.toString());
        // 正则匹配一下，提取操作系统和浏览器信息
        String osPattern = "\\(([^;]+);";
        String browserPattern = "([a-zA-Z]+/[0-9\\.]+)";

        // 操作系统
        Pattern pattern = Pattern.compile(osPattern);
        Matcher matcher = pattern.matcher(ua);
        String os = matcher.find() ? matcher.group(1) : "Unknown OS";

        // 浏览器
        pattern = Pattern.compile(browserPattern);
        matcher = pattern.matcher(ua);
        String browser = matcher.find() ? matcher.group(1) : "Unknown Browser";

        Comment comment = new Comment();
        BeanUtils.copyProperties(form, comment);
        comment.setNickName(form.getUserName());
        // 这里要将评论区的 id 作为评论的 areaId
        Article article = articleService.getBaseMapper().getArticleByShortUrl(form.getShortUrl());
        Long commentId = article.getCommentId();
        comment.setAreaId(commentId);
        comment.setParentId(Objects.equals(form.getParentId(), "") ? null : Long.parseLong(form.getParentId()));
        comment.setIp(ip);
        comment.setLocation(location);
        comment.setPlatform(os);
        comment.setBrowser(browser);
        System.out.println(comment.toString());
        save(comment);
        CommentVO vo = new CommentVO();
        BeanUtils.copyProperties(comment, vo);
        return vo;
    }

    @Override
    public List<CommentVO> listCommentByArticleId(String shortUrl) {
        Article article = articleService.getBaseMapper().getArticleByShortUrl(shortUrl);
        // 这里比较复杂，根据文章查询评论列表，然后将评论列表转换为树形结构
        // 1. 查询指定文章的评论id
        Long commentId = article.getCommentId();
        List<Comment> comments = list(new QueryWrapper<Comment>().lambda().eq(Comment::getAreaId, commentId));

        // 2. 将 Comment 转换为 CommentVO
        List<CommentVO> commentVOList = comments.stream().map(comment -> {
            CommentVO commentVO = new CommentVO();
            BeanUtils.copyProperties(comment, commentVO);
            commentVO.setId(comment.getId().toString());
            commentVO.setUserName(comment.getNickName());
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

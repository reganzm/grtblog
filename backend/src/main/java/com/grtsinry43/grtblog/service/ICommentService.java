package com.grtsinry43.grtblog.service;

import com.grtsinry43.grtblog.dto.CommentNotLoginForm;
import com.grtsinry43.grtblog.entity.Comment;
import com.baomidou.mybatisplus.extension.service.IService;
import com.grtsinry43.grtblog.vo.CommentVO;

/**
 * <p>
 * 服务类
 * </p>
 *
 * @author grtsinry43
 * @since 2024-10-09
 */
public interface ICommentService extends IService<Comment> {

    public CommentVO addNewComment(CommentNotLoginForm form, String ip, String location, String ua);

    public Object listCommentByArticleId(Long articleId);

}

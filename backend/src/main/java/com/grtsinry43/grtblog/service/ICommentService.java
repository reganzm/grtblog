package com.grtsinry43.grtblog.service;

import com.grtsinry43.grtblog.dto.CommentLoginForm;
import com.grtsinry43.grtblog.dto.CommentNotLoginForm;
import com.grtsinry43.grtblog.entity.Comment;
import com.baomidou.mybatisplus.extension.service.IService;
import com.grtsinry43.grtblog.entity.User;
import com.grtsinry43.grtblog.vo.CommentView;

import java.util.List;

/**
 * <p>
 * 服务类
 * </p>
 *
 * @author grtsinry43
 * @since 2024-10-09
 */
public interface ICommentService extends IService<Comment> {

    public CommentView addNewComment(CommentNotLoginForm form, String ip, String location, String ua);

    CommentView addNewCommentLogin(User user, CommentLoginForm form, String ip, String location, String ua);

    public Object listCommentByArticleId(String shortUrl);

    public List<CommentView> getListById(Long id, int page, int pageSize);

}

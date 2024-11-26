package com.grtsinry43.grtblog.service;

import com.grtsinry43.grtblog.dto.CommentLoginForm;
import com.grtsinry43.grtblog.dto.CommentNotLoginForm;
import com.grtsinry43.grtblog.entity.Comment;
import com.baomidou.mybatisplus.extension.service.IService;
import com.grtsinry43.grtblog.entity.User;
import com.grtsinry43.grtblog.vo.CommentVO;

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

    public CommentVO addNewComment(CommentNotLoginForm form, String ip, String location, String ua);

    CommentVO addNewCommentLogin(User user, CommentLoginForm form, String ip, String location, String ua);

    public Object listCommentByArticleId(String shortUrl);

    public List<CommentVO> getListById(Long id, int page, int pageSize);

}

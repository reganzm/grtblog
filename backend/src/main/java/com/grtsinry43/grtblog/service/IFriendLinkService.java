package com.grtsinry43.grtblog.service;

import com.grtsinry43.grtblog.dto.FriendLinkRequest;
import com.grtsinry43.grtblog.entity.FriendLink;
import com.baomidou.mybatisplus.extension.service.IService;
import com.grtsinry43.grtblog.vo.FriendLinkVO;
import com.grtsinry43.grtblog.vo.FriendLinkView;

import java.util.List;

/**
 * <p>
 * 服务类
 * </p>
 *
 * @author grtsinry43
 * @since 2024-10-09
 */
public interface IFriendLinkService extends IService<FriendLink> {

    List<FriendLinkView> getFriendLinkList();

    List<FriendLinkVO> getFriendLinkListAdmin(int page, int pageSize);

    long getFriendLinkCount();

    FriendLinkView addFriendLink(FriendLinkRequest friendLinkRequest, Long userId);

    FriendLinkView addFriendLinkAdmin(FriendLinkRequest friendLinkRequest, Long userId);

    FriendLinkView updateFriendLinkAdmin(Long id, FriendLinkRequest friendLinkRequest);
}

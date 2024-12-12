package com.grtsinry43.grtblog.service.impl;

import com.grtsinry43.grtblog.dto.FriendLinkRequest;
import com.grtsinry43.grtblog.entity.FriendLink;
import com.grtsinry43.grtblog.mapper.FriendLinkMapper;
import com.grtsinry43.grtblog.service.IFriendLinkService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.grtsinry43.grtblog.vo.FriendLinkView;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * <p>
 * 服务实现类
 * </p>
 *
 * @author grtsinry43
 * @since 2024-10-09
 */
@Service
public class FriendLinkServiceImpl extends ServiceImpl<FriendLinkMapper, FriendLink> implements IFriendLinkService {
    @Override
    public List<FriendLinkView> getFriendLinkList() {
        return list().stream().filter(FriendLink::getIsActive).map(friendLink -> {
            FriendLinkView friendLinkView = new FriendLinkView();
            BeanUtils.copyProperties(friendLink, friendLinkView);
            friendLinkView.setId(friendLink.getId().toString());
            return friendLinkView;
        }).toList();
    }

    @Override
    public FriendLinkView addFriendLink(FriendLinkRequest friendLinkRequest, Long userId) {
        FriendLink friendLink = new FriendLink();
        BeanUtils.copyProperties(friendLinkRequest, friendLink);
        friendLink.setUserId(userId);
        save(friendLink);
        FriendLinkView friendLinkView = new FriendLinkView();
        BeanUtils.copyProperties(friendLink, friendLinkView);
        friendLinkView.setId(friendLink.getId().toString());
        return friendLinkView;
    }
}

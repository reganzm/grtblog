package com.grtsinry43.grtblog.service.impl;

import com.grtsinry43.grtblog.dto.FriendLinkRequest;
import com.grtsinry43.grtblog.entity.FriendLink;
import com.grtsinry43.grtblog.mapper.FriendLinkMapper;
import com.grtsinry43.grtblog.service.IFriendLinkService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.grtsinry43.grtblog.vo.FriendLinkVO;
import com.grtsinry43.grtblog.vo.FriendLinkView;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
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
    public List<FriendLinkVO> getFriendLinkListAdmin(int page, int pageSize) {
        List<FriendLink> friendLinks = lambdaQuery()
                .orderByDesc(FriendLink::getCreatedAt)
                .isNull(FriendLink::getDeletedAt)
                .last("LIMIT " + (page - 1) * pageSize + "," + pageSize)
                .list();
        return friendLinks.stream().map(friendLink -> {
            FriendLinkVO friendLinkVO = new FriendLinkVO();
            BeanUtils.copyProperties(friendLink, friendLinkVO);
            friendLinkVO.setId(friendLink.getId().toString());
            return friendLinkVO;
        }).collect(Collectors.toList());
    }

    @Override
    public long getFriendLinkCount() {
        return lambdaQuery().isNull(FriendLink::getDeletedAt).count();
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

    @Override
    public FriendLinkView addFriendLinkAdmin(FriendLinkRequest friendLinkRequest, Long userId) {
        FriendLink friendLink = new FriendLink();
        BeanUtils.copyProperties(friendLinkRequest, friendLink);
        friendLink.setUserId(userId);
        friendLink.setIsActive(true);
        save(friendLink);
        FriendLinkView friendLinkView = new FriendLinkView();
        BeanUtils.copyProperties(friendLink, friendLinkView);
        friendLinkView.setId(friendLink.getId().toString());
        return friendLinkView;
    }

    @Override
    public FriendLinkView updateFriendLinkAdmin(Long id, FriendLinkRequest friendLinkRequest) {
        FriendLink friendLink = getById(id);
        if (friendLink == null) {
            return null;
        }
        BeanUtils.copyProperties(friendLinkRequest, friendLink);
        updateById(friendLink);
        FriendLinkView friendLinkView = new FriendLinkView();
        BeanUtils.copyProperties(friendLink, friendLinkView);
        friendLinkView.setId(friendLink.getId().toString());
        return friendLinkView;
    }

    public Boolean isMyFriend(Long userId) {
        return count() > 0 && list().stream().anyMatch(friendLink -> friendLink.getUserId() == userId);
    }
}

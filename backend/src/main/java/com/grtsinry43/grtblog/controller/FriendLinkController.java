package com.grtsinry43.grtblog.controller;

import com.grtsinry43.grtblog.dto.ApiResponse;
import com.grtsinry43.grtblog.dto.FriendLinkRequest;
import com.grtsinry43.grtblog.service.impl.FriendLinkServiceImpl;
import com.grtsinry43.grtblog.util.SecurityUtils;
import com.grtsinry43.grtblog.vo.FriendLinkView;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author grtsinry43
 * @since 2024-10-09
 */
@RestController
@RequestMapping("/friendLink")
public class FriendLinkController {
    private final FriendLinkServiceImpl friendLinkService;

    public FriendLinkController(FriendLinkServiceImpl friendLinkService) {
        this.friendLinkService = friendLinkService;
    }

    @GetMapping
    public ApiResponse<List<FriendLinkView>> getFriendLinkListApi() {
        return ApiResponse.success(friendLinkService.getFriendLinkList());
    }

    @PostMapping("/apply")
    public ApiResponse<FriendLinkView> addFriendLinkApi(@RequestBody FriendLinkRequest friendLinkRequest) {
        Long userId = Objects.requireNonNull(SecurityUtils.getCurrentUser()).getId();
        return ApiResponse.success(friendLinkService.addFriendLink(friendLinkRequest,userId));
    }
}

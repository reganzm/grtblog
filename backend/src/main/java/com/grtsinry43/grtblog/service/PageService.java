package com.grtsinry43.grtblog.service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.grtsinry43.grtblog.common.ErrorCode;
import com.grtsinry43.grtblog.dto.PageDTO;
import com.grtsinry43.grtblog.dto.PostStatusToggle;
import com.grtsinry43.grtblog.entity.CommentArea;
import com.grtsinry43.grtblog.entity.Page;
import com.grtsinry43.grtblog.exception.BusinessException;
import com.grtsinry43.grtblog.mapper.PageMapper;
import com.grtsinry43.grtblog.util.ArticleParser;
import com.grtsinry43.grtblog.vo.PageVO;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Objects;

/**
 * @author grtsinry43
 * @date 2024/11/21 08:36
 * @description 热爱可抵岁月漫长
 */
@Service
public class PageService extends ServiceImpl<PageMapper, Page> {
    private final CommentAreaService commentAreaService;
    private final MeiliDataSyncService meiliDataSyncService;

    public PageService(CommentAreaService commentAreaService, MeiliDataSyncService meiliDataSyncService) {
        this.commentAreaService = commentAreaService;
        this.meiliDataSyncService = meiliDataSyncService;
    }

    public Page getPageByPath(String path) {
        System.out.println("path = " + path);
        return this.lambdaQuery().eq(Page::getRefPath, path).one();
    }

    public PageVO getPageByShortUrl(String shortUrl) {
        Page pageFind = this.lambdaQuery()
                .eq(Page::getRefPath, shortUrl)
                .eq(Page::getEnable, true)
                .eq(Page::getCanDelete, true)
                .isNull(Page::getDeletedAt)
                .one();
        if (pageFind == null) {
            throw new BusinessException(ErrorCode.NOT_FOUND);
        } else {
            PageVO pageVO = new PageVO();
            BeanUtils.copyProperties(pageFind, pageVO);
            pageVO.setId(pageFind.getId().toString());
            pageVO.setCommentId(pageFind.getCommentId() != null ? pageFind.getCommentId().toString() : null);
            return pageVO;
        }
    }

    public String[] getAllPageRefPath() {
        return this.lambdaQuery()
                .list()
                .stream()
                .filter(Objects::nonNull)
                .filter(page -> page.getEnable() != null && page.getEnable())
                .filter(page -> page.getCanDelete() != null && page.getCanDelete())
                .filter(page -> page.getDeletedAt() == null) // 过滤掉已删除的页面
                .map(Page::getRefPath)
                .toArray(String[]::new);
    }

    public PageVO addPage(PageDTO pageDTO) {
        Page page = new Page();
        BeanUtils.copyProperties(pageDTO, page);
        try {
            page.setToc(ArticleParser.generateToc(page.getContent()));
        } catch (JsonProcessingException e) {
            throw new BusinessException(ErrorCode.OPERATION_ERROR);
        }
        CommentArea commentArea = commentAreaService.createCommentArea("页面", page.getTitle());
        page.setCommentId(commentArea.getId());
        save(page);
        PageVO pageVO = new PageVO();
        BeanUtils.copyProperties(page, pageVO);
        pageVO.setId(page.getId().toString());
        pageVO.setCommentId(page.getCommentId() != null ? page.getCommentId().toString() : null);
        return pageVO;
    }

    public PageVO updatePage(String id, PageDTO pageDTO) {
        Page page = getById(id);
        if (page == null) {
            throw new BusinessException(ErrorCode.NOT_FOUND);
        }
        BeanUtils.copyProperties(pageDTO, page);
        try {
            page.setToc(ArticleParser.generateToc(page.getContent()));
        } catch (JsonProcessingException e) {
            throw new BusinessException(ErrorCode.OPERATION_ERROR);
        }
        updateById(page);
        if (!page.getEnable()){
            // 删除索引数据
            meiliDataSyncService.deleteContent(page.getId(), "page");
        }
        PageVO pageVO = new PageVO();
        BeanUtils.copyProperties(page, pageVO);
        pageVO.setId(page.getId().toString());
        pageVO.setCommentId(page.getCommentId() != null ? page.getCommentId().toString() : null);
        return pageVO;
    }

    public void deletePage(String id) {
        Page page = getById(id);
        if (page == null) {
            throw new BusinessException(ErrorCode.NOT_FOUND);
        }
        page.setDeletedAt(LocalDateTime.now());
        // 删除索引数据
        meiliDataSyncService.deleteContent(page.getId(), "page");
        if (commentAreaService.isExist(page.getCommentId().toString())) {
            commentAreaService.deleteCommentArea(page.getCommentId());
        }
        updateById(page);
    }

    public List<PageVO> getPageListAdmin(int page, int size) {
        List<Page> pages = this.lambdaQuery()
                .orderByDesc(Page::getCreatedAt)
                .last("limit " + (page - 1) * size + "," + size)
                .list();
        return pages.stream().map(page1 -> {
            PageVO pageVO = new PageVO();
            BeanUtils.copyProperties(page1, pageVO);
            pageVO.setId(page1.getId().toString());
            pageVO.setCommentId(page1.getCommentId() != null ? page1.getCommentId().toString() : null);
            return pageVO;
        }).toList();
    }

    public Long getPageCount() {
        return this.lambdaQuery().eq(Page::getCanDelete, true).count();
    }

    public PageVO getPageByIdAdmin(String id) {
        Page page = getById(id);
        if (page == null) {
            throw new BusinessException(ErrorCode.NOT_FOUND);
        }
        PageVO pageVO = new PageVO();
        BeanUtils.copyProperties(page, pageVO);
        pageVO.setId(page.getId().toString());
        pageVO.setCommentId(page.getCommentId() != null ? page.getCommentId().toString() : null);
        return pageVO;
    }

    public PageVO togglePage(Long id, PostStatusToggle postStatusToggle) {
        Page page = getById(id);
        if (page == null) {
            throw new BusinessException(ErrorCode.NOT_FOUND);
        }
        if (postStatusToggle.getIsPublished() != null) {
            page.setEnable(postStatusToggle.getIsPublished());
        }
        updateById(page);
        PageVO pageVO = new PageVO();
        BeanUtils.copyProperties(page, pageVO);
        pageVO.setId(page.getId().toString());
        pageVO.setCommentId(page.getCommentId() != null ? page.getCommentId().toString() : null);
        return pageVO;
    }
}
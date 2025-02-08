package com.grtsinry43.grtblog.service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.grtsinry43.grtblog.dto.PhotoAddRequest;
import com.grtsinry43.grtblog.entity.Photo;
import com.grtsinry43.grtblog.mapper.PhotoMapper;
import com.grtsinry43.grtblog.vo.PhotoPreview;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author grtsinry43
 * @date 2025/2/8 12:55
 * @description 热爱可抵岁月漫长
 */
@Service
public class PhotoService extends ServiceImpl<PhotoMapper, Photo> {
    public List<PhotoPreview> getPhotos(Integer page, Integer pageSize) {
        return lambdaQuery().orderByDesc(Photo::getCreatedAt)
                .last("limit " + (page - 1) * pageSize + "," + pageSize)
                .list().stream().map(photo -> {
                    PhotoPreview photoPreview = new PhotoPreview();
                    BeanUtils.copyProperties(photo, photoPreview);
                    photoPreview.setId(photo.getId().toString());
                    photoPreview.setUrl(photo.getUrl());
                    photoPreview.setDate(photo.getCreatedAt());
                    return photoPreview;
                }).toList();
    }

    public PhotoPreview uploadPhoto(PhotoAddRequest request) {
        Photo photo = new Photo();
        photo.setCreatedAt(request.getTime());
        BeanUtils.copyProperties(request, photo);
        save(photo);
        PhotoPreview photoPreview = new PhotoPreview();
        BeanUtils.copyProperties(photo, photoPreview);
        photoPreview.setId(photo.getId().toString());
        photoPreview.setUrl(photo.getUrl());
        photoPreview.setDate(photo.getCreatedAt());
        return photoPreview;
    }
}

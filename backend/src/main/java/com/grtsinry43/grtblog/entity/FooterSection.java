package com.grtsinry43.grtblog.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.extension.handlers.JacksonTypeHandler;
import com.grtsinry43.grtblog.entity.FooterLink;
import lombok.Data;

import java.util.HashMap;
import java.util.List;

/**
 * @author grtsinry43
 * @date 2025/2/3 21:37
 * @description 热爱可抵岁月漫长
 */
@Data
@TableName(value = "footer_section", autoResultMap = true)
public class FooterSection {
    @TableId(type = IdType.AUTO)
    private Long id;

    private String title;

    @TableField(typeHandler = JacksonTypeHandler.class)
    private List<HashMap<String, FooterLink>> links;
}

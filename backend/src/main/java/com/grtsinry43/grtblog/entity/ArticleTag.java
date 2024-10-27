package com.grtsinry43.grtblog.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import lombok.Getter;
import lombok.Setter;

/**
 * <p>
 * 
 * </p>
 *
 * @author grtsinry43
 * @since 2024-10-09
 */
@Getter
@Setter
@TableName("article_tag")
public class ArticleTag implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 文章标签关联ID，会由雪花算法生成
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    /**
     * 文章ID
     */
    private Long articleId;

    /**
     * 标签ID
     */
    private Long tagId;
}

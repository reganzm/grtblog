-- 创建用户表
CREATE TABLE IF NOT EXISTS `user`
(
    `id`             BIGINT      NOT NULL AUTO_INCREMENT COMMENT '用户ID，会由雪花算法生成',
    `nickname`       VARCHAR(45) NOT NULL COMMENT '用户昵称',
    `email`          VARCHAR(45) NOT NULL COMMENT '用户邮箱，用于登录',
    `password`       VARCHAR(60) COMMENT '用户密码（BCrypt），可以为空',
    `avatar`         VARCHAR(255) COMMENT '用户头像',
    `is_active`      TINYINT   DEFAULT 1 COMMENT '用户是否激活（0：未激活，1：已激活）',
    `created_at`     TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '用户创建时间',
    `updated_at`     TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '用户更新时间',
    `deleted_at`     TIMESTAMP COMMENT '用户删除时间（软删除），如果不为空则表示已删除',
    `oauth_provider` VARCHAR(45) COMMENT 'OAuth2.0提供者（如google, github）',
    `oauth_id`       VARCHAR(255) COMMENT 'OAuth2.0用户ID',
    PRIMARY KEY (`id`)
);

-- 创建角色表（超级管理员、管理员、合作作者、普通用户、封禁用户）
CREATE TABLE IF NOT EXISTS `role`
(
    `id`        BIGINT       NOT NULL AUTO_INCREMENT COMMENT '角色ID，会由雪花算法生成',
    `role_name` VARCHAR(100) NOT NULL COMMENT '角色名',
    PRIMARY KEY (`id`)
);

-- 创建权限表（文章管理、评论管理、用户管理、角色管理、权限管理、系统配置、友链管理、说说管理）
CREATE TABLE IF NOT EXISTS `permission`
(
    `id`              BIGINT       NOT NULL AUTO_INCREMENT COMMENT '权限ID，会由雪花算法生成',
    `permission_name` VARCHAR(100) NOT NULL COMMENT '权限名',
    PRIMARY KEY (`id`)
);

-- 创建用户角色关联表
CREATE TABLE IF NOT EXISTS `user_role`
(
    `user_id` BIGINT NOT NULL COMMENT '用户ID',
    `role_id` BIGINT NOT NULL COMMENT '角色ID',
    PRIMARY KEY (`user_id`, `role_id`),
    FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
    FOREIGN KEY (`role_id`) REFERENCES `role` (`id`)
);

-- 创建角色权限关联表
CREATE TABLE IF NOT EXISTS `role_permission`
(
    `role_id`       BIGINT NOT NULL COMMENT '角色ID',
    `permission_id` BIGINT NOT NULL COMMENT '权限ID',
    PRIMARY KEY (`role_id`, `permission_id`),
    FOREIGN KEY (`role_id`) REFERENCES `role` (`id`),
    FOREIGN KEY (`permission_id`) REFERENCES `permission` (`id`)
);

-- 这个是标准的文章
CREATE TABLE IF NOT EXISTS `article`
(
    `id`           BIGINT       NOT NULL AUTO_INCREMENT COMMENT '文章ID，会由雪花算法生成',
    `title`        VARCHAR(255) NOT NULL COMMENT '文章标题',
    `summary`      TEXT         NOT NULL COMMENT '文章摘要',
    `toc`          JSON         NOT NULL COMMENT '文章目录，由后端根据文章内容生成',
    `content`      TEXT         NOT NULL COMMENT '文章内容，markdown格式，交由前端解析',
    `author_id`    BIGINT       NOT NULL COMMENT '作者ID，逻辑限制',
    `cover`        VARCHAR(255) COMMENT '文章封面',
    `category_id`  BIGINT COMMENT '分类ID',
    `views`        INT       DEFAULT 0 COMMENT '文章浏览量',
    `likes`        INT       DEFAULT 0 COMMENT '文章点赞量',
    `comments`     INT       DEFAULT 0 COMMENT '文章评论量',
    `comment_id`   BIGINT COMMENT '挂载的评论ID',
    `short_url`    VARCHAR(255) COMMENT '文章短链接',
    `is_published` TINYINT   DEFAULT 0 COMMENT '是否发布（0：否，1：是）',
    `created_at`   TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '文章创建时间',
    `updated_at`   TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '文章更新时间',
    `deleted_at`   TIMESTAMP COMMENT '文章删除时间（软删除），如果不为空则表示已删除',
    `is_top`       TINYINT   DEFAULT 0 COMMENT '是否置顶（0：否，1：是）',
    `is_hot`       TINYINT   DEFAULT 0 COMMENT '是否热门（0：否，1：是）',
    `is_original`  TINYINT   DEFAULT 1 COMMENT '是否原创（0：否，1：是）',
    PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `status_update`
(
    `id`           BIGINT       NOT NULL AUTO_INCREMENT COMMENT '分享ID，会由雪花算法生成',
    `title`        VARCHAR(255) NOT NULL COMMENT '分享标题',
    `summary`      TEXT         NOT NULL COMMENT '分享摘要',
    `content`      TEXT         NOT NULL COMMENT '分享内容，markdown格式，交由前端解析',
    `author_id`    BIGINT       NOT NULL COMMENT '作者ID，逻辑限制',
    `img`          TEXT COMMENT '分享图片，多个图片用逗号分隔',
    `category_id`  BIGINT COMMENT '分类ID',
    `views`        INT       DEFAULT 0 COMMENT '分享浏览量',
    `likes`        INT       DEFAULT 0 COMMENT '分享点赞量',
    `comments`     INT       DEFAULT 0 COMMENT '分享评论量',
    `comment_id`   BIGINT COMMENT '挂载的评论ID',
    `short_url`    VARCHAR(255) COMMENT '分享短链接',
    `is_published` TINYINT   DEFAULT 0 COMMENT '是否发布（0：否，1：是）',
    `created_at`   TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '分享创建时间',
    `updated_at`   TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '分享更新时间',
    `deleted_at`   TIMESTAMP COMMENT '分享删除时间（软删除），如果不为空则表示已删除',
    `is_top`       TINYINT   DEFAULT 0 COMMENT '是否置顶（0：否，1：是）',
    `is_hot`       TINYINT   DEFAULT 0 COMMENT '是否热门（0：否，1：是）',
    `is_original`  TINYINT   DEFAULT 1 COMMENT '是否原创（0：否，1：是）',
    PRIMARY KEY (`id`)
);

-- 这个是主页下方显示的一日一言
CREATE TABLE IF NOT EXISTS `one_word`
(
    `id`         BIGINT NOT NULL AUTO_INCREMENT COMMENT '一日一言ID，会由雪花算法生成',
    `content`    TEXT   NOT NULL COMMENT '一日一言内容',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '一日一言创建时间',
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '一日一言更新时间',
    PRIMARY KEY (`id`)
);

-- 页面表
CREATE TABLE IF NOT EXISTS `page`
(
    `id`         BIGINT       NOT NULL AUTO_INCREMENT COMMENT '页面ID，会由雪花算法生成',
    `title`      VARCHAR(255) NOT NULL COMMENT '页面标题',
    `ref_path`   VARCHAR(255) NOT NULL COMMENT '页面路径',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '页面创建时间',
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '页面更新时间',
    `deleted_at` TIMESTAMP COMMENT '页面删除时间（软删除），如果不为空则表示已删除',
    PRIMARY KEY (`id`)
);

-- 首页导航栏配置
CREATE TABLE IF NOT EXISTS `nav_menu`
(
    `id`         BIGINT       NOT NULL AUTO_INCREMENT COMMENT '导航栏ID，会由雪花算法生成',
    `name`       VARCHAR(45)  NOT NULL COMMENT '导航栏名称',
    `url`        VARCHAR(255) NOT NULL COMMENT '导航栏URL',
    `sort`       INT          NOT NULL COMMENT '导航栏排序',
    `parent_id`  BIGINT COMMENT '父导航栏ID',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '导航栏创建时间',
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '导航栏更新时间',
    `deleted_at` TIMESTAMP COMMENT '导航栏删除时间（软删除），如果不为空则表示已删除',
    PRIMARY KEY (`id`)
);


-- 创建分类表（这个一般用 Badge 展示）
CREATE TABLE IF NOT EXISTS `category`
(
    `id`         BIGINT      NOT NULL AUTO_INCREMENT COMMENT '分类ID，会由雪花算法生成',
    `name`       VARCHAR(45) NOT NULL COMMENT '分类名称',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '分类创建时间',
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '分类更新时间',
    `deleted_at` TIMESTAMP COMMENT '分类删除时间（软删除），如果不为空则表示已删除',
    PRIMARY KEY (`id`)
);

-- 全局评论表，均通过 id 索引
CREATE TABLE IF NOT EXISTS `comment`
(
    `id`         BIGINT NOT NULL AUTO_INCREMENT COMMENT '评论ID，会由雪花算法生成',
    `article_id` BIGINT NOT NULL COMMENT '文章ID',
    `content`    TEXT   NOT NULL COMMENT '评论内容（markdown格式）',
    `author_id`  BIGINT COMMENT '评论者ID',
    `nick_name`  VARCHAR(45) COMMENT '评论者昵称',
    `ip`         VARCHAR(45) COMMENT '评论者IP地址',
    `location`   VARCHAR(45) COMMENT '评论者归属地',
#     `ua`         VARCHAR(255) COMMENT '评论者User-Agent', -- 这个不会在前端展示
    `platform`   VARCHAR(45) COMMENT '评论者操作系统',
    `browser`    VARCHAR(45) COMMENT '评论者浏览器',      -- 这两个根据 User-Agent 解析，并在前端展示
    `email`      VARCHAR(45) COMMENT '评论者邮箱',
    `website`    VARCHAR(255) COMMENT '评论者网站',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '评论创建时间',
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '评论更新时间',
    `deleted_at` TIMESTAMP COMMENT '评论删除时间（软删除），如果不为空则表示已删除',
    `parent_id`  BIGINT COMMENT '父评论ID，如果为空则表示是顶级评论，否则是回复评论',
    PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `tag`
(
    `id`         BIGINT      NOT NULL AUTO_INCREMENT COMMENT '标签ID，会由雪花算法生成',
    `name`       VARCHAR(45) NOT NULL COMMENT '标签名称',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '标签创建时间',
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '标签更新时间',
    `deleted_at` TIMESTAMP COMMENT '标签删除时间（软删除），如果不为空则表示已删除',
    PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `article_tag`
(
    `id`         BIGINT NOT NULL AUTO_INCREMENT COMMENT '文章标签关联ID，会由雪花算法生成',
    `article_id` BIGINT NOT NULL COMMENT '文章ID',
    `tag_id`     BIGINT NOT NULL COMMENT '标签ID',
    PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `user_follow`
(
    `id`          BIGINT NOT NULL AUTO_INCREMENT COMMENT '用户关注关系ID，会由雪花算法生成',
    `follower_id` BIGINT NOT NULL COMMENT '关注者ID',
    `followee_id` BIGINT NOT NULL COMMENT '被关注者ID',
    `created_at`  TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '关注关系创建时间',
    PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `user_like`
(
    `id`         BIGINT NOT NULL AUTO_INCREMENT COMMENT '用户点赞关系ID，会由雪花算法生成',
    `user_id`    BIGINT COMMENT '用户ID，可以为空',
    `article_id` BIGINT NOT NULL COMMENT '文章ID',
    `session_id` VARCHAR(255) COMMENT '唯一会话ID，用于标识未登录用户',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '点赞关系创建时间',
    PRIMARY KEY (`id`)
);

# CREATE TABLE IF NOT EXISTS `user_login_log`
# (
#     `id`         BIGINT      NOT NULL AUTO_INCREMENT COMMENT '用户登录日志ID，会由雪花算法生成',
#     `user_id`    BIGINT      NOT NULL COMMENT '用户ID',
#     `ip`         VARCHAR(45) NOT NULL COMMENT '登录IP地址',
#     `location`   VARCHAR(45) COMMENT '登录归属地',
#     `ua`         VARCHAR(255) COMMENT 'User-Agent',
#     `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '登录时间',
#     PRIMARY KEY (`id`)
# );

CREATE TABLE IF NOT EXISTS `upload_file`
(
    `id`         BIGINT       NOT NULL AUTO_INCREMENT COMMENT '上传文件ID，会由雪花算法生成',
    `name`       VARCHAR(255) NOT NULL COMMENT '文件名',
    `path`       VARCHAR(255) NOT NULL COMMENT '文件路径',
    `type`       VARCHAR(45)  NOT NULL COMMENT '文件类型',
    `size`       BIGINT       NOT NULL COMMENT '文件大小',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '文件上传时间',
    PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `sys_config`
(
    `id`         BIGINT      NOT NULL AUTO_INCREMENT COMMENT '系统配置ID，会由雪花算法生成',
    `key`        VARCHAR(45) NOT NULL COMMENT '配置键',
    `value`      TEXT        NOT NULL COMMENT '配置值',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '配置创建时间',
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '配置更新时间',
    PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `website_info`
(
    `id`         BIGINT      NOT NULL AUTO_INCREMENT COMMENT '网站信息ID，会由雪花算法生成',
    `key`        VARCHAR(45) NOT NULL COMMENT '信息键',
    `value`      TEXT        NOT NULL COMMENT '信息值',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '信息创建时间',
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '信息更新时间',
    PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `friend_link`
(
    `id`          BIGINT       NOT NULL AUTO_INCREMENT COMMENT '友链ID，会由雪花算法生成',
    `name`        VARCHAR(255) NOT NULL COMMENT '友链名称',
    `url`         VARCHAR(255) NOT NULL COMMENT '友链URL',
    `logo`        VARCHAR(255) COMMENT '友链Logo',
    `description` TEXT COMMENT '友链描述',
    `created_at`  TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '友链创建时间',
    `updated_at`  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '友链更新时间',
    `deleted_at`  TIMESTAMP COMMENT '友链删除时间（软删除），如果不为空则表示已删除',
    PRIMARY KEY (`id`)
);

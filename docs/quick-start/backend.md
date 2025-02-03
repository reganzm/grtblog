# 后端

让我们继续，这里是后端的配置。

::: tip
本项目使用的 JDK 版本为 17
:::

## 简单叙述

后端部分使用的是 Spring Boot 框架，可以在 [Release](https://github.com/grtsinry43/grtblog/releases) 中下载后端的 jar 包。

如果你需要从源码构建，只需按照以下部分进行操作：

## 构建

```shell
❯ mvn clean package
```

## 创建配置文件

在你的后端运行目录新建一个 `application.yml` 文件，内容如下：

```yaml
spring:
  application:
    name: grtblog-backend
  data:
    mongodb:
      uri: mongodb://localhost:27017/your_db
  datasource:
    url: jdbc:mysql://localhost:3306/your_db?serverTimezone=GMT%2B8&characterEncoding=utf-8&useSSL=false&allowPublicKeyRetrieval=true
    driver-class-name: com.mysql.cj.jdbc.Driver
    username: your_user
    password: your_password
  servlet:
    multipart:
      enabled: true
      max-file-size: 10MB
      max-request-size: 10MB
      location: /path/to/your/backend
  mvc:
    static-path-pattern: /uploads/**
  web:
    resources:
      static-locations: file:/path/to/your/backend/uploads/
  mail:
    host: smtp.larksuite.com
    port: 587
    username: username@your_domain.com
    password: your_password
    properties:
      mail.smtp.auth: true
      mail.smtp.starttls.enable: true
      mail.smtp.starttls.required: true
    default-encoding: UTF-8
  security:
    oauth2:
      client:
        registration:
          google:
            client-id: your_client_id
            client-secret: your_client_secret
            scope: profile, email
            redirect-uri: "https://your_deploy_site/api/v1/login/oauth2/code/google"
            client-name: Google
          github:
            client-id: your_client_id
            client-secret: your_client_secret
            redirect-uri: "https://your_deploy_site/api/v1/login/oauth2/code/github"
            scope: user:email
            client-name: Github
        provider:
          google:
            authorization-uri: https://accounts.google.com/o/oauth2/auth
            token-uri: https://oauth2.googleapis.com/token
            user-info-uri: https://www.googleapis.com/oauth2/v3/userinfo
            user-name-attribute: sub
          github:
            authorization-uri: https://github.com/login/oauth/authorize
            token-uri: https://github.com/login/oauth/access_token
            user-info-uri: https://api.github.com/user
            user-name-attribute: id
    elasticsearch:
        uris: http://localhost:9200
        username: 
        password: 

# mybatis-plus configuration
mybatis-plus:
  global-config:
    sequence:
      datacenter-id: 1
      worker-id: 1
    db-config:
      id-type: assign_id
  mapper-locations: classpath:mapper/*.xml

# enable log for web request (develop only)
logging:
  config: classpath:logback-spring.xml

# use at "In extreme cases, the primary key is duplicated."
snowflake:
  data-center-id: 1
  machine-id: 1

com:
  grtsinry43:
    secret_key:  # 这里使用 `openssl rand -base64 64` 生成一个随机字符串用作密钥
```

## 初始化数据库

在你的数据库中执行 `backend/src/main/resources/sql/init_table.sql` 文件，以初始化数据库。

```shell
❯ mysql -u your_user -p your_db < backend/src/main/resources/sql/init_table.sql
```

## 运行

```shell
❯ java -jar backend-0.0.1-SNAPSHOT.jar --spring.config.location=application.yml
```

::: warning
请确保你的数据库已经启动，并且已经初始化了数据库。
:::

## 完成
恭喜你，后端已经成功运行，接下来请继续 [Nginx 反代配置](/quick-start/nginx-config.md)。

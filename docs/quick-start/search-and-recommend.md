# 搜索与推荐

## 搜索

如你所见，本项目的搜索是由 Elaticsearch 提供的。

Elasticsearch 是一个基于 Lucene 的搜索服务器，它提供了一个分布式多用户能力的全文搜索引擎，
是用 Java 编写的，可以通过 HTTP 请求进行通信。

### 下载与安装

首先，你需要下载并安装 Elasticsearch。你可以在 [Elasticsearch 官网](https://www.elastic.co/cn/downloads/elasticsearch)
找到需要的版本，本项目是用的是 `8.16.0`，也推荐使用较新的版本以获得更高的体验。

https://www.elastic.co/downloads/past-releases/elasticsearch-8-16-0

完成之后，你可以将其解压在你的项目目录下，或是放在其他地方，只要你能找到它就行。

```shell
# 先运行一下等待其生成配置文件
./bin/elasticsearch
```

### 配置

首先，对于新的版本，当第一次启动时将默认启用安全特性，我们在测试阶段先关闭它。

```shell
# 修改 elasticsearch.yml
~/Downloads/elasticsearch-8.16.0
❯ vim ./config/elasticsearch.yml 
```

```shell{2}
# Enable security features
xpack.security.enabled: false # 这里我们先关闭安全特性

xpack.security.enrollment.enabled: true

# Enable encryption for HTTP API client connections, such as Kibana, Logstash, and Agents
xpack.security.http.ssl:
  enabled: true
  keystore.path: certs/http.p12

# Enable encryption and mutual authentication between cluster nodes
xpack.security.transport.ssl:
  enabled: true
  verification_mode: certificate
  keystore.path: certs/transport.p12
  truststore.path: certs/transport.p12
# Create a new cluster with the current node only
# Additional nodes can still join the cluster later
cluster.initial_master_nodes: ["archlinux"]
```

在 ES 运行时其会动态调整 jvm 的内存，如果你的机器内存较小，可以手动调整一下。

:::warning
请注意，真的只是内存确实不够时才调整，否则都应该让 ES 自己调整。
:::

```shell
# 将 jvm.options 按照指示复制到 jvm.options.d/ 目录下
~/Downloads/elasticsearch-8.16.0
❯ cp config/jvm.options config/jvm.options.d/
```

```shell
-Xms512m
-Xmx512m
```

### 安装中文分词器

```shell
~/Downloads/elasticsearch-8.16.0
❯ ./bin/elasticsearch-plugin install https://release.infinilabs.com/analysis-ik/stable/elasticsearch-analysis-ik-8.16.0.zip
```

安装完成后重启 ES 即可生效

### 测试

```shell
curl  http://localhost:9200

{
  "name" : "grtbloghost",
  "cluster_name" : "elasticsearch",
  "cluster_uuid" : "UjIlTtMRT92c59JywK_doQ",
  "version" : {
    "number" : "8.16.0",
    "build_flavor" : "default",
    "build_type" : "tar",
    "build_hash" : "12ff76a92922609df4aba61a368e7adf65589749",
    "build_date" : "2024-11-08T10:05:56.292914697Z",
    "build_snapshot" : false,
    "lucene_version" : "9.12.0",
    "minimum_wire_compatibility_version" : "7.17.0",
    "minimum_index_compatibility_version" : "7.0.0"
  },
  "tagline" : "You Know, for Search"
}
```

## 推荐

下面我们来配置推荐服务，这个推荐服务在我的仓库中，你可以在 [RelatedRecommend](https://github.com/grtsinry43/RelatedRecommend)
中找到。

### 创建配置文件

在项目目录创建一个`cfg.py`文件，内容如下：

```python
mysql_cfg = {
    'host': 'localhost',
    'user': 'your_user',
    'password': 'your_password',
    'database': 'database',
    'port': 3306
}

mongo_cfg = {
    'host': 'localhost',
    'port': 27017,
    'db': 'database',
    'collection': 'article_vectors',
    'behavior_collection': 'user_behavior',
    'user_vector_collection': 'user_vectors',
    'user': 'your_user',
    'password': 'your_password'
}

app_port = 8001
```

### 安装依赖

```shell
❯ pip install -r requirements.txt
```

### 运行

```shell
❯ python main.py
```

启动后，你可以在浏览器中访问 `http://localhost:8001` 来查看推荐服务是否正常运行。

### 测试

```shell
❯ curl http://localhost:8001
```

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "full_trained_model_exists": true,
    "article_count": 4,
    "articles_less_than_min": true
  }
}
```

## 完成

当你完成了上述步骤，代表搜索与推荐服务已经配置完成，你可以继续完成后端的配置。（撒花！）

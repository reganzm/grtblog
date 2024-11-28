# 完整接口文档

想要加入开发？没问题！！！这里有完整的接口文档！

# 标签控制器

## POST addNewTagApi

POST /tag/add

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|tagName|query|string| 是 |none|

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "id": 0,
    "name": "",
    "createdAt": "",
    "updatedAt": "",
    "deletedAt": ""
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponseTag](#schemaapiresponsetag)|

## GET listTagsApi

GET /tag

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": [
    {
      "tagId": "",
      "tagName": "",
      "articleCount": 0
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponseListTagVO](#schemaapiresponselisttagvo)|

# 测试控制器

## GET hello

GET /test/hello

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": {}
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponseObject](#schemaapiresponseobject)|

# 用户控制器

## POST login

POST /user/login

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|userEmail|query|string| 否 |none|
|password|query|string| 否 |none|

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "id": "",
    "nickname": "",
    "email": "",
    "avatar": "",
    "createdAt": "",
    "oauthProvider": ""
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponseUserVO](#schemaapiresponseuservo)|

## POST registerApi

POST /user/register

> Body 请求参数

```json
{
  "nickname": "string",
  "email": "string",
  "password": "string"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|[UserRegisterDTO](#schemauserregisterdto)| 否 |none|

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "id": "",
    "nickname": "",
    "email": "",
    "avatar": "",
    "createdAt": "",
    "oauthProvider": ""
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponseUserVO](#schemaapiresponseuservo)|

## GET getCurrentUser

GET /user/info

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "id": "",
    "nickname": "",
    "email": "",
    "avatar": "",
    "createdAt": "",
    "oauthProvider": ""
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponseUserVO](#schemaapiresponseuservo)|

## PATCH updateNickname

PATCH /user/update/nickname

> Body 请求参数

```json
"string"
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|string| 否 |none|

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "id": "",
    "nickname": "",
    "email": "",
    "avatar": "",
    "createdAt": "",
    "oauthProvider": ""
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponseUserVO](#schemaapiresponseuservo)|

# 后台管理控制器

## POST login

POST /admin/login

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|userEmail|query|string| 否 |none|
|password|query|string| 否 |none|

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "id": "",
    "nickname": "",
    "email": "",
    "avatar": "",
    "createdAt": "",
    "oauthProvider": ""
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponseUserVO](#schemaapiresponseuservo)|

## GET getCurrentUser

GET /admin/userInfo

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "id": "",
    "nickname": "",
    "email": "",
    "avatar": "",
    "createdAt": "",
    "oauthProvider": ""
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponseUserVO](#schemaapiresponseuservo)|

## POST addArticleApi

POST /admin/article

> Body 请求参数

```json
{
  "title": "string",
  "content": "string",
  "cover": "string",
  "categoryId": "string",
  "tags": "string",
  "isPublished": true,
  "shortUrl": "string",
  "isTop": true,
  "isHot": true,
  "isOriginal": true
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|[ArticleDTO](#schemaarticledto)| 否 |none|

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "id": "",
    "title": "",
    "summary": "",
    "toc": "",
    "content": "",
    "author": "",
    "cover": "",
    "category": "",
    "tags": "",
    "views": 0,
    "likes": 0,
    "comments": 0,
    "shortUrl": "",
    "isPublished": false,
    "createdAt": "",
    "updatedAt": "",
    "deletedAt": "",
    "isTop": false,
    "isHot": false,
    "isOriginal": false
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponseArticleVO](#schemaapiresponsearticlevo)|

## DELETE deleteArticleApi

DELETE /admin/article/{id}

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|string| 是 |none|

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": ""
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponseString](#schemaapiresponsestring)|

## PATCH updateArticleApi

PATCH /admin/article/{id}

> Body 请求参数

```json
{
  "title": "string",
  "content": "string",
  "cover": "string",
  "categoryId": "string",
  "tags": "string",
  "isPublished": true,
  "shortUrl": "string",
  "isTop": true,
  "isHot": true,
  "isOriginal": true
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|string| 是 |none|
|body|body|[ArticleDTO](#schemaarticledto)| 否 |none|

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "id": "",
    "title": "",
    "summary": "",
    "toc": "",
    "content": "",
    "author": "",
    "cover": "",
    "category": "",
    "tags": "",
    "views": 0,
    "likes": 0,
    "comments": 0,
    "shortUrl": "",
    "isPublished": false,
    "createdAt": "",
    "updatedAt": "",
    "deletedAt": "",
    "isTop": false,
    "isHot": false,
    "isOriginal": false
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponseArticleVO](#schemaapiresponsearticlevo)|

## GET getArticleById

GET /admin/article/{id}

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|string| 是 |none|

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "id": "",
    "title": "",
    "summary": "",
    "toc": "",
    "content": "",
    "author": "",
    "cover": "",
    "categoryId": "",
    "tags": "",
    "views": 0,
    "likes": 0,
    "comments": 0,
    "shortUrl": "",
    "isPublished": false,
    "createdAt": "",
    "updatedAt": "",
    "deletedAt": "",
    "isTop": false,
    "isHot": false,
    "isOriginal": false
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponseArticleVO](#schemaapiresponsearticlevo)|

## GET listAllCategories

GET /admin/category

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": [
    {
      "id": "",
      "name": "",
      "shortUrl": ""
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponseListCategoryVO](#schemaapiresponselistcategoryvo)|

## POST addCategoryApi

POST /admin/category

> Body 请求参数

```json
{
  "name": "string",
  "shortUrl": "string",
  "type": true
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|[AddCategory](#schemaaddcategory)| 否 |none|

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "id": "",
    "name": "",
    "shortUrl": ""
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponseCategoryVO](#schemaapiresponsecategoryvo)|

## PATCH updateArticleApi

PATCH /admin/article/toggle/{id}

> Body 请求参数

```json
{
  "isPublished": true,
  "isTop": true,
  "isHot": true,
  "isOriginal": true
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|string| 是 |none|
|body|body|[PostStatusToggle](#schemapoststatustoggle)| 否 |none|

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "id": "",
    "title": "",
    "summary": "",
    "toc": "",
    "content": "",
    "author": "",
    "cover": "",
    "categoryId": "",
    "tags": "",
    "views": 0,
    "likes": 0,
    "comments": 0,
    "shortUrl": "",
    "isPublished": false,
    "createdAt": "",
    "updatedAt": "",
    "deletedAt": "",
    "isTop": false,
    "isHot": false,
    "isOriginal": false
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponseArticleVO](#schemaapiresponsearticlevo)|

## GET listAllArticlesByPageAdmin

GET /admin/article/all

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|page|query|integer| 是 |none|
|pageSize|query|integer| 是 |none|

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": [
    {
      "id": "",
      "title": "",
      "summary": "",
      "toc": "",
      "content": "",
      "author": "",
      "cover": "",
      "category": "",
      "tags": "",
      "views": 0,
      "likes": 0,
      "comments": 0,
      "shortUrl": "",
      "isPublished": false,
      "createdAt": "",
      "updatedAt": "",
      "deletedAt": "",
      "isTop": false,
      "isHot": false,
      "isOriginal": false
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponseListArticleVO](#schemaapiresponselistarticlevo)|

## PATCH toggleStatusUpdateApi

PATCH /admin/statusUpdate/toggle/{id}

> Body 请求参数

```json
{
  "isPublished": true,
  "isTop": true,
  "isHot": true,
  "isOriginal": true
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|string| 是 |none|
|body|body|[PostStatusToggle](#schemapoststatustoggle)| 否 |none|

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "id": "",
    "title": "",
    "summary": "",
    "content": "",
    "authorName": "",
    "img": "",
    "categoryId": "",
    "views": 0,
    "likes": 0,
    "comments": 0,
    "shortUrl": "",
    "isPublished": false,
    "createdAt": "",
    "updatedAt": "",
    "deletedAt": "",
    "isTop": false,
    "isHot": false,
    "isOriginal": false
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponseStatusUpdateVO](#schemaapiresponsestatusupdatevo)|

## GET listAllStatusUpdatesByPageAdmin

GET /admin/statusUpdate/all

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|page|query|integer| 是 |none|
|pageSize|query|integer| 是 |none|

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": [
    {
      "id": "",
      "title": "",
      "summary": "",
      "content": "",
      "authorName": "",
      "img": "",
      "categoryId": "",
      "views": 0,
      "likes": 0,
      "comments": 0,
      "shortUrl": "",
      "isPublished": false,
      "createdAt": "",
      "updatedAt": "",
      "deletedAt": "",
      "isTop": false,
      "isHot": false,
      "isOriginal": false
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponseListStatusUpdateVO](#schemaapiresponseliststatusupdatevo)|

## POST addStatusUpdateApi

POST /admin/statusUpdate

> Body 请求参数

```json
{
  "title": "string",
  "summary": "string",
  "content": "string",
  "img": "string",
  "categoryId": "string",
  "shortUrl": "string",
  "isPublished": true,
  "isTop": true,
  "isHot": true,
  "isOriginal": true
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|[StatusUpdateDTO](#schemastatusupdatedto)| 否 |none|

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "id": "",
    "title": "",
    "summary": "",
    "content": "",
    "authorName": "",
    "img": "",
    "categoryId": "",
    "views": 0,
    "likes": 0,
    "comments": 0,
    "shortUrl": "",
    "isPublished": false,
    "createdAt": "",
    "updatedAt": "",
    "deletedAt": "",
    "isTop": false,
    "isHot": false,
    "isOriginal": false
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponseStatusUpdateVO](#schemaapiresponsestatusupdatevo)|

## DELETE deleteStatusUpdateApi

DELETE /admin/statusUpdate/{id}

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|string| 是 |none|

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": ""
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponseString](#schemaapiresponsestring)|

## PATCH updateStatusUpdateApi

PATCH /admin/statusUpdate/{id}

> Body 请求参数

```json
{
  "title": "string",
  "summary": "string",
  "content": "string",
  "img": "string",
  "categoryId": "string",
  "shortUrl": "string",
  "isPublished": true,
  "isTop": true,
  "isHot": true,
  "isOriginal": true
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|string| 是 |none|
|body|body|[StatusUpdateDTO](#schemastatusupdatedto)| 否 |none|

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "id": "",
    "title": "",
    "summary": "",
    "content": "",
    "authorName": "",
    "img": "",
    "categoryId": "",
    "views": 0,
    "likes": 0,
    "comments": 0,
    "shortUrl": "",
    "isPublished": false,
    "createdAt": "",
    "updatedAt": "",
    "deletedAt": "",
    "isTop": false,
    "isHot": false,
    "isOriginal": false
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponseStatusUpdateVO](#schemaapiresponsestatusupdatevo)|

## GET getStatusUpdateById

GET /admin/statusUpdate/{id}

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|string| 是 |none|

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "id": "",
    "title": "",
    "summary": "",
    "content": "",
    "authorName": "",
    "img": "",
    "categoryId": "",
    "views": 0,
    "likes": 0,
    "comments": 0,
    "shortUrl": "",
    "isPublished": false,
    "createdAt": "",
    "updatedAt": "",
    "deletedAt": "",
    "isTop": false,
    "isHot": false,
    "isOriginal": false
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponseStatusUpdateVO](#schemaapiresponsestatusupdatevo)|

## POST addPageApi

POST /admin/page

> Body 请求参数

```json
{
  "title": "string",
  "description": "string",
  "refPath": "string",
  "content": "string",
  "enable": true,
  "canComment": true
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|[PageDTO](#schemapagedto)| 否 |none|

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "id": "",
    "title": "",
    "description": "",
    "refPath": "",
    "toc": "",
    "content": "",
    "views": 0,
    "likes": 0,
    "comments": 0,
    "commentId": "",
    "enable": false,
    "canDelete": false,
    "createdAt": "",
    "updatedAt": ""
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponsePageVO](#schemaapiresponsepagevo)|

## PATCH updatePageApi

PATCH /admin/page/{id}

> Body 请求参数

```json
{
  "title": "string",
  "description": "string",
  "refPath": "string",
  "content": "string",
  "enable": true,
  "canComment": true
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|string| 是 |none|
|body|body|[PageDTO](#schemapagedto)| 否 |none|

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "id": "",
    "title": "",
    "description": "",
    "refPath": "",
    "toc": "",
    "content": "",
    "views": 0,
    "likes": 0,
    "comments": 0,
    "commentId": "",
    "enable": false,
    "canDelete": false,
    "createdAt": "",
    "updatedAt": ""
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponsePageVO](#schemaapiresponsepagevo)|

## DELETE deletePageApi

DELETE /admin/page/{id}

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|string| 是 |none|

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": ""
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponseString](#schemaapiresponsestring)|

## GET getPageById

GET /admin/page/{id}

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|string| 是 |none|

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "id": "",
    "title": "",
    "description": "",
    "refPath": "",
    "toc": "",
    "content": "",
    "views": 0,
    "likes": 0,
    "comments": 0,
    "commentId": "",
    "enable": false,
    "canDelete": false,
    "createdAt": "",
    "updatedAt": ""
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponsePageVO](#schemaapiresponsepagevo)|

## GET listAllPagesByPageAdmin

GET /admin/page/all

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|page|query|integer| 是 |none|
|pageSize|query|integer| 是 |none|

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": [
    {
      "id": "",
      "title": "",
      "description": "",
      "refPath": "",
      "toc": "",
      "content": "",
      "views": 0,
      "likes": 0,
      "comments": 0,
      "commentId": "",
      "enable": false,
      "canDelete": false,
      "createdAt": "",
      "updatedAt": ""
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponseListPageVO](#schemaapiresponselistpagevo)|

## PUT updateWebsiteInfo

PUT /admin/website-info

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|key|query|string| 是 |none|
|value|query|string| 是 |none|

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": ""
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponseString](#schemaapiresponsestring)|

## PATCH togglePageApi

PATCH /admin/page/toggle/{id}

> Body 请求参数

```json
{
  "isPublished": true,
  "isTop": true,
  "isHot": true,
  "isOriginal": true
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|string| 是 |none|
|body|body|[PostStatusToggle](#schemapoststatustoggle)| 否 |none|

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "id": "",
    "title": "",
    "description": "",
    "refPath": "",
    "toc": "",
    "content": "",
    "views": 0,
    "likes": 0,
    "comments": 0,
    "commentId": "",
    "enable": false,
    "canDelete": false,
    "createdAt": "",
    "updatedAt": ""
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponsePageVO](#schemaapiresponsepagevo)|

## PUT updateWebsiteInfo

PUT /admin/config

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|key|query|string| 是 |none|
|value|query|string| 是 |none|

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": ""
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponseString](#schemaapiresponsestring)|

# 归档控制器

## GET getArchiveApi

GET /archive

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "{year=0, @required={year=false}, @class={year=int}, @comment={year=}}": {
      "articleCount": 0,
      "statusUpdateCount": 0,
      "articles": [
        {
          "title": "",
          "shortUrl": "",
          "category": "",
          "createdAt": ""
        }
      ],
      "statusUpdates": [
        {
          "title": "",
          "shortUrl": "",
          "category": "",
          "createdAt": ""
        }
      ]
    }
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponseMapArchiveSummary](#schemaapiresponsemaparchivesummary)|

# 文章控制器

## GET 获取所有文章短链接

GET /article/shortLinks

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": [
    ""
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponseListString](#schemaapiresponseliststring)|

## GET getArticleListByPage

GET /article/all

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|page|query|integer| 是 |none|
|pageSize|query|integer| 是 |none|

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": [
    {
      "id": "",
      "title": "",
      "shortUrl": "",
      "authorName": "",
      "summary": "",
      "avatar": "",
      "cover": "",
      "views": 0,
      "categoryName": "",
      "tags": "",
      "likes": 0,
      "comments": 0,
      "isTop": false
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponseListArticlePreview](#schemaapiresponselistarticlepreview)|

## GET getLastFiveArticles

GET /article/lastFive

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": [
    {
      "id": "",
      "title": "",
      "shortUrl": "",
      "authorName": "",
      "summary": "",
      "avatar": "",
      "cover": "",
      "views": 0,
      "categoryName": "",
      "tags": "",
      "likes": 0,
      "comments": 0,
      "isTop": false
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponseListArticlePreview](#schemaapiresponselistarticlepreview)|

## GET getRecommendArticles

GET /article/recommend/{shortUrl}

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|shortUrl|path|string| 是 |none|

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": [
    {
      "id": "",
      "title": "",
      "shortUrl": "",
      "authorName": "",
      "summary": "",
      "avatar": "",
      "cover": "",
      "views": 0,
      "categoryName": "",
      "tags": "",
      "likes": 0,
      "comments": 0,
      "isTop": false
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponseListArticlePreview](#schemaapiresponselistarticlepreview)|

## GET getArticleListByCategory

GET /article/category/{shortUrl}

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|shortUrl|path|string| 是 |none|
|page|query|integer| 是 |none|
|pageSize|query|integer| 是 |none|

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": [
    {
      "id": "",
      "title": "",
      "shortUrl": "",
      "authorName": "",
      "summary": "",
      "avatar": "",
      "cover": "",
      "views": 0,
      "categoryName": "",
      "tags": "",
      "likes": 0,
      "comments": 0,
      "isTop": false
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponseListArticlePreview](#schemaapiresponselistarticlepreview)|

## GET viewOneArticleApi

GET /article/{shortUrl}

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|shortUrl|path|string| 是 |none|

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "shortUrl": "",
    "title": "",
    "content": "",
    "summary": "",
    "toc": "",
    "authorName": "",
    "cover": "",
    "categoryName": "",
    "tags": "",
    "views": 0,
    "likes": 0,
    "comments": 0
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponseArticleView](#schemaapiresponsearticleview)|

# 验证码控制器

## GET getCaptcha

GET /captcha

> 返回示例

> 200 Response

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

# 评论控制器

## GET listCommentByArticleId

GET /comment/article/{shortUrl}

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|shortUrl|path|string| 是 |none|

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": [
    {
      "id": "",
      "articleId": "",
      "content": "",
      "avatarUrl": "",
      "userName": "",
      "location": "",
      "website": "",
      "createdAt": "",
      "updatedAt": "",
      "parentId": "",
      "children": [
        {
          "id": "",
          "articleId": "",
          "content": "",
          "avatarUrl": "",
          "userName": "",
          "location": "",
          "website": "",
          "createdAt": "",
          "updatedAt": "",
          "parentId": "",
          "children": []
        }
      ]
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponseListCommentVO](#schemaapiresponselistcommentvo)|

## GET getCommentListById

GET /comment/{id}

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|string| 是 |none|
|page|query|integer| 是 |none|
|pageSize|query|integer| 是 |none|

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": [
    {
      "id": "",
      "areaId": "",
      "content": "",
      "avatarUrl": "",
      "userName": "",
      "location": "",
      "website": "",
      "createdAt": "",
      "updatedAt": "",
      "parentId": "",
      "parentUserName": "",
      "children": [
        {
          "id": "",
          "areaId": "",
          "content": "",
          "avatarUrl": "",
          "userName": "",
          "location": "",
          "website": "",
          "createdAt": "",
          "updatedAt": "",
          "parentId": "",
          "parentUserName": "",
          "children": []
        }
      ]
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponseListCommentVO](#schemaapiresponselistcommentvo)|

## POST addNewComment

POST /comment

> Body 请求参数

```json
{
  "areaId": "string",
  "content": "string",
  "userName": "string",
  "email": "string",
  "website": "string",
  "parentId": "string"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|[CommentNotLoginForm](#schemacommentnotloginform)| 否 |none|

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "id": "",
    "articleId": "",
    "content": "",
    "avatarUrl": "",
    "userName": "",
    "location": "",
    "website": "",
    "createdAt": "",
    "updatedAt": "",
    "parentId": "",
    "children": [
      {
        "id": "",
        "articleId": "",
        "content": "",
        "avatarUrl": "",
        "userName": "",
        "location": "",
        "website": "",
        "createdAt": "",
        "updatedAt": "",
        "parentId": "",
        "children": [
          {}
        ]
      }
    ]
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponseCommentVO](#schemaapiresponsecommentvo)|

## POST addNewCommentLogin

POST /comment/add

> Body 请求参数

```json
{
  "areaId": "string",
  "content": "string",
  "parentId": "string"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|[CommentLoginForm](#schemacommentloginform)| 否 |none|

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "id": "",
    "areaId": "",
    "content": "",
    "avatarUrl": "",
    "userName": "",
    "location": "",
    "website": "",
    "platform": "",
    "browser": "",
    "createdAt": "",
    "updatedAt": "",
    "parentId": "",
    "parentUserName": "",
    "children": [
      {
        "id": "",
        "areaId": "",
        "content": "",
        "avatarUrl": "",
        "userName": "",
        "location": "",
        "website": "",
        "platform": "",
        "browser": "",
        "createdAt": "",
        "updatedAt": "",
        "parentId": "",
        "parentUserName": "",
        "children": [
          {}
        ]
      }
    ]
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponseCommentVO](#schemaapiresponsecommentvo)|

# 导航菜单控制器

## GET getNavMenu

GET /nav

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": [
    {
      "name": "",
      "href": "",
      "children": [
        {
          "name": "",
          "href": "",
          "children": []
        }
      ]
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponseListNavMenuVO](#schemaapiresponselistnavmenuvo)|

# 分类控制器

## GET getAllCategories

GET /category/all

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": [
    {
      "id": "",
      "name": "",
      "shortUrl": ""
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponseListCategoryVO](#schemaapiresponselistcategoryvo)|

# 记录更新控制器

## GET getLastStatusUpdate

GET /statusUpdate/last

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "shortUrl": "",
    "authorName": "",
    "images": [
      ""
    ],
    "title": "",
    "summary": "",
    "views": 0,
    "comments": 0,
    "likes": 0,
    "createdAt": "",
    "updatedAt": ""
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponseStatusUpdatePreview](#schemaapiresponsestatusupdatepreview)|

## GET getLastFourStatusUpdates

GET /statusUpdate/lastFour

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": [
    {
      "shortUrl": "",
      "authorName": "",
      "images": [
        ""
      ],
      "title": "",
      "summary": "",
      "views": 0,
      "comments": 0,
      "likes": 0,
      "createdAt": "",
      "updatedAt": ""
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponseListStatusUpdatePreview](#schemaapiresponseliststatusupdatepreview)|

## GET getAllStatusUpdates

GET /statusUpdate/all

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|page|query|integer| 是 |none|
|pageSize|query|integer| 是 |none|

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": [
    {
      "shortUrl": "",
      "authorName": "",
      "images": [
        ""
      ],
      "title": "",
      "summary": "",
      "views": 0,
      "comments": 0,
      "likes": 0,
      "createdAt": "",
      "updatedAt": ""
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponseListStatusUpdatePreview](#schemaapiresponseliststatusupdatepreview)|

## GET getAllStatusUpdateShortLinksApi

GET /statusUpdate/shortLinks

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": [
    ""
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponseListString](#schemaapiresponseliststring)|

## GET getStatusUpdatesByCategory

GET /statusUpdate/category/{shortUrl}

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|shortUrl|path|string| 是 |none|
|page|query|integer| 是 |none|
|pageSize|query|integer| 是 |none|

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": [
    {
      "shortUrl": "",
      "authorName": "",
      "images": [
        ""
      ],
      "title": "",
      "summary": "",
      "views": 0,
      "comments": 0,
      "likes": 0,
      "createdAt": "",
      "updatedAt": ""
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponseListStatusUpdatePreview](#schemaapiresponseliststatusupdatepreview)|

## GET viewOneStatusUpdate

GET /statusUpdate/{shortUrl}

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|shortUrl|path|string| 是 |none|

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "shortUrl": "",
    "authorName": "",
    "images": [
      ""
    ],
    "title": "",
    "summary": "",
    "views": 0,
    "comments": 0,
    "likes": 0,
    "createdAt": "",
    "updatedAt": ""
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponseStatusUpdateView](#schemaapiresponsestatusupdateview)|

## GET getWebsiteInfo

GET /websiteInfo

> 返回示例

```json
{
  "": ""
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponseMapString](#schemaapiresponsemapstring)|

# PageController

## GET getShortLinksApi

GET /page/shortLinks

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": [
    ""
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

## GET getPageContentApi

GET /page/{refPath}

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|refPath|path|string| 是 |none|

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "id": "",
    "title": "",
    "description": "",
    "refPath": "",
    "toc": "",
    "content": "",
    "views": 0,
    "likes": 0,
    "comments": 0,
    "commentId": "",
    "enable": false,
    "canDelete": false,
    "createdAt": "",
    "updatedAt": ""
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponsePageVO](#schemaapiresponsepagevo)|

# SearchController

## GET search

GET /search

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|keyword|query|string| 是 |none|

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "pages": [
      {
        "id": 0,
        "title": "",
        "description": "",
        "content": "",
        "shortUrl": "",
        "highlightedContent": ""
      }
    ],
    "articles": [
      {
        "id": 0,
        "title": "",
        "summary": "",
        "content": "",
        "shortUrl": "",
        "highlightedContent": ""
      }
    ],
    "moments": [
      {
        "id": 0,
        "title": "",
        "summary": "",
        "content": "",
        "shortUrl": "",
        "highlightedContent": ""
      }
    ]
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponseAggregatedSearchResult](#schemaapiresponseaggregatedsearchresult)|

# PageViewController

## GET getPageViews

GET /page-view

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": [
    {
      "": {}
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponseListMapObject](#schemaapiresponselistmapobject)|

# UploadFileController

## POST handleFileUpload

POST /upload

> Body 请求参数

```yaml
file: string

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» file|body|string(binary)| 是 |none|

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": ""
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ApiResponseString](#schemaapiresponsestring)|

# 数据模型

<h2 id="tocS_Tag">Tag</h2>

<a id="schematag"></a>
<a id="schema_Tag"></a>
<a id="tocStag"></a>
<a id="tocstag"></a>

```json
{
  "id": 0,
  "name": "string",
  "createdAt": "string",
  "updatedAt": "string",
  "deletedAt": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|integer|false|none||标签ID，会由雪花算法生成|
|name|string|false|none||标签名称|
|createdAt|string|false|none||标签创建时间|
|updatedAt|string|false|none||标签更新时间|
|deletedAt|string|false|none||标签删除时间（软删除），如果不为空则表示已删除|

<h2 id="tocS_MapString">MapString</h2>

<a id="schemamapstring"></a>
<a id="schema_MapString"></a>
<a id="tocSmapstring"></a>
<a id="tocsmapstring"></a>

```json
{
  "key": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|key|string|false|none||none|

<h2 id="tocS_ApiResponseTag">ApiResponseTag</h2>

<a id="schemaapiresponsetag"></a>
<a id="schema_ApiResponseTag"></a>
<a id="tocSapiresponsetag"></a>
<a id="tocsapiresponsetag"></a>

```json
{
  "code": 0,
  "msg": "string",
  "data": {
    "id": 0,
    "name": "string",
    "createdAt": "string",
    "updatedAt": "string",
    "deletedAt": "string"
  }
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|code|integer|false|none||none|
|msg|string|false|none||none|
|data|[Tag](#schematag)|false|none||none|

<h2 id="tocS_TagVO">TagVO</h2>

<a id="schematagvo"></a>
<a id="schema_TagVO"></a>
<a id="tocStagvo"></a>
<a id="tocstagvo"></a>

```json
{
  "tagId": "string",
  "tagName": "string",
  "articleCount": 0
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|tagId|string|false|none||none|
|tagName|string|false|none||none|
|articleCount|integer|false|none||none|

<h2 id="tocS_ApiResponseListTagVO">ApiResponseListTagVO</h2>

<a id="schemaapiresponselisttagvo"></a>
<a id="schema_ApiResponseListTagVO"></a>
<a id="tocSapiresponselisttagvo"></a>
<a id="tocsapiresponselisttagvo"></a>

```json
{
  "code": 0,
  "msg": "string",
  "data": [
    {
      "tagId": "string",
      "tagName": "string",
      "articleCount": 0
    }
  ]
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|code|integer|false|none||none|
|msg|string|false|none||none|
|data|[[TagVO](#schematagvo)]|false|none||none|

<h2 id="tocS_Object">Object</h2>

<a id="schemaobject"></a>
<a id="schema_Object"></a>
<a id="tocSobject"></a>
<a id="tocsobject"></a>

```json
{}

```

### 属性

*None*

<h2 id="tocS_StatusUpdateView">StatusUpdateView</h2>

<a id="schemastatusupdateview"></a>
<a id="schema_StatusUpdateView"></a>
<a id="tocSstatusupdateview"></a>
<a id="tocsstatusupdateview"></a>

```json
{
  "shortUrl": "string",
  "authorName": "string",
  "authorAvatar": "string",
  "categoryName": "string",
  "images": [
    "string"
  ],
  "title": "string",
  "content": "string",
  "views": 0,
  "comments": 0,
  "likes": 0,
  "commentId": "string",
  "isTop": true,
  "isHot": true,
  "isOriginal": true,
  "createdAt": "string",
  "updatedAt": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|shortUrl|string|false|none||说说短链接|
|authorName|string|false|none||作者名字|
|authorAvatar|string|false|none||作者头像|
|categoryName|string|false|none||none|
|images|[string]|false|none||图片|
|title|string|false|none||说说标题|
|content|string|false|none||内容（Markdown 格式，由前端解析）|
|views|integer|false|none||查看次数|
|comments|integer|false|none||评论次数|
|likes|integer|false|none||点赞次数|
|commentId|string|false|none||评论区 id|
|isTop|boolean|false|none||是否置顶|
|isHot|boolean|false|none||是否热门|
|isOriginal|boolean|false|none||是否原创|
|createdAt|string|false|none||说说创建时间|
|updatedAt|string|false|none||说说更新时间|

<h2 id="tocS_ApiResponseString[]">ApiResponseString[]</h2>

<a id="schemaapiresponsestring[]"></a>
<a id="schema_ApiResponseString[]"></a>
<a id="tocSapiresponsestring[]"></a>
<a id="tocsapiresponsestring[]"></a>

```json
{
  "code": 0,
  "msg": "string",
  "data": [
    "string"
  ]
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|code|integer|false|none||none|
|msg|string|false|none||none|
|data|[string]|false|none||none|

<h2 id="tocS_ApiResponseObject">ApiResponseObject</h2>

<a id="schemaapiresponseobject"></a>
<a id="schema_ApiResponseObject"></a>
<a id="tocSapiresponseobject"></a>
<a id="tocsapiresponseobject"></a>

```json
{
  "code": 0,
  "msg": "string",
  "data": {}
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|code|integer|false|none||none|
|msg|string|false|none||none|
|data|[Object](#schemaobject)|false|none||none|

<h2 id="tocS_ApiResponseStatusUpdateView">ApiResponseStatusUpdateView</h2>

<a id="schemaapiresponsestatusupdateview"></a>
<a id="schema_ApiResponseStatusUpdateView"></a>
<a id="tocSapiresponsestatusupdateview"></a>
<a id="tocsapiresponsestatusupdateview"></a>

```json
{
  "code": 0,
  "msg": "string",
  "data": {
    "shortUrl": "string",
    "authorName": "string",
    "authorAvatar": "string",
    "categoryName": "string",
    "images": [
      "string"
    ],
    "title": "string",
    "content": "string",
    "views": 0,
    "comments": 0,
    "likes": 0,
    "commentId": "string",
    "isTop": true,
    "isHot": true,
    "isOriginal": true,
    "createdAt": "string",
    "updatedAt": "string"
  }
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|code|integer|false|none||none|
|msg|string|false|none||none|
|data|[StatusUpdateView](#schemastatusupdateview)|false|none||none|

<h2 id="tocS_ApiResponseString">ApiResponseString</h2>

<a id="schemaapiresponsestring"></a>
<a id="schema_ApiResponseString"></a>
<a id="tocSapiresponsestring"></a>
<a id="tocsapiresponsestring"></a>

```json
{
  "code": 0,
  "msg": "string",
  "data": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|code|integer|false|none||none|
|msg|string|false|none||none|
|data|string|false|none||none|

<h2 id="tocS_UserVO">UserVO</h2>

<a id="schemauservo"></a>
<a id="schema_UserVO"></a>
<a id="tocSuservo"></a>
<a id="tocsuservo"></a>

```json
{
  "id": "string",
  "nickname": "string",
  "email": "string",
  "avatar": "string",
  "createdAt": "string",
  "oauthProvider": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|string|false|none||none|
|nickname|string|false|none||none|
|email|string|false|none||none|
|avatar|string|false|none||none|
|createdAt|string|false|none||none|
|oauthProvider|string|false|none||none|

<h2 id="tocS_ApiResponseUserVO">ApiResponseUserVO</h2>

<a id="schemaapiresponseuservo"></a>
<a id="schema_ApiResponseUserVO"></a>
<a id="tocSapiresponseuservo"></a>
<a id="tocsapiresponseuservo"></a>

```json
{
  "code": 0,
  "msg": "string",
  "data": {
    "id": "string",
    "nickname": "string",
    "email": "string",
    "avatar": "string",
    "createdAt": "string",
    "oauthProvider": "string"
  }
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|code|integer|false|none||none|
|msg|string|false|none||none|
|data|[UserVO](#schemauservo)|false|none||none|

<h2 id="tocS_UserRegisterDTO">UserRegisterDTO</h2>

<a id="schemauserregisterdto"></a>
<a id="schema_UserRegisterDTO"></a>
<a id="tocSuserregisterdto"></a>
<a id="tocsuserregisterdto"></a>

```json
{
  "nickname": "string",
  "email": "string",
  "password": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|nickname|string|false|none||none|
|email|string|false|none||none|
|password|string|false|none||none|

<h2 id="tocS_ArticleVO">ArticleVO</h2>

<a id="schemaarticlevo"></a>
<a id="schema_ArticleVO"></a>
<a id="tocSarticlevo"></a>
<a id="tocsarticlevo"></a>

```json
{
  "id": "string",
  "title": "string",
  "summary": "string",
  "toc": "string",
  "content": "string",
  "author": "string",
  "cover": "string",
  "categoryId": "string",
  "tags": "string",
  "views": 0,
  "likes": 0,
  "comments": 0,
  "shortUrl": "string",
  "isPublished": true,
  "createdAt": "string",
  "updatedAt": "string",
  "deletedAt": "string",
  "isTop": true,
  "isHot": true,
  "isOriginal": true
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|string|false|none||none|
|title|string|false|none||none|
|summary|string|false|none||none|
|toc|string|false|none||none|
|content|string|false|none||none|
|author|string|false|none||none|
|cover|string|false|none||none|
|categoryId|string|false|none||none|
|tags|string|false|none||none|
|views|integer|false|none||none|
|likes|integer|false|none||none|
|comments|integer|false|none||none|
|shortUrl|string|false|none||none|
|isPublished|boolean|false|none||none|
|createdAt|string|false|none||none|
|updatedAt|string|false|none||none|
|deletedAt|string|false|none||none|
|isTop|boolean|false|none||none|
|isHot|boolean|false|none||none|
|isOriginal|boolean|false|none||none|

<h2 id="tocS_ApiResponseArticleVO">ApiResponseArticleVO</h2>

<a id="schemaapiresponsearticlevo"></a>
<a id="schema_ApiResponseArticleVO"></a>
<a id="tocSapiresponsearticlevo"></a>
<a id="tocsapiresponsearticlevo"></a>

```json
{
  "code": 0,
  "msg": "string",
  "data": {
    "id": "string",
    "title": "string",
    "summary": "string",
    "toc": "string",
    "content": "string",
    "author": "string",
    "cover": "string",
    "categoryId": "string",
    "tags": "string",
    "views": 0,
    "likes": 0,
    "comments": 0,
    "shortUrl": "string",
    "isPublished": true,
    "createdAt": "string",
    "updatedAt": "string",
    "deletedAt": "string",
    "isTop": true,
    "isHot": true,
    "isOriginal": true
  }
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|code|integer|false|none||none|
|msg|string|false|none||none|
|data|[ArticleVO](#schemaarticlevo)|false|none||none|

<h2 id="tocS_ArticleDTO">ArticleDTO</h2>

<a id="schemaarticledto"></a>
<a id="schema_ArticleDTO"></a>
<a id="tocSarticledto"></a>
<a id="tocsarticledto"></a>

```json
{
  "title": "string",
  "content": "string",
  "cover": "string",
  "categoryId": "string",
  "tags": "string",
  "isPublished": true,
  "shortUrl": "string",
  "isTop": true,
  "isHot": true,
  "isOriginal": true
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|title|string|false|none||none|
|content|string|false|none||none|
|cover|string|false|none||none|
|categoryId|string|false|none||none|
|tags|string|false|none||none|
|isPublished|boolean|false|none||none|
|shortUrl|string|false|none||none|
|isTop|boolean|false|none||none|
|isHot|boolean|false|none||none|
|isOriginal|boolean|false|none||none|

<h2 id="tocS_StatusUpdateVO">StatusUpdateVO</h2>

<a id="schemastatusupdatevo"></a>
<a id="schema_StatusUpdateVO"></a>
<a id="tocSstatusupdatevo"></a>
<a id="tocsstatusupdatevo"></a>

```json
{
  "id": "string",
  "title": "string",
  "summary": "string",
  "content": "string",
  "authorName": "string",
  "img": "string",
  "categoryId": "string",
  "views": 0,
  "likes": 0,
  "comments": 0,
  "shortUrl": "string",
  "isPublished": true,
  "createdAt": "string",
  "updatedAt": "string",
  "deletedAt": "string",
  "isTop": true,
  "isHot": true,
  "isOriginal": true
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|string|false|none||分享 ID，会由雪花算法生成|
|title|string|false|none||分享标题|
|summary|string|false|none||分享摘要|
|content|string|false|none||分享内容，markdown 格式，交由前端解析|
|authorName|string|false|none||作者 ID，逻辑限制|
|img|string|false|none||分享图片，多个图片用逗号分隔|
|categoryId|string|false|none||分类 ID|
|views|integer|false|none||分享浏览量|
|likes|integer|false|none||分享点赞量|
|comments|integer|false|none||分享评论量|
|shortUrl|string|false|none||分享短链接|
|isPublished|boolean|false|none||是否发布（0：否，1：是）|
|createdAt|string|false|none||分享创建时间|
|updatedAt|string|false|none||分享更新时间|
|deletedAt|string|false|none||分享删除时间（软删除），如果不为空则表示已删除|
|isTop|boolean|false|none||是否置顶（0：否，1：是）|
|isHot|boolean|false|none||是否热门（0：否，1：是）|
|isOriginal|boolean|false|none||是否原创（0：否，1：是）|

<h2 id="tocS_CategoryVO">CategoryVO</h2>

<a id="schemacategoryvo"></a>
<a id="schema_CategoryVO"></a>
<a id="tocScategoryvo"></a>
<a id="tocscategoryvo"></a>

```json
{
  "id": "string",
  "name": "string",
  "shortUrl": "string",
  "isArticle": true
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|string|false|none||none|
|name|string|false|none||none|
|shortUrl|string|false|none||none|
|isArticle|boolean|false|none||none|

<h2 id="tocS_ApiResponseListStatusUpdateVO">ApiResponseListStatusUpdateVO</h2>

<a id="schemaapiresponseliststatusupdatevo"></a>
<a id="schema_ApiResponseListStatusUpdateVO"></a>
<a id="tocSapiresponseliststatusupdatevo"></a>
<a id="tocsapiresponseliststatusupdatevo"></a>

```json
{
  "code": 0,
  "msg": "string",
  "data": [
    {
      "id": "string",
      "title": "string",
      "summary": "string",
      "content": "string",
      "authorName": "string",
      "img": "string",
      "categoryId": "string",
      "views": 0,
      "likes": 0,
      "comments": 0,
      "shortUrl": "string",
      "isPublished": true,
      "createdAt": "string",
      "updatedAt": "string",
      "deletedAt": "string",
      "isTop": true,
      "isHot": true,
      "isOriginal": true
    }
  ]
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|code|integer|false|none||none|
|msg|string|false|none||none|
|data|[[StatusUpdateVO](#schemastatusupdatevo)]|false|none||none|

<h2 id="tocS_ApiResponseListCategoryVO">ApiResponseListCategoryVO</h2>

<a id="schemaapiresponselistcategoryvo"></a>
<a id="schema_ApiResponseListCategoryVO"></a>
<a id="tocSapiresponselistcategoryvo"></a>
<a id="tocsapiresponselistcategoryvo"></a>

```json
{
  "code": 0,
  "msg": "string",
  "data": [
    {
      "id": "string",
      "name": "string",
      "shortUrl": "string",
      "isArticle": true
    }
  ]
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|code|integer|false|none||none|
|msg|string|false|none||none|
|data|[[CategoryVO](#schemacategoryvo)]|false|none||none|

<h2 id="tocS_ApiResponseStatusUpdateVO">ApiResponseStatusUpdateVO</h2>

<a id="schemaapiresponsestatusupdatevo"></a>
<a id="schema_ApiResponseStatusUpdateVO"></a>
<a id="tocSapiresponsestatusupdatevo"></a>
<a id="tocsapiresponsestatusupdatevo"></a>

```json
{
  "code": 0,
  "msg": "string",
  "data": {
    "id": "string",
    "title": "string",
    "summary": "string",
    "content": "string",
    "authorName": "string",
    "img": "string",
    "categoryId": "string",
    "views": 0,
    "likes": 0,
    "comments": 0,
    "shortUrl": "string",
    "isPublished": true,
    "createdAt": "string",
    "updatedAt": "string",
    "deletedAt": "string",
    "isTop": true,
    "isHot": true,
    "isOriginal": true
  }
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|code|integer|false|none||none|
|msg|string|false|none||none|
|data|[StatusUpdateVO](#schemastatusupdatevo)|false|none||none|

<h2 id="tocS_ApiResponseCategoryVO">ApiResponseCategoryVO</h2>

<a id="schemaapiresponsecategoryvo"></a>
<a id="schema_ApiResponseCategoryVO"></a>
<a id="tocSapiresponsecategoryvo"></a>
<a id="tocsapiresponsecategoryvo"></a>

```json
{
  "code": 0,
  "msg": "string",
  "data": {
    "id": "string",
    "name": "string",
    "shortUrl": "string",
    "isArticle": true
  }
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|code|integer|false|none||none|
|msg|string|false|none||none|
|data|[CategoryVO](#schemacategoryvo)|false|none||none|

<h2 id="tocS_StatusUpdateDTO">StatusUpdateDTO</h2>

<a id="schemastatusupdatedto"></a>
<a id="schema_StatusUpdateDTO"></a>
<a id="tocSstatusupdatedto"></a>
<a id="tocsstatusupdatedto"></a>

```json
{
  "title": "string",
  "summary": "string",
  "content": "string",
  "img": "string",
  "categoryId": "string",
  "shortUrl": "string",
  "isPublished": true,
  "isTop": true,
  "isHot": true,
  "isOriginal": true
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|title|string|false|none||分享标题|
|summary|string|false|none||分享摘要|
|content|string|false|none||分享内容，markdown 格式，交由前端解析|
|img|string|false|none||分享图片，多个图片用逗号分隔|
|categoryId|string|false|none||分类 ID|
|shortUrl|string|false|none||分享短链接|
|isPublished|boolean|false|none||是否发布（0：否，1：是）|
|isTop|boolean|false|none||是否置顶（0：否，1：是）|
|isHot|boolean|false|none||是否热门（0：否，1：是）|
|isOriginal|boolean|false|none||是否原创（0：否，1：是）|

<h2 id="tocS_AddCategory">AddCategory</h2>

<a id="schemaaddcategory"></a>
<a id="schema_AddCategory"></a>
<a id="tocSaddcategory"></a>
<a id="tocsaddcategory"></a>

```json
{
  "name": "string",
  "shortUrl": "string",
  "type": true
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|name|string|false|none||none|
|shortUrl|string|false|none||none|
|type|boolean|false|none||none|

<h2 id="tocS_PageVO">PageVO</h2>

<a id="schemapagevo"></a>
<a id="schema_PageVO"></a>
<a id="tocSpagevo"></a>
<a id="tocspagevo"></a>

```json
{
  "id": "string",
  "title": "string",
  "description": "string",
  "refPath": "string",
  "toc": "string",
  "content": "string",
  "views": 0,
  "likes": 0,
  "comments": 0,
  "commentId": "string",
  "enable": true,
  "canDelete": true,
  "createdAt": "string",
  "updatedAt": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|string|false|none||none|
|title|string|false|none||none|
|description|string|false|none||none|
|refPath|string|false|none||none|
|toc|string|false|none||none|
|content|string|false|none||none|
|views|integer|false|none||none|
|likes|integer|false|none||none|
|comments|integer|false|none||none|
|commentId|string|false|none||none|
|enable|boolean|false|none||none|
|canDelete|boolean|false|none||none|
|createdAt|string|false|none||none|
|updatedAt|string|false|none||none|

<h2 id="tocS_ApiResponseListArticleVO">ApiResponseListArticleVO</h2>

<a id="schemaapiresponselistarticlevo"></a>
<a id="schema_ApiResponseListArticleVO"></a>
<a id="tocSapiresponselistarticlevo"></a>
<a id="tocsapiresponselistarticlevo"></a>

```json
{
  "code": 0,
  "msg": "string",
  "data": [
    {
      "id": "string",
      "title": "string",
      "summary": "string",
      "toc": "string",
      "content": "string",
      "author": "string",
      "cover": "string",
      "categoryId": "string",
      "tags": "string",
      "views": 0,
      "likes": 0,
      "comments": 0,
      "shortUrl": "string",
      "isPublished": true,
      "createdAt": "string",
      "updatedAt": "string",
      "deletedAt": "string",
      "isTop": true,
      "isHot": true,
      "isOriginal": true
    }
  ]
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|code|integer|false|none||none|
|msg|string|false|none||none|
|data|[[ArticleVO](#schemaarticlevo)]|false|none||none|

<h2 id="tocS_ApiResponsePageVO">ApiResponsePageVO</h2>

<a id="schemaapiresponsepagevo"></a>
<a id="schema_ApiResponsePageVO"></a>
<a id="tocSapiresponsepagevo"></a>
<a id="tocsapiresponsepagevo"></a>

```json
{
  "code": 0,
  "msg": "string",
  "data": {
    "id": "string",
    "title": "string",
    "description": "string",
    "refPath": "string",
    "toc": "string",
    "content": "string",
    "views": 0,
    "likes": 0,
    "comments": 0,
    "commentId": "string",
    "enable": true,
    "canDelete": true,
    "createdAt": "string",
    "updatedAt": "string"
  }
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|code|integer|false|none||none|
|msg|string|false|none||none|
|data|[PageVO](#schemapagevo)|false|none||none|

<h2 id="tocS_ArchiveArticle">ArchiveArticle</h2>

<a id="schemaarchivearticle"></a>
<a id="schema_ArchiveArticle"></a>
<a id="tocSarchivearticle"></a>
<a id="tocsarchivearticle"></a>

```json
{
  "title": "string",
  "shortUrl": "string",
  "category": "string",
  "createdAt": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|title|string|false|none||none|
|shortUrl|string|false|none||none|
|category|string|false|none||none|
|createdAt|string|false|none||none|

<h2 id="tocS_PageDTO">PageDTO</h2>

<a id="schemapagedto"></a>
<a id="schema_PageDTO"></a>
<a id="tocSpagedto"></a>
<a id="tocspagedto"></a>

```json
{
  "title": "string",
  "description": "string",
  "refPath": "string",
  "content": "string",
  "enable": true,
  "canComment": true
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|title|string|false|none||none|
|description|string|false|none||none|
|refPath|string|false|none||none|
|content|string|false|none||none|
|enable|boolean|false|none||none|
|canComment|boolean|false|none||none|

<h2 id="tocS_ArchiveStatusUpdate">ArchiveStatusUpdate</h2>

<a id="schemaarchivestatusupdate"></a>
<a id="schema_ArchiveStatusUpdate"></a>
<a id="tocSarchivestatusupdate"></a>
<a id="tocsarchivestatusupdate"></a>

```json
{
  "title": "string",
  "shortUrl": "string",
  "category": "string",
  "createdAt": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|title|string|false|none||none|
|shortUrl|string|false|none||none|
|category|string|false|none||none|
|createdAt|string|false|none||none|

<h2 id="tocS_ApiResponseListPageVO">ApiResponseListPageVO</h2>

<a id="schemaapiresponselistpagevo"></a>
<a id="schema_ApiResponseListPageVO"></a>
<a id="tocSapiresponselistpagevo"></a>
<a id="tocsapiresponselistpagevo"></a>

```json
{
  "code": 0,
  "msg": "string",
  "data": [
    {
      "id": "string",
      "title": "string",
      "description": "string",
      "refPath": "string",
      "toc": "string",
      "content": "string",
      "views": 0,
      "likes": 0,
      "comments": 0,
      "commentId": "string",
      "enable": true,
      "canDelete": true,
      "createdAt": "string",
      "updatedAt": "string"
    }
  ]
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|code|integer|false|none||none|
|msg|string|false|none||none|
|data|[[PageVO](#schemapagevo)]|false|none||none|

<h2 id="tocS_PostStatusToggle">PostStatusToggle</h2>

<a id="schemapoststatustoggle"></a>
<a id="schema_PostStatusToggle"></a>
<a id="tocSpoststatustoggle"></a>
<a id="tocspoststatustoggle"></a>

```json
{
  "isPublished": true,
  "isTop": true,
  "isHot": true,
  "isOriginal": true
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|isPublished|boolean|false|none||none|
|isTop|boolean|false|none||none|
|isHot|boolean|false|none||none|
|isOriginal|boolean|false|none||none|

<h2 id="tocS_{year=0, @required={year=false}, @class={year=int}, @comment={year=}}">{year=0, @required={year=false}, @class={year=int}, @comment={year=}}</h2>

<a id="schema{year=0, @required={year=false}, @class={year=int}, @comment={year=}}"></a>
<a id="schema_{year=0, @required={year=false}, @class={year=int}, @comment={year=}}"></a>
<a id="tocS{year=0, @required={year=false}, @class={year=int}, @comment={year=}}"></a>
<a id="tocs{year=0, @required={year=false}, @class={year=int}, @comment={year=}}"></a>

```json
{
  "articleCount": 0,
  "statusUpdateCount": 0,
  "articles": "new ArrayList<>()",
  "statusUpdates": "new ArrayList<>()"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|articleCount|integer|false|none||none|
|statusUpdateCount|integer|false|none||none|
|articles|[[ArchiveArticle](#schemaarchivearticle)]|false|none||none|
|statusUpdates|[[ArchiveStatusUpdate](#schemaarchivestatusupdate)]|false|none||none|

<h2 id="tocS_MapArchiveSummary">MapArchiveSummary</h2>

<a id="schemamaparchivesummary"></a>
<a id="schema_MapArchiveSummary"></a>
<a id="tocSmaparchivesummary"></a>
<a id="tocsmaparchivesummary"></a>

```json
{
  "{year=0, @required={year=false}, @class={year=int}, @comment={year=}}": {
    "articleCount": 0,
    "statusUpdateCount": 0,
    "articles": "new ArrayList<>()",
    "statusUpdates": "new ArrayList<>()"
  }
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|{year=0, @required={year=false}, @class={year=int}, @comment={year=}}|[{year=0, @required={year=false}, @class={year=int}, @comment={year=}}](#schema%7byear%3d0%2c%20%40required%3d%7byear%3dfalse%7d%2c%20%40class%3d%7byear%3dint%7d%2c%20%40comment%3d%7byear%3d%7d%7d)|false|none||none|

<h2 id="tocS_ApiResponseMapArchiveSummary">ApiResponseMapArchiveSummary</h2>

<a id="schemaapiresponsemaparchivesummary"></a>
<a id="schema_ApiResponseMapArchiveSummary"></a>
<a id="tocSapiresponsemaparchivesummary"></a>
<a id="tocsapiresponsemaparchivesummary"></a>

```json
{
  "code": 0,
  "msg": "string",
  "data": {
    "{year=0, @required={year=false}, @class={year=int}, @comment={year=}}": {
      "articleCount": 0,
      "statusUpdateCount": 0,
      "articles": "new ArrayList<>()",
      "statusUpdates": "new ArrayList<>()"
    }
  }
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|code|integer|false|none||none|
|msg|string|false|none||none|
|data|[MapArchiveSummary](#schemamaparchivesummary)|false|none||none|

<h2 id="tocS_ApiResponseListString">ApiResponseListString</h2>

<a id="schemaapiresponseliststring"></a>
<a id="schema_ApiResponseListString"></a>
<a id="tocSapiresponseliststring"></a>
<a id="tocsapiresponseliststring"></a>

```json
{
  "code": 0,
  "msg": "string",
  "data": [
    "string"
  ]
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|code|integer|false|none||none|
|msg|string|false|none||none|
|data|[string]|false|none||none|

<h2 id="tocS_ArticlePreview">ArticlePreview</h2>

<a id="schemaarticlepreview"></a>
<a id="schema_ArticlePreview"></a>
<a id="tocSarticlepreview"></a>
<a id="tocsarticlepreview"></a>

```json
{
  "id": "string",
  "title": "string",
  "shortUrl": "string",
  "authorName": "string",
  "summary": "string",
  "avatar": "string",
  "cover": "string",
  "views": 0,
  "categoryName": "string",
  "tags": "string",
  "likes": 0,
  "comments": 0,
  "isTop": true
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|string|false|none||none|
|title|string|false|none||文章标题|
|shortUrl|string|false|none||文章短链接|
|authorName|string|false|none||作者名字|
|summary|string|false|none||文章简介|
|avatar|string|false|none||作者头像|
|cover|string|false|none||文章封面|
|views|integer|false|none||文章浏览量|
|categoryName|string|false|none||文章分类名称|
|tags|string|false|none||文章标签|
|likes|integer|false|none||文章点赞量|
|comments|integer|false|none||文章评论量|
|isTop|boolean|false|none||是否置顶|

<h2 id="tocS_ApiResponseListArticlePreview">ApiResponseListArticlePreview</h2>

<a id="schemaapiresponselistarticlepreview"></a>
<a id="schema_ApiResponseListArticlePreview"></a>
<a id="tocSapiresponselistarticlepreview"></a>
<a id="tocsapiresponselistarticlepreview"></a>

```json
{
  "code": 0,
  "msg": "string",
  "data": [
    {
      "id": "string",
      "title": "string",
      "shortUrl": "string",
      "authorName": "string",
      "summary": "string",
      "avatar": "string",
      "cover": "string",
      "views": 0,
      "categoryName": "string",
      "tags": "string",
      "likes": 0,
      "comments": 0,
      "isTop": true
    }
  ]
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|code|integer|false|none||none|
|msg|string|false|none||none|
|data|[[ArticlePreview](#schemaarticlepreview)]|false|none||none|

<h2 id="tocS_ArticleView">ArticleView</h2>

<a id="schemaarticleview"></a>
<a id="schema_ArticleView"></a>
<a id="tocSarticleview"></a>
<a id="tocsarticleview"></a>

```json
{
  "shortUrl": "string",
  "title": "string",
  "content": "string",
  "summary": "string",
  "toc": "string",
  "authorName": "string",
  "cover": "string",
  "categoryName": "string",
  "tags": "string",
  "views": 0,
  "likes": 0,
  "comments": 0,
  "commentId": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|shortUrl|string|false|none||文章短链接|
|title|string|false|none||文章标题|
|content|string|false|none||文章内容，markdown 格式，交由前端解析|
|summary|string|false|none||文章摘要|
|toc|string|false|none||文章目录|
|authorName|string|false|none||作者名字|
|cover|string|false|none||文章封面|
|categoryName|string|false|none||文章分类名称|
|tags|string|false|none||文章标签|
|views|integer|false|none||文章浏览量|
|likes|integer|false|none||文章点赞量|
|comments|integer|false|none||文章评论量|
|commentId|string|false|none||挂载评论区id|

<h2 id="tocS_ApiResponseArticleView">ApiResponseArticleView</h2>

<a id="schemaapiresponsearticleview"></a>
<a id="schema_ApiResponseArticleView"></a>
<a id="tocSapiresponsearticleview"></a>
<a id="tocsapiresponsearticleview"></a>

```json
{
  "code": 0,
  "msg": "string",
  "data": {
    "shortUrl": "string",
    "title": "string",
    "content": "string",
    "summary": "string",
    "toc": "string",
    "authorName": "string",
    "cover": "string",
    "categoryName": "string",
    "tags": "string",
    "views": 0,
    "likes": 0,
    "comments": 0,
    "commentId": "string"
  }
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|code|integer|false|none||none|
|msg|string|false|none||none|
|data|[ArticleView](#schemaarticleview)|false|none||none|

<h2 id="tocS_CommentVO">CommentVO</h2>

<a id="schemacommentvo"></a>
<a id="schema_CommentVO"></a>
<a id="tocScommentvo"></a>
<a id="tocscommentvo"></a>

```json
{
  "id": "string",
  "areaId": "string",
  "content": "string",
  "avatarUrl": "string",
  "userName": "string",
  "location": "string",
  "website": "string",
  "platform": "string",
  "browser": "string",
  "createdAt": "string",
  "updatedAt": "string",
  "parentId": "string",
  "parentUserName": "string",
  "children": "new ArrayList<>()"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|string|false|none||none|
|areaId|string|false|none||评论区 id|
|content|string|false|none||评论内容（markdown 格式）|
|avatarUrl|string|false|none||评论者头像|
|userName|string|false|none||评论者昵称|
|location|string|false|none||评论者归属地|
|website|string|false|none||评论者网站|
|platform|string|false|none||评论者操作系统|
|browser|string|false|none||评论者浏览器|
|createdAt|string|false|none||评论创建时间|
|updatedAt|string|false|none||评论更新时间|
|parentId|string|false|none||none|
|parentUserName|string|false|none||none|
|children|[[CommentVO](#schemacommentvo)]|false|none||查看时候存储子评论，而存储时候存储父评论 id|

<h2 id="tocS_HighlightedPageDocument">HighlightedPageDocument</h2>

<a id="schemahighlightedpagedocument"></a>
<a id="schema_HighlightedPageDocument"></a>
<a id="tocShighlightedpagedocument"></a>
<a id="tocshighlightedpagedocument"></a>

```json
{
  "id": 0,
  "title": "string",
  "description": "string",
  "content": "string",
  "shortUrl": "string",
  "highlightedContent": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|integer|false|none||none|
|title|string|false|none||none|
|description|string|false|none||none|
|content|string|false|none||none|
|shortUrl|string|false|none||none|
|highlightedContent|string|false|none||none|

<h2 id="tocS_ApiResponseListCommentVO">ApiResponseListCommentVO</h2>

<a id="schemaapiresponselistcommentvo"></a>
<a id="schema_ApiResponseListCommentVO"></a>
<a id="tocSapiresponselistcommentvo"></a>
<a id="tocsapiresponselistcommentvo"></a>

```json
{
  "code": 0,
  "msg": "string",
  "data": [
    {
      "id": "string",
      "areaId": "string",
      "content": "string",
      "avatarUrl": "string",
      "userName": "string",
      "location": "string",
      "website": "string",
      "platform": "string",
      "browser": "string",
      "createdAt": "string",
      "updatedAt": "string",
      "parentId": "string",
      "parentUserName": "string",
      "children": "new ArrayList<>()"
    }
  ]
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|code|integer|false|none||none|
|msg|string|false|none||none|
|data|[[CommentVO](#schemacommentvo)]|false|none||none|

<h2 id="tocS_HighlightedArticleDocument">HighlightedArticleDocument</h2>

<a id="schemahighlightedarticledocument"></a>
<a id="schema_HighlightedArticleDocument"></a>
<a id="tocShighlightedarticledocument"></a>
<a id="tocshighlightedarticledocument"></a>

```json
{
  "id": 0,
  "title": "string",
  "summary": "string",
  "content": "string",
  "shortUrl": "string",
  "highlightedContent": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|integer|false|none||none|
|title|string|false|none||none|
|summary|string|false|none||none|
|content|string|false|none||none|
|shortUrl|string|false|none||none|
|highlightedContent|string|false|none||none|

<h2 id="tocS_ApiResponseCommentVO">ApiResponseCommentVO</h2>

<a id="schemaapiresponsecommentvo"></a>
<a id="schema_ApiResponseCommentVO"></a>
<a id="tocSapiresponsecommentvo"></a>
<a id="tocsapiresponsecommentvo"></a>

```json
{
  "code": 0,
  "msg": "string",
  "data": {
    "id": "string",
    "areaId": "string",
    "content": "string",
    "avatarUrl": "string",
    "userName": "string",
    "location": "string",
    "website": "string",
    "platform": "string",
    "browser": "string",
    "createdAt": "string",
    "updatedAt": "string",
    "parentId": "string",
    "parentUserName": "string",
    "children": "new ArrayList<>()"
  }
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|code|integer|false|none||none|
|msg|string|false|none||none|
|data|[CommentVO](#schemacommentvo)|false|none||none|

<h2 id="tocS_HighlightedMomentDocument">HighlightedMomentDocument</h2>

<a id="schemahighlightedmomentdocument"></a>
<a id="schema_HighlightedMomentDocument"></a>
<a id="tocShighlightedmomentdocument"></a>
<a id="tocshighlightedmomentdocument"></a>

```json
{
  "id": 0,
  "title": "string",
  "summary": "string",
  "content": "string",
  "shortUrl": "string",
  "highlightedContent": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|integer|false|none||none|
|title|string|false|none||none|
|summary|string|false|none||none|
|content|string|false|none||none|
|shortUrl|string|false|none||none|
|highlightedContent|string|false|none||none|

<h2 id="tocS_CommentNotLoginForm">CommentNotLoginForm</h2>

<a id="schemacommentnotloginform"></a>
<a id="schema_CommentNotLoginForm"></a>
<a id="tocScommentnotloginform"></a>
<a id="tocscommentnotloginform"></a>

```json
{
  "areaId": "string",
  "content": "string",
  "userName": "string",
  "email": "string",
  "website": "string",
  "parentId": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|areaId|string|false|none||评论区 id|
|content|string|false|none||评论内容（markdown格式）|
|userName|string|false|none||评论者昵称|
|email|string|false|none||评论者邮箱|
|website|string|false|none||评论者网站|
|parentId|string|false|none||父评论ID，如果为空则表示是顶级评论，否则是回复评论|

<h2 id="tocS_AggregatedSearchResult">AggregatedSearchResult</h2>

<a id="schemaaggregatedsearchresult"></a>
<a id="schema_AggregatedSearchResult"></a>
<a id="tocSaggregatedsearchresult"></a>
<a id="tocsaggregatedsearchresult"></a>

```json
{
  "pages": [
    {
      "id": 0,
      "title": "string",
      "description": "string",
      "content": "string",
      "shortUrl": "string",
      "highlightedContent": "string"
    }
  ],
  "articles": [
    {
      "id": 0,
      "title": "string",
      "summary": "string",
      "content": "string",
      "shortUrl": "string",
      "highlightedContent": "string"
    }
  ],
  "moments": [
    {
      "id": 0,
      "title": "string",
      "summary": "string",
      "content": "string",
      "shortUrl": "string",
      "highlightedContent": "string"
    }
  ]
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|pages|[[HighlightedPageDocument](#schemahighlightedpagedocument)]|false|none||none|
|articles|[[HighlightedArticleDocument](#schemahighlightedarticledocument)]|false|none||none|
|moments|[[HighlightedMomentDocument](#schemahighlightedmomentdocument)]|false|none||none|

<h2 id="tocS_NavMenuVO">NavMenuVO</h2>

<a id="schemanavmenuvo"></a>
<a id="schema_NavMenuVO"></a>
<a id="tocSnavmenuvo"></a>
<a id="tocsnavmenuvo"></a>

```json
{
  "name": "string",
  "isArticle": true,
  "href": "string",
  "children": [
    {
      "name": "string",
      "isArticle": true,
      "href": "string",
      "children": [
        {
          "name": "string",
          "isArticle": true,
          "href": "string",
          "children": [
            {}
          ]
        }
      ]
    }
  ]
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|name|string|false|none||none|
|isArticle|boolean|false|none||none|
|href|string|false|none||none|
|children|[[NavMenuVO](#schemanavmenuvo)]|false|none||none|

<h2 id="tocS_ApiResponseAggregatedSearchResult">ApiResponseAggregatedSearchResult</h2>

<a id="schemaapiresponseaggregatedsearchresult"></a>
<a id="schema_ApiResponseAggregatedSearchResult"></a>
<a id="tocSapiresponseaggregatedsearchresult"></a>
<a id="tocsapiresponseaggregatedsearchresult"></a>

```json
{
  "code": 0,
  "msg": "string",
  "data": {
    "pages": [
      {
        "id": 0,
        "title": "string",
        "description": "string",
        "content": "string",
        "shortUrl": "string",
        "highlightedContent": "string"
      }
    ],
    "articles": [
      {
        "id": 0,
        "title": "string",
        "summary": "string",
        "content": "string",
        "shortUrl": "string",
        "highlightedContent": "string"
      }
    ],
    "moments": [
      {
        "id": 0,
        "title": "string",
        "summary": "string",
        "content": "string",
        "shortUrl": "string",
        "highlightedContent": "string"
      }
    ]
  }
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|code|integer|false|none||none|
|msg|string|false|none||none|
|data|[AggregatedSearchResult](#schemaaggregatedsearchresult)|false|none||none|

<h2 id="tocS_ApiResponseListNavMenuVO">ApiResponseListNavMenuVO</h2>

<a id="schemaapiresponselistnavmenuvo"></a>
<a id="schema_ApiResponseListNavMenuVO"></a>
<a id="tocSapiresponselistnavmenuvo"></a>
<a id="tocsapiresponselistnavmenuvo"></a>

```json
{
  "code": 0,
  "msg": "string",
  "data": [
    {
      "name": "string",
      "isArticle": true,
      "href": "string",
      "children": [
        {
          "name": "string",
          "isArticle": true,
          "href": "string",
          "children": [
            {}
          ]
        }
      ]
    }
  ]
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|code|integer|false|none||none|
|msg|string|false|none||none|
|data|[[NavMenuVO](#schemanavmenuvo)]|false|none||none|

<h2 id="tocS_StatusUpdatePreview">StatusUpdatePreview</h2>

<a id="schemastatusupdatepreview"></a>
<a id="schema_StatusUpdatePreview"></a>
<a id="tocSstatusupdatepreview"></a>
<a id="tocsstatusupdatepreview"></a>

```json
{
  "shortUrl": "string",
  "authorName": "string",
  "authorAvatar": "string",
  "images": [
    "string"
  ],
  "title": "string",
  "summary": "string",
  "views": 0,
  "comments": 0,
  "likes": 0,
  "isTop": true,
  "isHot": true,
  "createdAt": "string",
  "updatedAt": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|shortUrl|string|false|none||说说短链接|
|authorName|string|false|none||作者名字|
|authorAvatar|string|false|none||作者头像|
|images|[string]|false|none||图片|
|title|string|false|none||说说标题|
|summary|string|false|none||说说摘要|
|views|integer|false|none||查看次数|
|comments|integer|false|none||评论次数|
|likes|integer|false|none||点赞次数|
|isTop|boolean|false|none||是否置顶|
|isHot|boolean|false|none||是否热门|
|createdAt|string|false|none||说说创建时间|
|updatedAt|string|false|none||说说更新时间|

<h2 id="tocS_ApiResponseStatusUpdatePreview">ApiResponseStatusUpdatePreview</h2>

<a id="schemaapiresponsestatusupdatepreview"></a>
<a id="schema_ApiResponseStatusUpdatePreview"></a>
<a id="tocSapiresponsestatusupdatepreview"></a>
<a id="tocsapiresponsestatusupdatepreview"></a>

```json
{
  "code": 0,
  "msg": "string",
  "data": {
    "shortUrl": "string",
    "authorName": "string",
    "authorAvatar": "string",
    "images": [
      "string"
    ],
    "title": "string",
    "summary": "string",
    "views": 0,
    "comments": 0,
    "likes": 0,
    "isTop": true,
    "isHot": true,
    "createdAt": "string",
    "updatedAt": "string"
  }
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|code|integer|false|none||none|
|msg|string|false|none||none|
|data|[StatusUpdatePreview](#schemastatusupdatepreview)|false|none||none|

<h2 id="tocS_ApiResponseListStatusUpdatePreview">ApiResponseListStatusUpdatePreview</h2>

<a id="schemaapiresponseliststatusupdatepreview"></a>
<a id="schema_ApiResponseListStatusUpdatePreview"></a>
<a id="tocSapiresponseliststatusupdatepreview"></a>
<a id="tocsapiresponseliststatusupdatepreview"></a>

```json
{
  "code": 0,
  "msg": "string",
  "data": [
    {
      "shortUrl": "string",
      "authorName": "string",
      "authorAvatar": "string",
      "images": [
        "string"
      ],
      "title": "string",
      "summary": "string",
      "views": 0,
      "comments": 0,
      "likes": 0,
      "isTop": true,
      "isHot": true,
      "createdAt": "string",
      "updatedAt": "string"
    }
  ]
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|code|integer|false|none||none|
|msg|string|false|none||none|
|data|[[StatusUpdatePreview](#schemastatusupdatepreview)]|false|none||none|

<h2 id="tocS_CommentLoginForm">CommentLoginForm</h2>

<a id="schemacommentloginform"></a>
<a id="schema_CommentLoginForm"></a>
<a id="tocScommentloginform"></a>
<a id="tocscommentloginform"></a>

```json
{
  "areaId": "string",
  "content": "string",
  "parentId": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|areaId|string|false|none||评论区 id|
|content|string|false|none||评论内容（markdown 格式）|
|parentId|string|false|none||父评论 ID，如果为空则表示是顶级评论，否则是回复评论|

<h2 id="tocS_key">key</h2>

<a id="schemakey"></a>
<a id="schema_key"></a>
<a id="tocSkey"></a>
<a id="tocskey"></a>

```json
{}

```

### 属性

*None*

<h2 id="tocS_MapObject">MapObject</h2>

<a id="schemamapobject"></a>
<a id="schema_MapObject"></a>
<a id="tocSmapobject"></a>
<a id="tocsmapobject"></a>

```json
{
  "key": {}
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|key|[key](#schemakey)|false|none||none|

<h2 id="tocS_ApiResponseListMapObject">ApiResponseListMapObject</h2>

<a id="schemaapiresponselistmapobject"></a>
<a id="schema_ApiResponseListMapObject"></a>
<a id="tocSapiresponselistmapobject"></a>
<a id="tocsapiresponselistmapobject"></a>

```json
{
  "code": 0,
  "msg": "string",
  "data": [
    {
      "key": {}
    }
  ]
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|code|integer|false|none||none|
|msg|string|false|none||none|
|data|[[MapObject](#schemamapobject)]|false|none||none|

<h2 id="tocS_ApiResponseMapString">ApiResponseMapString</h2>

<a id="schemaapiresponsemapstring"></a>
<a id="schema_ApiResponseMapString"></a>
<a id="tocSapiresponsemapstring"></a>
<a id="tocsapiresponsemapstring"></a>

```json
{
  "code": 0,
  "msg": "string",
  "data": {
    "key": "string"
  }
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|code|integer|false|none||none|
|msg|string|false|none||none|
|data|[MapString](#schemamapstring)|false|none||none|


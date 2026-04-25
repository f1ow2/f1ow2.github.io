---
title: "Cross-site request forgery"
draft: true
sidebar: false
outline: 2
---

# CSRF

[Cross-site request forgery](../common.md#csrf) 简称为“**CSRF**”，在CSRF的攻击场景中攻击者会伪造一个请求（这个请求一般是一个链接），然后欺骗目标用户进行点击，用户一旦点击了这个请求，整个攻击就完成了。所以CSRF攻击也成为"one click"攻击。 很多人搞不清楚CSRF的概念，甚至有时候会将其和XSS混淆,更有甚者会将其和越权问题混为一谈,这都是对原理没搞清楚导致的。
这里列举一个场景解释一下，希望能够帮助你理解。

## 同源策略

[SOP](../common.md#sop)(Same-origin policy) 浏览器的一项安全机制，限制一个源的文档或脚本如何与另一个源的资源进行交互。

<span style="font-size: 23px;">**什么是源**</span>

由三个部分组成

    - 协议(protocol)
    - 域名(host)
    - 端口(port)

![Same-origin policy](<assets/Same-origin policy.png>)

<span style="font-size: 23px;">**同源策略作用**</span>

核心作用

- 阻止跨域读取数据
- 限制 AJAX/Fetch 响应内容访问
- 限制 DOM/Cookie 跨域访问(仅限读取)

示例代码

```javascript
fetch('htpp://another-site.com/api/data')
    .then(res => res.json())
    .catch(err => console.log('跨域请求被阻止:', err));
```

浏览器错误提示

```bash
Access to fetch at 'htpp://another-site.com/api/data'
from origin 'http://mysite.com'
has been blocked by CORS policy
```
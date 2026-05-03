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

[同源策略与跨域访问](../web/HTTPProtocol.md#同源策略与跨域访问)


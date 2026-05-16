---
title: "TLS/SSL Protocol"
quote: geektime-webprotocol
categories:
  - 技术
  - 教程
tags: [web, TLS/SSL]
sidebar: false
outline: deep
---

# TLS/SSL Protocol

## intro

<span style="font-size: 23px;">**TLS/SSL 发展**</span>

![TLS_SSL发展](assets/TLS_SSL发展.png)

<span style="font-size: 19px;">**TLS 设计目的**</span>

- 身份验证
- 保密性
- 完整性

<span style="font-size: 19px;">**TLS 协议**</span>

- Record 记录协议
  - 对称加密
- Handshake 握手协议
  - 验证通讯双方的身份
  - 交换加解密的安全套件
  - 协商加密参数

<span style="font-size: 19px;">**TLS 安全密码套件解读**</span>

![TLS安全密码套件解读](assets/TLS安全密码套件解读.png)
---
title: "SSRF"
draft: true
sidebar: false
outline: deep
---

# SSRF

[SSRF](../webapp/ServerSideAttacks#ssrf) (**Server-Side Request Forgery**)是一种 Web 安全漏洞，攻击者可以诱导服务端应用向攻击者指定的目标发起请求。本质上是"借服务器的手"去访问它本不该访问、或攻击者自己无法直接访问的资源。

**常见的 SSRF 关键字**

寻找 SSRF 漏洞时，可以尝试从以下 URL 参数关键字中寻找：

```text
share
wap
url
link
src
source
target
u
3g
display
sourceURl
imageURL
domain
...

```
## 常见绕过

当 `127` 被过滤时，可以尝试以下几种绕过方式：

1. 利用 `@` 符号

利用 URL 中的 `@` 解析特性：

```http
http://abc@127.0.0.1

```
2. 添加端口号

显式指定端口（如 8080）：

```http
http://127.0.0.1:8080

```
3. 短地址

使用短链接服务进行重定向绕过：

```http
http://dwz.cn/11SMa

```
4. 利用泛域名解析服务（如 xip.io）

利用指向任意 IP 的域名进行解析绕过：

```text
10.0.0.1.xip.io -> 10.0.0.1
www.10.0.0.1.xip.io -> 10.0.0.1
mysite.10.0.0.1.xip.io -> 10.0.0.1
foo.bar.10.0.0.1.xip.io -> 10.0.0.1

```
5. IP 地址进制转换访问

当程序中限制了我们使用localhost和`127.0.0.1`时，便可以利用进制转换来绕过

```http
http://0x7F.0.0.1	//16进制
http://0177.0.0.1	//8进制
http://2130706433	//10进制整数格式
http://0x7F000001	////16进制整数格式
http://127.1	//省略模式
http://127.127.127.127	//用CIDR绕过localhost
http://0	//特殊地址0
http://0.0.0.0
http://[::1]	//ipv6回环地址
```
## 302跳转

```html
header("Location:http://127.0.0.1/flag.txt");
```
```html
Payload：url=http://safe.taobao.com/ctf/ssrf/flag.php
```

## DNS Rebinding

**[DNS 重绑定](../cyber/web.md#dns-rebinding)核心原理**

在许多 SSRF 防护逻辑中，服务端会对用户传入的 URL 或域名进行检测，其常见流程如下：

①. **检查阶段（Check）**：服务端接收域名，对其进行 DNS 解析，获取对应的 IP 地址。校验该 IP 是否为公网 IP（排除 `127.0.0.1`、`10.0.0.0/8`、`192.168.0.0/16` 等内网及保留地址）。

②. **利用阶段（Use）**：校验通过后，服务端使用 HTTP 客户端发起请求（如 `fetch(url)` 或 `HttpClient.get(url)`）。

**DNS 重绑定利用的是 DNS 解析结果的变化性（TOCTOU 检查与使用时差问题）：**

- 攻击者配置一个自定义 DNS 服务器，使其对目标域名的解析返回两个不同结果，或者设置极短的 TTL（生存时间，例如 0 秒）。
- **第一次解析（检查阶段）**：DNS 服务器返回一个合法的**公网 IP**，服务端校验顺利通过。
- **第二次解析（利用阶段）**：由于 TTL 已经过期，HTTP 客户端发起请求时会重新发起 DNS 查询，此时 DNS 服务器返回一个**内网 IP**（如 `127.0.0.1`），导致服务端最终请求到了内网敏感服务。

---

## Gopher协议

Gopher 协议 是一种诞生于 1991 年（早于 HTTP 协议普及）的互联网文件分发与检索协议。在现代 Web 应用中，它几乎已经被 HTTP/HTTPS 完全替代，但在 **网络安全（特别是 SSRF 漏洞利用）** 领域，它扮演着极其重要的角色。

<span style="font-size: 19px;">**Gopher 协议的核心特点**</span>

* **默认端口**：`70`
* **无额外报文头**：HTTP 协议发包时会自动带上 `GET / HTTP/1.1\r\nHost: ...` 等固定请求头，而 **Gopher 协议只传输你指定的内容，不会附加任何额外的头部信息或格式**。
* **自定义 TCP 数据包**：由于它只负责透传原始数据，攻击者可以使用它向目标内网的任意 TCP 服务发送**符合该服务特定协议的任意数据包**。

<span style="font-size: 19px;">**URL 格式规范**</span>

Gopher 协议的标准 URL 格式为：

```text
gopher://<host>:<port>/<type><selector>
```

在安全利用（SSRF）场景中，通常简化为：

```text
gopher://<host>:<port>/_<payload>
```

> [!NOTE]
> **关于路径开头的下划线 `_`**：在很多客户端（如 cURL）解析 Gopher URL 时，会默认吃掉/忽略路径后的第一个字符。因此约定俗成在 Payload 最前面放置一个 `_` 作为填充字符。

<span style="font-size: 19px;">**在 Web 安全中的核心应用：SSRF“万金油”**</span>

当目标 Web 服务器存在 **SSRF（服务端请求伪造）漏洞** 且支持 Gopher 协议（例如 PHP cURL 组件）时，攻击者可以利用 Gopher 协议伪造内网各种未授权 TCP 服务的通信数据包，实现内网渗透：

<span style="font-size: 19px;">**常见利用场景**</span>

1. **攻击内网 Redis**：
   * 构造 Redis RESP 协议命令。
   * 效果：写 WebShell、写 SSH 公钥、写 Crontab 计划任务（实现远程代码执行 RCE）。
2. **攻击内网 FastCGI (PHP-FPM)**：
   * 构造 FastCGI 二进制协议数据包。
   * 效果：绕过限制，直接执行任意 PHP 代码。
3. **攻击内网未授权 MySQL / Memcached / SMTP**：
   * 构造 MySQL 认证/查询报文、SMTP 发信报文等。
   * 效果：未授权查库、发送恶意钓鱼邮件等。

<span style="font-size: 19px;">**Gopher Payload 的构造规则**</span>

因为很多服务（如 Redis、HTTP 等）通过换行符 `\r\n` 作为命令分隔符，因此在构造 Gopher Payload 时需要进行 **URL 编码**：

| 原字符 | URL 编码 |
| :--- | :--- |
| `\r` (CR) | `%0d` |
| `\n` (LF) | `%0a` |
| `\r\n` | `%0d%0a` |
| 空格 | `%20` |

<span style="font-size: 19px;">**示例：利用 Gopher 发送 HTTP POST 请求**</span>

如果你想通过 Gopher 伪造一个向 `127.0.0.1:8080/login.php` 发送的 POST 请求：

1. **原始 HTTP 请求**：
   ```http
   POST /login.php HTTP/1.1
   Host: 127.0.0.1:8080
   Content-Type: application/x-www-form-urlencoded
   Content-Length: 13

   user=admin&pass=123
   ```

2. **Gopher URL（换行符替换为 `%0d%0a`）**：
   ```text
   gopher://127.0.0.1:8080/_POST%20/login.php%20HTTP/1.1%0d%0aHost:%20127.0.0.1:8080%0d%0aContent-Type:%20application/x-www-form-urlencoded%0d%0aContent-Length:%2013%0d%0a%0d%0auser=admin&pass=123%0d%0a
   ```
<span style="font-size: 19px;">**防御方案**</span>

1. **禁用危险协议**：限制 cURL 等 HTTP 客户端仅支持 `http` / `https` 协议，禁用 `gopher://`、`dict://`、`file://` 等危险协议。
2. **限制内网访问**：建立严格的内网防火墙策略，禁止 Web 服务器直接访问内网敏感服务端口（如 6379、9000 等）。
3. **加强内网鉴权**：内网服务（如 Redis、Memcached）必须开启强密码认证，避免未授权访问。
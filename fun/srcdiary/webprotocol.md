---
title: "Web Protocol"
quote: geektime-webprotocol
categories:
  - 技术
  - 教程
tags: [web, protocol, capture package]
sidebar: false
outline: deep
---

# Web Protocol

## HTTP1

**Hypertext Transfer Protocol** (HTTP) is the protocol that specifies how a web browser and a web server communicate. a **stateless** application-level **request/response** protocol that uses **extensible semantics** and **self-descriptive** message payloads for flexible interaction with network-based **hypertext information** systems (RFC7230 2014.6)

![http request flow](<assets/http request flow.png>)

[HTTP in Detail](../cyber/web.md#http-in-detail)

[HTTP](../cyber/networkpro.md#http)

[TLS/HTTPS](../cyber/networkpro.md#tls)

![http protocol format](<assets/http protocol format.png>)

[HTTP Message](../cyber/WebApplication.md#http-messages)

<span style="font-size: 23px;">**ABNF （扩充巴科斯-瑙尔范式）操作符**</span>

- **空白字符：用来分隔定义中的各个元素**
  - method SP request-target SP HTTP-version CRLF
- **选择 `/`：表示多个规则都是可供选择的规则**
  - start-line = request-line / status-line 
- **值范围 `%c##-##`:**
  - `OCTAL = "0" / "1" / "2" / "3" / "4" / "5" / "6" / "7"` 与 `OCTAL = %x30-37` 等价
- **序列组合 `()`：将规则组合起来，视为单个元素**
- **不定量重复 `m*n`:**
  - `*` 元素表示零个或更多元素： *( header-field CRLF ) 
  - `1*` 元素表示一个或更多元素，`2*4` 元素表示两个至四个元素
- **可选序列 `[]`:**
  - [ message-body ]

<span style="font-size: 23px;">**ABNF （扩充巴科斯-瑙尔范式）核心规则**</span>

| 规则   | 形式定义                         | 意义                                       |
| ------ | -------------------------------- | ------------------------------------------ |
| ALPHA  | %x41-5A / %x61-7A                | 大写和小写ASCII字母（A-Z, a-z）            |
| DIGIT  | %x30-39                          | 数字（0-9）                                |
| HEXDIG | DIGIT / "A" / "B" / "C" / "D" / "E" / "F" | 十六进制数字（0-9, A-F, a-f）              |
| DQUOTE | %x22                             | 双引号                                     |
| SP     | %x20                             | 空格                                       |
| HTAB   | %x09                             | 横向制表符                                 |
| WSP    | SP / HTAB                        | 空格或横向制表符                           |
| LWSP   | *(WSP / CRLF WSP)                | 直线空白（晚于换行）                       |
| VCHAR  | %x21-7E                          | 可见（打印）字符                           |
| CHAR   | %x01-7F                          | 任何7-位US-ASCII字符，不包括NUL（%x00）    |
| OCTET  | %x00-FF                          | 8位数据                                    |
| CTL    | %x00-1F / %x7F                   | 控制字符                                   |
| CR     | %x0D                             | 回车                                       |
| LF     | %x0A                             | 换行                                       |
| CRLF   | CR LF                            | 互联网标准换行                             |
| BIT    | "0" / "1"                        | 二进制数字                                 |


![ABNF_HTTP](assets/ABNF_HTTP.png)

---

<span style="font-size: 23px;">**OSI Model&TCP/IP Model**</span>

[OSI](../cyber/network.md#osi)

[OSI Model&TCP/IP Model](../cyber/networkpro.md#tcpip-model)

---

<span style="font-size: 23px;">**报文头部**</span>

![报文头部](assets/报文头部.png)

---

### 浏览器抓包

<span style="font-size: 23px;">**过滤器Filter**</span>

**按类型**

- XHR、JS、CSS、Img、Media、Font、Doc、WS (WebSocket)、Manifest 或 Other(此处未列出的任何其他类型)
- 多类型，按住 Command (Mac) 或 Ctrl（Windows、Linux）
- 按时间过滤：概览面板，拖动滚动条
- 隐藏 Data URLs：CSS 图片等小文件以 BASE64 格式嵌入 HTML 中，以减少 HTTP 请求数

**属性过滤**

- **domain**：仅显示来自指定域的资源。 您可以使用通配符字符 (*) 纳入多个域
- **has-response-header**：显示包含指定 HTTP 响应标头的资源
- **is**：使用 **is:running** 可以查找 WebSocket 资源，**is:from-cache** 可查找缓存读出的资源
- **larger-than**： 显示大于指定大小的资源（以字节为单位）。 将值设为 1000 等同于设置为1k
- **method**：显示通过指定 HTTP 方法类型检索的资源
- **mime-type**：显示指定 MIME 类型的资源

- **mixed-content**：显示所有混合内容资源 (mixed-content:all)，或者仅显示当前显示的资源 (mixed-content:displayed)。
- **scheme**：显示通过未保护 HTTP (scheme:http) 或受保护 HTTPS (scheme:https) 检索的资
源。
- **set-cookie-domain**：显示具有 Set-Cookie 标头并且 Domain 属性与指定值匹配的资源。 
- **set-cookie-name**：显示具有 Set-Cookie 标头并且名称与指定值匹配的资源。 
- **set-cookie-value**：显示具有 Set-Cookie 标头并且值与指定值匹配的资源。 
- **status-code**：仅显示 HTTP 状态代码与指定代码匹配的资源。

---

### URL

[Uniform Resource Locator](../cyber/WebApplication.md#uniform-resource-locator)

- **URL**：RFC1738 （1994.12），**Uniform Resource Locator**，表示资源的位置，期望提供查找资源的方法
- **URN**：RFC2141 （1997.5），**Uniform Resource Name**，期望为资源提供持久的、位置无关的标识方式，并允许简单地将多个命名空间映射到单个URN命名空间
  - 例如磁力链接 magnet:?xt=urn:sha1:YNCKHTQC5C
- **URI**：RFC1630 （1994.6）、RFC3986 （2005.1，取代 RFC2396 和 RFC2732 ），**Uniform Resource Identifier**，用以区分资源，是 URL 和 URN 的超集，用以取代 URL 和 URN 概念

---

- **Resource 资源**
  - 可以是图片、文档、今天的天气等，也可以是不能通过互联网访问的实体，例如人、公司、实体书，也可以是抽象的概念，例如亲属关系或者数字符号
  - 一个资源可以有多个 URI
- **Identifier 标识符**
  - 将当前资源与其他资源区分开的名称
- **Uniform 统一**
  - 允许不同种类的资源在同一上下文中出现
  - 对不同种类的资源标识符可以使用同一种语义进行解读
  - 引入新标识符时，不会对已有标识符产生影响
  - 允许同一资源标识符在不同的、internet 规模下的上下文中出现

**合法的 URI**

- ftp://ftp.is.co.za/rfc/rfc1808.txt 
- http://www.ietf.org/rfc/rfc2396.txt 
- ldap://[2001:db8::7]/c=GB?objectClass?one 
- mailto:John.Doe@example.com 
- news:comp.infosystems.www.servers.unix tel:+1-816-555-1212 
- telnet://192.0.2.16:80/ 
- urn:oasis:names:specification:docbook:dtd:xml:4.1.2

<span style="font-size: 23px;">**URI 格式**</span>

`http://user:password@f1ow2.com:80/view-room?id=1#task3`

`URI = scheme ":" hier-part [ "?" query ] [ "#" fragment ] `

- `scheme` = ALPHA *( ALPHA / DIGIT / "+" / "-" / "." ) 
  - 例如：http, https, ftp,mailto,rtsp,file,telnet
- `query` = *( pchar / "/" / "?" )
- `fragment` = *( pchar / "/" / "?" )

**hier-part**

`hier-part = "//" authority path`
  - `authority = [ userinfo "@" ] host [ ":" port ]` 
    - userinfo = *( unreserved / pct-encoded / sub-delims / ":" )
    - host = IP-literal / IPv4address / reg-name
    - port = *DIGIT

  - `path = path-abempty/ path-absolute/ path-noscheme / path-rootless / path-empty`
    - path-abempty = *( "/" segment )          
      - 以/开头的路径或者空路径
    - path-absolute = "/" [ segment-nz *( "/" segment ) ]  
      - 以/开头的路径，但不能以//开头
    - path-noscheme = segment-nz-nc *( "/" segment ) 
      - 以非:号开头的路径
    - path-rootless = segment-nz *( "/" segment ) 
      - 相对path-noscheme，增加允许以:号开头的路径
    - path-empty = `0<pchar>`
      - 空路径

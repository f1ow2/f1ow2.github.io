---
title: "docker"
draft: true
sidebar: false
outline: 2
---


# docker

## useful command

**查看核心错误日志**
```bash
sudo journalctl -u docker.service -n 50 --no-pager
```
**指定官方注册表**
```bash
docker pull docker.io/library/ubuntu:latest
```

**后台执行**

```bash
docker exec -it <容器ID或名称> /bin/bash
```

**其它**
```bash
# 重新加载配置
sudo systemctl daemon-reload
```
## docker-compose


`docker compose.yaml`

```bash
# 部署
docker compose up -d

# 更新
docker compose down  #停止容器
docker compose pull  #拉取新的docker镜像
docker compose up -d  #启动容器
docker image prune  #删除旧的镜像文件

# 卸载
docker compose down

# 停止
docker compose stop

# 重启
docker compose restart
```
---

## 配置加速镜像

`/etc/docker/daemon.json`

[DockerHub 国内加速镜像列表](https://github.com/dongyubin/DockerHub?tab=readme-ov-file)

```json
{
    "registry-mirrors": [
        "https://docker.1ms.run",
        "https://proxy.vvvv.ee"
    ]
}
```

**重启 Docker 生效**
```bash
sudo systemctl daemon-reload
```

```bash
sudo systemctl restart docker
```

**验证是否生效**
```bash
docker info | grep -A 3 "Registry Mirrors"
```

## 代理设置

1. 编辑或创建 Docker 配置文件：
```bash
sudo mkdir -p /etc/systemd/system/docker.service.d
sudo nano /etc/systemd/system/docker.service.d/http-proxy.conf

```
2. 写入你的本地代理地址（请将 `127.0.0.1:7890` 替换为你实际的代理端口）：
```ini
[Service]
Environment="HTTP_PROXY=http://127.0.0.1:7890"
Environment="HTTPS_PROXY=http://127.0.0.1:7890"

```
3. 重载配置并重启 Docker：
```bash
sudo systemctl daemon-reload
sudo systemctl restart docker

```



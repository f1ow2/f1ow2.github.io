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
**使用代理拉取**
```bash
HTTP_PROXY=http://192.168.31.85:10808 HTTPS_PROXY=http://192.168.31.85:10808 docker pull alpine:latest
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
sudo systemctl restart docker
```

**验证是否生效**
```bash
docker info | grep -A 3 "Registry Mirrors"
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
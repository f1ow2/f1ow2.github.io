---
title: "TCP Protocol"
quote: geektime-webprotocol
categories:
  - 技术
  - 教程
tags: [web, TCP]
sidebar: false
outline: deep
---

# TCP Protocol

## intro

<span style="font-size: 23px;">**TCP 历史及其设计哲学**</span>

<span style="font-size: 19px;">**TCP/IP 的前身 ARPA：NCP 协议**</span>

- Advanced Research Projects Agency Network

![NCP 协议](<assets/NCP 协议.png>)

<span style="font-size: 19px;">**TCP/IP 协议发展**</span>

![TCP_IP 协议发展](<assets/TCP_IP 协议发展.png>)

<span style="font-size: 19px;">**TCPv4 协议分层后的互联网世界**</span>

<img src="./assets/TCPv4 协议分层后的互联网世界.png" alt="background" width="533" >

<span style="font-size: 19px;">**TCP/IP 的七个设计理念**</span>

**David D Clark：《The Design Philosophy of The DARPA Internet Protocols》**
1. Internet communication must continue despite loss of networks or gateways.
2. The Internet must support multiple types of communications service.
3. The Internet architecture must accommodate a variety of networks.
4. The Internet architecture must permit distributed management of its resources.
5. The Internet architecture must be cost effective.
6. The Internet architecture must permit host attachment with a low level of effort.
7. The resources used in the internet architecture must be accountable.

<span style="font-size: 19px;">**TCP协议的分层**</span>

- TCP：**面向连接的**、**可靠的**、基于**字节流**的传输层通信协议
- IP：根据IP地址穿越网络传送数据

<img src="./assets/network topology.png" alt="background" width="433" >

<span style="font-size: 19px;">**层层嵌套的“信封”：报文头部**</span>

![报文头部](assets/报文头部.png)

<span style="font-size: 19px;">**报文头部的层层组装与卸载**</span>

**不可靠的网络传输**
- 网络设备
- 主机
- 物理链路

<img src="./assets/报文头部的层层组装与卸载.png" alt="background" width="533" >

<span style="font-size: 23px;">**TCP 协议特点**</span>

**在 IP 协议之上,解决网络通讯可依赖问题**
- 点对点(不能广播、多播),面向连接
- 双向传递(全双工)
- 字节流：打包成报文段、保证有序接收、重复报文自动丢弃
  - 缺点：不维护应用报文的边界(对比 HTTP、GRPC)
  - 优点：不强制要求应用必须离散的创建数据块,不限制数据块大小
- 流量缓冲：解决速度不匹配问题
- 可靠的传输服务(保证可达,丢包时通过重发进而增加时延实现可靠性)
- 拥塞控制

## TCP报文

<span style="font-size: 19px;">**消息传输的核心要素**</span>

- 寄件人与收件人信息
  - IP 地址
  - TCP(UDP)端口
  - HTTP Host/URI 等
- 物流订单号
  - IP 序列号
  - TCP 序列号
- 物流系统需求

<span style="font-size: 19px;">**IP头部**</span>

![IP头部](assets/IP头部.png)

<span style="font-size: 19px;">**UDP 头部**</span>

![UDP头部](assets/UDP头部.png)

<span style="font-size: 19px;">**TCP 协议的任务**</span>

- 主机内的进程寻址
- 创建、管理、终止连接
- 处理并将**字节(8bit)流**打包成报文段(如 IP 报文)
- 传输数据
- 保持可靠性与传输质量
- 流控制与拥塞控制

<span style="font-size: 19px;">**如何标识一个连接？**</span>

- TCP 四元组(源地址,源端口,目的地址,目的端口)
  - 对于 IPv4 地址,单主机最大 TCP 连接数为 2<sup>(32+16+32+16)</sup>
- 没有连接 ID：QUIC 协议

<img src="./assets/QUIC 协议.png" alt="background" width="533" >

<span style="font-size: 23px;">**TCP Segment 报文段**</span>

- **控制信息**
  - 寻址
  - 滑动窗口
  - Flags
  - 校验和
- **数据**

![TCP_Segment报文段](assets/TCP_Segment报文段.png)

<span style="font-size: 19px;">**常用选项**</span>

![TCP_Options](assets/TCP_Options.png)

## tcpdump

[tcpdump](../security/tcpdump.md)

## 三次握手

[TCP/IP(The Three-Way Handshake)](../cyber/network.md#tcp)

<span style="font-size: 19px;">**握手的目标**</span>

- 同步 Sequence 序列号
  - **初始序列号 ISN(Initial Sequence Number)**
- 交换 TCP 通讯参数
  - 如 MSS、窗口比例因子、选择性确认、指定校验和算法

<span style="font-size: 19px;">**三次握手**</span>

- SYN：同步
- ACK：确认

<img src="./assets/tcp三次握手.png" alt="background" width="533" >

<span style="font-size: 19px;">**三次握手：SYN 报文**</span>

![三次握手SYN 报文](<assets/三次握手SYN 报文.png>)

<span style="font-size: 19px;">**三次握手： SYN/ACK 报文**</span>

![三次握手SYN_ACK 报文](<assets/三次握手SYN_ACK 报文.png>)

<span style="font-size: 19px;">**三次握手： ACK 报文**</span>

![三次握手ACK 报文](<assets/三次握手ACK 报文.png>)

### 三次握手状态变迁

<span style="font-size: 19px;">**三次握手流程**</span>

- CLOSED
- LISTEN
- SYN-SENT
- SYN-RECEIVED
- ESTABLISHED

<img src="./assets/三次握手流程.png" alt="background" width="533" >

<span style="font-size: 19px;">**netstat 命令查看 TCP 状态**</span>

interval:   重新显示选定的统计信息,各个显示间暂停的间隔秒数。

- -a: 显示所有连接和侦听端口。          
- -n: 以数字形式(如 IP 地址)显示地址和端口号。         
- -r: 显示路由表。        
- -s: 显示每个协议的统计信息。
- -o(Windows): 显示拥有的与每个连接关联的进程 ID。
- -b(Windows)/-p(Linux) : 显示对应的可执行程序名字。

<span style="font-size: 19px;">**两端同时发送SYN：双方使用固定源端口且同时建连接**</span>

- **TCB： Transmission Control Block**,保存连接使用的源端口、目的端口、目的 ip、序号、应答序号、对方窗口大小、己方窗口大小、tcp 状态、tcp 输入/输出队列、应用层输出队列、tcp 的重传有关变量等

<img src="./assets/两端同时发送SYN.png" alt="background" width="533" >

### 性能优化与安全问题

<span style="font-size: 19px;">**服务器三次握手流程示例**</span>

![服务器三次握手流程示例](assets/服务器三次握手流程示例.png)

<span style="font-size: 19px;">**超时时间与缓冲队列**</span>

- 应用层 connect 超时时间调整
- 操作系统内核限制调整
  - 服务器端 SYN_RCV 状态
    - net.ipv4.tcp_max_syn_backlog：SYN_RCVD 状态连接的最大个数
    - net.ipv4.tcp_synack_retries：被动建立连接时,发SYN/ACK的重试次数
  - 客户端 SYN_SENT 状态
    - net.ipv4.tcp_syn_retries = 6 主动建立连接时,发 SYN 的重试次数 
    - net.ipv4.ip_local_port_range = 32768 60999 建立连接时的本地端口可用范围
  - ACCEPT队列设置

<span style="font-size: 19px;">**Fast Open 降低时延**</span>

<img src="./assets/Fast Open 降低时延.png" alt="background" width="433" >

<span style="font-size: 19px;">**Linux上打开TCP Fast Open**</span>

- net.ipv4.tcp_fastopen：系统开启 TFO 功能
  - 0：关闭
  - 1：作为客户端时可以使用 TFO
  - 2：作为服务器时可以使用 TFO
  - 3：无论作为客户端还是服务器,都可以使用 TFO

<span style="font-size: 19px;">**如何应对 SYN 攻击？**</span>

攻击者短时间伪造不同 IP 地址的 SYN 报文,快速占满 backlog 队列,使服务器不能为正常用户服务

- net.core.netdev_max_backlog
  - 接收自网卡、但未被内核协议栈处理的报文队列长度
- net.ipv4.tcp_max_syn_backlog
  - SYN_RCVD 状态连接的最大个数
- net.ipv4.tcp_abort_on_overflow
  - 超出处理能力时,对新来的 SYN 直接回包 RST,丢弃连接

<span style="font-size: 19px;">**tcp_syncookies**</span>

<img src="./assets/tcp_syncookies1.png" alt="background" width="433" >
<img src="./assets/tcp_syncookies2.png" alt="background" width="433" >
<img src="./assets/tcp_syncookies3.png" alt="background" width="433" >

- **net.ipv4.tcp_syncookies = 1**
  - 当 SYN 队列满后,新的 SYN 不进入队列,计算出 cookie 再以 SYN+ACK 中的序列号返回客户端,正常客户端发报文时,服务器根据报文中携带的 cookie 重新恢复连接
    - 由于 cookie 占用序列号空间,导致此时所有 TCP 可选功能失效,例如扩充窗口、时间戳等

<span style="font-size: 19px;">**TCP_DEFER_ACCEPT**</span>

## 数据传输与MSS分段

<span style="font-size: 19px;">**TCP 应用层编程示例**</span>

<img src="./assets/TCP 应用层编程示例.png" alt="background" width="433" >

<span style="font-size: 19px;">**TCP 流的操作**</span>
- read
- write

<img src="./assets/TCP 流的操作.png" alt="background" width="433" >

<span style="font-size: 19px;">**TCP 流与报文段**</span>

- 流分段的依据
  - MSS：防止 IP 层分段
  - 流控：接收端的能力

<img src="./assets/TCP 流与报文段.png" alt="background" width="433" >

<span style="font-size: 23px;">**MSS：Max Segment Size**</span>

- **定义：仅指 TCP 承载数据,不包含 TCP 头部的大小,参见 RFC879**
- **MSS 选择目的**
  - 尽量每个 Segment 报文段携带更多的数据,以减少头部空间占用比率
  - 防止 Segment 被某个设备的 IP 层基于 MTU 拆分
- **默认 MSS：536 字节(默认 MTU576 字节,20 字节 IP 头部,20 字节 TCP 头部)**
- **握手阶段协商 MSS**
- **MSS 分类**
  - 发送方最大报文段 SMSS：SENDER MAXIMUM SEGMENT SIZE
  - 接收方最大报文段 RMSS：RECEIVER MAXIMUM SEGMENT SIZE

<span style="font-size: 19px;">**TCP 握手常用选项**</span>

![TCP 握手常用选项](<assets/TCP 握手常用选项.png>)

## 重传与确认

<span style="font-size: 19px;">**报文有可能丢失**</span>

<img src="./assets/tcp报文丢失.png" alt="background" width="533" >

<span style="font-size: 19px;">**PAR：Positive Acknowledgment with Retransmission**</span>

- 问题：效率低

<img src="./assets/tcp_PAR.png" alt="background" width="533" >

<span style="font-size: 19px;">**提升并发能力的 PAR 改进版**</span>

- 接收缓冲区的管理
  - Limit 限制发送方

<img src="./assets/tcp_PAR改进.png" alt="background" width="533" >

<span style="font-size: 23px;">**Sequence 序列号/Ack 序列号**</span>

- **设计目的：解决应用层字节流的可靠发送**
  - 跟踪应用层的发送端数据是否送达
  - 确定接收端有序的接收到字节流
- **序列号的值针对的是字节而不是报文**

<span style="font-size: 19px;">**确认序号**</span>

![确认序号](assets/确认序号.png)

<span style="font-size: 19px;">**TCP 序列号**</span>

<img src="./assets/TCP 序列号.png" alt="background" width="533" >

<span style="font-size: 19px;">**PAWS (Protect Against Wrapped Sequence numbers)**</span>

- 防止序列号回绕

![tcp_PAWS](assets/tcp_PAWS.png)

<span style="font-size: 19px;">**BDP 网络中的问题**</span>

- **TCP timestamp**
  - 更精准的计算 RTO
  - PAWS

## RTT和RTO

<img src="./assets/RTT.png" alt="background" width="433" >

<span style="font-size: 19px;">**RTT**</span>

**Round-Trip Time 往返时间**
- 定义：**数据包发出去** → **收到 ACK 确认** 一共耗时
- 就是**一来一回网络耗时**
- 单位：毫秒 ms
- 作用：TCP 用来**估算网络延迟**

<span style="font-size: 19px;">**RTO**</span>

**Retransmission TimeOut 重传超时时间**
- 定义：TCP 设置的最长等待 ACK 时长
- 超过这个时间没收到 ACK → 立刻重传报文
- RTO 应当**略大于** RTT

<span style="font-size: 19px;">**如何在重传下有效测量 RTT？**</span>

<img src="./assets/correct_RTT.png" alt="background" width="433" >

- RTT 测量的第 2 种方法
  - 发送时间
    - 数据包中 Timestamp 选项的回显时间
<img src="./assets/tcp_Timestamp.png" alt="background" width="433" >

<span style="font-size: 19px;">**RTO 应当更平滑**</span>

- **平滑 RTO：RFC793,降低瞬时变化**
  - SRTT (smoothed round-trip time) = ( α * SRTT ) + ((1 - α) * RTT)
    - α 从 0到 1(RFC 推荐 0.9),越大越平滑
  - RTO = min[ UBOUND, max[ LBOUND, (β * SRTT) ] ]
    - 如 UBOUND为1分钟, LBOUND为 1 秒钟, β从 1.3 到 2 之间
  - 不适用于 RTT 波动大(方差大)的场景

<span style="font-size: 19px;">**追踪 RTT 方差**</span>

- **RFC6298(RFC2988)**, 其中α = 1/8, β = 1/4, K = 4, G 为最小时间颗粒：
  - 首次计算 RTO, R为第 1 次测量出的 RTT
    - SRTT(smoothed round-trip time) = R 
    - RTTVAR(round-trip time variation) = R/2 
    - RTO = SRTT + max (G, K*RTTVAR)
- 后续计算 RTO, R´为最新测量出的 RTT 
  - SRTT =  (1 - α) * SRTT + α * R´
  - RTTVAR = (1 - β) * RTTVAR + β * |SRTT - R´| 
  - RTO = SRTT + max (G, K*RTTVAR)

## 滑动窗口

### 发送窗口与接收窗口

<span style="font-size: 19px;">**发送窗口快照**</span>

1. 已发送并收到 Ack 确认的数据：1-31 字节
2. 已发送未收到 Ack 确认的数据：32-45 字节
3. 未发送但总大小在接收方处理范围内：46-51 字节
4. 未发送但总大小超出接收方处理范围：52-字节

<img src="./assets/发送窗口快照.png" alt="background" width="533" >

<span style="font-size: 19px;">**可用窗口/发送窗口**</span>

- 可用窗口：46-51 字节 / 发送窗口：32-51 字节

<img src="./assets/可用窗口_发送窗口.png" alt="background" width="533" >

<span style="font-size: 19px;">**46-51 字节已发送**</span>

- 可用窗口耗尽

<img src="./assets/46-51字节已发送.png" alt="background" width="533" >

<span style="font-size: 19px;">**32 到 36 字节已确认**</span>

- 发送窗口移动

<img src="./assets/32到36字节已确认.png" alt="background" width="533" >

<span style="font-size: 19px;">**发送窗口**</span>

- SND.WND
- SND.UNA
- SND.NXT

<img src="./assets/发送窗口.png" alt="background" width="533" >

<span style="font-size: 19px;">**约等于对端发送窗口的接收窗口**</span>

- RCV.WND
- RCV.NXT

<img src="./assets/约等于对端发送窗口的接收窗口.png" alt="background" width="533" >

### 窗口滑动与流量控制

**窗口滑动示例：MSS 不产生影响，窗口不变**

![窗口滑动示例](assets/窗口滑动示例.png)

<span style="font-size: 19px;">**客户端消息的发送**</span>

<img src="./assets/tcp客户端消息的发送.png" alt="background" width="633" >

<span style="font-size: 19px;">**服务器消息的发送**</span>

<img src="./assets/tcp服务器消息的发送.png" alt="background" width="633" >

### 操作系统缓冲区与滑动窗口的关系

<span style="font-size: 19px;">**窗口与缓存**</span>

-  应用层没有及时读取缓存

<img src="./assets/窗口与缓存.png" alt="background" width="633" >

<span style="font-size: 19px;">**收缩窗口导致的丢包**</span>

- 先收缩窗口，再减少缓存
- 窗口关闭后，定时探测窗口大小

<img src="./assets/收缩窗口导致的丢包.png" alt="background" width="633" >

<span style="font-size: 19px;">**飞行中报文的适合数量**</span>

<img src="./assets/飞行中报文的适合数量.png" alt="background" width="433" >

<span style="font-size: 19px;">**Linux下调整接收窗口与应用缓存**</span>

net.ipv4.tcp_adv_win_scale = 1

**应用缓存 = buffer / (2^tcp_adv_win_scale)**

<span style="font-size: 19px;">**Linux中对TCP缓冲区的调整方式**</span>

- net.ipv4.tcp_rmem = 4096  87380 6291456
  - 读缓存最小值、默认值、最大值，单位字节，覆盖 net.core.rmem_max
- net.ipv4.tcp_wmem = 4096  16384 4194304
  - 写缓存最小值、默认值、最大值，单位字节，覆盖net.core.wmem_max
- net.ipv4.tcp_mem = 1541646  2055528 3083292
  - 系统无内存压力、启动压力模式阀值、最大值，单位为页的数量
- net.ipv4.tcp_moderate_rcvbuf = 1
  - 开启自动调整缓存模式

## 减少小报文

<span style="font-size: 23px;">**减少小报文提高网络效率**</span>

<span style="font-size: 19px;">**SWS(Silly Window syndrome)糊涂窗口综合症**</span>

- 小窗口通告

<img src="./assets/tcp_SWS.png" alt="background" width="533" >

<span style="font-size: 19px;">**SWS 避免算法**</span>

- **接收方**
  - David D Clark 算法：窗口边界移动值小于 min(MSS, 缓存/2)时，通知窗口为 0
- **发送方**
  - Nagle 算法：TCP_NODELAY 用于关闭 Nagle 算法
  - 没有已发送未确认报文段时，立刻发送数据
  - 存在未确认报文段时，直到：1-没有已发送未确认报文段，或者 2-数据长度达到 MSS 时再发送

<img src="./assets/Nagle算法和延迟确认.png" alt="background" width="433" >

<span style="font-size: 19px;">**TCP delayed acknowledgment 延迟确认**</span>

- 当有响应数据要发送时,ack 会随着响应数据立即发送给对方.
- 如果没有响应数据,ack 的发 送将会有一个延迟,以等待看是否有响应数据可以一起发送
- 如果在等待发送 ack 期间,对方的第二个数据段又到达了,这时要立即发送 ack

<span style="font-size: 19px;">**Nagle VS delayed ACK冲突**</span>

- 关闭 delayed ACK：TCP_QUICKACK
- 关闭 Nagle：TCP_NODELAY

<span style="font-size: 19px;">**Linux 上更为激进的"Nagle"：TCP_CORK**</span>

- 结合 sendfile 零拷贝技术使

## 拥塞控制

<span style="font-size: 19px;">**全局思考：拥塞控制**</span>

- 慢启动
- 拥塞避免
- 快速重传
- 快速恢复

![拥塞控制](assets/拥塞控制.png)

<span style="font-size: 19px;">**拥塞控制历史**</span>

- **以丢包作为依据**
  - New Reno：RFC6582
  - BIC：Linux2.6.8 – 2.6.18
  - CUBIC(RFC8312)：Linux2.6.19
- **以探测带宽作为依据**
  - BBR：Linux4.9

### 慢启动

- **拥塞窗口 cwnd(congestion window)**
  - 通告窗口rwnd(receiver's advertised window)
  - 发送窗口swnd = min(cwnd，rwnd)
- **每收到一个ACK，cwnd扩充一倍**

<img src="./assets/cwnd扩充.png" alt="background" width="333" >

<span style="font-size: 19px;">**慢启动的初始窗口**</span>

**慢启动初始窗口 IW(Initial Window)的变迁**
- 1 MSS：RFC2001(1997)
- 2 - 4 MSS：RFC2414(1998)
  - IW = `min (4*MSS, max (2*MSS, 4380 
bytes))`
- 10 SMSS：RFC6928(2013)
  - IW = `min (10*MSS, max (2*MSS, 14600))`

<img src="./assets/慢启动初始窗口.png" alt="background" width="333" >

### 拥塞避免

**慢启动阈值 ssthresh(slow start threshold):**
- 达到 ssthresh 后，以线性方式增加 cwnd
  - cwnd += MSS*MSS/cwnd

<img src="./assets/拥塞避免.png" alt="background" width="433" >

<span style="font-size: 19px;">**慢启动与拥塞控制**</span>

![慢启动与拥塞控制](assets/慢启动与拥塞控制.png)

### 快速重传与快速恢复

<span style="font-size: 19px;">**为何会接收到一个失序数据段？**</span>

- 若报文丢失，将会产生连续的失序 ACK 段
- 若网络路径与设备导致数据段失序，将会产
生少量的失序 ACK 段
- 若报文重复，将会产生少量的失序 ACK 段

<span style="font-size: 19px;">**快速重传(RFC2581)**</span>

- **接收方**：
  - 当接收到一个失序数据段时，立刻发送它所期待的缺口 ACK 序列号
  - 当接收到填充失序缺口的数据段时，立刻发送它所期待的下一个 ACK 序列号
- **发送方**
  - 当接收到 **3 个重复**的失序 ACK 段(4 个相同的失序 ACK 段)时，不再等待重传定时器的触发，立刻基于快速重传机制重发报文段

<img src="./assets/快速重传.png" alt="background" width="433" >

- 超时不会启动快速重传
- **收到重复 ACK，意味着网络仍在流动**
  - 慢启动会突然减少数据流


<span style="font-size: 19px;">**快速恢复(RFC2581)**</span>

**启动快速重传且正常未失序 ACK 段到达前，启动快速恢复**
- 将 ssthresh 设置为当前拥塞窗口
cwnd 的一半，设当前 cwnd 为
ssthresh 加上 3*MSS
- 每收到一个重复 ACK，cwnd 增加 1
个 MSS
- 当新数据 ACK 到达后，设置 cwnd
为 ssthresh

<img src="./assets/快速恢复.png" alt="background" width="533" >

### SACK与选择性重传算法

- **仅重传丢失段：保守乐观**
  - **累积确认 Sequence 序号的问题**
    - Client 无法告知收到了某Part
    - Server 发送窗口/Client 接收窗口停止
  - 大量丢包时效率低下

- **重传所有段：积极悲观**
  - 可能浪费带宽

<span style="font-size: 19px;">**SACK：TCP Selective Acknowledgment**</span>

- RFC2018

![SACK](assets/SACK.png)

### BBR

<span style="font-size: 19px;">**大管道向小管道传输数据引发拥堵**</span>

![大管道向小管道传输数据引发拥堵](assets/大管道向小管道传输数据引发拥堵.png)


<span style="font-size: 19px;">**BBR：TCP Bottleneck Bandwidth and Round-trip propagation time**</span>

- 由 Google 于 2016 发布，Linux4.9 内核引入，**QUIC** 使用

<span style="font-size: 23px;">**Google BBR 拥塞控制算法原理**</span>

<span style="font-size: 19px;">**最佳控制点**</span>

- **基于丢包的拥塞控制算法**
  - 高时延，大量丢包
  - 随着内存便宜，时延更高
- **左边纵线(对整体网络有效)**
  - 最大带宽下
  - 最小时延
  - 最低丢包率
- **RTprop 与 BtlBw 独立变化**
  - 同时只有一个可以被准确测量

<img src="./assets/最佳控制点.png" alt="background" width="433" >
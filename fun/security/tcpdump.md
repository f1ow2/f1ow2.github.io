---
title: "Tcpdump"
categories:
  - 技术
  - 教程
tags: [Tcpdump, network, Packet Capture]
draft: true
sidebar: false
outline: deep
---

# Tcpdump

The Tcpdump tool and its `libpcap` library are written in C and C++ and were released for Unix-like systems in the late 1980s or early 1990s. Consequently, they are very stable and offer optimal speed. The libpcap library is the foundation for various other networking tools today. Moreover, it was ported to MS Windows as winpcap.

## intro

### Basic Packet Capture

You can run `tcpdump` without providing any arguments; however, this is only useful to test that you have it installed! In any real scenario, we must be specific about what to listen to, where to write, and how to display the packets.

| Command              | Explanation                                                |
|----------------------|------------------------------------------------------------|
| `tcpdump -i INTERFACE`| Captures packets on a specific network interface           |
| `tcpdump -w FILE`    | Writes captured packets to a file                          |
| `tcpdump -r FILE`    | Reads captured packets from a file                         |
| `tcpdump -c COUNT`   | Captures a specific number of packets                      |
| `tcpdump -n`         | Don't resolve IP addresses, i.e. not display hostname             |
| `tcpdump -nn`        | Don't resolve IP addresses and don't resolve protocol numbers |
| `tcpdump -v`         | Verbose display; verbosity can be increased with `-vv` and `-vvv` |

Consider the following examples:

- `tcpdump -i eth0 -c 50 -v` captures and displays 50 packets by listening on the `eth0` interface, which is a wired Ethernet, and displays them verbosely.
- `tcpdump -i wlo1 -w data.pcap` captures packets by listening on the `wlo1` interface (the WiFi interface) and writes the packets to `data.pcap`. It will continue till the user interrupts the capture by pressing CTRL-C.
- `tcpdump -i any -nn` captures packets on all interfaces and displays them on screen without domain name or protocol resolution.

### Filtering Expressions

<span style="font-size: 23px;">**Logical Operators**</span>
Three logical operators that can be handy:

- `and`: Captures packets where both conditions are true. For example, `tcpdump host 1.1.1.1 and tcp` captures `tcp` traffic with `host 1.1.1.1`.
- `or`: Captures packets when either one of the conditions is true. For instance, `tcpdump udp or icmp` captures UDP or ICMP traffic.
- `not`: Captures packets when the condition is not true. For example, tcpdump not tcp captures all packets except TCP segments; we expect to find `UDP`, `ICMP`, and `ARP` packets among the results.

| Command                                        | Explanation                                              |
|------------------------------------------------|----------------------------------------------------------|
| `tcpdump host IP` 或 `tcpdump host HOSTNAME`    | Filters packets by IP address or hostname                |
| `tcpdump src host IP` 或                       | Filters packets by a specific source host                |
| `tcpdump dst host IP`                          | Filters packets by a specific destination host           |
| `tcpdump port PORT_NUMBER`                     | Filters packets by port number                            |
| `tcpdump src port PORT_NUMBER`                 | Filters packets by the specified source port number       |
| `tcpdump dst port PORT_NUMBER`                 | Filters packets by the specified destination port number |
| `tcpdump PROTOCOL`                             | Filters packets by protocol; examples include `ip`, `ip6`, `udp`, `tcp`, and `icmp` | 

Consider the following examples:

- `tcpdump -i any tcp port 22` listens on all interfaces and captures `tcp` packets to or from `port 22`, i.e., SSH traffic.
- `tcpdump -i wlo1 udp port 123` listens on the WiFi network card and filters `udp` traffic to `port 123`, the Network Time Protocol (NTP).
- `tcpdump -i eth0 host example.com and tcp port 443 -w https.pcap` will listen on `eth0`, the wired Ethernet interface and filter traffic exchanged with `example.com` that uses `tcp` and `port 443`. In other words, this command is filtering HTTPS traffic related to `example.com`.

 you can count the lines by piping the output via the `wc` command

```bash
user@TryHackMe$ tcpdump -r traffic.pcap src host 192.168.124.1 -n | wc
reading from file traffic.pcap, link-type EN10MB (Ethernet)
    910   17415  140616
```


<span style="font-size: 23px;">**补充**</span>

```
# What is the IP address of the host that asked for the MAC address of 192.168.124.137?
tcpdump -r traffic.pcap arp
```

端口 53 是 **DNS（域名系统）** 使用的端口。DNS 负责将人类可读的域名（例如 `example.com`）转换为计算机可理解的 IP 地址（例如 `192.168.1.1`），使设备能够正确找到目标服务器。

DNS 主要使用两种协议：
- **UDP 端口 53**：用于标准 DNS 查询（速度快，但没有可靠的传输）。
- **TCP 端口 53**：用于较大的 DNS 响应或区域传输（可靠但速度稍慢）。



```bash
# What hostname (subdomain) appears in the first DNS query?
tcpdump -r traffic.pcap port 53 -n
```
### Advanced Filtering

<span style="font-size: 23px;">**Header Bytes**</span>

The purpose of this section is to be able to filter packets based on the contents of a header byte. Consider the following protocols: ARP, Ethernet, ICMP, IP, TCP, and UDP. These are just a few networking protocols we have studied. How can we tell Tcpdump to filter packets based on the contents of protocol header bytes? (We will not go into details about the headers of each protocol as this is beyond the scope of this room; instead, we will focus on TCP flags.)

Using pcap-filter, Tcpdump allows you to refer to the contents of any byte in the header using the following syntax `proto[expr:size]`, where:

- `proto` refers to the protocol. For example, `arp`, `ether`, `icmp`, `ip`, `ip6`, `tcp`, and `udp` refer to ARP, Ethernet, ICMP, IPv4, IPv6, TCP, and UDP respectively.
- `expr` indicates the byte offset, where `0` refers to the first byte.
- `size` indicates the number of bytes that interest us, which can be one, two, or four. It is optional and is one by default.
To better understand this, consider the following two examples from the pcap-filter manual page (and don’t worry if you find them difficult):

- `ether[0] & 1 != 0` takes the first byte in the Ethernet header and the decimal number 1 (i.e., `0000 0001` in binary) and applies the `&` (the And binary operation). It will return true if the result is not equal to the number 0 (i.e., `0000 0000`). The purpose of this filter is to show packets sent to a multicast address. A multicast Ethernet address is a particular address that identifies a group of devices intended to receive the same data.
- `ip[0] & 0xf != 5` takes the first byte in the IP header and compares it with the hexadecimal number F (i.e., `0000 1111` in binary). It will return true if the result is not equal to the (decimal) number 5 (i.e., `0000 0101` in binary). The purpose of this filter is to catch all IP packets with options.

Don’t worry if you find the above two examples complex. We included them so you know what you can achieve with this; however, fully understanding the above examples is not necessary to finish this task. Instead, we will focus on filtering TCP packets based on the set TCP flags.

You can use `tcp[tcpflags]` to refer to the TCP flags field. The following TCP flags are available to compare with:

- `tcp-syn` TCP SYN (Synchronize)
- `tcp-ack` TCP ACK (Acknowledge)
- `tcp-fin` TCP FIN (Finish)
- `tcp-rst` TCP RST (Reset)
- `tcp-push` TCP Push

Based on the above, we can write:

- `tcpdump "tcp[tcpflags] == tcp-syn"` to capture TCP packets with only the SYN (Synchronize) flag set, while all the other flags are unset.
- `tcpdump "tcp[tcpflags] & tcp-syn != 0"` to capture TCP packets with at least the SYN (Synchronize) flag set.
- `tcpdump "tcp[tcpflags] & (tcp-syn|tcp-ack) != 0"` to capture TCP packets with at least the SYN (Synchronize) or ACK (Acknowledge) flags set.

### Displaying Packets

Tcpdump is a rich program with many options to customize how the packets are printed and displayed. We have selected to cover the following five options:

| Command        | Explanation                                    |
|----------------|------------------------------------------------|
| `tcpdump -q`   | Quick and quite: brief packet information      |
| `tcpdump -e`   | Include MAC addresses                          |
| `tcpdump -A`   | Print packets as ASCII encoding                |
| `tcpdump -xx`  | Display packets in hexadecimal format          |
| `tcpdump -X`   | Show packets in both hexadecimal and ASCII     |

---

## how2use

### BPF 过滤器

[BPF 过滤器](./wireshark.md#bpf过滤器)

<span style="font-size: 23px;">**BPF：Expression 表达式**</span>

<img src="./assets/BPF_Expression 表达式.png" alt="background" width="533" >

<span style="font-size: 19px;">**限定词**</span>

[BPF 过滤器-限定词](./wireshark.md#bpf过滤器)

### 捕获及停止条件

- -D 列举所有网卡设备
- -i 选择网卡设备
- -c 抓取多少条报文
- --time-stamp-precision 指定捕获时的时间精度，默认毫秒 micro，可选纳秒 nano
- -s 指定每条报文的最大字节数，默认 262144 字节

### 文件操作

- -w 输出结果至文件（可被Wireshark读取分析）
- -C 限制输入文件的大小，超出后以后缀加 1 等数字的形式递增。注意单位是 1,000,000 字节
- -W 指定输出文件的最大数量，到达后会重新覆写第 1 个文件
- -G 指定每隔N秒就重新输出至新文件，注意-w 参数应基于`strftime` 参数指定文件名
- -r 读取一个抓包文件
- -V 将待读取的多个文件名写入一个文件中，通过读取该文件同时读取多个文件

### 输出时间戳格式

- -t 不显示时间戳
- -tt 自 1970年 1 月 1 日 0 点至今的秒数
- -ttt 显示邻近两行报文间经过的秒数
- -tttt 带日期的完整时间
- -ttttt 自第一个抓取的报文起经历的秒数

### 分析信息详情

- -e 显示数据链路层头部
- -q 不显示传输层信息
- -v 显示网络层头部更多的信息，如 TTL、id 等
- -n 显示 IP 地址、数字端口代替 hostname 等
- -S TCP 信息以绝对序列号替代相对序列号
- -A 以 ASCII 方式显示报文内容，适用 HTTP 分析
- -x 以 16 进制方式显示报文内容，不显示数据链路层
- -xx 以 16 进制方式显示报文内容，显示数据链路层
- -X 同时以 16 进制及 ACII 方式显示报文内容，不显示数据链路层
- -XX 同时以 16 进制及 ACII 方式显示报文内容，显示数据链路层

# common

## ACAO

The **Access-Control-Allow-Origin** (ACAO) header is included in the response from one website to a request originating from another website, and identifies the permitted origin of the request. A web browser compares the Access-Control-Allow-Origin with the requesting website's origin and permits access to the response if they match.

## AD

**Active Directory** is a directory service developed by Microsoft for Windows domain networks. It stores information about network objects such as computers, users, and groups. It provides authentication and authorisation services, and allows administrators to manage network resources centrally.

## ACL

ACL（Access Control List，访问控制列表）是在代理服务器中定义哪些请求路径是允许访问的，哪些是被禁止的。

🔍 在 HTTP/2 请求走私攻击的场景中，有几个关键点与 ACL 直接相关：

- 当前端代理解析 HTTP/2 请求时，它只看到请求的第一部分，例如 `/hello`，这是 ACL 允许的路径。
- 但该请求实际上被分成两个 HTTP/1.1 请求，第二个请求指向的是 `/admin`，这是受限制的路径——ACL 不允许访问。
- 因此，通过“请求走私”技巧，攻击者能够利用一个合法路径（如 `/hello`）偷偷将一个非法路径（如 `/admin`）的请求发送到后端服务器。
- 从代理的角度来看，请求似乎合法，没有违反 ACL，但实际后端接收到了一个违规请求。

✨ 简而言之：攻击者利用代理只检查请求的第一部分这一特点，绕过了 ACL 的限制，将非法请求隐藏在合法请求之中。

## ALPN

Application Layer Protocol Negotiation（ALPN）是一种 **TLS 扩展机制**，用于在建立安全连接时协商使用哪种应用层协议——比如 HTTP/1.1 或 HTTP/2。

🔍 ALPN 的作用是什么？

- 它允许客户端和服务器在 **TLS 握手阶段**就确定使用的协议，**无需额外的网络往返**。
- 这对于支持多个协议的服务（例如同时支持 HTTP/1.1 和 HTTP/2 的网站）非常重要。
- ALPN 通过在 TLS 的 `ClientHello` 消息中附加一个协议列表，服务器从中选择一个并在 `ServerHello` 中返回。

📦 应用场景举例

- 浏览器访问支持 HTTP/2 的网站时，会通过 ALPN 告诉服务器它支持 `h2` 和 `http/1.1`。
- 服务器选择 `h2`，于是双方就用 HTTP/2 通信了——**整个过程只需一次 TLS 握手**。

🧠 与 HTTP 请求走私的关系

在你查看的页面中，ALPN 被提及是因为它在 **HTTP/2 请求走私攻击**中扮演了关键角色：

- 某些代理服务器支持 HTTP/2，但后端仍使用 HTTP/1.1。
- ALPN 协商后，前端使用 HTTP/2，后端却被降级为 HTTP/1.1。
- 攻击者可以构造特殊的 HTTP/2 请求，使代理在转换为 HTTP/1.1 时发生 **请求边界错位**，从而实现走私攻击。

这种“协议降级”场景正是 ALPN 协商失败或被滥用的结果。

## AMSI

The Windows Antimalware Scan Interface (AMSI) serves as a standardized interface enabling Windows applications to seamlessly communicate with any existing antimalware solutions present on the system.

## API

API, which stands for **Application Programming Interface**, is a set of rules and protocols for building software and applications. An API allows different software programs to communicate with each other. It defines methods of communication between various components, including the kinds of requests that can be made, how they're made, the data formats that should be used, and conventions to follow.

## APT

An **advanced persistent threat** (APT) is a stealthy threat actor, typically a nation state or state-sponsored group, which gains unauthorized access to a computer network and remains undetected for an extended period.

## ARP

**Address Resolution Protocol (ARP)** is responsible for finding the MAC (hardware) address related to a specific IP address. It works by broadcasting an ARP query, "Who has this IP address? Tell me." And the response is of the form, "The IP address is at this MAC address."

## AV

Antivirus software is a program or set of programs that are designed to prevent, search for, detect, and remove software viruses, and other malicious software like worms, trojans, adware, and more.

## BIOS

The Basic Input/Output System (BIOS) is a boot firmware that provides runtime services for the operating system (OS). The BIOS starts, checks specific hardware components, and loads the OS depending on boot priority.

## BOF

Beacon Object Files (BOF) is a set of compiled code written in a C-language that interacts with the Windows API to enable additional functionality within a C2 agent.

## C2

**Command and Control (C2)** Infrastructure are a set of programs used to communicate with a victim machine. This is comparable to a reverse shell, but is generally more advanced and often communicate via common network protocols, like HTTP, HTTPS and DNS.

## CIDR

CIDR（Classless Inter-Domain Routing，无类域间路由）是一种 **IP地址分配和路由优化技术**，用于提高网络地址空间的利用率和路由效率。

🌐 CIDR 的核心概念
- **打破传统分类地址**：CIDR 不再使用 A、B、C 类地址，而是采用灵活的地址块划分方式。
- **使用前缀长度表示网络范围**：例如 `192.168.0.0/24` 表示前 24 位是网络地址，剩下的是主机地址。
- **支持可变长度子网掩码（VLSM）**：可以根据实际需求划分大小不同的子网。

📦 CIDR 表示法示例
| CIDR 表示 | 网络地址范围 | 可用主机数 |
|-----------|----------------|-------------|
| `192.168.1.0/24` | `192.168.1.0` 到 `192.168.1.255` | 254 |
| `10.0.0.0/8`     | `10.0.0.0` 到 `10.255.255.255`   | 16,777,214 |

> 注意：可用主机数通常是总数减去网络地址和广播地址。

🚀 CIDR 的优势
- **节省 IP 地址**：避免地址浪费，尤其在 IPv4 中非常重要。
- **简化路由表**：多个地址块可以聚合成一个更大的块，减少路由器负担。
- **灵活划分网络**：适用于不同规模的组织和网络结构。

## CORS

**Cross-origin resource sharing** ([CORS](./webapp/ClientSideAttacks.md#understanding-cors)) is a mechanism for integrating applications. CORS defines a way for client web applications that are loaded in one domain to interact with resources in a different domain.

## CSRF

**Cross-site request forgery** (also known as CSRF) is a web security vulnerability that allows an attacker to induce users to perform actions that they do not intend to perform. It allows an attacker to partly circumvent the [same origin policy](#sop), which is designed to prevent different websites from interfering with each other.

## CSP

**Content Security Policy** (**CSP**) is a security standard designed to add an additional layer of security for web applications. It helps to mitigate XSS (Cross-Site Scripting) and other attacks by restricting the resources (such as scripts, images, and styles) that a web page can load. CSP consists of a series of instructions sent from a website to a browser, which instructs the browser on what content is allowed to be loaded, thereby minimizing the risk of security threats. The CSP is implemented via HTTP response headers, enhancing the security of web pages by declaring which dynamic resources are permitted to load.

## CTI

Cyber Threat Intelligence is evidence-based knowledge about adversaries, including their indicators, tactics, motivations, and actionable advice against them.

## CVE

Common Vulnerabilities and Exposures (CVE), this term is given to a publicly disclosed vulnerability

## DC

A domain controller is a server that manages security authentication requests in a Windows Server network. It stores user account information and controls access to resources on the network. It is a critical component for managing and securing a network infrastructure.

## DKIM

DKIM (DomainKeys Identified Mail) is an email security standard designed to make sure messages aren't altered in transit between the sending and recipient servers.

## DLL

A DLL file, short for Dynamic Link Library, is a library that contains code and data that can be used by more than one program at the same time. For example, in Windows operating systems, the Comdlg32 DLL performs common dialog box related functions. Each program can use the functionality that is contained in this DLL to implement an Open dialog box. It helps promote code reuse and efficient memory usage.

## DMZ

A DMZ or demilitarized zone is a perimeter network that protects and adds an extra layer of security to an organization’s internal local-area network from untrusted traffic. The end goal of a demilitarized zone network is to allow an organization to access untrusted networks, such as the internet, while ensuring its private network or LAN remains secure

## DNS

**Domain Name System (DNS)** is the protocol responsible for resolving hostnames, such as tryhackme.com, to their respective IP addresses.

## DOS

A computer operating system that provides a file system for operations such as reading, writing, and erasing data on a disk. It is a non-graphical line-oriented command-driven computer operating system designed for the IBM PC. Several variations of DOS were developed, such as MS-DOS (Microsoft) and PC-DOS (IBM).

## Dynamic Analysis 

The process of analyzing malware by running it in a controlled environment like a sandbox.

## EDR

Endpoint detection and response (EDR) is a series of tools that monitor devices for activity that could indicate a threat.

## entropy

The measure of randomness of data in a file is known as **entropy**. Entropy is very useful in identifying compressed and packed malware. Packed or compressed files usually have a high entropy.

## File header

A unique sequence of binary at the start of a file identifying its format

## FTP

**File Transfer Protocol (FTP)** is a protocol designed to help the efficient transfer of files between different and even non-compatible systems. It supports two modes for file transfer: binary and ASCII (text).

## Ghidra

A software reverse engineering framework developed by the National Security Agency (NSA) in the United States. Comprising of a suite of software analysis tools. Ghidra disassembles executables into code that humans can understand.

## HIDS

Host Intrusion Detection System (HIDS) analyzes system state, system calls, file-system modifications, application logs, and other system activity.

## HIPS

Host Intrusion Prevention System (HIPS) protects workstations and servers through software that resides on the system. It catches suspect activity on the system and then either allows or disallows the event to happen, depending on the rules. Finally, it can also monitor data requests and read or write attempts and network connection attempts, potentially allowing it to be used as a compensating control for other requirements.

## HTA

**HTML Application (HTA)** files are files that contain HTML, JScript, and or VBScript code that can be executed on client system. This can to lead to more dynamic applications or remote code execution on a client or victim.

## HTML

HTML stands for **HyperText Markup Language**. It is the standard markup language used to create and structure the content of web pages. It is not a programming language, but rather a way to tell a web browser how to display text, images, and other media.

## HTTP

**Hypertext Transfer Protocol** (HTTP) is the protocol that specifies how a web browser and a web server communicate. a **stateless** application-level **request/response** protocol that uses **extensible semantics** and **self-descriptive** message payloads for flexible interaction with network-based **hypertext information** systems (RFC7230 2014.6)

## IDS

Intrusion Detection System (IDS) is a system that detects unauthorised network and system intrusions. Examples include detecting unauthorised devices connected to the local network and unauthorised users accessing a system or modifying a file.

## IPS

Intrusion Prevention System (IPS) is a device or application that detects and stops intrusions attempts proactively. They are usually deployed in front of the protected asset and block any potential threat from reaching their target.

## JSON

**JavaScript Object Notation** is an open standard file and data interchange format that uses human-readable text to store and transmit data objects consisting of attribute–value pairs and arrays.

## keylogger

A keylogger is a tool that is used to record user keystrokes on a physical computer.

## LLMNR

The Link-Local Multicast Name Resolution (LLMNR) is a protocol based on the Domain Name System (DNS) packet format that allows both IPv4 and IPv6 hosts to perform name resolution for hosts on the same local link.

## Magic Number validation

**Magic Number validation**: Magic numbers are the more accurate way of determining the contents of a file; although, they are by no means impossible to fake. The "**magic number**" of a file is a string of bytes at the very beginning of the file content which identify the content. For example, a PNG file would have these bytes at the very top of the file: `89 50 4E 47 0D 0A 1A 0A`.

## MD5

Message Digest 5 (MD5) is a cryptographic hash function that takes any input and produces a 128-bit hexadecimal number. The output of an MD5 hash function is called a digest. MD5 digests are often used to verify the integrity of files or data; however, MD5 is no longer considered secure and should not be used for sensitive applications.

## MFA

**MFA** stands for **Multi-Factor Authentication**, is a security process that requires users to provide two or more forms of identification before accessing an account or system. This enhances security by adding an additional layer of protection against unauthorised access.

## MIME

**Multipurpose Internet Mail Extensions (MIME)** is an Internet standard that extends the format of email messages to support text in character sets other than ASCII, as well as attachments of audio, video, images, and application programs.

## MTU

Maximum Transmission Unit

## NetBIOS

NetBIOS is an acronym for Network Basic Input/Output System. It provides services related to the session layer of the OSI model allowing applications on separate computers to communicate over a local area network.

## NIDS

Network Intrusion Detection System (NIDS) is an independent platform that examines network traffic patterns to identify intrusions for an entire network.

## NIST

National Institute of Standards and Technology (NIST). This organisation develops frameworks and policies for information security that is used all throughout the industry.

## NTLM

Windows New Technology LAN Manager (NTLM) is a suite of security protocols offered by Microsoft to authenticate users’ identity and protect the integrity and confidentiality of their activity.

## OPSEC

**Operational Security (OPSEC)** is a set of principals and tactics used to attempt to protect the security of an operator or operation. An example of this may be using code names instead of your real names, or using a proxy to conceal your IP address.

## ORM

[Object-Relational Mapping](./webapp/InjectionAttacks.md#understanding-orm) (ORM) is a programming technique that allows developers to interact with a database using an object-oriented paradigm

## OS

**Operating System (OS)** is a layer between the hardware and the applications. From the application's perspective, the OS provides an interface to access the different hardware components, such as CPU, RAM, and disk storage. Examples of OS are Android, FreeBSD, Linux, macOS, and Windows.

## OSINT

Open source intelligence (OSINT) is the act of gathering and analyzing publicly available data for intelligence purposes.

## OU

In Windows domains, Organizational Unit (OU) refers to containers that hold users, groups and computers to which similar policies should apply. In most cases, OUs will match departments in an enterprise.

## Packers

Tools that compress and encrypt executable files. It compresses the target executable and embeds it within a new executable file that serves as a wrapper or container. This dramatically reduces the size of the file, making it ideal for easy distribution and installation.

## PE

A file format for executables, object code, DLLs, FON Font files, and others used in 32-bit and 64-bit versions of Windows operating systems. The PE format is a data structure that encapsulates the information necessary for the Windows OS to manage the wrapped executable code.

## persistence

Malware often tries to keep a footprint in the system such that it keeps running even after a system restart. This is called **persistence**. For example, If a malware adds itself to the startup registry keys, it will persist even after a system restart.

## phishing

When emails are sent to a target(s) purporting to be from a trusted entity to lure individuals into providing sensitive information.

## PID

In the context of operating systems, PID stands for Process ID. It is a unique identifier assigned to each running process in a system. PIDs are usually assigned in sequential order as processes are created, but can be recycled once a process has completed and terminated.

## POP3

**Post Office Protocol Version 3 (POP3)** is an alternative protocol for receiving emails that downloads emails from the server to a local device. Using POP3, a recipient cannot access their emails again from a different device because they are stored locally and then deleted from the email server.

## proxy

A proxy server is a system or router that provides a gateway between users and the internet. Therefore, it helps prevent cyber attackers from entering a private network. It is a server, referred to as an “intermediary” because it goes between end-users and the web pages they visit online.

## RCE

Remote Code Execute

## RoE

The **Rules of Engagement** is a document that gives permission to a penetration tester, defining the targets that the engagement applies to and the behaviours/techniques that

## Sandbox

Hardware or software dedicated for isolating untrusted applications or services from critical system resources and other programs to prevent harmful actions or malware from negatively affecting the system.

## SIEM

Security Information and Event Management system that is used to aggregate security information in the form of logs, alerts, artifacts and events into a centralized platform that would allow security analysts to perform near real-time analysis during security monitoring.

## SMB

**Server Message Block (SMB)** is a communication protocol[1] originally developed in 1983 by Barry A. Feigenbaum at IBM[2] and intended to provide shared access to files and printers across nodes on a network of systems running IBM's OS/2. It also provides an authenticated inter-process communication (IPC) mechanism.

## Social engineering

The manipulation of individuals to divulge sensitive information, through various forms of communication

## SOP

**Same-origin policy** ([SOP](./webapp/ClientSideAttacks.md#understanding-sop)) is a critical security mechanism that restricts how a document or script loaded by one origin can interact with a resource from another origin. It helps isolate potentially malicious documents, reducing possible attack vectors.

## SPF

Sender Policy Framework (SPF) is an email authentication method designed to detect forging sender addresses during the delivery of the email.

## SSH

**Secure Shell (SSH)** refers to a cryptographic network protocol used in secure communication between devices. SSH encrypts data using cryptographic algorithms, such as Advanced Encryption System (AES) and is often used when logging in remotely to a computer or server.

## SSO

**Single sign-on** (SSO) is a session and user authentication service that permits a user to use one set of login credentials -- for example, a username and password -- to access multiple applications. SSO can be used by enterprises, small and midsize organizations, and individuals to ease the management of multiple credentials.

## Static Analysis

The process of analyzing malware without executing it, but in a controlled environment.

## Sysmon

Sysmon refers to System Monitor, which is a Windows system service and device driver developed by Microsoft that is designed to monitor and log various events happening within a Windows system.

## TCP

**Transmission Control Protocol (TCP)** is a connection-oriented protocol requiring a TCP three-way-handshake to establish a connection. TCP provides reliable data transfer, flow control and congestion control. Higher-level protocols such as HTTP, POP3, IMAP and SMTP use TCP

## TOTP

**Time-based one-time password (TOTP)** is an open standard that specifies how one-time password (OTP) codes are generated.

## TTL 

Time to live (TTL) refers to the amount of time or “hops” that a packet is set to exist inside a network before being discarded by a router. TTL is also used in other contexts including CDN caching and DNS caching.

## TTP

**Tactics, Techniques and Procedures** describe the methodologies, tools, behavioural patterns and strategies that adversaries use to plan and execute attacks against target networks and organisations.

## UAC

User Account Control (UAC) helps prevent malware from damaging a PC and helps organizations deploy a better-managed desktop. With UAC, apps and tasks always run in the security context of a non-administrator account, unless an administrator specifically authorizes administrator-level access to the system. UAC can block the automatic installation of unauthorized apps and prevent inadvertent changes to system settings.

## UEFI

The Unified Extensible Firmware Interface (UEFI) provides an interface between the operating system (OS) and the platform firmware. The UEFI replaces the BIOS.

## URL

A **Uniform Resource Locator** (URL) is a web address that lets you access all kinds of online content—whether it's a webpage, a video, a photo, or other media. It guides your browser to the right place on the Internet.

## XML

[Extensible Markup Language](./webapp/InjectionAttacks.md#xml) is a markup language that defines a set of rules for encoding documents in a format that is both human-readable and machine-readable.

## XSS

**Cross-Site Scripting**, a type of security vulnerability typically found in web applications. It allows attackers to inject malicious scripts into web pages viewed by other users. These scripts can then steal sensitive information, like user's cookies, session tokens, or other sensitive data.



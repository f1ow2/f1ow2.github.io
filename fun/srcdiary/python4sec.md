---
title: "Python Security Programming"
categories:
  - 技术
  - 教程
tags: [Python, Security]
draft: true
sidebar: false
outline: deep
---

# Python Security Programming

## intro

Python安全编程基础（CTF方向）

**开源**

- 官网：www.python.org   
- 任何人都可以在Python的基础之上为其增加新的功能（模块）

**特点**

- 优雅、简单、明确，代码应尽量pythonic。
- 在Python中，一切皆对象。
- Python是一种解释型语言（脚本语言）。

---

## Python数据对象

### str

字符串是一个可迭代的数据对象

- 字符串中的每个字符都是一个独立元素，可挨个进行处理。

```bash
>>> for i in "who are u!":
...     print(i, end = '-')
... 
w-h-o- -a-r-e- -u-!->>> 
```

```bash
>>> a,b,c = '123'
>>> a
'1'
>>> b
'2'
>>> c
'3'
```

**字符串切片**

从一个字符串中取出指定的某一部分字符串，称为切片。

- 切片格式：[起始下标:结束下标:步长]
- 起始下标默认为0
- 结束下标不包含该下标本身，省略时表示一直取到字符串的终点。
- 步长默认为1
- [::-1]表示逆序

```bash
>>> a='python'
>>> a[0:5]
'pytho'
>>> a[::-1]
'nohtyp'
>>> a[:6:2]
'pto'
```
---

#### 数制转换与ASCII码

[ASCII码表](../linux/encoding.md#ascii)

**数据单位**

在计算机内部，所有的数据都是以二进制形式表示。

- **bit**：位（b），二进制数的1个“0”或1个“1”。
- **Byte**：字节（B），一个8位的二进制数。
- 更大的数据存储单位：KB、MB、GB、TB、EB、PB……
- 数据传输速率（带宽）：bps，比特/秒。
- 数据下载速率：Bps，字节/秒。

**数据进制**

Python中的数制

- 二进制：以0b作为前缀，0b1010。
- 八进制：以0o作为前缀，0o173。
- 十六进制：以0x作为前缀，0x1f。
- 直接输出这些带前缀的数据，都是将它们转换为十进制数。

```bash
>>> 0b0101
5
>>> 0o0101
65
>>> 0x0101
257
```

**十进制转换为其它进制**
```bash
>>> bin(10)
'0b1010'
>>> oct(10)
'0o12'
>>> hex(10)
'0xa'
```

**int()函数**可将其它进制的数据转换成十进制

- 语法格式：int("被转换的数据",进制)
- 被转换的数据必须要以字符串的形式给出。

```bash
>>> int('2C', 16)
44
>>> int('1010', 2)
10
>>> int('77', 8)
63
```

**ASCII码相关函数**

- `ord()`函数，返回某个字符所对应的ASCII码（用十进制表示）。
- `chr()`函数，返回某个十进制数所对应的ASCII码字符。

```bash
>>> ord('A')
65
>>> chr(65)
'A'
```
---

#### 字符串常用方法

`startswith()`和`endswith()`方法

```bash
>>> b = 'Simple is better than complex'
>>> b.startswith('Sim')
True
>>> b.endswith('lex')
True
```
```bash
>>> a = 'test.txt'
>>> a.endswith(('.txt', '.sh', 'jpg'))
True
```
`split()` 和 `join()`

```bash
>>> s = 'I love you'
>>> a = s.split()
>>> a
['I', 'love', 'you']
>>> ' '.join(a)
'I love you'
```

`replace()`

- `replace()`方法可以将字符串中部分指定的字符进行替换。
- 字符串属于**不可变序列**，字符串中的内容不允许改变。
- 通过`replace()`方法会生成新的字符串，原先字符串中的内容保持不变。

```bash
>>> b ='0010 0100'
>>> b.replace('0','.').replace('1','-')
'..-. .-..'
```

`maketrans()` 和 `translate()`方法

- `maketrans()` 方法用来生成字符映射表
- `translate()` 方法按照字符映射表中定义的对应关系，将字符串中的指定字符进行替换。

使用这两个方法的组合可以同时替换多个不同的字符，`replace()`方法则无法满足这一要求。

```bash
>>> morse_table = ''.maketrans('01','.-')
>>> b.translate(morse_table)
'..-. .-..'
```
```bash
>>> s = 'ABBAABABAA'
>>> table = ''.maketrans('AB','BA')
>>> s.translate(table)
'BAABBABABB'
```

`strip()`、`rstrip()`、`lstrip()` 方法

- `strip()`  方法用于去除字符串首尾指定的字符
- `rstrip()` 方法用于去除字符串**右**端指定的字符。
- `lstrip()` 方法用于去除字符串**左**端指定的字符。
    - 默认是去除**空格**、回车、换行等空白字符

```bash
>>> k = '    hello  '
>>> k.strip()
'hello'
```
`upper()`、`lower()`和 `swapcase()`方法

- `upper()`方法，将字符串转换成大写形式。
- `lower()`方法，将字符串转换成小写形式。
- `swapcase()`方法，实现大小写互换。

`isupper()`和`islower()`方法

- `isupper()`方法，判断字符串是否是大写字母
- `islower()`方法，判断字符串是否是小写字母

`isalpha()`、`isdigit()`、`isalnum()`方
法
- `isalpha()`，判断字符串是否是字母
- `isdigit()`，判断字符串是否是数字
- `isalnum()`，判断字符串是否是字母或数字

---

#### 字符串格式化

`f_string`
- 在字符串的前面加上f前缀，将变量名称用`{}`括起来，Python就可以自动识别并引用变量

```bash
>>> a = 'Tom'
>>> b = 90
>>> s = f'Hello {a}, your source is {b}'
>>> s
'Hello Tom, your source is 90'
```
**`f_string`等宽输出**

- 02中的2用于指定宽宽，0用于填充。
- 填充符只能是**0或空格**。

```bash
>>> year = 2023
>>> month = 4
>>> day = 1
>>> t = f'{year}-{month:02}-{day:02}'
>>> t
'2023-04-01'
```
**`f_string`指定小数位数**

```bash
>>> name = "tom"
>>> score = 90.77
>>> f'Hello {name}, your score is {score:.1f}'
'Hello tom, your score is 90.8'
>>> f'Hello {name}, your score is {score:.0f}'
'Hello tom, your score is 91'
>>> f'Hello {name}, your score is {score}'
'Hello tom, your score is 90.77'
```

---

### tuple

元组用`()`表示

- 元组与列表类似，不同之处在于元组中的数据只能被调用，而不能被修改。

**元组特点**

- 如果元组中只有一个元素，那么在元素的后面必须加上逗号。
  - 元组通常用于为函数传递参数，从而防止在函数中修改参数。
- 使用`tuple()`函数可以将其它序列转换为元组
  - 通过`tuple()`函数可以实现将列表冻结，而使用`list()`函数可以实现将元组融化。
  - 元组的访问和处理速度比列表更快，如果要对大量数据进行遍历，而不需要对其中的元素进行任何修改，那么建议使用元组而不是列表。

---

### list

列表的基本特性

- 列表用[]表示，在列表中可以集中存放多个数据，数据类型不必统一。
- 列表中的数据称为列表的元素，每个元素之间用逗号间隔。
- 列表中的元素还可以是一个列表、元组或者字典。
- 列表同样可以像字符串那样进行索引和切片

#### 列表常用函数

`list()`函数

- 将字符串、元组、range对象等可迭代对象转换为列表

`sum()`函数

- 将列表中的所有元素累加求和

```bash
>>> a = list(range(1,10))
>>> a
[1, 2, 3, 4, 5, 6, 7, 8, 9]
>>> sum(a)
45
>>> sum(a)/len(a)
5.0
```

<span style="font-size: 23px;">**`map()`函数**</span>

- `map()`函数的语法格式：`map(函数,列表)`
- 可以把一个函数依次映射到序列的每个元素上，并返回一个map对象作为结果。
- 为了直观显示，通常会将`map()`对象转换成列表。map对象也是可迭代的，可以直接循环遍历。

```bash
>>> a
[1, 2, 3, 4, 5, 6, 7, 8, 9]
>>> map(str,a)
<map object at 0x7fe68b0ef970>
>>> list(map(str, a))
['1', '2', '3', '4', '5', '6', '7', '8', '9']
```

如果需要输入多个数值型的数据，可以用`map()`函数进行转换。
- `map()`函数的作用：将指定的函数依次作用到列表中的每个元素上。

```bash
>>> a,b = map(int,input().split())
3 7
>>> a
3
>>> b
7
```

`map()`函数典型用法

- 用`input()`函数接收多个数据，并转换成数值型再存放到列表中：

```bash
>>> a = list(map(int, input().split()))
2 5 9 7
>>> a
[2, 5, 9, 7]
>>> 
```

- 获取一个三位数的百位、十位、个位数：

```bash
>>> a, b, c = map(int, '234')
>>> a
2
>>> b
3
>>> c
4
```
- 产生一个字母序列：

```bash
>>> list(map(chr, range(ord('a'), ord('z') + 1)))
['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

>>> list(map(chr, range(65, 91)))
['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
```
---

#### 列表常用方法

`append()`方法
- 通过append()方法可以向列表尾部追加一个元素

`extend()`方法
- 通过`extend()`方法可以将另一个列表中的所有元素追加至当前列表的尾部

*生成斐波那契数列*
```bash
# 生成斐波那契数列 n-项数
def gen_fibo(n):
    fibo = [1, 1]   
    while len(fibo) < n:
        fibo.append(fibo[-1] + fibo[-2])
    # print(fibo)
    return fibo
```
`index()`方法
- 返回指定元素在列表中的下标。
- 如果列表中存在多个指定元素，则只返回第一个指定元素的下标

`pop()`方法
- 从列表中删除**指定下标**的元素，默认是最后一个。

```bash
>>> f
[1, 1, 2, 3, 5, 8]
>>> f.pop(f.index(2))
2
>>> f
[1, 1, 3, 5, 8]
```
`remove()`方法
- 从列表中删除**指定的元素**
- 如果列表中存在多个指定的元素，则只删除第一个

`clear()`方法
- 清空列表

`count()`方法
- 统计某元素在列表中出现的次数

`sort()`方法
- 将列表中的元素进行**排序**，默认是升序。
- 降序排序需要用到reverse参数。

`reverse()`方法
- 将列表中的元素顺序颠倒，也就是逆序。

---

<span style="font-size: 23px;">**sorted()和reversed()函数**</span>

`sorted()`和`reversed()`函数也可以实现排序和逆序

- 这两个函数不会对原列表做任何修改。
- `sort()`和`reverse()`方法属于**原地操作**，直接修改原列表。
- `list(reversed(l))` 效果同 `l[::-1]`

```bash
>>> list(reversed(l))
[7, 2, 9, 5, 3, 2]
>>> l[::-1]
[7, 2, 9, 5, 3, 2]
>>> l
[2, 3, 5, 9, 2, 7]
```
---

#### 列表推导式

列表推导式，可以使用非常简洁的方式快速生成满足特定需求的列表。 
- [表达式  for  变量  in  序列或可迭代对象  if  条件表达式]

```bash
>>> a = []
>>> for i in 'hello':
...     a.append(ord(i))
... 
>>> a
[104, 101, 108, 108, 111]
>>> 
>>> b = [ ord(i) for i in 'hello']
>>> b
[104, 101, 108, 108, 111]
```
```bash
>>> b = ''.join([chr(i) for i in range(ord('a'), ord('z') + 1)])
>>> b
'abcdefghijklmnopqrstuvwxyz'
>>> 
>>> a = ''.join([chr(i) for i in range(33,127)])
```
---

### dic

<span style="font-size: 23px;">**字典的特点**</span>

字典中的每个元素包含键和值两部分
- 键和值之间用冒号间隔，不同元素之间用逗号间隔，所有的元素被放在一对`{}`中。

字典中的元素没有下标
- 比如要引用`services`字典中第一个元素的值，使用`services[0]`表示就是错误的

在字典中只能通过指定某个键，从而来引用它所对应的值。

- 因为字典是以键取值，所以字典中的键是唯一的，而且不可修改。
- 因为键不可修改，所以只能使用一些不可变序列来作为字典的键，通常使用字符串作为键。
- 字典的优点是具有极快的查找速度，在处理大批量数据时更加推荐使用字典。

#### 字典的使用

**以键取值**
```bash
>>> services = {'ftp':21, 'ssh': 22, 'http':80}
>>> services
{'ftp': 21, 'ssh': 22, 'http': 80}
>>> services['ssh']
22
```

**往字典中增加新的元素**
- 如果指定的键不存在，就添加新的元素。
- 如果指定的键已经存在，就修改原有元素的值。

**对字典进行检索**
- `in`运算符只能检测字典中是否存在指定的键，而不能检测是否存在指定的值。
- 要检测字典中是否存在指定的值，可以结合`values()`方法。
  
- `keys()`方法，返回字典中所有的键。
- `values()`方法，返回字典中所有的值。
- `items()`方法，返回字典中所有的元素。

```bash
>>> 'http' in services
True
>>> 22 in services
False
>>> 22 in services.values()
```

**对字典进行遍历**

- 默认是对键进行遍历。
- 如果要对值进行遍历，需要引用字典的值。

*同时遍历键和值*

```bash
>>> for i in services:
...     print(f'{i}:{services[i]}')
... 
ftp:21
ssh:22
http:8080
https:443

>>> for key,value in services.items():
...     print(f'{key}:{value}')
... 
ftp:21
ssh:22
http:8080
https:443
```
- **`get()`方法**
  - 通过指定键，读取字典中的相应元素。
  - 如果指定的键不存在，不会抛出异常。
  - 当指定的键不存在时，可以返回一个默认值。
  - 建议使用`get()`方法读取字典中的元素。

```bash
>>> services['ftps']
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
    services['ftps']
    ~~~~~~~~^^^^^^^^
KeyError: 'ftps'
>>> services.get("ftps")
>>> services.get('ftps', 'Not Exists')
'Not Exists'
>>> services.get("ftp")
21
```
- `pop()`方法，删除字典中指定键所对应的元素。
- `clear()`方法，清空字典中的所有元素。


<span style="font-size: 23px;">**创建字典**</span>
- 通过`dict()`函数可以创建字典

```bash
>>> dict(ftp=21,http=80,ssh=22)
{'ftp': 21, 'http': 80, 'ssh': 22}
```
---

#### 字典推导式

- 使用字典推导式可以快速生成字典

```bash
>>> a = 'I love Python, and I love Linux too!'
>>> {i:a.count(i) for i in a}
{'I': 2, ' ': 7, 'l': 2, 'o': 5, 'v': 2, 'e': 2, 'P': 1, 'y': 1, 't': 2, 'h': 1, 'n': 3, ',': 1, 'a': 1, 'd': 1, 'L': 1, 'i': 1, 'u': 1, 'x': 1, '!': 1}

>>> {chr(i):i for i in range(97, 123)}
{'a': 97, 'b': 98, 'c': 99, 'd': 100, 'e': 101, 'f': 102, 'g': 103, 'h': 104, 'i': 105, 'j': 106, 'k': 107, 'l': 108, 'm': 109, 'n': 110, 'o': 111, 'p': 112, 'q': 113, 'r': 114, 's': 115, 't': 116, 'u': 117, 'v': 118, 'w': 119, 'x': 120, 'y': 121, 'z': 122}
```
`zip()函数`
- `zip()`函数可以将多个可迭代对象中的元素进行组合，得到一个个元组，也被称为拉链函数。
- 如果两个序列的长度不一致，`zip()`函数在最短序列“用完”时就停止。

```bash
>>> c = '12345'
>>> d = 'abcd'
>>> list(zip(c,d))
[('1', 'a'), ('2', 'b'), ('3', 'c'), ('4', 'd')]
```
- `dict()`结合`zip()`函数创建字典
```bash
>>> a = ['ftp', 'ssh', 'http']
>>> b = [21, 22, 80]
>>> dict(zip(a, b))
{'ftp': 21, 'ssh': 22, 'http': 80}
```
- 字典推导式结合`zip()`函数生成字典
```bash
>>> {i:j for i,j in zip(a, b)}
{'ftp': 21, 'ssh': 22, 'http': 80}
```

---

### set

集合最主要的特点是其中的**元素不能重复**

- 集合的底层是字典，集合中的所有元素就是字典中的键。
- 集合也采用`{}`表示，集合中的元素是**无序**的

`set()`函数可以将其它对象转换为集合

```bash
>>> set('hello')
{'l', 'e', 'h', 'o'}
```
**集合的常用方法**

`remove()`方法
- 删除集合中的指定元素

`clear()`方法
- 清空集合

---

## 文件操作

- 文本文件
- 二进制文件

<span style="font-size: 23px;">**Python文件操作函数清单**</span>

| 所属模块 | 函数名 |
|---------|--------|
| 文件打开与关闭 | `open()` 、`close()` |
| 文件读取 | `read()` 、`readline()` 、`readlines()` |
| 文件写入 | `write()` 、`writelines()` |
| 文件定位 | `seek()` 、`tell()` |
| 上下文管理器 | `with` 语句 |
| 路径操作 | `Path.open()` 、`os.path.exists()` 、`os.path.join()` |
| 目录与文件管理 | `os.listdir()` 、`os.walk()` 、`os.makedirs()` 、`shutil.copy()` |


---

## 异常处理


---

## 自定义函数


---

## 模块导入与使用

模块：把一堆函数代码放到一个文件中，以后备用

`tools.py`
```python
def fool1():
  print('执行了, fool1')
def fool2():
  print('执行了, fool2')
def fool3():
  print('执行了, fool3')

print("tools模块名: ", __name__)

# 判断是否是 入口文件
if __name__ == '__main__':
    print('tools 当前文件代码')
```
导入模块或函数

`start.py`
```python
# import tools 导入模块
# import tools as tl 导入模块，起别名
# from tools import fool1, fool2 导入函数
# from tools import fool1 as f1, fool2 as f2 

tools.fool1()
tl.fool1()
fool1()
f1()
```
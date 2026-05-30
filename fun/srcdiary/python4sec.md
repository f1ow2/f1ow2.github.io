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

Python安全编程基础(CTF方向)

**开源**

- 官网：www.python.org   
- 任何人都可以在Python的基础之上为其增加新的功能(模块)

**特点**

- 优雅、简单、明确，代码应尽量pythonic。
- 在Python中，一切皆对象。
- Python是一种解释型语言(脚本语言)。

## 模块导入与使用

**模块**是 Python 中组织代码的基本单元，一个 `.py` 文件就是一个模块。通过导入模块，可以复用其他文件中定义的函数、类和变量。
- 标准模块: python自带的，无需安装
- 第三方模块:  [pypi](https://pypi.org/)，需通过 `pip` 等工具额外安装
- `help('modules')`命令，列出本机所有可用模块

<span style="font-size: 19px;">**导入模块**</span>

`tools.py`
```python
def fool1():
  print('执行了, fool1')
def fool2():
  print('执行了, fool2')

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
<span style="font-size: 19px;">**模块相关信息**</span>

- `dir()`函数，查看模块中包含的类、属性和方法。
- `help()`函数，查看模块、类或是方法的帮助信息。

以双下划线开头，并且以双下划线结尾的是特殊属性：
- `__file__`，用于显示模块文件的位置。
- `__doc__`，用于表示模块的文档字符串，也就是模块的帮助信息。
- `__name__`属性，用于识别程序的使用方式，即程序是在作为模块被导入，还是在独立运行。


<span style="font-size: 19px;">**`__name__`属性**</span>

每个模块都有一个 `__name__` 属性：

- 当脚本被直接运行时：`__name__ == '__main__'`
- 当脚本作为模块导入时：`__name__` 等于模块名(如 `tools`)

### pip

**pip(Python Package Installer)** 是Python生态中官方、成熟的包管理工具，负责从Python包索引(PyPI)查找、下载、安装、卸载和管理第三方库。它极大地简化了Python开发中依赖管理的复杂度。

<span style="font-size: 19px;">**核心命令**</span>

📦 **包管理**
- **安装包**：`pip install <package-name>`。
  - **指定版本**：`pip install <package-name>==1.0.0`。
  - **版本范围**：`pip install "<package-name>>=1.0.0,<2.0.0"`。
  - **升级包**：`pip install --upgrade <package-name>`。
  - **从本地文件安装**：`pip install /path/to/package.whl`。

- **卸载包**：`pip uninstall <package-name>`。
- **列出已安装包**：`pip list`。
- **查看包信息**：`pip show <package-name>`。例如，可以查看其依赖项(Requires)。
- **检查依赖冲突**：`pip check` 用于验证环境中是否有不兼容的依赖包。

⚙️ **高级操作**
- **配置管理**：`pip config list` 查看配置，`pip config set global.index-url <url>` 设置全局镜像源等。
- **缓存管理**：`pip cache dir` 查看缓存目录，`pip cache purge` 清除缓存。
- **生成锁定文件**：`pip freeze > requirements.txt`。
- **从锁定文件安装**：`pip install -r requirements.txt`。

<span style="font-size: 19px;">**配置国内镜像源**</span>

- **临时使用**：
```bash
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple <package-name>
```
- **永久配置**：在用户目录下的pip配置文件（Windows: `%APPDATA%\pip\pip.ini`， Linux/macOS: `~/.pip/pip.conf`）中添加以下内容：

```ini
[global]
index-url = http://mirrors.aliyun.com/pypi/simple/

[install]
trusted-host=mirrors.aliyun.com
```
- **命令行配置**
```bash
pip config set global.index-url https://mirrors.aliyun.com/pypi/simple/
pip config set install.trusted-host mirrors.aliyun.com
# 验证是否生效
pip config list
```



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
- **[::-1]表示逆序**

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

- **bit**：位(b)，二进制数的1个“0”或1个“1”。
- **Byte**：字节(B)，一个8位的二进制数。
- 更大的数据存储单位：KB、MB、GB、TB、EB、PB……
- 数据传输速率(带宽)：bps，比特/秒。
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

- `ord()`函数，返回某个字符所对应的ASCII码(用十进制表示)。
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

### 生成器表达式

生成器表达式是 Python 中用来创建生成器的一种简洁语法，它**惰性求值**，逐个产出(每次只产生一个值)，因此非常节省内存，特别适合处理大量数据。

**语法**

```python
(表达式 for 变量 in 可迭代对象 [if 条件])
```

圆括号 `()` 是标志，与列表推导式的方括号 `[]` 对应。

**示例**

*基本示例*
```python
# 列表推导式：立即生成整个列表
squares_list = [x**2 for x in range(5)]   # [0, 1, 4, 9, 16]

# 生成器表达式：返回生成器对象
squares_gen = (x**2 for x in range(5))    # <generator object>
# 生成器对象可以迭代，每次通过 `next()` 或 `for` 循环获取下一个值：
print(next(squares_gen))  # 0
print(next(squares_gen))  # 1
for val in squares_gen:
    print(val)    # 4, 9, 16
```

*在函数调用中省略括号*
```python
# 计算平方和
sum(x**2 for x in range(100))

# 生成26个字母表
alphabet_str = ''.join(chr(i) for i in range(ord('a'), ord('z') + 1))
```

*带条件的生成器表达式*
```python
even_gen = (x for x in range(10) if x % 2 == 0)
print(list(even_gen))  # [0, 2, 4, 6, 8]
```

**与列表推导式的对比**

| 特性       | 列表推导式               | 生成器表达式           |
|----------|---------------------|-----------------|
| 语法       | `[expr for x in it]` | `(expr for x in it)` |
| 返回值     | 列表(已全部计算)         | 生成器对象(惰性)       |
| 内存占用   | 高(存储所有元素)         | 低(一次只存一个元素)   |
| 适用场景   | 数据量小、需要多次使用     | 数据量大、只遍历一次     |

**性能建议**

- 处理大量数据(如大文件、数据库查询结果)时，优先使用生成器表达式。
- 如果需要多次迭代或支持索引/切片，请使用列表推导式(或转换成列表)。

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

#### map函数

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

### 日志分析

- **pv**: PageView, 网站的访问请求数
- **uv**: UniqueView, 网站独立访客(IP)数,同一天内相同的IP只被记录一次


```python
#!/usr/bin/python

with open('access_log', 'r') as f1, \
    open('access_log-0409', 'w') as f2:
    pv = 0
    ips = set()
    # 状态码
    codes = []
    # 访问的资源(页面)
    webs = []

    for line in f1:
        # 取出 09/Apr 日志
        if  '09/Apr/2026' in line:
            f2.write(line)
            pv = pv + 1
            split_line = line.split()
            ips.add(split_line[0])
            codes.append(split_line[8])
            webs.append(split_line[6])
    print('pv:', pv)
    print('uv:', len(ips))
    print('状态码统计:', {code:codes.count(code) for code in codes})

    webs_dic = {web:webs.count(web) for web in webs}
    print('访问资源统计:', sorted(webs_dic.items(), key=lambda x: x[1], reverse=True ))
```
---

## 自定义函数

**函数(function)**: 一段实现特定功能的代码。

- `dir(__builtins__)`: 列出Python全局内置功能()
  - 内置函数：print()、len()、input()、open()、range()
  - 内置异常：ValueError、TypeError、IndexError
  - 内置类型：int、str、list、dict、bool
  - 内置常量：True、False、None
- `dir(str)`: 列出 **字符串类型(str)** 所有的**属性**和**方法**

<span style="font-size: 19px;">**自定义函数特点**</span>

- **函数名** : 只要是合法标识符即可，为了代码的通读性，通常 用**小写字母 + 下划线**(蛇形命名法)
- **参数**: 0个或者多个, 逗号隔开。
- 有作用域(内部变量外面不能用)
- 函数可以算出结果并return，没有 return 默认返回 None。
- **函数是对象(可以赋值、传递)**: Python 里一切皆对象，函数也可以被赋值、当参数传。

<span style="font-size: 19px;">**自定义函数定义**</span>

- 用 `def` 关键字定义
- 函数体中的内容必须要缩进
- 定义函数帮助文档：将一段字符串放在函数声明之后，函数体之前，并用三引号包起来
- `help(函数名)` 查询函数帮助信息

**参数**

- **位置参数(Positional Arguments)**: 调用函数时按参数定义位置传入的值。
- **可变位置参数(`*args`)**: `*args` 接收任意多个位置参数，将它们打包成一个**元组**。
- **默认参数(Default Arguments)**: 在定义时为参数指定默认值，调用时可省略。

### filter函数

`filter()` 是 Python 内置函数，用于**根据一个函数的返回值(True/False)过滤可迭代对象中的元素**，返回一个**迭代器**(Python 3)或列表(Python 2)。

**语法**

```python
filter(function, iterable)
```
- **function**：判断函数，接收一个参数，返回布尔值(`True` 保留，`False` 过滤掉)。如果为 `None`，则过滤掉所有等效为 `False` 的元素(例如 `0`、`None`、`False`、空序列等)。
- **iterable**：可迭代对象(如列表、元组、字符串等)。

**示例**

```python
# 保留偶数
nums = [1, 2, 3, 4, 5, 6]
even = filter(lambda x: x % 2 == 0, nums)
print(list(even))          # [2, 4, 6]

# function = None：过滤掉假值
items = [0, 1, False, 2, '', 3, None]
truthy = filter(None, items)
print(list(truthy))        # [1, 2, 3]

# 使用普通函数
def is_positive(n):
    return n > 0

result = filter(is_positive, [-3, 0, 5, -1, 8])
print(list(result))        # [5, 8]

```

### lambda表达式

Lambda 表达式是 Python 中创建**小型匿名函数**的一种简洁方式。它主要用于需要简单函数但不想用 `def` 正式定义的地方。

**语法**

```python
lambda 参数列表: 表达式
```
- **参数列表**：逗号分隔的参数(可有默认值，甚至 `*args, **kwargs`)
- **表达式**：单个表达式，该表达式的值就是函数的返回值(**不能包含语句**，如 `return`、`print`、赋值等)

**示例**

```python
# 两数求和
add = lambda x, y: x + y

# sorted 按绝对值排序
nums = [-5, 2, -1, 4]
sorted_nums = sorted(nums, key=lambda x: abs(x))
print(sorted_nums)   # [-1, 2, 4, -5]

# filter 过滤偶数
evens = list(filter(lambda x: x % 2 == 0, range(10)))
print(evens)         # [0, 2, 4, 6, 8]

# map 平方每个元素
squares = list(map(lambda x: x**2, [1, 2, 3]))
print(squares)       # [1, 4, 9]
```
---

## 异常处理

**异常**：程序在没有语法错误的前提下，在运行过程中所产生的特定错误，Python解释器无法检测出来。 
- 异常主要是程序运行时由于某些条件不符合而引发的错误。 
- 比如除0或打开一个不存在的文件。


**异常处理**是 Python 中**优雅地应对程序运行时错误**的机制，避免程序因未处理的错误而崩溃。

**基本结构**

```python
try:
    # 可能引发异常的代码
    result = 10 / 0
except ZeroDivisionError:
    # 捕获特定异常后的处理
    print("除数不能为 0")
except (TypeError, ValueError) as e:
    # 捕获多种异常，并通过 as 获取异常对象
    print(f"出错了：{e}")
else:
    # 无异常发生时执行(可选)
    print("一切正常")
finally:
    # 无论是否异常都会执行(可选，常用于释放资源)
    print("执行清理工作")
```

**常见异常类型**

| 异常                  | 含义                       |
|-----------------------|----------------------------|
| `ZeroDivisionError`   | 除数为 0                   |
| `TypeError`           | 类型错误                   |
| `ValueError`          | 值错误(如 int('abc'))    |
| `IndexError`          | 索引越界                   |
| `KeyError`            | 字典键不存在               |
| `FileNotFoundError`   | 文件不存在                 |
| `AttributeError`      | 对象没有该属性             |
| `ImportError`         | 导入模块失败               |

**捕获所有异常(谨慎使用)**

```python
try:
    risky_code()
except Exception as e:
    print(f"捕获到异常：{e}")
```
> **注意**：`except:`(不指定类型)会捕获 `SystemExit`、`KeyboardInterrupt` 等系统级异常，通常不推荐。使用 `except Exception:` 更安全。

**抛出异常(`raise`)**

```python
def set_age(age):
    if age < 0:
        raise ValueError("年龄不能为负数")
    print(f"年龄设为 {age}")

# 重新抛出异常
try:
    set_age(-5)
except ValueError as e:
    print("处理前：", e)
    raise   # 继续向上传播
```
<span style="font-size: 19px;">**自定义异常**</span>

```python
class MyCustomError(Exception):
    """自定义异常类"""
    pass

class ValidationError(ValueError):
    pass

# 使用
raise MyCustomError("出错了")
```

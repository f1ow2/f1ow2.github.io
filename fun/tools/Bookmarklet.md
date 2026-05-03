# 📍 书签脚本

<span style="font-size: 23px;">**直接拖到标签栏**</span>

## ⬆️ 回到顶部

```javascript
javascript: void (function () {
  document.scrollingElement.scrollIntoView({ behavior: 'smooth' })
})()
```
<a href="javascript:void(function(){document.scrollingElement.scrollIntoView({behavior:'smooth'})})()">回到顶部</a>

## 👁️ 显示密码

```javascript
javascript: void (function () {
  document.querySelectorAll('input[type=password]').forEach(function (dom) {
    dom.setAttribute('type', 'text')
  })
})()
```
<a href="javascript:void(function(){document.querySelectorAll('input[type=password]').forEach(function(dom){dom.setAttribute('type','text')})})()">显示密码</a>



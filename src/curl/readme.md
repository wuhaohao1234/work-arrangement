# curl

windows平台用户请自行下载https://curl.haxx.se/download.html

Linux 命令行：cURL 的十种常见用法 

## 获取页面内容

`curl www.baidu.com`

```
<!DOCTYPE html>
<!--STATUS OK--><html> <head><meta http-equiv=content-type content=text/html;charset=utf-8><meta http-equiv=X-UA-Compatible content=IE=Edge><meta content=always name=referrer><link rel=stylesheet type=text/css href=http://s1.bdstatic.com/r/www/cache/bdorz/baidu.min.css><title>百度一下，你就知道</t
itle></head> <body link=#0000cc> <div id=wrapper> <div id=head> <div class=head_wrapper> <div class=s_form> <div class=s_form_wrapper> <div id=lg> <img hidefocus=true src=//www.baidu.com/img/bd_logo1.png width=270 height=129> </div> <form id=form name=f action=//www.baidu.com/s class=fm> <input type=hidden name=bdorz_come value=1> <input type=hidden name=ie value=utf-8> <input type=hidden name=f value=8> <input type=hidden name=rsv_bp value=1> <input type=hidden name=rsv_idx value=1> <input type=hidden name=tn value=baidu><span class="bg s_ipt_wr"><input id=kw name=wd class=s_ipt value maxlength=255 autocomplete=off autofocus></span><span class="bg s_btn_wr"><input type=submit id=su value=百度一下 class="bg s_btn"></span> </form> </div
> </div> <div id=u1> <a href=http://news.baidu.com name=tj_trnews class=mnav>新闻</a> <a href=http://www.hao123.com name=tj_trhao123 class=mnav>hao12
3</a> <a href=http://map.baidu.com name=tj_trmap class=mnav>地图</a> <a href=http://v.baidu.com name=tj_trvideo class=mnav>视频</a> <a href=http://ti
eba.baidu.com name=tj_trtieba class=mnav>贴吧</a> <noscript> <a href=http://www.baidu.com/bdorz/login.gif?login&amp;tpl=mn&amp;u=http%3A%2F%2Fwww.bai
du.com%2f%3fbdorz_come%3d1 name=tj_login class=lb>登录</a> </noscript> <script>document.write('<a href="http://www.baidu.com/bdorz/login.gif?login&tp
l=mn&u='+ encodeURIComponent(window.location.href+ (window.location.search === "" ? "?" : "&")+ "bdorz_come=1")+ '" name="tj_login" class="lb">登录</
a>');</script> <a href=//www.baidu.com/more/ name=tj_briicon class=bri style="display: block;">更多产品</a> </div> </div> </div> <div id=ftCon> <div
id=ftConw> <p id=lh> <a href=http://home.baidu.com>关于百度</a> <a href=http://ir.baidu.com>About Baidu</a> </p> <p id=cp>&copy;2017&nbsp;Baidu&nbsp;
<a href=http://www.baidu.com/duty/>使用百度前必读</a>&nbsp; <a href=http://jianyi.baidu.com/ class=cp-feedback>意见反馈</a>&nbsp;京ICP证030173号&nbsp
; <img src=//www.baidu.com/img/gs.gif> </p> </div> </div> </div> </body> </html>
```

## 显示 HTTP 头

`curl -I www.baidu.com`

```
HTTP/1.1 200 OK
Accept-Ranges: bytes
Cache-Control: private, no-cache, no-store, proxy-revalidate, no-transform
Connection: Keep-Alive
Content-Length: 277
Content-Type: text/html
Date: Wed, 08 May 2019 10:43:09 GMT
Etag: "575e1f6f-115"
Last-Modified: Mon, 13 Jun 2016 02:50:23 GMT
Pragma: no-cache
Server: bfe/1.0.8.18
```

* 可以同时显示 HTTP 头和文件内容，使用 -i 选项

`curl -i www.baidu.com`

## 将链接保存到文件

`curl www.baidu.com > index.html`

这里可以看到百度的文件是经过压缩的，所以可以找一个其它的网址

`curl http://www.sxfu.org/ > index.html`

## 同时下载多个文件

`curl -o page1.html http://www.codebelief.com/page/1/ -o page2.html http://www.codebelief.com/page/2/`

## 使用 -L 跟随链接重定向

`curl -l www.baidu.com`

## 使用 -A 自定义 User-Agent

我们可以使用 -A 来自定义用户代理，例如下面的命令将伪装成安卓火狐浏览器对网页进行请求：

`curl -A "Mozilla/5.0 (Android; Mobile; rv:35.0) Gecko/35.0 Firefox/35.0" http://www.baidu.com `

这样得到的就是另外一套代码

## 使用 -H 自定义 header

当我们需要传递特定的 header 的时候，可以仿照以下命令来写： 

`curl -H “Referer: www.example.com” -H “User-Agent: Custom-User-Agent” http://www.baidu.com `

以下可以定义cookie

`curl -H “Cookie: JSESSIONID=D0112A5063D938586B659EF8F939BE24” http://www.example.com `

## 使用 -c 保存 Cookie

-c 后面跟上要保存的文件名。 

`curl -c “cookie-example” http://www.example.com`

## 使用 -b 读取 Cookie

·curl -b “JSESSIONID=D0112A5063D938586B659EF8F939BE24” http://www.example.com ·

## 使用 -d 发送 POST 请求

-d 用于指定发送的数据，-X 用于指定发送数据的方式

`curl -d “userName=tom&passwd=123456” -X POST http://www.example.com/login`

在使用 -d 的情况下，如果省略 -X，则默认为 POST 方式：

`curl -d “userName=tom&passwd=123456” http://www.example.com/login`

强制使用 GET 方式 

`curl -d “somedata” -X GET http://www.example.com/api`


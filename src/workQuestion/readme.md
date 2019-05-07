# 工作中遇到的问题

## 名称为纯英文数字等不换行问题

```
.wrap {
    width: 100px;
    word-wrap: break-word;
    word-break: break-all;
}
```

这里存在高度会超出问题

## 各浏览器关于渐变色的适配

```
.main {
  background: linear-gradient(left, #055798, #01b1f8);
  background: -webkit-linear-gradient(left, #055798, #01b1f8);
  background: -ms-linear-gradient(left, #055798, #01b1f8);
  background: -moz--linear-gradient(left, #055798, #01b1f8);
  background: -0--linear-gradient(left, #055798, #01b1f8);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#055798', endColorstr='#01b1f8',GradientType=1 );//默认值，水平
  /*filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#055798', endColorstr='#01b1f8',GradientType=0 );//垂直*/
}
```

## 内容太多需一行显示，显示不全的省略

```
span {
    display: block;
    height: 17px;
    overflow: hidden;
    white-space: nowrap;//一行显示
    text-overflow: ellipsis;//显示不全就省略
} 
```

## js的日期时间格式化

```
//日期格式化
'2016-06-17'.replace(/(\d{4})-(\d{2})-(\d{2})/g,'$1年$2月$3日')
"2016年06月17日";
//日期时间格式化
/**方法1**/
// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
interface Io {
    [key: string]: any
}
function format(fmt: string): string {
    let myDate = new Date()
    let o: Io = {
        "M+": myDate.getMonth() + 1,
        "d+": myDate.getDate(),
        "h+": myDate.getHours(), 
        "m+": myDate.getMinutes(), 
        "s+": myDate.getSeconds(),
        "q+": Math.floor((myDate.getMonth() + 3) / 3),
        "S": myDate.getMilliseconds() 
    }
    if (/(y+)/.test(fmt)){
        fmt = fmt.replace(RegExp.$1, (myDate.getFullYear() + "").substr(4 - RegExp.$1.length));
    } 
    let k: string
    for (k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) { 
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? 
                    (o[k]) : 
                    (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt
}
let time1 = format("yyyy-MM-dd");
let time2 = format("yyyy-MM-dd hh:mm:ss");
console.log(time1)
console.log(time2)
```

## 在html的头部加入meta使得所有的资源请求由http请求转成https请求

```
<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
```
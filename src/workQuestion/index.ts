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
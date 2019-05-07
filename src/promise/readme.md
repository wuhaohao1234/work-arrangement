# promise入门

## promise基础

这里不说promise.all与promise.race

三种状态

pedding 等等

resolve 成功

reject 失败

```
new Promise((resolve, reject) => {
    if 成功
        resolve(成功)
    else 失败
        reject(失败)
}).then(res => {
    res // 成功
    return 成功继续
}, err => {
    err // 失败
    return 失败继续
}).then(res => {
    res // 成功继续
}, err => {
    err // 失败继续
})
```

或者

```
.then(res => {

}, err => {

})

// 等价于

.then(res => {

}).catch(err => {

})
```
## 浏览器事件循环机制

* 宏任务:

代码块,setTimeout,setInterval

* 微任务

promise.resolve

### 执行顺序

先执行一轮宏任务: 同步的js代码

遇到微任务: 执行微任务

再执行一轮宏任务: 异步的js代码

遇到微任务: 执行微任务


## example

```
setTimeout(() => {
    console.log('定时器')
}, 0)

new Promise((resolve, reject) => {
    console.log('这是宏任务')
    resolve('微任务')
}).then((res: string) => {
    console.log(res)
    return new Error('错误')
}).then((res) => {
    console.log(res)
}).catch((err) => {
    console.log(err)
})
console.log('这是全局下的宏任务')
```

宏任务

这是全局下的宏任务

微任务

错误

定时器

## example2

```
setTimeout(() => {
    console.log('定时器')
}, 0)

new Promise((resolve, reject) => {
    console.log('这是宏任务')
    setTimeout(() => {
        console.log('这是宏任务里面的定时器')
        resolve('微任务')
    }, 0);
}).then((res: string) => {
    console.log(res)
    return new Error('错误')
}).then((res) => {
    console.log(res)
}).catch((err) => {
    console.log(err)
})
console.log('这是全局下的宏任务')
```

这是宏任务

这是全局下的宏任务

定时器

这是宏任务里面的定时器

微任务

错误
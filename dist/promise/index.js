setTimeout(() => {
    console.log('定时器');
}, 0);
new Promise((resolve, reject) => {
    console.log('这是宏任务');
    setTimeout(() => {
        console.log('这是宏任务里面的定时器');
        resolve('微任务');
    }, 0);
}).then((res) => {
    console.log(res);
    return new Error('错误');
}).then((res) => {
    console.log(res);
}).catch((err) => {
    console.log(err);
});
console.log('这是全局下的宏任务');
//# sourceMappingURL=index.js.map
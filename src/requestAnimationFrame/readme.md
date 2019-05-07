# requestAnimationFrame

## Event Loop都干了些什么

* 执行同步代码
* 执行当前队列尾部所有微任务
* 必要的话渲染UI（浏览器是60hz刷新率，所以16ms一帧更新一次UI）

    * resize/scroll事件（16Ms一次，自带节流）
    * 判断是否触发media query
    * 更新动画发送事件
    * 全屏操作事件
    * 执行requestAnimationFrame回调
    * 执行intersectionObserver回调
    * 更新UI
    * 如果还有时间，自行requestldleCallback

浏览器重绘频率一般会和显示器的刷新率保持同步。比如显示器屏幕刷新率为 60Hz，使用requestAnimationFrame API，那么回调函数就每1000ms / 60 ≈ 16.7ms执行一次。

requestAnimationFrame 会把每一帧中的所有 DOM 操作集中起来，在一次重绘或回流中就完成，并且重绘或回流的时间间隔紧紧跟随浏览器的刷新频率。通过定时器 setTimeout 或者 setInterval实现动画。但是定时器动画第一是动画的循时间环间隔不好确定，设置长了动画显得不够平滑流畅，设置短了浏览器的重绘频率会达到瓶颈，第二个问题是定时器第二个时间参数只是指定了多久后将动画任务添加到浏览器的UI线程队列中，如果UI线程处于忙碌状态，那么动画不会立刻执行。为了解决这些问题，H5 中加入了 requestAnimationFrame。

## 性能

谈到性能，我们再回到上文的Event Loop。当你打开一个 浏览器Tab 页时，其实就是创建了一个进程，一个进程中可以有多个线程，比如渲染线程、JS 引擎线程、HTTP 请求线程等等。当你发起一个请求时，其实就是创建了一个线程，当请求结束后，该线程可能就会被销毁。 JS 运行的时候可能会阻止 UI 渲染，这说明了两个线程是互斥的。

所以在低端机上setTimeout偶尔卡顿，是因为它是需要等待主线程代码执行的。如果队列前面已经加入了其他任务，那动画代码就要等前面的任务完成后再添加到【浏览器 UI 线程队列】。而且刷新频率受屏幕分辨率和屏幕尺寸影响，不同设备的屏幕刷新率可能不同，setTimeout只能设置固定的时间间隔，这个时间和屏幕刷新间隔可能不同。这都会引起执行步调和屏幕的刷新步调不一致，引起丢帧。

另外，当页面处于未激活的状态下requestAnimationFrame也是暂停执行的，这也会改进性能。

**。它能保证回调函数在屏幕每一次的刷新间隔中只被执行一次，这样就不会引起丢帧现象，也不会导致动画出现卡顿的问题。**

```
var total = 100000;
var size = 100;
var count = total / size;
var done = 0;
var ul = document.getElementById('list');

function addItems() {
    var li = null;
    var fg = document.createDocumentFragment();
    for (var i = 0; i < size; i++) {
        li = document.createElement('li');
        li.innerText = 'item ' + (done * size + i);
        fg.appendChild(li);
    }
    ul.appendChild(fg);
    done++;
    if (done < count) {
        requestAnimationFrame(addItems);
    }
};

requestAnimationFrame(addItems);

```

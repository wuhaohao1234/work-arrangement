# console常用API

## String subs

与 console.log() 这一方法紧密相关的唯一事情是你可以将它与所谓的 字符串替换 一同使用。这基本上就是为你提供了使用字符串特定表达式的选项，然后将其替换为提供的参数。它看起来有点像这样：

```
console.log("Object value: %o with string substitution",
    {string: "str", number: 10});
```

* %o / %O — 用于对象;
* %d / %i — 用于整数;
* %s — 用于字符串;
* %f — 用于浮点数;

## CSS

我们再学一种以往尚未学过的类子字符串编译指令，就是 %c，它允许你应用 css 风格的 字符串去记录信息

```
console.log("Example %cCSS-styled%c %clog!",
    "color: red; font-family: monoscope;",
    "", "color: green; font-size: large; font-weight: bold");
```

上面的例子是 %c 指令的广泛应用。正如你所见到的那样，样式应用于处在该编译指令 后面 的所有内容，除非你使用其他的编译指令，而这是我们正要做的。如果你使用普通的无样式的 log 格式，你将需要传递一个空字符串。不言而喻，这个提供给 %c 编译指令和子字符串的值需要按照预期的顺序一个一个地提交给下一步的参数。

## Grouping

加入过多的 console log 并不是很健康，它可能导致更糟糕的可读性，从而出现无意义的 log 的情形。然而适当地建立一些 结构 总是好的。你可以通过使用 [console.group()](https://developer.mozilla.org/en-US/docs/Web/API/Console/group) 的方法精准地实现。通过使用该方法，你可以在 console group 中创建深层次的、可折叠的结构，这允许你隐藏并组织你的 log。如果你希望在默认情况下将 log group 折叠，还有一个方法是使用 [console.groupCollapsed()](https://developer.mozilla.org/en-US/docs/Web/API/Console/groupCollapsed)。当然，console group 可以根据你的需要进行嵌套（就像你想的那样）。你还可以通过向其传递参数列表来使得你的 log group 具有类 header-log（就像使用 console.log()）。在调用 log group 方法后完成，每个控制台调用都将在创建的组中找到它的位置。要退出的话，需要使用一个特殊的方法叫做 [console.groupEnd()](https://developer.mozilla.org/en-US/docs/Web/API/Console/groupEnd)。

```
console.group();
console.log("Inside 1st group");
console.group();
console.log("Inside 2nd group");
console.groupEnd();
console.groupEnd();
console.log("Outer scope");
```

## Tracing

另外一个关于 Console API 的有用的信息是获取当前调用的路径（执行路径/堆栈跟踪）。你知道吗，代码列表通过放置了被执行的链接（例如函数链接）去获取当前的调用 [console.trace()](https://developer.mozilla.org/en-US/docs/Web/API/Console/trace)，这也正式是我们所谈论的方法。无论是检测副作用还是检查代码流，这些信息都非常有用。只需将下面的代码放到你的代码中。

```
console.trace("Logging the way down here!");
```

## Warning

警告

```
console.warn("This is a warning!");
```

## Error

报错

```
console.error("This is an error!");
```

## 参考

https://juejin.im/post/5cc1517e5188252e7a0247dd
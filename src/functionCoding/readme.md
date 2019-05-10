# 函数式编程

函数式编程的第一个特点就是可以把函数作为参数传递给另一个函数，也就是所谓的高阶函数。

函数式编程的第二个特点就是可以返回一个函数，这样就可以实现闭包或者惰性计算：

以上两个特点还仅仅是简化了代码。从代码的可维护性上讲，函数式编程最大的好处是引用透明，即函数运行的结果只依赖于输入的参数，而不依赖于外部状态，因此，我们常常说函数式编程没有副作用。

## python中的高阶函数

```
def add(x, y, f):
    return f(x) + f(y)

print(add(10,-10,abs))
```

### python中的map与reduce

map()函数接收两个参数，一个是函数，一个是Iterable，map将传入的函数依次作用到序列的每个元素，并把结果作为新的Iterator返回。

```
def f(x):
    return x * x

r = map(f, [1,2,3,4,5])

print(list(r))
```

map()传入的第一个参数是f，即函数对象本身。由于结果r是一个Iterator，Iterator是惰性序列，因此通过list()函数让它把整个序列都计算出来并返回一个list。(这里之所以用list,是因为r是一个 buffer，观看不是特好)

map()作为高阶函数，事实上它把运算规则抽象了，因此，我们不但可以计算简单的f(x)=x2，还可以计算任意复杂的函数

### reduce

需要从functools中导入reduce

```
from functools import reduce

def add(x, y): 
    return x + y

print(reduce(add, [1, 2, 3, 4, 5]))
```

### filter

Python内建的filter()函数用于过滤序列。

```
def is_odd(n):
    return n % 2 == 1

list(filter(is_odd, [1, 2, 4, 5, 6, 9, 10, 15]))
# 结果: [1, 5, 9, 15]
```

### sorted(排序)

Python内置的sorted()函数就可以对list进行排序：

### 返回函数

高阶函数除了可以接受函数作为参数外，还可以把函数作为结果值返回。

```
def lazy_sum(*args):
    def sum():
        ax = 0
        for n in args:
            ax = ax + n
        return ax
    return sum

f = lazy_sum(1, 3, 5, 7, 9)

print(f())
```

f为返回的函数，f执行后拿到结果

### 闭包

注意到返回的函数在其定义内部引用了局部变量args，所以，当一个函数返回了一个函数后，其内部的局部变量还被新函数引用，所以，闭包用起来简单，实现起来可不容易。

```
def count():
    fs = []
    for i in range(2, 5):
        def f():
             return i*i
        fs.append(f)
    return fs

f1, f2, f3 = count()

print(f1())
print(f2())
print(f3())
```

上面的例子中，每次循环，都创建了一个新的函数，然后，把创建的3个函数都返回了。原以为是1,4,9，其实是9,9,9

原因就在于返回的函数引用了变量i，但它并非立刻执行。等到3个函数都返回时，它们所引用的变量i已经变成了3，因此最终结果为9。

**返回闭包时牢记一点：返回函数不要引用任何循环变量，或者后续会发生变化的变量。**

如果一定要引用循环变量怎么办？方法是再创建一个函数，用该函数的参数绑定循环变量当前的值，无论该循环变量后续如何更改，已绑定到函数参数的值不变：

### 匿名函数

当我们在传入函数时，有些时候，不需要显式地定义函数，直接传入匿名函数更方便。

```
 list(map(lambda x: x * x, [1, 2, 3, 4, 5, 6, 7, 8, 9]))
```

通过对比可以看出，匿名函数lambda x: x * x实际上就是：

```
def f(x):
    return x * x
```

### 装饰器

decorator就是一个返回函数的高阶函数。所以，我们要定义一个能打印日志的decorator，可以定义如下：

```
def log(func):
    def wrapper(*args, **kw):
        print('call %s():' % func.__name__)
        return func(*args, **kw)
    return wrapper
```

观察上面的log，因为它是一个decorator，所以接受一个函数作为参数，并返回一个函数。我们要借助Python的@语法，把decorator置于函数的定义处：

```
@log
def now():
    print('2015-3-25')
```

调用now()函数，不仅会运行now()函数本身，还会在运行now()函数前打印一行日志：

```
now()
```

### 偏函数

```
int('12345', base=8)
```

打印出: 5349

当我们需要一个int2可以直接打印的话

```
def int2(x, base = 8):
    retrun int(x, base)

int2('10000')
```

functools.partial就是帮助我们创建一个偏函数的，不需要我们自己定义int2()，可以直接使用下面的代码创建一个新的函数int2：

```
import functools

int2 = functools.partial(int, base=2)
print(int2('100000'))
```

## ts中的函数式编程

### compose(合成)

现在有 toUpperCase、reverse、head 三个函数, 分别如下:

```
var toUpperCase = (str) => str.toUpperCase()
var reverse = (arr) => arr.reverse()
var head = (arr) => arr[0]
```

接着使用它们实现将数组末位元素大写化输出, 可以这样做:

```
var reverseHeadUpperCase = (arr) => toUpperCase(head(reverse(arr)))
reverseHeadUpperCase(['apple', 'banana', 'peach']) // PEACH
```

此时在构建 reverseHeadUpperCase 函数的时候, 必须手动声明传入参数 arr, 是否能提供一个 compose 函数让使用者更加友好的使用呢? 类似如下形式:

```
compose(compose(toUpperCase, head), reverse)
compose(toUpperCase, compose(head, reverse))
compose(toUpperCase, head, reverse)
```
compose函数
```
var compose = (...args) => (initValue) => args.reduceRight((a, c) => c(a), initValue)
```

### 柯里化(curry)


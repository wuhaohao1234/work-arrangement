# 变量可以指向函数

# abs函数接收一个数字，返回这个数字的整数
# 将abs函数的引用赋值给f
# f = abs

# print(f(-10))

# def add(x, y, f):
#     return f(x) + f(y)

# print(add(10,-10,abs))

# def f(x):
#     return x * x

# r = map(f, [1,2,3,4,5])

# print(list(r))

# from functools import reduce

# def add(x, y): 
#     return x + y

# print(reduce(add, [1, 2, 3, 4, 5]))

# from functools import reduce

# DIGITS = {'0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9}

# def char2num(s):
#     return DIGITS[s]

# def str2int(s):
#     return reduce(lambda x, y: x * 10 + y, map(char2num, s))

# def is_odd(n):
#     return n % 2 == 1

# result = list(filter(is_odd, [1, 2, 4, 5, 6, 9, 10, 15]))

# print(result)

# print( sorted([36, 5, -12, 9, -21]))

# def lazy_sum(*args):
#     def sum():
#         ax = 0
#         for n in args:
#             ax = ax + n
#         return ax
#     return sum

# f = lazy_sum(1, 3, 5, 7, 9)

# print(f())

# def count():
#     fs = []
#     for i in range(2, 5):
#         def f():
#              return i*i
#         fs.append(f)
#     return fs

# f1, f2, f3 = count()

# print(f1())
# print(f2())
# print(f3())

# def count():
#     def f(j):
#         def g():
#             return j*j
#         return g
#     fs = []
#     for i in range(1, 4):
#         fs.append(f(i)) # f(i)立刻被执行，因此i的当前值被传入f()
#     return fs

# f1, f2, f3 = count()

# print(f1())
# print(f2())
# print(f3())

# print(list(map(lambda x: x * x, [1, 2, 3, 4, 5, 6, 7, 8, 9])))

# def log(func):
#     def wrapper(*args, **kw):
#         print('call %s():' % func.__name__)
#         return func(*args, **kw)
#     return wrapper

# @log
# def now():
#     print('2015-3-25')

# now()

import functools

int2 = functools.partial(int, base=2)

print(int2('100000'))

# typescript

## 编译上下文

编译上下文算是一个比较花哨的术语，它用来给文件分组，告诉 TypeScript 哪些文件是有效的，哪些是无效的。除了有效文件所携带信息外，编译上下文也包含了有哪些编译选项正在使用。定义这种逻辑分组，一个比较好的方式是使用 tsconfig.json 文件。

### tsconfig.json

```
{
  "compilerOptions": {

    /* 基本选项 */
    "target": "es5",                       // 指定 ECMAScript 目标版本: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', or 'ESNEXT'
    "module": "commonjs",                  // 指定使用模块: 'commonjs', 'amd', 'system', 'umd' or 'es2015'
    "lib": [],                             // 指定要包含在编译中的库文件
    "allowJs": true,                       // 允许编译 javascript 文件
    "checkJs": true,                       // 报告 javascript 文件中的错误
    "jsx": "preserve",                     // 指定 jsx 代码的生成: 'preserve', 'react-native', or 'react'
    "declaration": true,                   // 生成相应的 '.d.ts' 文件
    "sourceMap": true,                     // 生成相应的 '.map' 文件
    "outFile": "./",                       // 将输出文件合并为一个文件
    "outDir": "./",                        // 指定输出目录
    "rootDir": "./",                       // 用来控制输出目录结构 --outDir.
    "removeComments": true,                // 删除编译后的所有的注释
    "noEmit": true,                        // 不生成输出文件
    "importHelpers": true,                 // 从 tslib 导入辅助工具函数
    "isolatedModules": true,               // 将每个文件做为单独的模块 （与 'ts.transpileModule' 类似）.

    /* 严格的类型检查选项 */
    "strict": true,                        // 启用所有严格类型检查选项
    "noImplicitAny": true,                 // 在表达式和声明上有隐含的 any类型时报错
    "strictNullChecks": true,              // 启用严格的 null 检查
    "noImplicitThis": true,                // 当 this 表达式值为 any 类型的时候，生成一个错误
    "alwaysStrict": true,                  // 以严格模式检查每个模块，并在每个文件里加入 'use strict'

    /* 额外的检查 */
    "noUnusedLocals": true,                // 有未使用的变量时，抛出错误
    "noUnusedParameters": true,            // 有未使用的参数时，抛出错误
    "noImplicitReturns": true,             // 并不是所有函数里的代码都有返回值时，抛出错误
    "noFallthroughCasesInSwitch": true,    // 报告 switch 语句的 fallthrough 错误。（即，不允许 switch 的 case 语句贯穿）

    /* 模块解析选项 */
    "moduleResolution": "node",            // 选择模块解析策略： 'node' (Node.js) or 'classic' (TypeScript pre-1.6)
    "baseUrl": "./",                       // 用于解析非相对模块名称的基目录
    "paths": {},                           // 模块名到基于 baseUrl 的路径映射的列表
    "rootDirs": [],                        // 根文件夹列表，其组合内容表示项目运行时的结构内容
    "typeRoots": [],                       // 包含类型声明的文件列表
    "types": [],                           // 需要包含的类型声明文件名列表
    "allowSyntheticDefaultImports": true,  // 允许从没有设置默认导出的模块中默认导入。

    /* Source Map Options */
    "sourceRoot": "./",                    // 指定调试器应该找到 TypeScript 文件而不是源文件的位置
    "mapRoot": "./",                       // 指定调试器应该找到映射文件而不是生成文件的位置
    "inlineSourceMap": true,               // 生成单个 soucemaps 文件，而不是将 sourcemaps 生成不同的文件
    "inlineSources": true,                 // 将代码与 sourcemaps 生成到一个文件中，要求同时设置了 --inlineSourceMap 或 --sourceMap 属性

    /* 其他选项 */
    "experimentalDecorators": true,        // 启用装饰器
    "emitDecoratorMetadata": true          // 为装饰器提供元数据的支持
  }
}
```

## TypeScript 编译

好的 IDE 支持对 TypeScript 的即时编译。但是，如果你想在使用 tsconfig.json 时从命令行手动运行 TypeScript 编译器，你可以通过以下方式：

* 运行 tsc，它会在当前目录或者是父级目录寻找 tsconfig.json 文件。

* 运行 tsc -p ./path-to-project-directory 。当然，这个路径可以是绝对路径，也可以是相对于当前目录的相对路径。

你甚至可以使用 tsc -w 来启用 TypeScript 编译器的观测模式，在检测到文件改动之后，它将重新编译。


你也可以显式指定需要编译的文件：
```
{
  "files": [
    "./some/file.ts"
  ]
}
```

或者，你可以使用 include 和 exclude 选项来指定需要包含的文件，和排除的文件：

```
{
  "include": [
    "./folder"
  ],
  "exclude": [
    "./folder/**/*.spec.ts",
    "./folder/someSubFolder"
  ]
}
```

使用 globs：**/* （一个示例用法：some/folder/**/*）意味着匹配所有的文件夹和所有文件（扩展名为 .ts/.tsx，当开启了 allowJs: true 选项时，扩展名可以是 .js/.jsx）。

## 声明空间

在 TypeScript 里存在两种声明空间：类型声明空间与变量声明空间。我将会在下文中和大家讨论这两个概念。

类型声明空间包含用来当做类型注解的内容，例如以下的一些类型声明：

```
class Foo {}
const someVar = Foo;
const someOtherVar = 123;
```

**我们并不能使用一些像 interface 定义的内容，来当做变量使用。**

一些像你用 var 声明的变量，也仅能在变量声明空间使用，不能用作类型注解。

```
const foo = 123;
let bar: foo; // ERROR: "cannot find name 'foo'"
```

## 模块

### 全局模块

默认情况下，当你开始在一个新的 TypeScript 文件中写下代码时，它处于全局命名空间中。如在 foo.ts 里的以下代码：

```
const foo = 123;
```

如果你在相同的项目里创建了一个新的文件 bar.ts，TypeScript 类型系统将会允许你使用变量 foo，就好像它在全局可用一样：

```
const bar = foo; // allowed
```

毋庸置疑，使用全局变量空间是危险的，因为它会与文件内的代码命名冲突。我们推荐使用下文中将要提到的文件模块。

## 文件模块

它也被称为外部模块。如果在你的 TypeScript 文件的根级别位置含有 import 或者 export，它会在这个文件中创建一个本地的作用域。因此，我们需要把上文 foo.ts 改成如下方式（注意 export 用法）：

```
export const foo = 123;
```

在全局命名空间里，我们不再有 foo，这可以通过创建一个新文件 bar.ts 来证明：

```
const bar = foo; // ERROR: "cannot find name 'foo'"
```

如果你想在 bar.ts 里使用来自 foo.ts 的内容，你必须显式导入它，更新 bar.ts 如下所示：

```
import { foo } from './foo';
const bar = foo; // allow
```

在 bar.ts 文件里使用 import，不但允许你使用从其他文件导入的内容，而且它会将此文件 bar.ts 标记为一个模块，文件内定义的声明也不会污染全局命名空间。

### 文件模块详情

文件模块拥有强大的能力和可用性。在这里，我们来讨论它的能力以及一些用法。

**澄清：commonjs, amd, es modules, others**

首先，我们需要澄清这些模块系统的不一致性。我将会提供给你我当前的建议，以及消除一些顾虑。

你可以根据不同的 module 选项来把 TypeScript 编译成不同的 JavaScript 模块类型，这有一些你可以忽略的：

* AMD：不要使用它，它仅能在浏览器工作；

* SystemJS：这是一个好的实验，已经被 ES 模块替代；

* ES 模块：它并没有准备好。

使用 module: commonjs 选项来替代这些模式，这会是一个好的主意。

怎么书写 TypeScript 模块，这也是一件让人困惑的事。在今天我们应该这么做：

* import foo = require('foo') 例如： import/require 使用 ES 模块语法。

### ES 模块语法

使用 export 关键字导出一个变量（或者类型）：

```
export const someVar = 123;
export type SomeType = {
  foo: string;
};
```

export 的写法除了上面这样，还有另外一种：

```
// foo.ts
const someVar = 123;
type someType = {
  type: string;
};

export { someVar, someType };
```

你也可以重命名变量导出：

```
const someVar = 123;
export { someVar as aDifferentName };
```

使用 import 关键字导入一个变量或者是一个类型：

```
import { someVar as aDifferentName } from './foo';
```

除了指定加载某个输出值，还可以使用整体加载，即用星号（*）指定一个对象，所有输出值都加载在这个对象上面：

```
import * as foo from './foo';
// 你可以使用 `foo.someVar` 和 `foo.someType` 以及其他任何从 `foo` 导出的变量或者类型
```

### 默认导入／导出

```
// some var
export default (someVar = 123);

// some function
export default function someFunction() {}

// some class
export default class someClass {}
```

### 模块路径

假设你使用 moduleResolution: node 选项。这个选项应该在你 TypeScript 配置文件里。如果你使用了 module: commonjs 选项， moduleResolution: node 将会默认开启。

这里存在两种不同截然不同的模块，它们是由导入语句中的不同的路径写法所引起的（例如：import foo from 'THIS IS THE PATH SECTION'）。

* 相对模块路径（路径以 . 开头，例如：./someFile 或者 ../../someFolder/someFile 等）；

* 其他动态查找模块（如：core-js，typestyle，react 或者甚至是 react/core 等）。

它们的主要区别来自于系统如何解析模块。

### 相对模块路径

* 如果文件 bar.ts 中含有 import * as foo from './foo'，foo 文件所存在的地方必须是相同文件夹下；

* 如果文件 bar.ts 中含有 import * as foo from '../foo'，foo 文件所存在的地方必须是上一级目录；

* 如果文件 bar.ts 中含有 import * as foo from '../someFolder/foo'，foo 文件所在的文件夹 someFolder 必须与 bar.ts 所在文件夹在相同的目录下。

### 动态查找

当导入路径不是相对路径时，模块解析将会模仿 Node 模块解析策略

当你使用 import * as foo from 'foo'，将会按如下顺序查找模块：

```
./node_modules/foo
../node_modules/foo
../../node_modules/foo
直到系统的根目录
```

当你使用 import * as foo from 'something/foo'，将会按照如下顺序查找内容

```
./node_modules/something/foo
../node_modules/something/foo
../../node_modules/something/foo
直到系统的根目录
```

### 什么是 place

当我提及被检查的 place 时，我想表达的是在这个 place，TypeScript 将会检查以下内容（例如一个 foo 的位置）：

* 如果这个 place 表示一个文件，如：foo.ts，欢呼！

* 否则，如果这个 place 是一个文件夹，并且存在一个文件 foo/index.ts，欢呼！

* 否则，如果这个 place 是一个文件夹，并且存在一个 foo/package.json 文件，在该文件中指定 types 的文件存在，那么就欢呼！

* 否则，如果这个 place 是一个文件夹，并且存在一个 package.json 文件，在该文件中指定 main 的文件存在，那么就欢呼！

从文件类型上来说，我实际上是指 .ts， .d.ts 或者 .js

就是这样，现在你已经是一个模块查找专家（这并不是一个小小的成功）。

### 重写类型的动态查找

在你的项目里，你可以通过 declare module 'somePath' 来声明一个全局模块的方式，用来解决查找模块路径的问题：

```
// globals.d.ts
declare module 'foo' {
  // some variable declarations
  export var bar: number;
}
```

接着：

```
// anyOtherTsFileInYourProject.ts
import * as foo from 'foo';
// TypeScript 将假设（在没有做其他查找的情况下）
// foo 是 { bar: number }
```

### import/require 仅仅是导入类型
以下导入语法：

```
import foo = require('foo');
```

* 导入 foo 模块的所有类型信息；
* 确定 foo 模块运行时的依赖关系。

你可以选择仅加载类型信息，而没有运行时的依赖关系。在继续之前，你可能需要重新阅读本书的 声明空间部分 部分。

如果你没有把导入的名称当做变量声明空间来用，在编译成 JavaScript 时，导入的模块将会被完全移除。这有一些较好的例子，当你了解了它们之后，我们将会给出一些使用例子。

demo1

```
import foo = require('foo');
```

将会编译成 JavaScript：

```

```

demo2

```
import foo = require('foo');
var bar: foo;
```

编译为

```
let bar;
```

这是因为 foo （或者其他任何属性如：foo.bas）没有被当做一个变量使用

demo3

```
import foo = require('foo');
const bar = foo;
```

将会被编译成（假设是 commonjs）：

```
const foo = require('foo');
const bar = foo;
```

### 使用例子：懒加载

类型推断需要提前完成，这意味着，如果你想在 bar 文件里，使用从其他文件 foo 导出的类型，你将不得不这么做：

```
import foo = require('foo');
let bar: foo.SomeType;
```

然而，在某些情景下，你只想在需要时加载模块 foo，此时你需要仅在类型注解中使用导入的模块名称，而不是在变量中使用。在编译成 JavaScript 时，这些将会被移除。接着，你可以手动导入你需要的模块。

做为一个例子，考虑以下基于 commonjs 的代码，我们仅在一个函数内导入 foo 模块：

```
import foo = require('foo');

export function loadFoo() {
  // 这是懒加载 foo，原始的加载仅仅用来做类型注解
  const _foo: typeof foo = require('foo');
  // 现在，你可以使用 `_foo` 替代 `foo` 来做为一个变量使用
}
```

一个同样简单的 amd 模块（使用 requirejs）：

```
import foo = require('foo');

export function loadFoo() {
  // 这是懒加载 foo，原始的加载仅仅用来做类型注解
  require(['foo'], (_foo: typeof foo) => {
    // 现在，你可以使用 `_foo` 替代 `foo` 来做为一个变量使用
  });
}
```

这些通常在以下情景使用

* 在 web app 里， 当你在特定路由上加载 JavaScript 时；
* 在 node 应用里，当你只想加载特定模块，用来加快启动速度时。

### 使用例子：打破循环依赖

类似于懒加载的使用用例，某些模块加载器（commonjs/node 和 amd/requirejs）不能很好的处理循环依赖。在这种情况下，一方面我们使用延迟加载代码，并在另一方面预先加载模块是很实用的。

使用例子：确保导入

当你加载一个模块，只是想引入其附加的作用（如：模块可能会注册一些像 CodeMirror addons）时，然而，如果你仅仅是 import/require （导入）一些并没有与你的模块或者模块加载器有任何依赖的 JavaScript 代码，（如：webpack），经过 TypeScript 编译后，这些将会被完全忽视。在这种情况下，你可以使用一个 ensureImport 变量，来确保编译的 JavaScript 依赖与模块。如：

```
import foo = require('./foo');
import bar = require('./bar');
import bas = require('./bas');

const ensureImport: any = foo || bar || bas;
```

### globals.d.ts

在上文中，当我们讨论文件模块时，比较了全局变量与文件模块，并且我们推荐使用基于文件的模块，而不是选择污染全局命名空间。

然而，如果你的团队里有 TypeScript 初学者，你可以提供他们一个 globals.d.ts 文件，用来将一些接口或者类型放入全局命名空间里，这些定义的接口和类型能在你的所有 TypeScript 代码里使用。

* globals.d.ts 是一种扩充 lib.d.ts 很好的方式，如果你需要。

* 当你从 TS 迁移到 JS 时，定义 declare module "some-library-you-dont-care-to-get-defs-for" 能让你快速开始。

## 命名空间

```
(function(something) {
  something.foo = 123;
})(something || (something = {}));
```

something || (something = {}) 允许匿名函数 function (something) {} 添加属性至已经存在的对象上，或者会创建一个新对象，然后添加属性至新对象上，这意味着你可以拥有由某些边界拆成的不同的块：

```
(function(something) {
  something.foo = 123;
})(something || (something = {}));

console.log(something);
// { foo: 123 }

(function(something) {
  something.bar = 456;
})(something || (something = {}));

console.log(something); // { foo: 123, bar: 456 }
```

在确保创建的变量不会泄漏至全局变量中时，这种方式在 JavaScript 中很常见。当使用基于文件模块时，你无须担心这点，但是此种方式，仍然适用于合理的函数逻辑分组中。因此 TypeScript 提供了 namespace 关键字用来描述这种分组，如下所示：

```
namespace Utility {
  export function log(msg) {
    console.log(msg);
  }
  export function error(msg) {
    console.log(msg);
  }
}

// usage
Utility.log('Call me');
Utility.error('maybe');
```

namespace 关键字通过 TypeScript 编译后，与我们看到的 JavaScript 代码一样

```
(function (Utility) {
  // 添加属性至 Utility
})(Utility || Utility = {});
```

有一点值得注意的是，命名空间是支持嵌套的。因此，你可以做一些类似于在 Utility 命名空间下嵌套一个命名空间 Messaging 的事情。

对大多数项目来说，我们推荐使用一个使用 namespace 的外部的模块，用来快速的演示和移植旧的 JavaScript 代码。

## 动态导入表达式

动态导入表达式是 ECMASript 的一个新功能，它允许你在你程序的任意地方异步加载一个模块，TC39 JavaScript 委员会有这样一个处于 stage 3 的一个提案，它被称为 import() proposal for JavaScript。

此外，webpack bundler 有一个 Code Splitting 的功能，它能允许你将代码拆分为许多块，这些块在将来可被异步下载。因此，你可以在程序中首先提供一个最小的程序启动包，并在将来异步加载其他模块。

这很自然的想到（如果我们工作在 webpack dev 的工作流程）TypeScript 2.4 dynamic import expressions 将会把你最终生成的 JavaScript 代码自动分割成很多块。但是这似乎并不容易实现，因为它依赖于我们正在使用的 tsconfig.json 配置文件。

webpack 实现代码分割的方式有两种：使用 import() （首选，ECMAScript 的提案）和 require.ensure() （最后考虑，webpack 具体实现）。因此，我们期望 TypeScript 的输出是保留 import() 语句，而不是将其转化为其他任何代码。

如下例子，我希望懒加载 moment 库，同时我也希望使用代码分割的功能，这意味 moment 会被分割到一个单独的 JavaScript 文件，当它被使用时，会被异步加载。

```
import(/* webpackChunkName: "momentjs" */ 'moment')
  .then(moment => {
    // 懒加载的模块拥有所有的类型，并且能够按期工作
    // 类型检查会工作，代码引用也会工作  :100:
    const time = moment().format();
    console.log('TypeScript >= 2.4.0 Dynamic Import Expression:');
    console.log(time);
  })
  .catch(err => {
    console.log('Failed to load moment', err);
  });
```

这是 tsconfig.json 的配置文件：

```
{
  "compilerOptions": {
    "target": "es5",
    "module": "esnext",
    "lib": [
      "dom",
      "es5",
      "scripthost",
      "es2015.promise"
    ],
    "jsx": "react",
    "declaration": false,
    "sourceMap": true,
    "outDir": "./dist/js",
    "strict": true,
    "moduleResolution": "node",
    "typeRoots": [
      "./node_modules/@types"
    ],
    "types": [
      "node",
      "react",
      "react-dom"
    ]
  }
}
```

## TypeScript 类型系统

* TypeScript 类型系统设计是可选的，因此，你的 JavaScript 即是 TypeScript;

* TypeScript 不会阻止 JavaScript 的运行，即使存在类型错误也不例外，这能让你的 JavaScript 逐步迁移至 TypeScript。

### 基本注解

如前文所提及，类型注解使用 :TypeAnnotation 语法。类型声明空间中可用的任何内容都可以用作类型注解。

在下面这个例子中，使用了变量、函数参数以及函数返回值的类型注解：

```
const num: number = 123;
function identity(num: number): number {
  return num;
}
```

### 原始类型

```
let num: number;
let str: string;
let bool: boolean;

num = 123;
num = 123.456;
num = '123'; // Error

str = '123';
str = 123; // Error

bool = true;
bool = false;
bool = 'false'; // Error
```

### 数组

TypeScript 为数组提供了专用的类型语法，因此你可以很轻易的注解数组。它使用后缀 []， 接着你可以根据需要补充任何有效的类型注解（如：:boolean[]）。它能让你安全的使用任何有关数组的操作，而且它也能防止一些类似于赋值错误类型给成员的行为。如下所示：

```
let boolArray: boolean[];

boolArray = [true, false];
console.log(boolArray[0]); // true
console.log(boolArray.length); // 2

boolArray[1] = true;
boolArray = [false, false];

boolArray[0] = 'false'; // Error
boolArray = 'false'; // Error
boolArray = [true, 'false']; // Error
```

### 接口

接口是 TypeScript 的一个核心知识，它能合并众多类型声明至一个类型声明：

```
interface Name {
  first: string;
  second: string;
}

let name: Name;
name = {
  first: 'John',
  second: 'Doe'
};

name = {
  // Error: 'Second is missing'
  first: 'John'
};

name = {
  // Error: 'Second is the wrong type'
  first: 'John',
  second: 1337
};
```

在这里，我们把类型注解：first: string + second: string 合并到了一个新的类型注解里 Name，这样能强制对每个成员进行类型检查。接口在 TypeScript 拥有强大的力量，在稍后，我们将会用整个章节来阐述如何更好的使用它

### 内联类型注解

与创建一个接口不同，你可以使用内联注解语法注解任何内容：:{ /*Structure*/ }：

```
let name: {
  first: string;
  second: string;
};

name = {
  first: 'John',
  second: 'Doe'
};

name = {
  // Error: 'Second is missing'
  first: 'John'
};

name = {
  // Error: 'Second is the wrong type'
  first: 'John',
  second: 1337
};
```

内联类型能为你快速的提供一个类型注解。它可以帮助你省去为类型起名的麻烦（你可能会使用一个很糟糕的名称）。然而，如果你发现需要多次使用相同的内联注解时，考虑把它重构为一个接口（或者是 type alias，它会在接下来的部分提到）是一个不错的主意。

### 特殊类型

除了被提到的一些原始类型，在 TypeScript 中，还存在一些特殊的类型，它们是 any、 null、 undefined 以及 void。

#### any

any 类型在 TypeScript 类型系统中占有特殊的地位。它提供给你一个类型系统的「后门」,TypeScript 将会把类型检查关闭。在类型系统里 any 能够兼容所有的类型（包括它自己）。因此，所有类型都能被赋值给它，它也能被赋值给其他任何类型。以下有一个证明例子：

```
let power: any;

// 赋值任意类型
power = '123';
power = 123;

// 它也兼容任何类型
let num: number;
power = num;
num = power;
```

当你从 JavaScript 迁移至 TypeScript 时，你将会经常性使用 any。但你必须减少对它的依赖，因为你需要确保类型安全。当使用 any 时，你基本上是在告诉 TypeScript 编辑器不要进行任何的类型检查。

#### null 和 undefined

在类型系统中，JavaScript 中的 null 和 undefined 字面量和其他被标注了 any 类型的变量一样，都能被赋值给任意类型的变量，如下例子所示：

```
// strictNullChecks: false

let num: number;
let str: string;

// 这些类型能被赋予
num = null;
str = undefined;
```

#### void

使用 :void 来表示一个函数没有一个返回值

```
function log(message: string): void {
  console.log(message);
}
```

#### 泛型

在计算机科学中，许多算法和数据结构并不会依赖于对象的实际类型。然而，你仍然会想在每个变量里强制提供约束。例如：在一个函数中，它接受一个列表，并且返回这个列表的反向排序，这里的约束是指传入至函数的参数与函数的返回值：

```
function reverse<T>(items: T[]): T[] {
  const toreturn = [];
  for (let i = items.length - 1; i >= 0; i--) {
    toreturn.push(items[i]);
  }
  return toreturn;
}

const sample = [1, 2, 3];
const reversed = reverse(sample);

console.log(reversed); // 3, 2, 1

// Safety
reversed[0] = '1'; // Error
reversed = ['1', '2']; // Error

reversed[0] = 1; // ok
reversed = [1, 2]; // ok

```

在上个例子中，函数 reverse 接受一个类型为 T（注意在 reverse<T> 中的类型参数） 的数组（items: T[]），返回值为类型 T 的一个数组（注意：T[]），函数 reverse 的返回值类型与它接受的参数的类型一样。当你传入 var sample = [1, 2, 3] 时，TypeScript 能推断出 reverse 为 number[] 类型，从而能给你类型安全。于此相似，当你传入一个类型为 string[] 类型的数组时，TypeScrip 能推断 reverse 为 string[] 类型，如下例子所示：

```
const strArr = ['1', '2'];
let reversedStrs = reverse(strArr);

reversedStrs = [1, 2]; // Error
```

事实上，JavaScript 数组已经拥有了 reverse 的方法，TypeScript 也确实使用了泛型来定义其结构：

```
interface Array<T> {
  reverse(): T[];
}
```

这意味着，当你在数组上调用 .reverse 方法时，将会获得类型安全：

```
let numArr = [1, 2];
let reversedNums = numArr.reverse();

reversedNums = ['1', '2']; // Error
```

当在章节 环境声明 中提及了 lib.d.ts 时，我们会讨论更多关于 Array<T> 的信息。

### 联合类型

在 JavaScript 中，你希望属性为多种类型之一，如字符串或者数组。这就是联合类型所能派上用场的地方（它使用 | 作为标记，如 string | number）。在函数参数里。一个常见的用例是一个可以接受单个对象或对象数组的函数：

```
function formatCommandline(command: string[] | string) {
  let line = '';
  if (typeof command === 'string') {
    line = command.trim();
  } else {
    line = command.join(' ').trim();
  }

  // Do stuff with line: string
}
```

### 交叉类型

在 JavaScript 中， extend 是一种非常常见的模式，在这种模式中，你可以从两个对象中创建一个新对象，新对象会拥有着两个对象所有的功能。交叉类型可以让你安全的使用此种模式：

```
function extend<T, U>(first: T, second: U): T & U {
  const result = <T & U>{};
  for (let id in first) {
    (<T>result)[id] = first[id];
  }
  for (let id in second) {
    if (!result.hasOwnProperty(id)) {
      (<U>result)[id] = second[id];
    }
  }

  return result;
}

const x = extend({ a: 'hello' }, { b: 42 });

// 现在 x 拥有了 a 属性与 b 属性
const a = x.a;
const b = x.b;
```

### 元组类型

JavaScript 并没有支持类似于元组的支持。开发者通常只能使用数组来表示元组，但是 TypeScript 类型系统支持它。使用 :[typeofmember1, typeofmember2] 能够为元组添加类型注解，元组可以包含任意数量的成员，以下例子演示了元组：

```
let nameNumber: [string, number];

// Ok
nameNumber = ['Jenny', 221345];

// Error
nameNumber = ['Jenny', '221345'];
```

将其与 TypeScript 中的解构一起使用：

```
let nameNumber: [string, number];
nameNumber = ['Jenny', 322134];

const [name, num] = nameNumber;
```

### 类型别名

TypeScript 提供使用类型注解的便捷语法，你可以使用 type SomeName = someValidTypeAnnotation 的语法来创建别名：

```
type StrOrNum = string | number;

// 使用
let sample: StrOrNum;
sample = 123;
sample = '123';

// 会检查类型
sample = true; // Error
```

不同于 interface 你可以提供一个类型别名至任意的类型注解上（在联合类型和交叉类型中比较实用），这有一些能让你熟悉语法的实例：

```
type Text = string | { text: string };
type Coordinates = [number, number];
type Callback = (data: string) => void;
```

* 如果你需要使用类型注解的层次结构，请使用接口。它能使用 implements 和 extends

* 为一个简单的对象类型（像例子中的 Coordinates）使用类型别名，仅仅有一个语义化的作用。与此相似，当你想给一个联合类型和交叉类型使用一个语意化的名称时，一个类型别名将会是一个好的选择。

## 从 JavaScript 迁移

* 添加一个 tsconfig.json 文件；

* 把文件扩展名从 .js 改成 .ts，开始使用 any 来减少错误；

* 开始在 TypeScript 中写代码，尽可能的减少 any 的使用；

* 回到旧代码，开始添加类型注解，并修复已识别的错误；

* 为你的第三方 JavaScript 代码定义环境声明。

记住所有的 JavaScript 都是有效的 TypeScript。这意味着，如果让 TypeScript 编译器编译 TypeScript 里的 JavaScript 代码，编译后的结果将会与原始的 JavaScript 代码一摸一样。也就是说，把文件扩展名从 .js 改成 .ts 将不会造成任何负面的影响。

### 减少错误

TypeScript 将会立即对你的代码进行类型检查，你的 JavaScript 代码可能并不像你想象中那样整齐了，因此你会收到一些报错信息。你可以使用 any 类型来解决它们中的大部分报错：

```
let foo = 123;
let bar = 'hey';

bar = foo; // Error: 不能把 number 类型赋值给 string 类型
```

虽然这些错误是有效的（并且在大多数情景下，推断信息的错误提示将比代码库的不同部分的原始作者想象的更好），但是你的重点可能是逐步迁移至 TypeScript，在这里，你可以使用类型断言来减少此错误：

```
let foo = 123;
let bar = 'hey';

bar = foo as any; // ok
```

在另一方面来说，你可能想用 any 用作类型注解：

```
function foo() {
  return 1;
}

let bar = 'hey';
bar = foo(); // Error: 不能把一个 number 类型赋值给 string 类型
```

抑制这种错误：

```
function foo(): any {
  // 添加 'any'
  return 1;
}

let bar = 'hey';
bar = foo();
```

### 第三方代码

你可以将你的 JavaScript 的代码改成 TypeScript 代码，但是你不能让这个世界都使用 TypeScript。这正是 TypeScript 环境声明支持的地方。我们建议你创建一个 vendor.d.ts 文件作为开始（.d.ts 文件扩展名指定这个文件是一个声明文件），然后我们可以向文件里添加东西。或者，你也可以创建一个针对于特定库的声明文件，如为 jquery 创建 jquery.d.ts 文件。

考虑使用 jquery 的用例，你可以非常简单快速的为它创建一个定义：

```
declare var $: any;
```

有时候，你可能想给某些变量一些明确的定义（如： jquery），并且你会在类型声明空间中使用它。你可以通过 type 关键字快速的实现它：

```
declare type JQuery = any;
declare var $: JQuery;
```

再一次说明，一个高质量的 jquery.d.ts 已经在 DefinitelyTyped 中存在。现在你已经知道当你使用 JavaScript 第三方模块时， 如何克服从 JavaScript 至 TypeScript 的阻力。在接下去的章节，我们将会讨论环境声明

### 第三方的 NPM 模块

与全局变量声明相似，你可以快速的定义一个全局模块，如：对于 jquery，如果你想把它作为一个模块来使用（NPM），你可以自己通过以下方式实现：

```
declare module 'jquery';
```
然后你就可以在必要时导入它：
```
import * as $ from 'jquery';
```

再一次说明，一个高质量的 jquery.d.ts 已经在 DefinitelyTyped 中存在，但是可能在你的包里没有，所以，你现在有一个简单快速的方式来继续迁移。

### 额外的非 JavaScript 资源

在 TypeScript 中，甚至可以允许你导入任何文件，例如 .css 文件（如果你使用的是 webpack 样式加载器或 css 模块），你只要添加如下代码（放在 globals.d.ts）：

```
declare module '*.css';
```

现在你可以使用 import * as foo from './some/file.css'。

与此相似，如果你想使用 html 模版（例如：angular），你可以：

```
declare module '*.html';
```

## @types

毫无疑问，DefinitelyTyped 是 TypeScript 最大的优势之一，社区已经记录了 90% 的顶级 JavaScript 库。

这意味着，你可以非常高效地使用这些库，而无需在单独的窗口打开相应文档（以确保输入的正确性）。

### 使用 @types

你可以通过 npm 来安装使用 @types，如下例所示，你可以为 jquery 添加声明文件：

```
npm install @types/jquery --save-dev
```

默认情况下，TypeScript 会自动包含支持全局使用的任何定义。例如，对于 jquery，你应该能够在项目中开始全局使用 $。

### 模块 @types

```
import * as $ from 'jquery';
```

可以看出，对于某些团队而言，拥有允许全局泄漏的定义可能是一个问题。因此，你可以通过配置 tsconfig.json 的 compilerOptions.types 选项，引入有意义的类型：

```
{
  "compilerOptions": {
    "types" : [
      "jquery"
    ]
  }
}
```

如上例所示，通过配置 compilerOptions.types: [ "jquery" ] 后，只允许使用 jquery 的 @types 包，即使这个人安装了另一个声明文件，比如 npm install @types/node，它的全局变量（例如 process）也不会泄漏到你的代码中，直到你将它们添加到 tsconfig.json 类型选项。

## 环境声明

TypeScript 的设计目标之一是让你从现有的 JavaScript 库中安全、轻松的使用 TypeScript，你可以通过 TypeScript 声明文件来做到这一点。

你可以通过 declare 关键字，来告诉 TypeScript，你正在试图表述一个其他地方已经存在的代码（如：写在 JavaScript、CoffeeScript 或者是像浏览器和 Node.js 运行环境里的代码）：

```
foo = 123; // Error: 'foo' is not defined

declare var foo: any;
foo = 123; // allow
```

你可以选择把这些声明放入 .ts 或者 .d.ts 里。在你实际的项目里，我们强烈建议你应该把声明放入 .d.ts 里（可以从一个命名为 globals.d.ts 或者 vendor.d.ts 文件开始）。

如果一个文件有扩展名 .d.ts，这意味着每个顶级的声明都必须以 declare 关键字作为前缀。这有利于向作者说明，在这里 TypeScript 将不会把它编译成任何代码，同时他需要确保这些在编译时存在。

* 环境声明就好像你与编译器之间的一个约定，如果这些没有在编译时存在，但是你却使用了它们，则事情将会在没有警告的情况下中断。

* 环境声明就好像是一个文档。如果源文件更新了，你应该同步更进。所以，当你使用源文件在运行时的新行为时，如果没有人更新环境声明，编译器将会报错。

### 变量

```
declare let process: any;
```

这允许你使用 process，并能成功通过 TypeScript 的编译：

```
process.exit();
```

我们推荐尽可能的使用接口，例如：

```
interface Process {
  exit(code?: number): void;
}

declare let process: Process;
```

因为这允许其他人扩充这些全局变量，并且会告诉 TypeScript 有关于这些的修改。例如：考虑到以下情况，我们添加一个 exitWithLogging 函数至 process：

```
interface Process {
  exitWithLogging(code?: number): void;
}

process.exitWithLogging = function() {
  console.log('exiting');
  process.exit.apply(process, arguments);
};
```

## 接口

接口运行时的影响为 0。TypeScript 接口中有很多方式来声明变量的结构。

以下两个是等效声明, 第一个使用内联注解，第二个使用接口：

```
// Sample A
declare const myPoint: { x: number; y: number };

// Sample B
interface Point {
  x: number;
  y: number;
}
declare const myPoint: Point;
```

示例 B 的好处在于，如果有人创建了一个基于 myPoint 的库来添加新成员, 他们可以轻松将此成员添加到 myPoint 的现有声明中:

```
// Lib a.d.ts
interface Point {
  x: number,
  y: number
}
declare const myPoint: Point

// Lib b.d.ts
interface Point {
  z: number
}

// Your code
let myPoint.z // Allowed!
```

因为 TypeScript 接口是开放式的，这是 TypeScript 的一个重要原则，它允许你使用接口模仿 JavaScript 的可扩展性。

### 类可以实现接口

如果你希望在类中使用必须遵循的接口（类）或是别人定义的对象结构，可以使用 implements 关键字来确保兼容性：

```
interface Point {
  x: number;
  y: number;
}

class MyPoint implements Point {
  x: number;
  y: number; // Same as Point
}
```

基本上在 implements（实现） 的存在下，该外部 Point 接口的任何更改都将导致代码库中的编译错误，因此可以轻松地使其保持同步：

```
interface Point {
  x: number;
  y: number;
  z: number; // New member
}

class MyPoint implements Point {
  // ERROR : missing member `z`
  x: number;
  y: number;
}
```

注意，implements 限制了类实例的结构，即:

```
let foo: Point = new MyPoint();
```

像 foo: Point = MyPoint 这样并不是一回事

### 并非每个接口都是很容易实现的

```
interface Crazy {
  new (): {
    hello: number;
  };
}

class CrazyClass implements Crazy {
  constructor() {
    return { hello: 123 };
  }
}

// Because
const crazy = new CrazyClass(); // crazy would be { hello:123 }
```

你可以使用接口声明所有的 JavaScript，甚至可以安全地从 TypeScript 中使用它们。但并不意味着你可以使用 TypeScript 类来实现它们。

## lib.d.ts

### 观察 lib.d.ts 的内部

```
interface Window extends EventTarget, WindowTimers, WindowSessionStorage, WindowLocalStorage, WindowConsole, GlobalEventHandlers, IDBEnvironment, WindowBase64 {
  animationStartTime: number;
  applicationCache: ApplicationCache;
  clientInformation: Navigator;
  closed: boolean;
  crypto: Crypto;
  // so on and so forth...
}

```

你可以在这些接口里看到大量的类型信息，当你不使用 TypeScript 时，你需要将它们保存在你的大脑里。现在你可以使用 intellisense 之类东西，从而可以减少对知识的记忆。

使用这些全局变量是有利的。在不更改 lib.d.ts 的情景下，它可以让你添加额外的属性。接下来，我们将介绍这些概念。

### 修改原始类型

在 TypeScript 中，接口是开放式的，这意味着当你想使用不存在的成员时，你仅仅是需要添加它们至 lib.d.ts 中的接口声明中，TypeScript 将会自动接收它。注意，你需要在全局模块中做这些修改，以使这些接口与 lib.d.ts 相关联。我们推荐你创建一个称为 globals.d.ts 的特殊文件。

```
interface Window {
  helloWorld(): void;
}

window.helloWorld = () => console.log('hello world');

// Call it
window.helloWorld();

// 滥用会导致错误
window.helloWorld('gracius'); // Error: 提供的参数与目标不匹配
```

当你想在 Math 全局变量上添加你需要的属性时，你仅需要把它添加至 Math 的全局接口上即可，例如：在seedrandom Project项目里，它添加了 seedrandom 函数至全局的 Math 对象上，这可以很容易的被声明：

```
interface Math {
  seedrandom(seed?: string): void;
}

Math.seedrandom();

Math.seedrandom('Any string you want');
```

## 函数

### 重载

```
function padding(a: number, b?: number, c?: number, d?: any) {
  if (b === undefined && c === undefined && d === undefined) {
    b = c = d = a;
  } else if (c === undefined && d === undefined) {
    c = a;
    d = b;
  }
  return {
    top: a,
    right: b,
    bottom: c,
    left: d
  };
}
```
重载后
```

// 重载
function padding(all: number);
function padding(topAndBottom: number, leftAndRight: number);
function padding(top: number, right: number, bottom: number, left: number);
// Actual implementation that is a true representation of all the cases the function body needs to handle
function padding(a: number, b?: number, c?: number, d?: number) {
  if (b === undefined && c === undefined && d === undefined) {
    b = c = d = a;
  } else if (c === undefined && d === undefined) {
    c = a;
    d = b;
  }
  return {
    top: a,
    right: b,
    bottom: c,
    left: d
  };
}
```

这里前三个函数头可有效调用 padding:

```
padding(1); // Okay: all
padding(1, 1); // Okay: topAndBottom, leftAndRight
padding(1, 1, 1, 1); // Okay: top, right, bottom, left

padding(1, 1, 1); // Error: Not a part of the available overloads
```

https://jkchao.github.io/typescript-book-chinese/typings/functions.html#%E9%87%8D%E8%BD%BD
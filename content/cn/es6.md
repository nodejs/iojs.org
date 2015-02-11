# io.js 运行 ES6

io.js 是基于 [V8](https://code.google.com/p/v8/) 引擎的现代版本构建的。通过持续更进最新版的 V8 引擎，我们确保可以及时为开发者带来最新的 [JavaScript ECMA-262 规范](http://www.ecma-international.org/publications/standards/Ecma-262.htm) 语言特性，同时也会有性能和稳定性的提升。

io.js 1.2.0 集成了 V8 4.1.0.14 版本，其中包含的 ES6 特性远超出 joyent/node@0.12.x 集成的 3.26.33 版本。

## 干掉 --harmony

在 joyent/node@0.12.x (V8 3.26) 版本中，`--harmony` 运行时参数会一并开启所有 **已完成**，**待完成** 和 **修订中** 的 ES6 的一大堆特性 (除了 `typeof` 的非标准/不确定的特性需要通过 `--harmony-typeof` 开启之外)。这就意味着一些真正鸡肋甚至废弃的特性譬如 [proxies](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) 都会像 [generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*) 那样开放给开发者，它们很偏门甚至缺少相关资料。因此，最好的做法要么通过加特定参数(例如 `--harmony-generators`) 开启稳定的特性，要么直接开启全部但严格地使用特定部分特性。

使用 io.js@1.x (V8 4.1+)，这些烦恼就通通没有了。所有的特性在逻辑上被分为 **已完成**，**待完成** 和 **修订中** 三部分：

*   所有 **已完成** 的特性，都是在 V8 中确信已经稳定的，例如 [generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*)，[模板](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/template_strings)，[新增的字符串方法](https://developer.mozilla.org/en-US/docs/Web/JavaScript/New_in_JavaScript/ECMAScript_6_support_in_Mozilla#Additions_to_the_String_object)等都会在 **io.js 中默认开启** 并且**不需要**加任何运行时参数。
*   再就是 **待完成** 的特性都是基本完成但是却没有经过充分测试或者更新为最新的标准，因此 V8 团队认为这些是不稳定的 (可能有些坑没被覆盖到)。相当于 [generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*) 在 3.26版本中的状态。我们提供了类似 "自己承担使用风险" 的功能，需要加入运行时参数：`--es_staging` (或者它的别名，`--harmony`)。
*   最后，所有 **修订中** 的特性可以通过特有的参数开启 (例如 `--harmony_arrow_functions`)，当然不建议这么做除非你是用于测试。

## io.js 默认开启了哪些 ES6 特性(不加任何参数)？


*   Block scoping

    *   [let](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)

    *   [const](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const)

    *   `function`-in-blocks

    >As of v8 3.31.74.1, block-scoped declarations are [intentionally implemented with a non-compliant limitation to strict mode code](https://groups.google.com/forum/#!topic/v8-users/3UXNCkAU8Es). Developers should be aware that this will change as v8 continues towards ES6 specification compliance.

*   Collections

    *   [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)

    *   [WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)

    *   [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)

    *   [WeakSet](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet)

*   [Generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*)

*   [Binary and Octal literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Numeric_literals)

*   [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

*   [New String methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/New_in_JavaScript/ECMAScript_6_support_in_Mozilla#Additions_to_the_String_object)

*   [Symbols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)

*   [Template strings](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/template_strings)

在 [兼容列表](https://kangax.github.io/compat-table/es6/) 里可以看到更多详细内容和与其他引擎的对比。

## 通过 --es_staging 参数开启的特性有哪些?

*   [Classes](https://github.com/lukehoban/es6features#classes) (strict mode only)
*   [Object literal extensions](https://github.com/lukehoban/es6features#enhanced-object-literals)

*   [`Symbol.toStringTag`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol) (user-definable results for `Object.prototype.toString`)

## 我已经用了 --harmony 需要删除吗?

当前 `--harmony` 参数在 io.js 中的行为是开启 **待完成** 特性。别忘了，它还有个别名 `--es_staging`。如上面提到的，这些待完成的特性还不稳定。如果想安全地使用，尤其是在生产环境中，最好删除此运行参数，直到特性被默认开启。因此，在 io.js 中。如果你现在保留了这个启用，也应该为以后进一步升级 io.js 做好准备，以备 V8 改为更加符合标准的语意。

## 如何找到某一版本的 io.js 所集成的 V8 的版本？

io.js 提供了简单的方式列出所有依赖关系和各自的版本集成情况(基于 `process` 全局对象的特殊二进制文件)。例如要查看 V8 引擎版本，可以在你的终端里面输入以下命令获得：

```sh
iojs -p process.versions.v8
```

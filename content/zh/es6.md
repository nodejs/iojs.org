# io.js 运行 ES6

io.js 是基于 [V8](https://code.google.com/p/v8/) 引擎的较新版本构建的。通过持续跟进最新版的 V8 引擎，我们可以保证及时地为开发者带来最新的 [JavaScript ECMA-262 规范](http://www.ecma-international.org/publications/standards/Ecma-262.htm) 中的语言特性，同时也能得到性能和稳定性的提升。

io.js {{project.current_version}} 集成了 V8 {{project.current_v8}} 版本，其中包含的 ES6 特性远超 joyent/node@0.12.x 集成的 3.26.33 版本所包含的。

## 干掉 --harmony

在 joyent/node@0.12.x (V8 3.26) 版本中，`--harmony` 运行时参数会一并开启所有 **已完成**，**待完成** 和 **修订中** 的 ES6 的一大堆特性 (除了 `typeof` 的非标准/不确定的特性需要通过 `--harmony-typeof` 开启之外)。这就意味着一些真正鸡肋甚至废弃的特性，譬如 [proxies](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) 都会像 [generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*) 那样开放给开发者，它们很偏门，甚至缺少相关资料。因此，最好的做法是，要么通过加特定参数(例如 `--harmony-generators`) 开启稳定的特性，要么直接开启全部但严格地使用特定部分特性。

使用 io.js (V8 4.1+)，就没那么复杂了。所有的特性在逻辑上被分为 **已完成**，**待完成** 和 **修订中** 三部分：

*   所有 **已完成** 的特性，都是在 V8 中被认为已经稳定的，例如 [generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*)，[模板](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/template_strings)，[新增的字符串方法](https://developer.mozilla.org/en-US/docs/Web/JavaScript/New_in_JavaScript/ECMAScript_6_support_in_Mozilla#Additions_to_the_String_object)等都会在 **io.js 中默认开启**，并且**不需要**加任何运行时参数。
*   再就是 **待完成** 的特性。**待完成** 的特性都是基本完成但未经充分测试的，或者更新为最新的特性，因此 V8 团队认为这些是不稳定的 (可能有些坑没被覆盖到)，就像 [generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*) 在 3.26 版本中的状态。我们提供了类似“自担风险”的功能。你需要加入参数：`--es_staging` (或者别名，`--harmony`)。
*   最后，所有 **修订中** 的特性可以通过特有的参数开启 (例如 `--harmony_arrow_functions`)，当然我们不建议这么做，除非是测试。

## io.js 默认开启了哪些 ES6 特性(无需添加额外运行参数)？


*   Block scoping

    *   [let](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)

    *   [const](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const)

    *   `function`-in-blocks

    >As of v8 3.31.74.1, block-scoped declarations are [intentionally implemented with a non-compliant limitation to strict mode code](https://groups.google.com/forum/#!topic/v8-users/3UXNCkAU8Es). Developers should be aware that this will change as v8 continues towards ES6 specification compliance.
    
*   [Classes](https://github.com/lukehoban/es6features#classes) (strict mode only)

*   Collections

    *   [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)

    *   [WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)

    *   [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)

    *   [WeakSet](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet)

*   [Generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*)

*   [Binary and Octal literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Numeric_literals)

*   [Object literal extensions](https://github.com/lukehoban/es6features#enhanced-object-literals)

*   [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

*   [New String methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/New_in_JavaScript/ECMAScript_6_support_in_Mozilla#Additions_to_the_String_object)

*   [Symbols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)

*   [Template strings](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/template_strings)

在 [兼容列表](https://kangax.github.io/compat-table/es6/) 里可以看到更多详细内容，以及与其他 JS 引擎的对比。

## 通过 --es_staging 参数开启的特性有哪些?

*   [`Symbol.toStringTag`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol) (user-definable results for `Object.prototype.toString`)

## 哪些 ES6 特性正在被开发?

新的特性在不断地被加入到 V8 中。一般来讲，请期待它们在接下来的 io.js 版本中被实现，虽然并没有具体的日程表。

你可以通过 `grep` 每个 io.js 发行版的 `--v8-options` 参数来查找那些 *正在被开发* 的特性。请注意这些特性是不完善的、有可能损坏的 V8 特性，所以使用它们请自负风险：

```sh
iojs --v8-options | grep "in progress"
```

## 我已经用了 --harmony ，需要删除吗?

当前 `--harmony` 参数在 io.js 中的行为是开启 **待完成** 特性。别忘了，它还有个别名 `--es_staging`。正如上面所说，这些待完成的特性还不稳定。如果想安全稳定地使用，尤其是在生产环境中，最好删除此运行参数，直到这些特性被默认开启。因此，在 io.js 中。即使你现在保留了这个参数，也应该为以后进一步升级 io.js 做好准备，以备 V8 改为更加符合标准的语意。

## 如何查阅某一版本的 io.js 所集成的 V8 的版本？

io.js 提供了简单的方式，用于列出所有依赖关系，及各自的版本集成情况(基于 `process` 全局对象的特殊二进制文件)。例如，要查看 V8 引擎版本，可以在你的终端里面输入以下命令：

```sh
iojs -p process.versions.v8
```

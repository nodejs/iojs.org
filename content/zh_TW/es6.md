# io.js 的 ES6

io.js 建構於目前版本的 [V8](https://code.google.com/p/v8/) 之上，將會持續更新並引入最新的引擎版本，以確保最新的 [JavaScript ECMA-262 specification](http://www.ecma-international.org/publications/standards/Ecma-262.htm) 特性能以最短的時間內被 io.js 的開發人員所使用，並藉著不斷快速更新此持續改善效能及穩定度。

目前釋出的 io.js v{{project.current_version}} 版本已採用 V8 {{project.current_v8}}，其支援的 ES6 特性遠超過 joyent/node@0.12.x 所使用的 V8 3.26.23 。

## 不再需要 --harmony 參數

在 joyent/node@0.12.x (V8 3.26) 上，參數 `--harmony` 將會一次啟用所有處於**完成（completed）**、**階段性（staged）**及**程序中（in progress）**狀態之下的 ES6 特性支援（除了 `proxies` ，此特性在使用參數 `--harmony-proxies` 時會被隱藏）。這意味著一些臭蟲或是很有問題的特性像是 [Arrow Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) ，可能將會很容易的被開發人員所誤用在專案中，就如同沒有問題的特性 `generators` 一般。因此，大多數的開發人員通常會代入一些參數，只啟動特定的 harmony 特性支援（如：`--harmony-generators`），或是直接啟用所有的特性支援，然後在開發時限定只使用特定某些穩定的功能。

不過在使用 io.js@1.x (V8 4.1+) 之後，前面所提到的所有麻煩將不再是問題。現在所有的 harmony 特性都將會被分類到不同的群組中，分別為 **shipping** 、 **staged** 和 **in progress**：

*   所有屬於 **shipping** 群組的特性，都是被 V8 認定為穩定（stable）的功能，如：[generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*) 、 [templates](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/template_strings) 、 [new string methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/New_in_JavaScript/ECMAScript_6_support_in_Mozilla#Additions_to_the_String_object) 。值得一提的是，現在屬於此群組的更多特性都將被 **預設啟用於 io.js** ，且**不需要**在執行時添加使用任何參數。
*   那些被歸類為 **staged** 群組的特性，都是功能上幾乎已經完整支援（almost-completed）的特性，但缺少測試或尚未支援到最新的 ES6 規格，所以尚未被 V8 的開發團隊視為穩定（stable）。這些特性的支援可能相當於 V8 3.26 時的 [generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*) ，如果要使用，開發人員必須要自行承擔其風險，而且必須要在執行時使用 `--es_staging` 參數（同等於 `--harmony`）。
*   最後，所有處於 **in progress** 群組的特性，可以以特定的參數啟用支援（如：`--harmony_arrow_functions`，儘管這些特性不被推薦使用。

## 什麼樣的 ES6 特性將被 io.js 預設支援？（不需要代入任何參數）


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

你可以參閱更多的細節，以及比較其他的 JavaScript 引擎，在 [compat-table](https://kangax.github.io/compat-table/es6/) 專案網頁。

## 什麼樣的 ES6 特性需要代入 --es_staging 參數？

*   [Classes](https://github.com/lukehoban/es6features#classes) 只有嚴格模式支援）
*   [Object literal extensions](https://github.com/lukehoban/es6features#enhanced-object-literals)

*   [`Symbol.toStringTag`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol) (user-definable results for `Object.prototype.toString`)

## 我過去已經大量使用了 --harmony 參數，我該移除它嗎？

目前 `--harmony` 在 io.js 的行為，只會啟用 **staged** 的特性，與 `--es_staging` 參數相同。如前面所提及，這些都是些尚未被視為穩定的特性，如果你想要更安全的使用 io.js ，尤其特別是在已上線的服務或產品上使用，請考慮移除並停止使用此參數，直到這些特性被 V8 所預設支援，接著被 io.js 所支援。假設你仍然持續使用這個參數，你可能要有因為升級 io.js 而導致程式壞掉的心理準備，尤其是如果 V8 為了更接近標準而修改語法，就會出現這樣的問題。

## 我如何得知 io.js 正在使用的 V8 版本？

io.js 提供了一個非常簡單的方法去取得所有的依賴函式庫及版本號，只要透過存取 `process` 全域物件即可。所以，如果想知道 V8 引擎的版本資訊，可以直接在終端機（Terminal）上輸入：

```sh
iojs -p process.versions.v8
```

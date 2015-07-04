# io.jsにおけるES6

<!--
io.js is built against modern versions of [V8](https://code.google.com/p/v8/). By keeping up-to-date with the latest releases of this engine we ensure new features from the [JavaScript ECMA-262 specification](http://www.ecma-international.org/publications/standards/Ecma-262.htm) are brought to io.js developers in a timely manner, as well as continued performance and stability improvements.
-->

io.jsは新しいバージョンの[V8エンジン](https://code.google.com/p/v8/)を対象にビルドされています。V8エンジンを最新版に保つことで、io.js開発者は[ECMA-262 specification](http://www.ecma-international.org/publications/standards/Ecma-262.htm)で定義されたJavaScriptの新機能をすぐに利用することができます。

<!--
Version {{project.current_version}} of io.js ships with V8 {{project.current_v8}}, which includes ES6 features well beyond version 3.28.73 that ship with Node.js™ 0.12.x.
-->

io.js {{project.current_version}}はV8 {{project.current_v8}}を利用しています。これはNode.js™ 0.12.xが利用しているV8 3.28.73よりもES6サポートが進んだバージョンです。

<!--
## No more --harmony flag
-->

## --harmonyフラグは不要になります

<!--
On Node.js™@0.12.x (V8 3.28+), the `--harmony` runtime flag enables all **completed**, **staged** and **in progress** ES6 features together, in bulk (with the exception of `proxies` which are hidden under `--harmony-proxies`). This means that some really buggy or even broken features like [Arrow Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) are just as readily available for developers as [generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*), which have very little or even no known-issues. As such, most developers tend to enable only certain features by using specific runtime harmony feature flags (e.g. `--harmony-generators`), or simply enable all of them and then use a restricted subset.
-->

Node.js™ 0.12.x (V8 3.28+)においては、`--harmony`ランタイムフラグを使うと**実装済み**、**ステージング段階**、**開発中**のすべてのES6機能（`--harmony-proxies`でのみ有効な`proxies`を除く）をまとめて有効にします。つまり、[Arrow Functions](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Functions/Arrow_functions)のような極めてバグの多いもしくは壊れた機能も、ほとんど問題なく使える[generators](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function*)などと同様に有効になるということです。そういった事情から、ほとんどの開発者はharmony featureフラグ（例: `--harmony-generators`）を使って特定の機能のみを有効にしがちです。

<!--
With io.js (V8 4.1+), all that complexity goes away. All harmony features are now logically split into three groups for **shipping**, **staged** and **in progress** features:
-->

io.js (V8 4.1+)では、こういった複雑なことをする必要は一切ありません。すべてのharmony featuresは**shipping**、**staged**、そして**in progress**の三つのグループに分けられました。

<!--
*   All **shipping** features, the ones that V8 has considered stable, like [classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes),  [generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*), [templates](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/template_strings), [new string methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/New_in_JavaScript/ECMAScript_6_support_in_Mozilla#Additions_to_the_String_object) and many others are turned **on by default on io.js** and do **NOT** require any kind of runtime flag.
-->

*   **shipping** featuresは、V8において安定していると判断された多くの機能、例えば[classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)や[generators](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function*)や[templates](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/template_strings)、[新しいstringメソッド](https://developer.mozilla.org/docs/Web/JavaScript/New_in_JavaScript/ECMAScript_6_support_in_Mozilla#Additions_to_the_String_object)などです。これらは**io.jsではデフォルトで利用可能**であり、**ランタイムフラグは必要ありません**。

<!--
*   Then there are **staged** features which are almost-completed features that havent been completely tested or updated to the latest spec yet and therefore are not considered stable by the V8 team (e.g. there might be some edge cases left to discover). This is probably the equivalent of the state of [generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*) on 3.26. These are the "use at your own risk" type of features that now require a runtime flag: `--es_staging` (or its synonym, `--harmony`).
-->

*   **staged** featuresは、ほぼ完成に近いものの、テストが完全ではなかったり最新の仕様に沿っていないなどの理由で、V8チームがまだ安定していると判断していない（例えば、まだ見つかっていないエッジケースがある可能性がある）機能です。V8 3.26における[generators](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function*)の状態に相当すると言えるでしょう。これらは「各自の責任で使う」タイプの機能であり、使うには`--es_staging`（または`--harmony`）フラグを必要とします。

<!--
*   Finally, all **in progress** features can be activated individually by their respective harmony flag (e.g. `--harmony_arrow_functions`), although this is highly discouraged unless for testing purposes.
-->

*   **in progress** featuresはそれぞれのharmonyフラグ（例: `--harmony_arrow_functions`）で個別に利用可能です。しかし、テスト目的以外での使用は非推奨です。

<!--
## Which ES6 features ship with io.js by default (no runtime flag required)?
-->

## io.jsでデフォルトで利用可能なES6の新機能

*   Block scoping

    *   [let](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/let)

    *   [const](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/const)

    *   `function`-in-blocks

    >V8 3.31.74.1時点で、block-scoped declarationsは[意図的にstrict modeのコードにしか適用されないように実装されています](https://groups.google.com/forum/#!topic/v8-users/3UXNCkAU8Es)。V8がES6の仕様に追従することで今後この実装に変更があるということを覚えておいてください。

<!--
    ここだけ上下逆転、markdown-itがうまく反映してくれないため
    >As of v8 3.31.74.1, block-scoped declarations are [intentionally implemented with a non-compliant limitation to strict mode code](https://groups.google.com/forum/#!topic/v8-users/3UXNCkAU8Es). Developers should be aware that this will change as v8 continues towards ES6 specification compliance.
-->

<!--
*   [Classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) (strict mode only)
-->

* *   [クラス](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) (strict modeでのみ使用可。)

*   Collections

    *   [Map](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map)

    *   [WeakMap](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)

    *   [Set](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Set)

    *   [WeakSet](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/WeakSet)

*   [Generators](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function*)

*   [Binary and Octal literals](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Lexical_grammar#Numeric_literals)

<!--
*   [Object literal extensions](https://github.com/lukehoban/es6features#enhanced-object-literals) (shorthand properties and methods)
-->

*   [拡張オブジェクトリテラル](https://github.com/lukehoban/es6features#enhanced-object-literals) (プロパティとメソッドの省略表現)

*   [Promises](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)

<!--
*   [New String methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/New_in_JavaScript/ECMAScript_6_support_in_Mozilla#Additions_to_the_String_object)
-->

*   [新しいStringメソッド](https://developer.mozilla.org/docs/Web/JavaScript/New_in_JavaScript/ECMAScript_6_support_in_Mozilla#Additions_to_the_String_object)

*   [Symbols](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Symbol)

*   [Template strings](https://developer.mozilla.org/docs/Web/JavaScript/Reference/template_strings)

<!--
You can view a more detailed list, including a comparison with other engines, on the [compat-table](https://kangax.github.io/compat-table/es6/) project page.
-->

ほかのエンジンとの比較を含むより詳細な一覧が、[compat-table](https://kangax.github.io/compat-table/es6/)プロジェクトのページで閲覧できます。

<!--
## Which ES6 features are behind the --es_staging flag?
-->

## --es_stagingフラグで使えるES6の機能

<!--
*   [`Symbol.toStringTag`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol) (user-definable results for `Object.prototype.toString`, behind flag `--harmony_tostring`)
-->

*   [`Symbol.toStringTag`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Symbol) (ユーザーが定義可能な`Object.prototype.toString`。`--harmony_tostring`でも有効)

<!--
## Which ES6 features are in progress?
-->

## 開発段階のES6の機能

<!--
New features are constantly being added to the V8 engine. Generally speaking, expect them to land on a future io.js release, although timing is unknown.
-->

V8エンジンには絶えず新機能が追加されています。一般的に、それらの機能は将来的にはio.jsでも使えるようになると言えます。ただし、具体的な時期はまだお伝えできません。

<!--
You may list all the *in progress* features available on each io.js release by grepping through the `--v8-options` argument. Please note that these are incomplete and possibly broken features of V8, so use them at your own risk:
-->

io.jsに`--v8-options`フラグを渡した結果をgrepすることで、どの*in progress*な機能が利用可能かを一覧表示できます。ただし、それらは未完成で壊れている可能性のある機能であることに注意してください。各自の責任のもとに使用してください。

```sh
iojs --v8-options | grep "in progress"
```

<!--
## I have my infrastructure set up to leverage the --harmony flag. Should I remove it?
-->

## --harmonyフラグを利用したインフラがあります。フラグを無効にすべきですか？

<!--
The current behaviour of the `--harmony` flag on io.js is to enable **staged** features only. After all, it is now a synonym of `--es_staging`. As mentioned above, these are completed features that have not been considered stable yet. If you want to play safe, especially on production environments, consider removing this runtime flag until it ships by default on V8 and, consequently, on io.js. If you keep this enabled, you should be prepared for further io.js upgrades to break your code if V8 changes their semantics to more closely follow the standard.
-->

現在のio.jsにおける`--harmony`フラグの挙動は**staged** featuresのみを有効化するものです。`--harmony`フラグはio.jsにおいては`--es_staging`フラグと全く同じ作用をします。上述の通り、それらの機能は完成されてはいるものの、まだ安定しているとは言えません。安全を重視すべき場面、特にプロダクション環境であれば、V8、ひいてはio.jsでデフォルトで利用可能になるまでフラグを無効にすることを検討してください。有効化したまま運用するのであれば、V8の動作が仕様に近づくことでセマンティクスに変更があった場合、io.jsのアップグレード時に使用中のコードが意図通りに動作しなくなる可能性に備えてください。

<!--
## How do I find which version of V8 ships with a particular version of io.js?
-->

## io.jsがどのバージョンのV8を使っているか調べるには？

<!--
io.js provides a simple way to list all dependencies and respective versions that ship with a specific binary through the `process` global object. In case of the V8 engine, type the following in your terminal to retrieve its version:
-->

io.jsは、使用中のio.jsのすべての依存ソフトウェアとそのバージョンを一覧できる簡単な方法を、`process`グローバルオブジェクトを介して提供しています。例えば、V8エンジンのバージョンを調べるには、ターミナルで以下のコマンドを入力します。

```sh
iojs -p process.versions.v8
```

# ES6 в io.js

В основе io.js стоит современная версия [V8](https://code.google.com/p/v8/). Придерживаясь самых последних версий этого движка, мы гарантируем, что новые возможности [спецификации JavaScript ECMA-262](http://www.ecma-international.org/publications/standards/Ecma-262.htm) станут доступны разработчикам io.js своевременно, а вместе с ними и улучшения, связанные с производительностью и стабильностью.

Версия io.js 1.4.1 основана на версии V8 4.1.0.21, которая включает в себя гораздо больше возможностей ES6 в отличие от версии 3.28.73, на которой основан joyent/node@0.12.x

## Теперь без флага --harmony

В joyent/node@0.12.x (V8 3.28) флаг `--harmony` включает все **completed**, **staged** и **in progress** возможности ES6 одновременно, (исключая нестандартную семантику для `typeof`, которая скрыта за флагом `--harmony-typeof`). Это означает, что некоторые содержащие множество ошибок возможности, такие как [прокси](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy), одинаково доступны для разработчиков как и, например, [генераторы](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*), которые имеют очень мало или вообще не имеют известных проблем. Поэтому, хорошей практикой было бы либо включать только конкретные возможности, используя определенные флаги harmony (например `--harmony-generators`), или включить все, но использовать ограниченное их подмножество.

В io.js@1.x (V8 4.1+) исчезает любая сложность. Все возможности спецификации логически разделены на три группы &mdash; **shipping**, **staged** и **in progress**:

*   Все **shipping** возможности, которые в V8 раccматриваются как стабильные, например [генераторы](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*), [шаблонные строки](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/template_strings), [новые методы строк](https://developer.mozilla.org/en-US/docs/Web/JavaScript/New_in_JavaScript/ECMAScript_6_support_in_Mozilla#Additions_to_the_String_object) и многие другие включены **по умолчанию в io.js** и **НЕ** требуют каких-либо флагов.
*   Также существуют **staged** возможности, которые почти реализованы, но не были полностью протестированы или обновлены в соответствии с последней версией спецификации, и, следовательно, не рассматриваются как стабильные разработчиками V8 (т.е. возможны какие-либо проблемы, связанные с ними, которые еще не были раскрыты). Вероятно это эквивалент состояния [генераторов](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*) в версии V8 3.26. Это тип возможностей &laquo;используй на свой страх и риск&raquo; и на данный момент они требуют наличие флага: `--es_staging` (или его синонима,  `--harmony`).
*   Наконец, все возможности **in progress** могут быть активированы индивидуально через соответственный флаг harmony (например `--harmony_arrow_functions`), хотя делать это настоятельно не рекомендуется, если только вы не хотите специально их протестировать.

## Какие возможности ES6 входят в io.js по умолчанию (не требуя флагов)?


*   Блочная область видимости

    *   [let](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)

    *   [const](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const)
    
    *   `function` в блоке

    >В v8 3.31.74.1, блочная область видимости [намеренно реализована c ограничением использования в строгом режиме](https://groups.google.com/forum/#!topic/v8-users/3UXNCkAU8Es). Разработчики должны осознавать, что данная ситуация изменится, т.к. v8 продолжает продвигаться в сторону соответствия спецификации ES6.

*   Коллекции

    *   [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)

    *   [WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)

    *   [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)

    *   [WeakSet](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet)

*   [Генераторы](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*)

*   [Литералы двоичных и восьмеричных чисел](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Numeric_literals)

*   [Обещания (Promises)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

*   [Новые методы строк](https://developer.mozilla.org/en-US/docs/Web/JavaScript/New_in_JavaScript/ECMAScript_6_support_in_Mozilla#Additions_to_the_String_object)

*   [Символы (Symbols)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)

*   [Шаблонные строки](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/template_strings)

Вы можете ознакомиться с более подробным списком возможностей, включая сравнение с другими движками, на странице проекта [compat-table](https://kangax.github.io/compat-table/es6/).

## Какие возможности ES6 скрыты за флагом --es_staging?

*   [Классы](https://github.com/lukehoban/es6features#classes) (только в строгом режиме)
*   [Расширенные возможности литералов объекта](https://github.com/lukehoban/es6features#enhanced-object-literals)
*   [`Symbol.toStringTag`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)  (определяемый пользователем результат метода  `Object.prototype.toString`)

## Какие возможности ES6 считаются &laquo;in progress&raquo;?

Новые возможности постоянно добавляются в V8. Обычно, они появляются в будущих релизах io.js, хотя срок неизвестен.

Вы можете получить список всех возможностей в состоянии *in progress* для любого релиза анализируя вывод io.js с аргументом `--v8-options`. Имейте ввиду, что это незавершенные и, возможно, неработоспособные функции V8, так что используйте их &laquo;на свой страх и риск&raquo;:

```sh
iojs --v8-options | grep "in progress"
```

## Моя инфраструктура работает с использованием флага --harmony. Следует ли мне удалить его?

Текущее поведение флага `--harmony` в io.js заключается во включении только **staged** возможностей. В конце концов, на данный момент это синоним флага `--es_staging`. Как уже упоминалось выше, существуют возможности, которые все еще не рассматриваются как стабильные. Если для вас важна надежность, особенно в случае продакшена, лучше убрать этот флаг до тех пор, пока эти возможности не будут реализованы по умолчаню в V8 и, следовательно, в io.js. Если вы оставите этот флаг, вам следует быть готовым к тому, что следующие обновления io.js могут сломать ваш код, в случае если V8 изменит семантику некоторых возможностей, для лучшего соответствия стандарту.

## Как определить какая версия V8 поставляется с конкретной версией io.js?

io.js предоставляет простой способ получения списка всех входящих в конретную сборку зависимостей и их версий через глобальный объект `process`. В случае V8, чтобы получить его версию, введите следующую команду в терминал:

```sh
iojs -p process.versions.v8
```

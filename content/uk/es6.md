# ES6 в io.js

io.js побудований на основі сучасних версій [V8](https://code.google.com/p/v8/). Підтримуючи останні версії [V8](https://code.google.com/p/v8/) в io.js, ми гарантуємо наявність нових можливостей [JavaScript ECMA-262 specification](http://www.ecma-international.org/publications/standards/Ecma-262.htm), які привносяться до io.js розробників своєчасно, а також підвищують швидкість роботи та стабільність.

Версія io.js 1.2.0 має версію V8 4.1.0.14, яка включає в себе ES6 можливості, котрих немає в V8 3.28.73, яка іде в поставці з Node™@0.12x.

# Більше ніяких --harmony параметрів

В Node.js™@0.12x (V8 3.28+), --harmony параметр вмикає всі **shipping**, **staged** та **in progress** ES6 можливості (окрім proxies, котрі вмикаються параметром --harmony-proxies). Це означає що код з помилками, чи навіть непрацюючі можливості, наприклад [Arrow Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) стають доступними в коді так само, як і [генератори](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*), котрі не мають відомих проблем взагалі. Багато розробників вмикають лише ті можливості, котрі їм потрібні, використовуючи параметри запуску (наприклад, `--harmony-generators`). Чи взагалі, вмикають всі можливості одним параметром.

З io.js@1.x (V8 4.1+) складність використання ES6 можливостей зникає. Всі harmony можливості логічно розподілені на три групи **shipping**, **staged** та **in progress**:

*   **shipping** можливості, які V8 помітив як стабільні, наприклад [generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*), [templates](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/template_strings), [new string methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/New_in_JavaScript/ECMAScript_6_support_in_Mozilla#Additions_to_the_String_object) та багато інших, ввімкнуті **по замовчуванню в io.js** і **НЕ** потребують ніяких додаткових параметрів запуску.
*   Крім того, є **staged** можливості, котрі майже завершені, але ще не протестовані повністю, чи не оновлені до останніх специфікацій, тому команда V8 вважає їх нестабільними. Яскравий приклад **staged** можливості - це [generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*) в V8 3.26. Можливості типу "використовуйте на свій страх і ризик", які потребують параметр запуску: `--es_staging` (чи його синонім, `--harmony`).
*   І нарешті, всі **in progress** можливості можна активувати окремо, використовуючи відповідний параметр запуску (наприклад `--harmony_arrow_functions`), хоча це і не рекомендується.

## Які можливості ES6 ідуть з io.js по замовчуванню (без необхідності використовувати параметри запуску)?

*   Block scoping

    *   [let](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)

    *   [const](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const)

    *   `function`-in-blocks

    >Станом на V8 3.31.74.1, block-scoped declarations [навмисно реалізовані несумісними зі strict mode](https://groups.google.com/forum/#!topic/v8-users/3UXNCkAU8Es). Розробники мають знати, що це зміниться в наступних версіях V8, які продовжують інтегрувати нові можливості ES6.

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

Ви можете переглянути більш докладний список, в тому числі і порівняння з іншими "двигунами", в [таблиці порівняння](https://kangax.github.io/compat-table/es6/).

## Які ES6 можливості вмикаються із --es_staging параметром?

*   [Classes](https://github.com/lukehoban/es6features#classes) (лише в strict mode, з параметром `--harmony_classes`, which implies block scoping & object literal extensions)

*   [Object literal extensions](https://github.com/lukehoban/es6features#enhanced-object-literals) (з параметром запуску `--harmony_object_literals`)

*   [`Symbol.toStringTag`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol) (user-definable results for `Object.prototype.toString`, з параметром `--harmony_tostring`)

## Котрі ES6 можливості в стадії розробки?

Нові можливості постійно додаються в V8. Взагалі, ми очікуємо, що вони з'являться в наступних io.js релізах, хоча терміни і невідомі.

Ви можете продивитись список всіх *in progress* можливостей в кожному io.js релізі, запустивши iojs з параметром `--v8-options`. Будь ласка, зверніть увагу, що це нестабільні можливості V8, тому використовуйте їх на свій страх і ризик:

```sh
iojs --v8-options | grep "in progress"
```

## У мене використовується параметр --harmony. Чи можна його видалити?

На даний момент, `--harmony` параметр в io.js вмикає лише **staged** можливості. Зрештою, це синонім `--es_staging` параметру. Як уже згадувалось вище, ці можливості ще не вважаються стабільними. Якщо ви хочете бути впевнені в стабільності, особливо в production, ви повинні видалити цей параметр до тих пір, доки ці можливості не стануть можливостями по замовчуванню в V8, а отже, і в io.js. Якщо ви залишите цей параметр ввімкненим, ви повинні бути готові до того, що наступні версії io.js, скоріш за все, зламають ваш код, якщо V8 зміне їх семантику.

## Як мені дізнатись, яку версію V8 використовує io.js?

io.js забезпечує простий спосіб перелічити всі залежності і їх версії, які доступні в глобальному `process` об'єкті. Якщо ви хочете дізнатись версію V8, виконайте наступну команду:

```sh
iojs -p process.versions.v8
```js
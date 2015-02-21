# ES6 und io.js

io.js wird basierent auf der aktuellen Version der [V8](https://code.google.com/p/v8/) Engine entwickelt. Mit der Verpflichtung die V8 Engine aktuell zu halten, stellen wir sicher, dass neue Funktionen der [JavaScript ECMA-262 Spezifikation](http://www.ecma-international.org/publications/standards/Ecma-262.htm) schnell für io.js Entwickler bereit stehen. Nebenbei kann sich deswegen die Geschwindkeit und Stabilität verbessern.

Die Version 1.3.0 von io.js wird mit V8 Version 4.1.0.14 ausgeliefert, welche bereits ES6 Funktionen beinhaltet, die deutlich weiterentwickelter sind, als jene Funktionen der V8 Version 3.26.33 die in joyent/node@0.12.x enthalten ist.

## Überflüssiger Startparameter `--harmony`

In joyent/node@0.12.x (V8 3.26), aktiviert der Startparameter `--harmony` die ES6 Funktionen, die als **completed**, **staged** und **in progress** alle auf einmal. in bulk (with the exception of nonstandard/non-harmonious semantics for `typeof` which were hidden under `--harmony-typeof`). This meant that some really buggy or even broken features like [proxies](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) were just as readily available for developers as [generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*), which had very little or even no known-issues. As such, it was best practice to either enable only certain features by using specific runtime harmony feature flags (e.g. `--harmony-generators`), or simply enable all of them and then use a restricted subset.

Umständlichkeit gehört seit io.js@1.x (V8 4.1+) der Vergangenheit an. Alle "harmony" Funktionen sind nun in logische Gruppen aufgeteilt. Diese Gruppen sind: **shipping** (Ausgeliefert), **staged** (Auflieferungsvorbereitung) **in progress** (Entwicklungsphase)

*   Alle als **shipping** bezeichneten Funktionen, jene die in V8 als Stabiel betrachtet werden, also solche wie [generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*), [templates](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/template_strings), [new string methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/New_in_JavaScript/ECMAScript_6_support_in_Mozilla#Additions_to_the_String_object) und viele andere, sind bereits ab Werk eingestaltet **on by default on io.js** and do **NOT** require any kind of runtime flag.
*   Then there are **staged** features which are almost-completed features that haven't been completely tested or updated to the latest spec yet and therefore are not considered stable by the V8 team (e.g. there might be some edge cases left to discover). This is probably the equivalent of the state of [generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*) on 3.26. These are the "use at your own risk" type of features that now require a runtime flag: `--es_staging` (or its synonym, `--harmony`).
*   Finally, all **in progress** features can be activated individually by their respective harmony flag (e.g. `--harmony_arrow_functions`), although this is highly discouraged unless for testing purposes.

## Welche ES6 Funktionen sind bereits in io.js enthalten und aktiv (ohne Startparameter verwendbar)?


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

*   [Binary und Octal literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Numeric_literals)

*   [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

*   [New String methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/New_in_JavaScript/ECMAScript_6_support_in_Mozilla#Additions_to_the_String_object)

*   [Symbols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)

*   [Template strings](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/template_strings)

Mehr dazu auf einer detailierten Liste, die dazu noch Vergleiche zu anderen Engines enthält, gibt es auf der [compat-table](https://kangax.github.io/compat-table/es6/) Projekt Seite.

## Welche ES6 Funktionen steht mit dem Paramtere --es_staging zur Verfügung?

*   [Classes](https://github.com/lukehoban/es6features#classes) (Nur im `'use strict';` Modus)
*   [Object literal Erweiterung](https://github.com/lukehoban/es6features#enhanced-object-literals)

*   [`Symbol.toStringTag`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol) (Festlegbare Ausgabe von `Object.prototype.toString`)

## In meiner Infrastruktur kommt der Paramterer `--harmony` zum Einsatz. Ist es sinnvoll diesen Parameter zu entfernen?

The current behaviour of the `--harmony` flag on io.js is to enable **staged** features only. After all, it is now a synonym of `--es_staging`. As mentioned above, these are completed features that have not been considered stable yet. If you want to play safe, especially on production environments, consider removing this runtime flag until it ships by default on V8 and, consequently, on io.js. If you keep this enabled, you should be prepared for further io.js upgrades to break your code if V8 changes their semantics to more closely follow the standard.

## Wie erkenne ich, mit welcher V8 Version io.js ausgeliefert wurde?

io.js bietet eine einfache Möglichkeit, alle Abhängigkeiten der jeweilig installierten Version, durch das globale Objekt `process` aufzulisten. Die V8 Engine stellt ein Befehl zur Verfügung, der die Versionsinformationen ausgibt, wenn man folgendes in der Konsole eingibt:

```sh
iojs -p process.versions.v8
```

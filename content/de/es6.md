# ES6 und io.js

io.js wird basierent auf der aktuellen Version der [V8](https://code.google.com/p/v8/) Engine entwickelt. Mit der Verpflichtung ständig die aktuelle V8 Engine einzusetzen, stellen wir sicher, dass neue Funktionen der [JavaScript ECMA-262 Spezifikation](http://www.ecma-international.org/publications/standards/Ecma-262.htm) schnell für io.js Entwickler bereit stehen. Nebenbei kann sich deswegen die Geschwindkeit und Stabilität verbessern.

Die Version 1.3.0 von io.js wird mit V8 Version 4.1.0.14 ausgeliefert, welche bereits ES6 Funktionen beinhaltet, die deutlich weiterentwickelter sind, als jene Funktionen der V8 Version 3.26.33 die in joyent/node@0.12.x enthalten ist.

## Überflüssiger Startparameter `--harmony`

In joyent/node@0.12.x (V8 3.26) aktiviert der Startparameter `--harmony` alle ES6 Funktionen auf einmal. Enthalten sind allejene Funktionen die als **completed** (Fertiggestellt), **staged** (Auslieferungsvorbereitung) und **in progress** (Entwicklungsphase) gekennzeichent sind. (Mit der Ausnahme des nonstandard/non-harmonious Ausdrucks `typeof` welches sich hinter dem Startparameter `--harmony-typeof` versteckt). Das bedeutet, dass einige sehr fehlerhafte oder sogar kaputte Funktionen wie [proxies](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) genauso frei verfügbar sind, wie solche Funktionen wie [generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*), die nur sehr wenige Fehler enthalten, wenn überhaupt. Daraus hätte sich die best-practice ergeben die entweder nur bestimmte Funktionen durch einzellne Startparameter verfügbar machen (z.B. `--harmony-generators`) oder einfach alle Funktionen einschalten aber dann nur eine sehr restriktive Untermenge an Funktionen verwenden.

Anders in io.js@1.x (V8 4.1+), hier gehört Umständlichkeit der Vergangenheit an. Alle "harmony" Funktionen sind nun in logische Gruppen aufgeteilt. Diese Gruppen sind: **shipping** (Ausgeliefert), **staged** (Auflieferungsvorbereitung) **in progress** (Entwicklungsphase).

*   Alle als **shipping** bezeichneten Funktionen, jene die im V8 Projekt als stabiel betrachtet werden, also solche wie [generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*), [templates](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/template_strings), [new string methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/New_in_JavaScript/ECMAScript_6_support_in_Mozilla#Additions_to_the_String_object) und viele andere, sind bereits ab Werk eingestaltet **on by default on io.js** und müssen **NICHT** erst extra durch Startparameter aktiviert werden.
*   Dann die **staged** Funktionen. Diese mehr oder weniger vollständig Funktionen wurden noch nicht komplett getestet oder sind noch nicht auf dem aktuellen Stand der Spezifikationen. Diese werden vom V8 Team deswegen auch als instabil gehandelt (z.B. Verhaltensvorhersagen zu Ausnahmefällen sind noch nicht möglich). Vergleichbar war oder ist die Situation der [generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*) in V8 3.26. Das sind nun "benutzen auf eigene Gefahr" Funktionen, welche nur über den Startparameter: `--es_staging` (oder dessen synonym, `--harmony`) aktivierbar sind.
*   Abschließend, alle **in progress** Funktionen die nur einzelln mittels harmony Startparameter aktivierbar sind (z.B. `--harmony_arrow_functions`), davon ist aber dringend abzuraten, auser zu testzwecken.

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

## Welche ES6 Funktionen stehen mit dem Parameter `--es_staging` zur Verfügung?

*   [Classes](https://github.com/lukehoban/es6features#classes) (Nur im `'use strict';` Modus)
*   [Object literal Erweiterung](https://github.com/lukehoban/es6features#enhanced-object-literals)

*   [`Symbol.toStringTag`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol) (Festlegbare Ausgabe von `Object.prototype.toString`)

## In meiner Infrastruktur kommt der Paramterer `--harmony` zum Einsatz. Ist es sinnvoll diesen Parameter zu entfernen?

Das Startparameter `--harmony` schaltet lediglich die **staged** Funktionen ein und ist als synomum zu `--es_staging` zu verstehen. Wie oben bereits beschrieben, werden hierdurch mehr oder weniger vollständige Funktionen aktiviert die noch nicht als stabil zu bezeichnen sind. Wer auf nummer Sicher gehen will, gerade in produktiven Umgebungen, sollte ernsthaft darüber nachdenken diesen Startparameter nicht zu verwenden. Wird dennoch nicht auf diesen Startparameter verzichtet, muss man damit rechnen, dass io.js Aktualisierungen die eigene Anwendung unbrauchbar macht. Das geschiet insbesondere dann, wenn Funktionen an dem aktuellen Standard angepasst werden.

## Wie erkenne ich, mit welcher V8 Version io.js ausgeliefert wurde?

io.js bietet eine einfache Möglichkeit, alle Abhängigkeiten der jeweilig installierten Version, durch das globale Objekt `process` aufzulisten. Die V8 Engine stellt ein Befehl zur Verfügung, der die Versionsinformationen ausgibt, wenn man folgendes in der Konsole eingibt:

```sh
iojs -p process.versions.v8
```

# ES6 und io.js

Die io.js-Entwicklung basiert auf der aktuellen Version der [V8](https://code.google.com/p/v8/)-Engine. Mit dem Bestreben, ständig die aktuellste Version der V8-Engine einzusetzen, stellen wir sicher, dass neue Funktionen der [JavaScript ECMA-262 Spezifikation](http://www.ecma-international.org/publications/standards/Ecma-262.htm) sowie Geschwindigkeits- und Stabilitätsverbesserungen schnell für io.js-Entwickler zu Verfügung stehen.

Die Version {{project.current_version}} von io.js wird mit der V8-Version {{project.current_v8}} ausgeliefert, welche bereits ES6-Funktionen beinhaltet, die deutlich weiterentwickelter sind, als jene der Version 3.28.73, die in joyent/node@0.12.x enthalten sind.

## Überflüssiger Startparameter `--harmony`

In joyent/node@0.12.x (V8 3.28+) aktiviert der Startparameter `--harmony` alle ES6-Funktionen auf einmal. Enthalten sind alle jene Funktionen, die als **completed** (Fertiggestellt), **staged** (Auslieferungsvorbereitung) und **in progress** (Entwicklungsphase) gekennzeichnet sind. (Mit der Ausnahme des _nonstandard/non-harmonious_ Ausdrucks `typeof`, welcher sich hinter dem Startparameter `--harmony-typeof` versteckt). Das bedeutet, dass einige sehr fehlerhafte oder sogar kaputte Funktionen wie [proxies](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) genauso frei verfügbar sind, wie solche Funktionen wie [generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*), die nur sehr wenige Fehler enthalten, wenn überhaupt. Daraus hätte sich die Best-Practice ergeben, entweder nur bestimmte Funktionen durch einzelne Startparameter verfügbar zu machen (z.B. `--harmony-generators`), oder einfach alle Funktionen einzuschalten, aber dann nur eine sehr restriktive Untermenge an Funktionen zu verwenden.

Anders in io.js<span>@</span>1.x (V8 4.1+), hier entfällt diese Komplexität: Alle "harmony"-Funktionen sind nun in logische Gruppen aufgeteilt. Diese Gruppen sind: shipping (Ausgeliefert), staged (Bereit zur Auslieferung) und in progress (Noch in Entwicklung).

*   Alle als **shipping** bezeichneten Funktionen (jene die im V8-Projekt als stabil betrachtet werden), also solche wie [generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*), [Templates](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/template_strings), [neue String-Methoden](https://developer.mozilla.org/en-US/docs/Web/JavaScript/New_in_JavaScript/ECMAScript_6_support_in_Mozilla#Additions_to_the_String_object) und viele andere, sind bereits **standardmäßig eingeschaltet in io.js** und müssen **NICHT** erst extra durch Startparameter aktiviert werden.
*   Dann die **staged**-Funktionen. Diese mehr oder weniger vollständigen Funktionen wurden noch nicht komplett getestet oder sind noch nicht auf dem aktuellen Stand der Spezifikationen. Diese werden vom V8-Team deswegen auch als instabil behandelt (z.B. Verhaltensvorhersagen zu Ausnahmefällen sind noch nicht möglich). Vergleichbar war oder ist die Situation der [generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*) in V8 3.26. Das sind nun "benutzen auf eigene Gefahr" Funktionen, welche nur über den Startparameter: `--es_staging` (oder dessen synonym, `--harmony`) aktivierbar sind.
*   Abschließend, alle **in progress**-Funktionen die nur einzeln mittels harmony Startparameter aktivierbar sind (z.B. `--harmony_arrow_functions`), davon ist aber dringend abzuraten, ausser zu testzwecken.

## Welche ES6-Funktionen sind bereits in io.js enthalten und aktiv (ohne Startparameter verwendbar)?


*   Block scoping

    *   [let](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)

    *   [const](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const)

    *   `function`-in-blocks

    >Ähnlich wie in v8 3.31.74.1, block-scoped Deklarationen sind [bewusst mit der Limitierung auf den strict-Modus umgesetzt](https://groups.google.com/forum/#!topic/v8-users/3UXNCkAU8Es). Entwickler sollten gewarnt sein, denn es wird Änderungen geben, sowie die Entwicklung an V8 weitergeführt werden um den ES6-Spezifikation zu folgen.

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

Eine detailliertere Liste, die dazu noch Vergleiche zu anderen Engines enthält, gibt es auf der [compat-table-Projektseite](https://kangax.github.io/compat-table/es6/).

## Welche ES6-Funktionen stehen mit dem Parameter `--es_staging` zur Verfügung?

*   [Classes](https://github.com/lukehoban/es6features#classes) (Nur im `'use strict';` Modus)
*   [Object literal Erweiterung](https://github.com/lukehoban/es6features#enhanced-object-literals)

*   [`Symbol.toStringTag`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol) (Festlegbare Ausgabe von `Object.prototype.toString`)

## An welchen ES6-Funktionen wird gerade gearbeitet?

Neue Funktionen werden ständing zur V8-Engine hinzugefügt. Allgemein gesagt, werden diese erwartungsgemäß in zukünftigen io.js-Versionen verfügbar sein. Der Zeitrahmen ist noch unbekannt.

Es ist möglich alle *in progress*-Funktionen, der installierten io.js-Version aufzulisten. Dafür gibt es den Startparamter `--v8-options`. Es ist zu beachten, dass diese V8-Funktionen unvollständig oder gar kaputt sind. Es gilt: Benutzen auf eigene Gefahr!

```sh
iojs --v8-options | grep "in progress"
```

## In meiner Infrastruktur kommt der Paramterer `--harmony` zum Einsatz. Ist es sinnvoll diesen Parameter zu entfernen?

Das Startparameter `--harmony` schaltet lediglich die **staged**-Funktionen ein und ist als Synonym zu `--es_staging` zu verstehen. Wie oben bereits beschrieben, werden hierdurch mehr oder weniger vollständige Funktionen aktiviert, die noch nicht als stabil zu bezeichnen sind. Wer auf Nummer sicher gehen will, gerade in produktiven Umgebungen, sollte ernsthaft darüber nachdenken, diesen Startparameter nicht zu verwenden, bis die benötigte Funktion in V8 standardmäßig zu Verfügung steht, und somit auch in io.js. Wird der Parameter trotzdem verwendet, muss man damit rechnen, dass künftige io.js-Aktualisierungen den eigenen Code fehlschlagen lässt, falls Funktionen der V8-Engine an den aktuellen Standard angepasst werden.

## Wie erkenne ich, mit welcher V8-Version io.js ausgeliefert wurde?

io.js bietet eine einfache Möglichkeit, alle Abhängigkeiten der jeweilig installierten Version, durch das globale Objekt `process` aufzulisten. Durch folgenden Konsolen-Befehl kann die Version der V8-Engine ausgegeben werden:

```sh
iojs -p process.versions.v8
```

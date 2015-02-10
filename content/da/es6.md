# ES6 i io.js

io.js er bygget op mod en moderne version af [V8](https://code.google.com/p/v8/). Ved at holde det opdateret med de seneste udgivelser af denne motor, sikrer vi at nye funktioner fra [JavaScript ECMA-262-specifikationen](http://www.ecma-international.org/publications/standards/Ecma-262.htm) bliver rettidigt tilgængelige for io.js-udviklere, hvilket også gælder forbedringer til ydeevne og stabilitet.

Version 1.1.0 af io.js leveres med V8 4.1.0.14, som inkluderer ES6-funktioner et godt stykke forbi version 3.26.33, som vil blive leveret med joyent/node@0.12.x.

## Ikke mere --harmony-flag

I joyent/node@0.12.x (V8 3.26), slår `--harmony`-runtime-flaget alle **færdige**, **staged** og **igangværende** ES6-funktioner til sammen på samme tid (med undtagelse af ikke-standard/ikke-harmonerende semantikker for `typeof`, som blev skjult under `--harmony-typeof`). Dette betød at nogle meget fejlfyldte eller ikke-virkende funktioner som [proxy'er](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) var lige så tilgængelige for udviklere som [generatorer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*), der havde meget få eller endda ingen kendte problemer. Derfor var det den bedste praksis kun at slå bestemte funktioner til ved at bruge specifikke runtime-flag (fx `--harmony-generators`), eller ved simpelthen at slå dem alle til og derefter bruge et begrænset udsnit.

Med io.js@1.x (V8 4.1+) forsvinder al den kompleksitet. Alle harmoni-funktioner er nu logisk delt op i tre grupper for **færdige**, **staged** og **igangværende** funktioner:

*   Alle **færdige** funktioner, dem som V8 betragter som stabile, som [generatorer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*), [skabeloner](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/template_strings), [ny streng-methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/New_in_JavaScript/ECMAScript_6_support_in_Mozilla#Additions_to_the_String_object) og mange andre er slået **til som standard i io.js** og kræver **IKKE** nogen form for runtime-flag.
*   Så er der **staged** funktioner, som er næsten-komplette funktioner, der ikke er fuldstændigt testede eller opdaterede til seneste specifikation endnu, og derfor ikke bliver betragtet som stabile af V8-teamet (fx kan der være grænsetilfælde, der ikke er fundet endnu). Det er formentlig tilsvarende status af [generatorer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*) i 3.26. Disse er "brug på egen risiko"-typen af funktioner, der nu kræver runtime-flaget: `--es_staging` (eller dets synonym `--harmony`).
*   Som det sidste kan alle **igangværende** funktioner aktiveres individuelt med deres respektive harmoni-flag (fx `--harmony_arrow_functions`), selvom dette kraftigt frarådes udover til testing-formål.

## Hvilke ES6-funktioner leveres med io.js som standard (ingen runtime-flag påkrævet)?


*   Block scoping

    *   [let](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)

    *   [const](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const)

    *   `function`-in-blocks

    >Fra v8 3.31.74.1, er block-scoped-deklarationer [bevidst implementeret med en ikke-opfyldt begrænsning i forhold til strict-tilstandskode](https://groups.google.com/forum/#!topic/v8-users/3UXNCkAU8Es). Udviklere bør være opmærksomme på, at dette vil ændre sig, mens v8 bevæger sig nærmere opfyldelse af ES6-specifikationen.

*   Collections

    *   [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)

    *   [WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)

    *   [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)

    *   [WeakSet](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet)

    *   [Generatorer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*)

*   [Binary and Octal literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Numeric_literals)

*   [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

*   [Nye string-metoder](https://developer.mozilla.org/en-US/docs/Web/JavaScript/New_in_JavaScript/ECMAScript_6_support_in_Mozilla#Additions_to_the_String_object)

*   [Symboler](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)

*   [Skabelon-strenge](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/template_strings)

Du kan se en mere detaljeret liste, inklusiv en sammenligning med andre motorer, på [compat-table](https://kangax.github.io/compat-table/es6/)-projektsiden.

## Hvis ES6-funktioner er gemt bag --es_staging-flaget?

*   [Klasser](https://github.com/lukehoban/es6features#classes) (kun strict mode)
*   [Object literal extensions](https://github.com/lukehoban/es6features#enhanced-object-literals)

*   [`Symbol.toStringTag`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol) (brugerdefinerbare resultater for `Object.prototype.toString`)

## Jeg har sat min infrastruktur op til at benytte sige af --harmony-flaget. Skal jeg fjerne det?

Den nuværende opførsel af `--harmony`-flaget i io.js har til formål kun at slå **staged**-funktioner til. Det er nu et synonym for `--es_staging`. Som nævnt ovenfor, så er det færdiggjorte funktioner, der ikke bliver betragtet som stabile endnu. Hvis du være på den sikre side, specielt i produktionsmiljøer, overvej at fjerne dette runtime-flag indtil det leveres som standard med V8 og derved også io.js. Hvis du vil beholde dette slået til, skal du være forberedt på at senere io.js-opgraderinger kan ødelægge din kode, hvis V8 ændrer deres semantik til at følge standarden tættere.

## Hvordan finder jeg ud af hvilken version af V8, der leveres med en bestemt version af io.js?

io.js giver en simpel måde at liste alle dependencies og respektive versioner, der leveres med en specifik binary gennem det globale <code>process</code>-objekt. I forbindelse med V8-motoren, tast da det følgende ind i din terminal for at finde dens version:

```sh
iojs -p process.versions.v8
```

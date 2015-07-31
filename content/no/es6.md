# ES6 i io.js

io.js benytter en moderne versjon av [V8](https://code.google.com/p/v8/).  Ved
å holde prosjektet oppdatert med de siste versjonene av V8 sørger vi for at nye
funksjoner fra [JavaScript ECMA-262
spesifikasjonen](http://www.ecma-international.org/publications/standards/Ecma-262.htm)
er tilgjengelig for io.js utviklere innen rimelig tid. I tillegg vil
sikkerhets- og ytelesesforbedringer komme raskt.

Versjon {{project.current_version}} av io.js kommer med V8 versjon {{project.current_v8}}, denne inkluderer
ES6-funksjoner godt forbi versjon 3.28.73 som vil bli levert med Node.js™
0.12.x.

## Slutt på --harmony-flagget

Med Node.js™@0.12.x (V8 3.28+) aktiverte  `--harmony`-flagget ES6-funksjonene
**completed**, **staged** og **in progress** (med unntak av `proxies` som ble
skjult ved bruk av `--harmony-proxies`). Dette resulterte i at ustabile, eller
til og med ødelagte, funksjoner som [Arrow
Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
var like tilgjengelig for utviklere som
[generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*),
som hadde veldig få, eller ingen, kjente problemer. Følgelig var det sikrest å
aktivere enten et fåtall funksjoner ved å bruke spesifikke harmony-flagg
(f.eks.  `--harmony-generators`), eller aktivere dem alle og deretter bare
bruke en begrenset delmengde.

Med io.js@1.x (V8 4.1+) forsvinner all denne kompleksiteten. Alle harmony-funksjoner
er nå logisk fordelt inn i tre grupper for **shipping**-, **staged**- og **in
progress**-funksjoner:

*   Alle **shipping**-funksjoner, som V8 har vurdert som stabile, for eksempel
[generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*),
[templates](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/template_strings),
[new string methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/New_in_JavaScript/ECMAScript_6_support_in_Mozilla#Additions_to_the_String_object)
og mange flere er nå skrudd **på som standard i io.js** og krever  **INGEN**
flagg.
*   Deretter er det **staged**-funksjoner, som er nesten fullførte funksjoner
som ikke har blitt fullstendig testet eller oppdatert i henhold til den siste
spesifikasjonen enda. Følgelig er de ikke ansett som stabile av V8 laget
(f.eks. kan det være noen 'edge cases' som ikke har blitt oppdaget). Dette er
mest sannsynlig ekvivalent med tilstanden til
[generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*)
i 3.26. Disse er "bruk på egen risiko" funksjoner som nå krever flagget :
`--es_staging` (eller synonymet, `--harmony`).
*   Til slutt, alle **in progress**-funksjoner kan bli aktivert individuelt av
deres respektive harmony-flagg (f.eks. `--harmony_arrow_functions`), selv om
dette ikke er anbefalt med mindre det brukes til testing.

## Hvilke ES6-funksjoner følger med io.js som standard (uten å bruke flagg)?

*   Block scoping

    *   [let](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)

    *   [const](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const)

    *   `function`-in-blocks

    > Fra og med v8 3.31.74.1, er block-scoped declarations [forsettlig implementert med en ikke-kompatibel begrensning til strict modus kode](https://groups.google.com/forum/#!topic/v8-users/3UXNCkAU8Es). Utviklere bør være klar over at dette vil endres i takt med V8 sin implementasjon av ES6-spesifikasjonen.

*   [Classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) (bare i strict modus)

*   Collections

    * [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)

    * [WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)

    * [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)

    * [WeakSet](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet)

*   [Generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*)

*   [Binary and Octal literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Numeric_literals)

*   [Object literal extensions](https://github.com/lukehoban/es6features#enhanced-object-literals) (shorthand egenskaper og metoder)

*   [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

*   [New String methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/New_in_JavaScript/ECMAScript_6_support_in_Mozilla#Additions_to_the_String_object)

*   [Symbols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)

*   [Template strings](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/template_strings)

Du kan se en mer detaljert liste med sammenligninger opp mot andre motorer på prosjektsiden til [compat-table](https://kangax.github.io/compat-table/es6/).

## Hvilke ES6-funksjoner ligger i --es_staging-flagget?

*   [`Symbol.toStringTag`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol) (brukerdefinert resultat av `Object.prototype.toString`, bak flagget `--harmony_tostring`)

## Hvilke ES6-funksjoner er under utvikling?

Nye funksjoner legges inn i V8 motoren hele tiden. På generell basis kan man forvente at disse funksjonene blir tilgjengelig i en framtidig io.js utgivelse. Det kan ikke antas noe om hvor lang tid det tar.

Listen over alle funksjoner som er *under utvikling* og er tilgjengelig i en io.js utgivelse kan listes ut med `--v8-options` argumentet. Vær oppmerksom på at dette er uferdige funksjoner og muligens funksjoner med feil, bruk dem på eget ansvar:

```sh
iojs --v8-options | grep "in progress"
```

## Jeg bruker --harmony-flagg i produksjon. Burde jeg fjerne det?

Den nåværende oppførselen til `--harmony`-flagget i io.js er å kun aktivere
**staged**-funksjoner. Dette er tross alt nå synonymt med `--es_staging`.  Som
nevnt ovenfor er dette fullførte funksjoner som enda ikke er ansett som stabile
enda. Hvis du ønsker å være på den sikre siden, kanskje spesielt med tanke på
produksjonsmiljøer, bør du vurdere å fjerne dette flagget inntil det leveres
som standard av V8 og io.js. Hvis du fortsetter å ha flagget aktivert bør du
være forberedt på at nyere io.js-oppgraderinger kan ødelegge koden din dersom
V8 endrer semantikken sin til å være mer lik standarden.

## Hvordan finner jeg ut hvilken versjon av V8 en gitt io.js versjon har?

io.js har en enkel måte å liste alle avhengigheter/dependencies og versjoner av
en gitt binær med det globale objektet `process`. For å finne-V8 versjonen kan
du skrive følgende i terminalen:

```sh
iojs -p process.versions.v8
```

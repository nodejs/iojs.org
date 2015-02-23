# ES6 con io.js

io.js integra al suo interno una versione moderna del motore [V8](https://code.google.com/p/v8/). Rimanendo aggiornati con le ultime versioni di questo motore, possiamo rendere disponibili le nuove caratteristiche delle [specifiche JavaScript ECMA-262](http://www.ecma-international.org/publications/standards/Ecma-262.htm) agli sviluppatori io.js in modo rapido, assieme ai continui miglioramenti nella stabilità e nelle prestazioni.

La versione 1.2.0 di io.js viene rilasciata con la V8 4.1.0.14, che include caratteristiche di ES6 più avanzate rispetto alla versione 3.26.33 che sarà rilasciata assieme a joyent/node@0.12.x.

## Il flag --harmony non è più necessario

Con joyent/node@0.12.x (V8 3.26), il flag di runtime `--harmony` abilita le caratteristiche di ES6 **completed**, **staged** ed **in progress** tutte insieme, in blocco (con l'eccezione delle semantiche non-standard, non-harmony per `typeof`, che sono abilitate dal flag `--harmony-typeof`). Ciò implica che alcune caratteristiche problematiche come i [proxies](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) sono disponibili allo stesso livello dei [generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*), che hanno pochissimi difetti conosciuti o addirittura nessuno. Per questo motivo, sarebbe stato meglio o abilitare solo alcune caratteristiche utilizzando flag specifici, (es. `--harmony-generators`), o semplicemente abilitarle tutte ma usarne solo un insieme ridotto.

Con io.js@1.x (V8 4.1+), tutta questa complessità è stata superata. Tutte le caratteristiche di harmony sono suddivise logicamente in tre gruppi per le caratteristiche **shipping**, **staged** ed **in progress**:

*   Tutte le caratteristiche **shipping**, quelle che V8 considera stabili, come i [generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*),i [templates](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/template_strings),i [nuovi metodi delle stringhe](https://developer.mozilla.org/en-US/docs/Web/JavaScript/New_in_JavaScript/ECMAScript_6_support_in_Mozilla#Additions_to_the_String_object) e molti altri, sono **abilitati di default con io.js** e **NON** richiedono l'uso di nessun flag particolare.
*   Poi ci sono le caratteristiche **staged**, che sono caratteristiche quasi completate, ma che non sono ancora state testate completamente, o che non sono ancora aggiornate alle ultime versioni della specifica, quindi non sono considerate stabili dal team di sviluppo di V8 (ad esempio potrebbero esserci dei casi particolari ancora da scoprire). Questo è probabilmente lo stesso stato dei [generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*) nella versione 3.26. Queste sono il tipo di caratteristiche "usa a tuo rischio e pericolo" che ora richiedono un flag di runtime: `--es_staging` (o il suo sinonimo, `--harmony`).
*   Infine, tutte le caratteristiche **in progress** possono essere attivate individualmente tramite il loro flag specifico (es. `--harmony_arrow_functions`), nonostante questo sia altamente sconsigliato, se non per finalità di test.

## Quali caratteristiche di ES6 sono attive di default (senza l'uso di nessun flag)?

*   Block scoping

    *   [let](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)

    *   [const](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const)

    *   `function`-in-blocks

    >Dalla v8 3.31.74.1, le dichiarazioni block-scoped sono [intenzionalmente implementate con una limitazione al codice in strict mode che non corrisponde con le specifiche](https://groups.google.com/forum/#!topic/v8-users/3UXNCkAU8Es). Gli sviluppatori devono essere a conoscenza del fatto che questo cambierà man mano che la V8 migliorerà la sua aderenza alle specifiche ES6.

*   Collections

    *   [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)

    *   [WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)

    *   [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)

    *   [WeakSet](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet)

*   [Generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*)

*   [Binary e Octal literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Numeric_literals)

*   [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

*   [Nuovi metodi String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/New_in_JavaScript/ECMAScript_6_support_in_Mozilla#Additions_to_the_String_object)

*   [Symbols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)

*   [Stringhe Template](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/template_strings)

Puoi trovare una lista più dettagliata, oltre ad un confronto con altri motori, sulla pagina del progetto [compat-table](https://kangax.github.io/compat-table/es6/) .

## Quali caratteristiche di ES6 sono abilitate dal flag --es_staging?

*   [Classi](https://github.com/lukehoban/es6features#classes) (strict mode only)
*   [Object literal extensions](https://github.com/lukehoban/es6features#enhanced-object-literals)
*   [`Symbol.toStringTag`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol) (possibilità di definire i risultati di `Object.prototype.toString`)

## La mia infrastruttura è impostata per utilizzare il flag --harmony. Devo rimuoverlo?

Il comportamento corrente del flag `--harmony` con io.js è di abilitare solo le caratteristiche **staged**. In effetti è un sinonimo di `--es_staging`. Come menzionato prima, queste sono caratteristiche completate ma che non sono considerate ancora stabili. Se volete essere al sicuro, specialmente in ambienti di produzione, valutate di rimuovere il flag finchè le caratteristiche non saranno disponibili di default su V8 e di conseguenza su io.js. Se mantenete il flag abilitato, preparatevi al fatto che upgrade futuri di io.js potrebbero guastare il vostro codice, se V8 dovesse cambiare la sua semantica per seguire lo standard più fedelmente.

## Come posso trovare quale versione di V8 è distribuita con una particolare versione di io.js?

io.js fornisce un modo semplice di elencare tutte le dipendenze e le corrispettive versioni che sono distribuite con una specifica versione dei binari, attraverso l'oggetto globale `process`. Nel caso della V8, scrivete queste istruzioni nel vostro terminale per scoprire la versione:

```sh
iojs -p process.versions.v8
```

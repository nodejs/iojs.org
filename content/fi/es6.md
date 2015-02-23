# ES6 ja io.js

io.js nojaa tuoreisiin [V8](https://code.google.com/p/v8/):n versioihin. Pysymällä ajan tasalla viimeisimpien versioiden kanssa varmistetaan sekä uusimpien [JavaScript ECMA-262 specification](http://www.ecma-international.org/publications/standards/Ecma-262.htm) ominaisuuksien, että suorituskykyyn ja vakauteen liittyvien parannusten nopea saapuminen kehittäjien ulottuville.

io.js:n versio 1.3.0 sisältää V8 version 4.1.0.14, mikä ES6:n osalta ylittää tuntuvasti ominaisuuksiltaan version 3.28.72 mikä sisältyy Node.js™ 0.12.x-versioihin.

## Ei enää --harmony lippua

Node.js™@0.12.x (V8 3.28+) ajonaikainen `--harmony`-lippu aktivoi kaikki **valmiit**, **koekäyttövaiheen** ja **kehitysvaiheen** ES6-ominaisuudet (poikkeuksena `proxies`, joille on oma `--harmony-proxies`-lippunsa). Toisin sanoen jotkin bugiset tai jopa rikkinäiset ominaisuudet kuten [Arrow Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) on yhtä lailla käytettävissä kuin [generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*), millä on vähän tai ei yhtään tunnettuja ongelmia. Usein kehittäjät ottavat käyttöön vain tiettyjä ominaisuuksia käyttämällä täsmällisiä ajonaikaisia ominaisuuslippuja (esim. `--harmony-generators`), tai yksinkertaisesti ottavat kaiken käyttöön ja pitäytyvät käytössään rajatussa osassa.

io.js@1.8 (V8 4.1+) myötä nuo hankaluudet poistuvat. Kaikki harmonyn ominaisuudet on nyt loogisesti jaoteltu kolmeen ryhmään, eli **valmiisiin**, **koekäyttövaiheen** ja **kehitysvaiheen** ominaisuuksiin:

* **Valmiit** ominaisuudet, eli ne jotka V8 määrittelee vakaiksi (_stable_), kuten [generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*), [templates](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/template_strings), [new string methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/New_in_JavaScript/ECMAScript_6_support_in_Mozilla#Additions_to_the_String_object) ja moni muu on **oletuksena käytössä io.js:ssä**, eikä siis vaadi minkäänlaisia ajonaikaisia lippuja
* **Koekäyttövaiheen** ominaisuudet ovat lähes valmiita ominaisuuksia mitkä ei vielä ole täysin testattuja tai päivitetty vastaamaan uusinta määrittelyä, eikä siksi pidetä V8-tiimin osalta vakaina (_stable_) (esim. voi olla olemassa joitain vielä tuntemattomia rajatapauksia). Tätä tilaa vastaa luultavasti [generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*) versiossa 3.26. Nämä ovat "käytä omalla vastuullasi" tyyppisiä ominaisuuksia, mitkä nyt vaativat käyttöönottoa varten ajonaikaisen lipun: `--es_staging` (tai sen synonyymin `--harmony`).
* **Kehitysvaiheen** ominaisuudet on otettavissa käyttöön yksitellen kunkin omalla lipullaan (esim. `--harmony_arrow_functions`), joskin se ei ole suositeltavaa kuin koemielessä.

## Mitkä ES6 ominaisuudet ovat io.js:ssä oletuksena käytössä (ilman ajonaikaisia lippuja)?

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

Yksityiskohtaisempi lista, mihin sisältyy myös vertailu muihin suoritusympäristöihin, löytyy [compat-table](https://kangax.github.io/compat-table/es6/) -projektin sivulta.

## Mitä ES6 ominaisuudet ovat --es_staging lipun takana?

*   [Classes](https://github.com/lukehoban/es6features#classes) (strict mode only, behind flag `--harmony_classes` which implies block scoping & object literal extensions)

*   [Object literal extensions](https://github.com/lukehoban/es6features#enhanced-object-literals) (behind flag `--harmony_object_literals`)

*   [`Symbol.toStringTag`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol) (user-definable results for `Object.prototype.toString`, behind flag `--harmony_tostring`)

## Mitkä ES6 ominaisuudet ovat kehitysvaiheessa?

Uusia ominaisuuksia lisätään jatkuvasti V8-suoritusympäristöön. Yleisesti voi olettaa niiden kaikkien päätyvän io.js:n tulevaisuudessa, joskin tarkka ajoitus on toistaiseksi vielä tuntematon.

Voit listata kaikki saatavilla olevat *kehitysvaiheen* ominaisuudet kustakin io.js:n julkaisusta hakemalla `--v8-options` tulosteesta. Huomioithan, että nämä ovat keskeneräisiä ja mahdollisesti rikkinäisiä V8:n ominaisuuksia, joten käytät niitä omalla vastuullasi:

```sh
iojs --v8-options | grep "in progress"
```

## Hyödynnän infrastuktuurissani --harmony lippua. Tulisiko minun ottaa se pois käytöstä?

Tällä hetkellä `--harmony`-lippu tuo io.js:ssä käyttöön vain **koekäyttövaiheen** ominaisuudet. Käytännössä se on siis `--es_staging`-lipun synonyymi. Kuten yllä on todetaan, nämä ovat valmiita ominaisuuksia mitä ei vielä pidetä vakaina (_stable_). Jos haluat pelata varman päälle, erityisesti tuotantoympäröissä, on syytä harkita tämän ajonaikaisen lipun käytöstä poistamista kunnes se on oletuksena käytössä V8:ssa ja sen myötä myös io.js:ssä. Jos kuitenkin pidät sen käytössä, varaudu siihen, että io.js:n päivitys voi aiheuttaa koodin rikkoutumista mikäli V8 alkaa seuraamaan standardeja tarkemmin.

## Mistä löydän tiedon siitä mikä versio V8:sta missäkin io.js:n versiossa on käytössä?

io.js tarjoaa yksinkertaisen tavan listata kaikki riippuvuudet versioineen jotka toimitetaan kunkin binäärin osana globaalin `process`-objektin kautta. V8-suoritusympäristön ollessa kyseessä, seuraava komentorivikomento palauttaa sen version:

```sh
iojs -p process.versions.v8
```

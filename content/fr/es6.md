# ES6 et io.js

io.js est construit sur des versions modernes de [V8](https://code.google.com/p/v8/). En restant à jour avec les dernières livraisons du moteur, nous nous assurons que les dernières fonctionnalités de la [spécification JavaScript ECMA-262](http://www.ecma-international.org/publications/standards/Ecma-262.htm) sont mises à disposition des développeurs io.js en continu, ainsi que des améliorations de performance et de stabilité.

La version {{project.current_version}} d'io.js est livrée avec V8 {{project.current_v8}} qui inclue des fonctionnalités ES6 qui vont bien au delà de la version 3.28.73 qui sera fournie avec joyent/node@0.12.x.

## Disparition de l'option --harmony

Avec joyent/node@0.12.x (V8 3.28+), l'option `--harmony` activait toutes les fonctionnalités d'ES6 en même temps, qu'elles soient **shipping** (livrées), **staged** (en phase d'acceptation) ou **in progress** (en développement) (à l'exception de la sémantique non-standard/non-harmony de `typeof` qui était cachée derrière l'option `--harmony-typeof`). Ceci signifiait que certaines fonctionnalités défectueuses ou inopérantes telles que les [proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) étaient mises à disposition tout comme les [générateurs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*), qui en revanche n'avaient que peu de défauts connus. De fait, il est de bonne pratique d'activer uniquement certaines fonctionnalités via l'utilisation d'options d'éxécution de fonctionnalités harmony (comme `--harmony-generators par exemple), ou simplement de toutes les activer mais de n'en utiliser qu'une partie.

Avec io.js@1.x (V8 4.1+), cette complexité disparait. Toutes les fonctionnalités d'harmony sont à présent séparées en trois groupes distincts: **livrées**, **en phase d'acceptation** ou **en développement**.

*   Toutes les fonctionnalités **livrées**, celles que V8 considère comme stables, tels que les [générateurs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*), [*templates*](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/template_strings), [nouvelles méthodes de *string*](https://developer.mozilla.org/en-US/docs/Web/JavaScript/New_in_JavaScript/ECMAScript_6_support_in_Mozilla#Additions_to_the_String_object) et bien d'autres sont activées par défaut avec io.js, et ne nécessitent **AUCUN** autre type d'option d'éxécution.
*   Puis il y a les fonctionnalités en **phase d'acceptation**, qui sont quasiment terminées mais n'ont pas encore été complètement testées ou mises en conformité avec les dernières spécifications et ne sont pas considérées comme stables par l'équipe de V8 (certaines peuvent par exemple présenter des cas d'erreurs particuliers encore inconnus). Cet état est probablement équivalent à celui des [générateurs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*) lors de la version 3.26. Ce sont les fonctionnalités à utiliser "à vos risques" et qui nécessitent l'option d'éxécution `--es_staging` (ou son équivalent `--harmony`).
*   Enfin, toutes les fonctionnalités **en cours de développement** peuvent être activées individuellement via leur *flag* harmony respectif (par exemple `--harmony_arrow_functions`), bien que ceci soit déconseillé à d'autres fins que pour les tester.

## Quelles fonctionnalités d'ES6 sont livrées par défaut avec io.js (sans nécessiter d'option d'éxécution)?

*   Portée de bloc

    *   [let](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)

    *   [const](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const)

    *   `function`-in-blocks

    >Au moment de la version 3.31.74.1 de v8, les [déclarations de variables à portée de bloc sont intentionnellement limitées au mode strict](https://groups.google.com/forum/#!topic/v8-users/3UXNCkAU8Es). Veuillez-noter que ceci changera alors que v8 continuera sa mise en conformité avec les spécifications ES6.

*   Collections

    *   [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)

    *   [WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)

    *   [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)

    *   [WeakSet](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet)

*   [Generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*)

*   [Littéraux octaux et binaires](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Numeric_literals)

*   [Promesses](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

*   [Nouvelles méthodes de *String*](https://developer.mozilla.org/en-US/docs/Web/JavaScript/New_in_JavaScript/ECMAScript_6_support_in_Mozilla#Additions_to_the_String_object)

*   [Les Symboles](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)

*   [Les chaînes de caractères *template*](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/template_strings)

Vous pouvez trouver une liste plus détaillée, incluant une comparaison avec d'autres moteurs, sur la [compat-table](https://kangax.github.io/compat-table/es6/).

## Quelles fonctionnalités d'ES6 sont en développement?

De nouvelles fonctionnalités sont constamment ajoutées au moteur V8. En règle générale, attendez-vous à les voir arriver lors d'une prochaine livraison d'io.js, bien que le moment ne soit pas déterminé.

Vous pouvez lister toutes les fonctionnalités disponibles pour chaque livraison d'io.js en filtrant l'option `--v8-options`. Veuillez noter que ce sont des fonctionnalités de V8 incomplètes et potentiellement défectueuses, donc utilisez-les à vos risques et périls.

```
iojs --v8-options | grep "in progress"
```

## Quelles fonctionnalités ES6 sont derrière l'option --es_staging?

*   [Les classes](https://github.com/lukehoban/es6features#classes) (uniquement en mode strict)
*   [Extensions d'objets littéraux](https://github.com/lukehoban/es6features#enhanced-object-literals)

*   [`Symbol.toStringTag`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol) (résultats personnalisables pour `Object.prototype.toString`)

## Mon infrastructure est configurée pour tirer partie de l'option --harmony. Dois-je la retirer?

Le comportement actuel de l'option `--harmony` d'io.js est d'activer les fonctionnalités **en cours d'acceptation** seulement. Après tout, il s'agit à présent d'un synonyme de `--es_staging`. Comme indiqué plus haut, ce sont les fonctionnalités complètes qui ne sont pas encore considérées comme stables. Si vous voulez jouer la carte de la sécurité, surtout dans un environnement de production, envisagez de retirer l'option d'éxécution en attendant que la fonctionnalité soit disponible par défaut dans V8, et donc dans io.js. Si vous conservez l'option activée, vous devez vous préparer à ce que de nouvelles versions d'io.js introduisent des régressions si V8 change de sémantique pour se conformer aux standards.

## Comment savoir quelle version de V8 est livrée avec une version particulière d'io.js?

io.js fournit une méthode simple pour lister toutes les dépendances et versions respectives livrées avec un binaire spécifique via l'objet global `process`. Dans le cas du moteur V8, saisissez la commande suivante dans votre terminal afin d'obtenir la version :

```sh
iojs -p process.versions.v8
```

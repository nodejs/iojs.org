# ES6 en io.js

io.js está construido sobre versiones modernas de [V8](https://code.google.com/p/v8/). Manteniéndolo actualizado con las últimas versiones de este motor nos aseguramos que las nuevas funcionalidades de la [especificación ECMA-262 de JavaScript](http://www.ecma-international.org/publications/standards/Ecma-262.htm) estén disponibles para los desarrolladores de io.js de manera oportuna, así como también las mejoras de rendimiento y estabilidad.

La versión 1.1.0 de io.js utiliza V8 4.1.0.14, que incluye las mejoras de ES6 superando claramente la versión 3.26.33 que será incluida con joyent/node@0.12.x.

## No más --harmony flag

En joyent/node@0.12.x (V8 3.26), la flag `--harmony` habilita todas las mejoras **completed**, **staged** e **in progress** de ES6, en una sola (con la excepción de los semánticos non-standard/non-harmonious para `typeof` el cuál está oculto bajo  `--harmony-typeof`).  Esto significaba que algunas mejoras experimentales o incluso dañadas, como [proxies](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy), estaban tan fácilmente disponibles para los desarrolladores como [generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*), lo cual traía muy pocos o casi nulos problemas conocidos. Así, era mejor práctica habilitar sólo algunas mejoras usando flags harmony específicas (ej. `--harmony-generators`), o simplemente habilitarlas todas y después restringirlas una por una.

Con  io.js@1.x (V8 4.1+), toda la complejidad queda eliminada. Todas las mejoras harmony están ahora equitativamente separadas en tres grupos: **shipping**, **staged** e **in progress**.

Todas las mejoras **shipping**, las que el equipo de V8 consideran estables, como [generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*), [templates](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/template_strings), [nuevos métodos de  string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/New_in_JavaScript/ECMAScript_6_support_in_Mozilla#Additions_to_the_String_object) y muchas más están **disponibles por defecto en io.js** y **NO** requieren ningún tipo de configuración.
* Y están las funcionalidades **staged** que son funcionalidades casi completas que no han sido totalmente probadas o actualizadas a la última especificación todavía y no son consideradas estables por el equipo de V8 (ej. podría haber algunos casos raros por descubrir). Este es probablemente el equivalente al estado de los [generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*) en 3.26. Estas son las funcionalidades del tipo "use at your own risk" (usar bajo tu responsabilidad) que requieren una flag: `--es_staging` (o su sinónimo, `--harmony`).
* Finalmente, todas la funcionalidades **in progress** se pueden activar individualmente por su respectiva harmony flag (ejemplo: `--harmony_arrow_functions`), aunque esto no está recomendado a menos que sea para pruebas.

## ¿Qué características de ES6 vienen con io.js por defecto (no es necesaria la runtime flag)?


* Block scoping

    * [let](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)

    * [const](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const)

    * `function`- en bloques

    >Como en v8 3.31.74.1, las declaraciones block-scoped están [intencionalmente implementadas con una limitación no estandarizada por código en strict mode](https://groups.google.com/forum/#!topic/v8-users/3UXNCkAU8Es). Los desarrolladores deben tener en cuenta que esto va a cambiar cuando v8 continúe hacia la aplicación del estándar ES6.

* Colecciones

    * [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)

    * [WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)

    * [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)

    * [WeakSet](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet)* [Generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*)

* [Literales Binarios y Octales](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Numeric_literals)

* [Promesas](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

* [New String methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/New_in_JavaScript/ECMAScript_6_support_in_Mozilla#Additions_to_the_String_object)

* [Símbolos](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)

* [Template strings](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/template_strings)

Puedes ver una lista más detallada, incluyendo la comparación con otros motores, en la página del proyecto [compat-table](https://kangax.github.io/compat-table/es6/).

## ¿Qué funcionales de ES6 están detrás de la --es_staging flag?

* [Clases](https://github.com/lukehoban/es6features#classes) (sólo en strict mode)
* [Object literal extensions](https://github.com/lukehoban/es6features#enhanced-object-literals)

* [`Symbol.toStringTag`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol) (resultados definidos por el usuario para `Object.prototype.toString`)

## Tengo mi infraestructura configurada para hacer uso de la `--harmony` flag  ¿Debo eliminarla?

El comportamiento actual de `--harmony` flag en io.js es el de sólo activar funcionalidades **staged**. Después de todo, es ahora un sinónimo de `--es_staging`.  Como se mencionó anteriormente, estas son funcionalidades completadas que no han sido consideradas estables todavía. Si quieres ir por lo seguro, especialmente en entornos de producción, considera no utilizar esta flag hasta que venga por defecto en V8 y, consecuentemente, en io.js. Si la mantienes activada, debes prepararte para que actualizaciones futuras de io.js rompan tu código en caso que V8 cambie su semántica a siguiendo de forma mas cercana el estándar.

## ¿Cómo determino la versión de V8 que se distribuye con una versión en particular de io.js?

io.js provee una manera sencilla de listar todas las dependencias y respectivas versiones que se distribuyen con un binario específico, a través del objeto global `process`. En el caso del motor V8, escribe lo siguiente en tu terminal para obtener su versión:

```sh
iojs -p process.versions.v8
```

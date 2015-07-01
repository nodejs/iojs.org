# ES6 no io.js

O io.js é construído usando versões modernas do [V8](https://code.google.com/p/v8/). Mantendo-nos atualizados com as últimas versões desta engine, garantimos que novas funcionalidades da [especificação JavaScript ECMA-262](http://www.ecma-international.org/publications/standards/Ecma-262.htm) são trazidas para desenvolvedores io.js rapidamente, além de manter performance continuada e melhorias de estabilidade.

A versão {{project.current_version}} do io.js vem com o V8 {{project.current_v8}}, que inclui funcionalidades do ES6 bem além da versão 3.26.33 que vem com o joyent/node@0.12.x.

## Não mais flag --harmony

No joyent/node@0.12.x (V8 3.26), a flag de runtime `--harmony` habilitava todas funcionalidades ES6 **completas**, **em teste** e **em progresso** juntas, de uma vez só (com a exceção de semânticas não padrão/não harmoniosas para `typeof` que estavam escondidas sob `--harmony-typeof`). Isto significava que algumas funcionalidades realmente bugadas ou mesmo quebradas como os [proxies](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) estavam prontamente disponíveis para desenvolvedores como os [generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*), que tinham poucos ou mesmo nenhuma issue conhecida. Portanto, era uma boa prática ou habilitar apenas certas funcionalidades usando flags de runtime harmony para funcionalidades específicas (por ex. `--harmony-generators`), ou simplesmente habilitar tudo e depois usar apenas um subconjunto restrito.

Com o io.js (V8 4.1+), toda esta complexidade vai embora. Todas as funcionalidades harmony agora estão logicamente divididas em três grupos para funcionalidades **entregues**, **sob testes** e **em progresso**:

*   Todas funcionalidades **entregues**, aquelas consideradas estáveis pelo V8, como [classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes), [generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*), [templates](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/template_strings), [novos métodos de string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/New_in_JavaScript/ECMAScript_6_support_in_Mozilla#Additions_to_the_String_object) e muitas outras são **habilitadas por padrão no io.js** e **NÃO** requerem qualquer tipo de flag de runtime.
*   Então há as funcionalidades **em testes** que são funcionalidades quase completas que não foram completamente testadas ou atualizadas com a última especificação e portanto não são consideradas estáveis pela equipe do V8 (por ex. pode haver alguns edge cases restando a descobrir). Isto é provavelmente o equivalente ao estado dos [generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*) no 3.26. Estas são funcionalidades do tipo "use sob seu próprio risco" que agora requerem a flag: `--es_staging` (ou seu sinônimo, `--harmony`).
*   Finalmente, todas funcionalidades **em progresso** podem ser ativadas individualmente pela sua respectiva flag harmony (por ex. `--harmony_arrow_functions`). No entanto, isto é altamente desemcorajado a não ser para fins de teste.

## Que funcionalidades ES6 estão disponíveis por padrão no io.js (sem requerer flag)?


*   Escopo de bloco

    *   [let](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)

    *   [const](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const)

    *   `function` em blocos

    >Desde o v8 3.31.74.1, declarações em escopo de bloco são [intencionalmente implementadas como uma limitação em não conformidade com código em modo estrito](https://groups.google.com/forum/#!topic/v8-users/3UXNCkAU8Es). Desenvolvedores devem estar cientes que isto deve mudar assim que o v8 continuar em direção à conformidade com a especificação ES6.

*   [Classes](https://github.com/lukehoban/es6features#classes) (modo estrito apenas)
*   Coleções

    *   [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)

    *   [WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)

    *   [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)

    *   [WeakSet](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet)

*   [Generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*)

*   [Literais Binários e Octais](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Numeric_literals)
*   [Extensões de literal de objetos](https://github.com/lukehoban/es6features#enhanced-object-literals)

*   [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

*   [Novos métodos de Strings](https://developer.mozilla.org/en-US/docs/Web/JavaScript/New_in_JavaScript/ECMAScript_6_support_in_Mozilla#Additions_to_the_String_object)

*   [Symbols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)

*   [Strings Template](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/template_strings)

Você pode ver uma lista mais detalhada, incluindo uma comparação com outras engines, no página do projeto da [tabela de compatibilidade](https://kangax.github.io/compat-table/es6/).

## Que funcionalidades ES6 estão sob a flag --es_staging?

*   [`Symbol.toStringTag`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol) (resultados definidos pelo usuário para `Object.prototype.toString`)

## Eu tenho minha própria infraestrutura configurada para usar a flag --harmony. Devo removê-la?

O comportamento atual da flag `--harmony` no io.js é para habilitar funcionalidades **em testes** apenas. Além disso, ela é agora um sinônimo de `--es_staging`. Como mencionado acima, estas são funcionalidades completas que não foram consideradas estáveis ainda. Se você quiser manter-se seguro, especialmente em ambientes de produção, considere remover esta flag de runtime até que ela seja disponibilizada por padrão no V8 e, consequentemente, no io.js. Se você mantê-la habilitada, você deve estar preparado para que futuras atualizações do io.js quebrem seu código se o V8 alterar suas semânticas para ter uma maior conformidade com a especificação.

## Como posso saber que versão do V8 está disponível com uma versão específica do io.js?

O io.js fornece uma maneira simples de listar todas as dependências e suas respectivas versões que são disponibilizadas em um binário através do objeto global `process`. No caso da engine V8, digite o seguinte em seu terminal para obter sua versão:

```sh
iojs -p process.versions.v8
```

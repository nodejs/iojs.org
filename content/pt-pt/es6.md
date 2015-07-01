# ES6 no io.js

O io.js é compilado com versões modernas do [V8](https://code.google.com/p/v8/). Mantendo-nos atualizados com a última versão deste motor, garantimos que as novas funcionalidades da [especificação JavaScript ECMA-262](http://www.ecma-international.org/publications/standards/Ecma-262.htm) são disponibilizadas rapidamente aos programadores io.js, bem como as melhorias de performance e estabilidade.

A versão {{project.current_version}} do io.js vem com o V8 {{project.current_v8}} que inclui funcionalidades ES6 muito além da versão 3.26.33 presente no joyent/node@0.12.x.

## Chega de --harmony flag

No joyent/node@0.12.x (V8 3.26), a flag de runtime `--harmony` ativava todas as funcionalidades **entregues**, **em teste**, e **em desenvolvimento** do ES6, em simultâneo e de uma só vez (com a exceção da não-padrão/não-harmoniosa semântica para `typeof` que estava escondida sob `--harmony-typeof`). Isto significava que algumas funcionalidades com bugs ou até mesmo funcionalidades partidas como os [proxies](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy), estavam imediatamente disponíveis aos programadores, tal como os [generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*), que tinham poucos ou nenhum problema conhecido. Como tal, era boa prática apenas habilitar algumas funcionalidades utilizando flags específicas de runtime harmony (p.e `--harmony-generators`), ou simplesmente habilitar todas as funcionalidades e usar apenas um subconjunto específico.

Com o io.js (V8 4.1+), toda essa complexidade deixa de existir. Todas as funcionalidades harmony estão agora logicamente separadas em três grupos: **entregues**, **em testes** e **em desenvolvimento**:

* Todas as funcionalidades **entregues**, aquelas consideradas estáveis pelo V8, como [classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes), [generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*), [templates](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/template_strings), [novos métodos string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/New_in_JavaScript/ECMAScript_6_support_in_Mozilla#Additions_to_the_String_object) estão ligados **por omissão no io.js** e **NÃO** precisam qualquer tipo de flag runtime.

* Depois existem as funcionalidades **em testes** que são funcionalidades quase completas mas que ainda não foram totalmente testadas ou não foram atualizadas para a última especificação, logo não são consideradas estáveis pela equipa do V8 (p.e. poderão existir alguns casos extremos ainda por descobrir). Este é provavelmente o estado dos [generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*) em 3.26. Estas são as funcionalidades do tipo "use por sua própria conta e risco" que agora precisam uma flag de runtime: `--es_staging` (ou o seu sinónimo, `--harmony`).

* Finalmente, todas as funcionalidades **em desenvolvimento** podem ser ativadas individualmente pelas suas respetivas flags harmony (p.e. `--harmony_arrow_functions`), no entanto isto é altamente desaconselhado, exceto em situações de testes.

## Que funcionalidades ES6 estão disponíveis por omissão no io.js (não necessitam de flag runtime)?


*   Contexto em bloco

    *   [let](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)

    *   [const](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const)

    *   `function` em blocos

    >A partir do v8 3.31.74.1, declarações de contexto em bloco estão [intencionalmente implementadas com uma limitação em não conformidade com código em strict mode](https://groups.google.com/forum/#!topic/v8-users/3UXNCkAU8Es). Os programadores deverão estar atentos ao facto de que isto irá mudar à medida que o v8 se aproxima da conformidade com a especificação ES6.

*   [Classes](https://github.com/lukehoban/es6features#classes) (apenas strict mode)
*   Coleções

    *   [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)

    *   [WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)

    *   [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)

    *   [WeakSet](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet)

*   [Generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*)

*   [Literais Binários e Octais](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Numeric_literals)
*   [Extensões de literais de objectos](https://github.com/lukehoban/es6features#enhanced-object-literals)

*   [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

*   [Novos métodos de Strings](https://developer.mozilla.org/en-US/docs/Web/JavaScript/New_in_JavaScript/ECMAScript_6_support_in_Mozilla#Additions_to_the_String_object)

*   [Symbols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)

*   [Template strings](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/template_strings)

Podem consultar uma lista mais detalhada, incluíndo a comparação com outros motores na [tabela de compatibilidades](https://kangax.github.io/compat-table/es6/).

## Que funcionalidades ES6 estão sob a flag --es_staging?

*   [`Symbol.toStringTag`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol) (resultados definidos pelo utilizador para `Object.prototype.toString`)

## Tenho a minha infraestrutura configurada para usar a flag --harmony. Devo removê-la?

O comportamento atual da flag `--harmony` no io.js é ativar funcionalidades **em teste** apenas. Afinal de contas, é agora um sinónimo de `--es_staging`. Como foi mencionado em cima, estas são funcionalidades desenvolvidas que ainda não foram consideradas estáveis. Se quiser jogar pelo seguro, especialmente em ambientes de produção, considere remover esta flag de runtime até sair por omissão no V8 e consequentemente no io.js. Se mantiver esta flag ativa, deverá estar preparado para que atualizações no io.js possam partir o seu código se o V8 mudar a semântica para estar mais de acordo com a especificação.

## Como descubro a versão do V8 que vem com uma versão específica do io.js?

O io.js disponibiliza uma maneira simples de listar todas as dependências e respetivas versões que vêm incluídas num binário específico através do objecto global `process`. No caso do motor V8, basta escrever o seguinte no terminal para obter a versão do mesmo:

```sh
iojs -p process.versions.v8
```

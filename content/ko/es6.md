# io.js의 ES6

io.js는 [V8](https://code.google.com/p/v8/)의 새로운 버전으로 빌드한다. V8 엔진의 최신 버전을 사용함으로써 [JavaScript ECMA-262 사양](http://www.ecma-international.org/publications/standards/Ecma-262.htm)의 신기능을 io.js 개발자가 즉시 이용할 수 있을 뿐만 아니라 지속적인 성능과 안정성 있는 개선을 보장할 수 있게 된다.

io.js 1.2.0 버전은 V8 4.1.0.14를 이용한다. 이것은 Node.js™ 0.12.x가 쓰는 3.28.73 버전보다 ES6 기능이 더 많이 구현되어 있다.

## --harmony 플래그는 필요 없음

Node.js™@0.12.x (V8 3.28+)에서`--harmony` 플래그는 **개발완료**, **스테이징 단계**, **개발 중**인 (`--harmony-proxies`밑에 숨어 있는 `proxies`를 제외하고) 모든 ES6 기능을 사용 가능하게 한다. 이 말은 [Arrow Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)같은 정말 버그가 많거나 망가져 있는 기능도, 거의 문제 없는 [generators](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function*)처럼 사용 가능하게 된다는 이야기이다. 그래서, 개발자 대부분은 특정 하모니 기능 플래그(예를 들어 `--harmony-generators`)를 사용해 특정 기능만 사용하거나, 모두 사용 가능하게 한 다음에 일부분만 사용하는 경향이 있다.

io.js@1.x (V8 4.1+)에는 이런 복잡함은 필요 없다. 모든 하모니 기능은 이제 논리적으로 3가지 그룹 **shipping**, **staged**, **in progress**로 나뉜다.

*  [generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*), [templates](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/template_strings), [새 String 메소드](https://developer.mozilla.org/en-US/docs/Web/JavaScript/New_in_JavaScript/ECMAScript_6_support_in_Mozilla#Additions_to_the_String_object)같은 V8이 안정적인 것으로 간주하는 모든 **shipping** 기능은 **io.js에서 기본적으로 사용 가능**하고 어떤 실행 플래그도 필요하지 **않다**.
*   그리고 거의 완성되었지만, 아직 테스트가 완료되지 않았거나 최신 사양으로 고쳐지지 않았거나 해서 V8팀이 인정적이라 판단하지 않는(예를 들어 아직 발견되지 않은 엣지 케이스가 있을 수 있음) **staged** 기능이 있다. 이건 아마도 3.26의 [generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*)의 상태와 같다. 이 "스스로 책임지고 사용"하는 기능들은 이제 `--es_staging` (아니면, `--harmony`) 실행 플래그가 필요하다.
*   마지막으로, 모든 **in progress** 기능은 각각의 하모니 플래그로 (예를 들어 `--harmony_arrow_functions`) 독립적으로 사용 가능하다. 하지만 테스트 이외의 목적으로 사용하는 것은 매우 권장하지 않는다.

## 어떤 ES6 기능이 io.js에 기본으로(실행 플래그 없이) 제공되는가?


*   Block scoping

    *   [let](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)

    *   [const](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const)

    *   `function`-in-blocks

    >v8 3.31.74.1에서 블록 범위의 선언은 [의도적으로 strict 모드 코드와 비호환 할 수 없도록 구현되었다](https://groups.google.com/forum/#!topic/v8-users/3UXNCkAU8Es). 개발자는 v8이 ES6 사양을 준수함에 따라 이것이 변경될 수도 있다는 것을 알아야 한다.

*   Collections

    *   [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)

    *   [WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)

    *   [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)

    *   [WeakSet](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet)

*   [Generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*)

*   [Binary and Octal literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Numeric_literals)

*   [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

*   [새 String 메소드](https://developer.mozilla.org/en-US/docs/Web/JavaScript/New_in_JavaScript/ECMAScript_6_support_in_Mozilla#Additions_to_the_String_object)

*   [Symbols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)

*   [Template strings](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/template_strings)

다른 엔진과의 비교를 포함해 더 자세한 목록은[compat-table](https://kangax.github.io/compat-table/es6/) 프로젝트 페이지에서 볼 수 있다.

## --es_staging에는 어떤 ES6 기능이 있는가?

*   [Classes](https://github.com/lukehoban/es6features#classes) (`--harmony_classes` 플래그 strict 모드에서만 사용 가능, 이는 블록 범위와 객체 리터럴 확장을 함축함)

*   [Object literal extensions](https://github.com/lukehoban/es6features#enhanced-object-literals) (`--harmony_object_literals` 플래그)

*   [`Symbol.toStringTag`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol) (`Object.prototype.toString`의 결과를 사용자가 정의 가능, `--harmony_tostring` 플래그)

## 어떤 ES6 기능이 개발 중(in progress)인가?

V8 엔진에 지속적으로 새로운 기능이 추가되고 있다. 일반적으로 이런 기능은 앞으로 io.js에서도 사용하게 될 수는 있지만, 언제가 될지는 모른다.

io.js에`--v8-options` 인자를 넘긴 다음 grep해서 어떤 *in progress* 기능을 사용할 수 있는지를 볼 수 있다. 미완성이거나 손상되었을 가능성이 있는 기능인 것만 주의해야 한다. 스스로 책임지고 사용하라.

```sh
iojs --v8-options | grep "in progress"
```

## --harmony 플래그를 사용하는 인프라가 있다. 제거해야 하는가?

현재 io.js의`--harmony` 플래그의 동작은 **staged** 기능만 사용하는 것이다. `--harmony` 플래그는 이제 `--es_staging` 플래그와 같다. 위에서 언급한 바와 같이 완성된 기능이지만, 안정되었다고는 말할 수 없다. 안전을 중시해야 할 상황 특히 프로덕션 환경이라면, V8 나아가 io.js에서 기본적으로 사용할 수 있을 때까지 플래그를 해제하는 것을 고려하라. 활성화 한 채로 운용하는 경우, V8이 사양에 가까워지도록 변경되어 io.js 업그레이드할 때 사용 중인 코드가 의도대로 작동하지 않을 가능성에 대비해야 한다.

## 특정 io.js 버전이 사용하는 V8의 버전을 확인하려면

io.js는 사용 중인 io.js 모든 의존성과 버전을 쉽게 볼 방법을 `process` 전역 객체로 제공한다. 예를 들어, V8 엔진의 버전을 확인하려면 터미널에서 다음 명령을 입력한다.

```sh
iojs -p process.versions.v8
```

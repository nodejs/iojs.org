# ES6 trên io.js

io.js được xây dựng dựa trên các phiên bản mới nhất của [V8](https://code.google.com/p/v8/). Bằng cách cập nhật liên tục các phiên bản mới của engine này, chúng tôi đảm bảo các tính năng mới đến từ [JavaScript ECMA-262 specification](http://www.ecma-international.org/publications/standards/Ecma-262.htm) sẽ được cung cấp đến cho các lập trình viên io.js một cách kịp thời, cũng như tiếp tục các cải tiến về hiệu suất và tính ổn định.

Phiên bản 1.4.1 của io.js được phát hành cùng với V8 4.1.0.21 , bao gồm các tính năng của ES6 vượt xa phiên bản 3.28.73 được phát hành cùng với Node.js™ 0.12.x.

## Không sử dụng --harmony flag

Trên Node.js™@0.12.x (V8 3.28+), `--harmony` runtime flag mở tất cả các tính năng **đã hoàn thiện (completed)**, **đang thử nghiệm (staged)** và **đang được phát triển (in progress)** của ES6 cùng nhau (trừ trường hợp của `proxies` được mở với `--harmony-proxies`). Điều này rất phiền phức hay thậm chí có thể làm hỏng 1 số tính năng như [Arrow Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) được sử dụng cùng với [generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*) sẽ gây ra 1 số issues. Phần đa các lập trình viên có xu hướng mở các tính năng cụ thể bằng các xác định các runtime harmony flags tương ứng (như `--harmony-generators`) hay mở hết và sau đó sử dụng 1 restricted subset.

Với io.js (V8 4.1+), tất cả những sự phức tạp này không còn nữa. Tất cả các tính năng của harmony đã được chia một cách hợp lý vào 3 nhóm các tính năng là đã phát hành (shipping), đang thử nghiệm(staged) và đang phát triển (in progress):

*	Với các tính năng **đã phát hành (shipping)**, một trong những tính năng mà V8 đã coi là ổn định,như [classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes), [generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*), [templates](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/template_strings), [new string methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/New_in_JavaScript/ECMAScript_6_support_in_Mozilla#Additions_to_the_String_object) và các tính năng khác được mở theo mặc định trên io.js và không cần bất kỳ flag runtime nào.

*	Tiếp theo, các tính năng **đang thử nghiệm (staged)**, đó là các tính năng gần như hoàn thiện, chưa được kiểm tra hoàn chỉnh và cập nhật các thông số mới nhất, do đó chưa được coi là ổn định bởi V8 team (ví dụ, ở đây có thể là một số khía cạnh cần được tìm hiểu thêm). Ví dụ như trạng thái của [generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*) trên 3.26. Đây là các tính năng có khả năng sảy ra lỗi khi sử dụng, bạn nên cân nhắc khi sử dụng. Chúng yêu cầu flag runtime: --es_staging (hoặc đồng nghĩa với --harmony).

*	Cuối cùng, các tính năng **đang được phát triển (in progress)** có thể được kích hoạt bằng các harmony flag của riêng chúng (ví dụ --harmony_arrow_functions), điều này chỉ được khuyến khích với mục đích thử nghiệm.

## Tính năng nào của ES6 được phát hành cùng với io.js theo mặc định ? (không yêu cầu runtime flag)

*   Block scoping

    *   [let](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)

    *   [const](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const)

    *   `function`-in-blocks

    >Với V8 3.31.74.1, khai báo block-scoped được [cố ý thực hiện với một non-compliant limitation trong chế độ strict mode code](https://groups.google.com/forum/#!topic/v8-users/3UXNCkAU8Es). Các lập trình viên cần phải lưu ý rằng điều này sẽ thay đổi nếu V8 vẫn tiếp tục cập nhật để gần với các đặc tả của ES6.
*   [Classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) (chỉ ở chế độ strict mode)

*   Collections

    *   [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)

    *   [WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)

    *   [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)

    *   [WeakSet](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet)

*   [Generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*)

*   [Binary and Octal literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Numeric_literals)

*   [Object literal extensions](https://github.com/lukehoban/es6features#enhanced-object-literals) (khai báo ngắn gọn các thuộc tính và phương thức)

*   [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

*   [New String methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/New_in_JavaScript/ECMAScript_6_support_in_Mozilla#Additions_to_the_String_object)

*   [Symbols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)

*   [Template strings](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/template_strings)

Bạn có thể xem thông tin đầy đủ hơn ở đây, bao gồm việc so sánh với các engines khác, trên 1 dự án [compat-table](https://kangax.github.io/compat-table/es6/).

## Những tính năng nào của ES6 được mở với --es_staging flag ?

*   [`Symbol.toStringTag`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol) (người dùng có thể định nghĩa các kết quả cho `Object.prototype.toString`, được mở với `--harmony_tostring`)

## Những tính năng nào của ES6 đang được phát triển ?

Những tính năng mới đang được liên tục thêm vào trong V8 engine. Nói chung chúng ta sẽ mong đợi những tính năng này ở các phiên bản tiếp theo của io.js, tuy thời gian là không xác định.

Bạn có thể liệt kê tất cả các tính năng đang phát triển đi kèm trên mỗi phiên bản của V8, được gọi thông qua tham số --v8-options. Xin lưu ý chúng chưa hoàn thiện và có thể làm hỏng các tính năng khác của V8, bạn phải tự chịu trách nhiệm khi sử dụng chúng:

```sh
iojs --v8-options | grep "in progress"
```

## Tôi có đủ điều kiện để thiết lập 1 môi trường để chạy --harmony flag. Liệu tôi có nên làm điều này ?

Hiện tại khi sử dụng `--harmony` flag trên io.js sẽ chỉ mở các tính năng **đang thử nghiệm**. Nó tương đương với `--es_staging`. Như đã đề cập ở bên trên, đây là các tính năng đã được hoàn thiện nhưng chưa được xem xét là ổn định.

Nếu bạn muốn chạy an toàn, đặc biệt là trên môi trường production. Bạn không nên sử dụng các tính năng này cho đến khi chúng được phát hành trên V8, và đồng thời trên io.js. Nếu bạn vẫn sử dụng chúng, bạn nên chuẩn bị 1 bản cập nhật cho phần code có khả năng hỏng khi V8 thay đổi nội dung của họ cho sát nhất với chuẩn đặc tả.

## Làm cách nào để tôi biết được phiên bản V8 phát hành cùng với 1 phiên bản cụ thể của io.js ?

io.js cung cấp 1 cách đơn giản nhất để liệt kê tất cả các phụ thuộc và các phiên bản tương ứng mà sẽ phát hành 1 bản binary cụ thể thông qua đối tượng `process` toàn cục. Trong trường hợp của V8 engine, hãy gõ như sau trong terminal để nhận phiên bản của nó.

```sh
iojs -p process.versions.v8
```

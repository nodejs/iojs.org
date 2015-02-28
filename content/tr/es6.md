# io.js ile ES6

io.js, [V8](https://code.google.com/p/v8/) javascript motorunun en modern sürümüyle derlenmiştir. Bu motoru güncel sürümde tutarak [JavaScript ECMA-262 tanımlayıcı dökümanı](http://www.ecma-international.org/publications/standards/Ecma-262.htm) ile belirtilmiş yeni özelliklere io.js geliştiricilerinin en kısa zamanda ulaşmasını sağlıyoruz, bu arada performans ve kararlığın arttırılmasına devam ediyoruz.

io.js 1.1.0 sürümü V8 4.1.0.14 sürümüyle gelmektedir, ayrıca joyent/node@0.12.x sürümünde bulunan V8 3.26.33 motoruna göre daha gelişmiş ES6 özelliklerine sahiptir.

## --harmony bayrağına gerek yok

joyent/node@0.12.x (V8 3.26) sürümü ile `--harmony` bayrağı tüm **tamamlanmış**, **düzenleme** ve **geliştirme** durumunda ki ES6 özellikleri aktif eder. (`--harmony-typeof` bayrağı altında gizlenen `typeof` için anlamsal standart/uyumlu olmayan istisnalarıda içerir) 
Bu bayrağın belirtilmesi ile [proxies](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) gibi  bazı bozuk veya hatalı özellikleri ile geliştiricilerin kullanımına hazır, az veya hiç hata belirtilmemiş [generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*) gibi özelliklerde aktif olacaktır.  
Belirtilen sebeplerden ötürü en mantıklı uygulamalar, bazı özellikleri aktif etmek için özel bayraklar belirlemek (örn: `--harmony-generators`) veya tüm özellikleri etkinleştirip, daha sonra bir alt komut setini sınırlamak olacaktır.

io.js@1.x (V8 4.1+) sürümüyle beraber tüm bu karmaşıklık ortadan kalkmaktadır. Tüm ES6 (harmoni) özellikleri **taşınıyor**, **düzenleme** ve **geliştirme** olmak üzere mantıksal üç gruba ayrılmıştır. Bu özellikler;

*   Tüm **taşınıyor** özellikleri V8 tarafından kararlı olarak kabul görmüş, [generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*), [templates](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/template_strings), [yeni string metodları](https://developer.mozilla.org/en-US/docs/Web/JavaScript/New_in_JavaScript/ECMAScript_6_support_in_Mozilla#Additions_to_the_String_object) gibi özellikler ile **io.js tarafından varsayılan** olarak açılmış özelliklerdir ve herhangi bir çalışma bayrağına gerek **duymazlar**.
*   **düzenleme** durumunda ki özellikler testleri tamamlanmamış veya son tanımlayıcı dökümanına uygun hale getirilmemiş ve V8 takımı tarafından kararlı olarak belirtilmemiş özellikleri içerir. (örn: henüz keşfedilmemiş, araştırılmamış kısımlar olabilir). V8 3.26 sürümünde [generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*) bu duruma eşdeğer yapıdadır. Bu özellikleri kullanmakta ki riski göze alıyorsanız, `--es_staging` (veya eşanlamlısı `--harmony`) çalışma bayrağını kullanmanız gerekir.
*   Yüksek ihtimalle test işlemlerinde dahi olsa sorun yaratacak, diğer tüm **geliştirme** aşamasındaki özellikleri kendilerine özel harmoni bayraklarıyla etkinleştirebilirsiniz. (örn: `--harmony_arrow_functions`)

## io.js üzerinde varsayılan olarak gelen ES6 özellikleri hangileridir (çalışma bayrağı gerektirmez) ?


*   Blok alanı

    *   [let](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)

    *   [const](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const)

    *   `function`-in-blocks

    >V8 3.31.74.1 üstünde blok-alanına [özel, katı mod kodlama yapısına uyumlu olmayan sınırlama bulunmaktadır](https://groups.google.com/forum/#!topic/v8-users/3UXNCkAU8Es). Geliştiriciler bu kuralın V8 üstünde, ilerleyen dönemlerde ES6 tanımlayıcı dökümanına uyumlu yapılacak güncellemelerle değişeceğini unutmamalıdır.

*   Koleksiyonlar

    *   [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)

    *   [WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)

    *   [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)

    *   [WeakSet](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet)*   [Generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*)

*   [İkili ve Sekizli Sayısal Sabitler](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Numeric_literals)

*   [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

*   [Yeni String metodları](https://developer.mozilla.org/en-US/docs/Web/JavaScript/New_in_JavaScript/ECMAScript_6_support_in_Mozilla#Additions_to_the_String_object)

*   [Semboller](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)

*   [String içerisinde template kullanımı](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/template_strings)

Ayrıntılı bir liste arıyorsanız, diğer derleyici motorlarının karşılaştırıldığı [compat-tablo](https://kangax.github.io/compat-table/es6/) proje sayfasına bakabilirsiniz. 

## --es_staging bayrağı ile kullanılabilen ES6 özellikleri nelerdir?

*   [Classes](https://github.com/lukehoban/es6features#classes) (sadece katı modda kullanılabilir)
*   [Sabit Obje Uzantıları](https://github.com/lukehoban/es6features#enhanced-object-literals)

*   [`Symbol.toStringTag`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol) (kullanıcı tanımlı sonuçlar için `Object.prototype.toString`)

## --harmony bayrağı kullanan bir alt yapıya sahibim. Bu bayrağı kaldırmalımıyım?

io.js üzerinde `--harmony` bayrağı sadece **düzenleme** durumunda ki özelliklleri etkinleştirir. Diğer tüm özellikler için eş değer bayrak, `--es_staging` bayrağı kullanılmalıdır. Yukarıda da belirtildiği üzere bu bayrak halen kararlı olmamış özellikleri kapsar. Eğer güvenli bir kullanım isterseniz veya üretim ortamında çalışıyorsanız, özellikler io.js üstünde ve dolayısıyla V8 üstünde varsayılan olarak kullanılana kadar bu bayrağı kaldırmayı düşünmelisiniz. Eğer bu bayrağı etkin olarak kullanmaya devam ederseniz, V8 üstünde yapılacak standartlara uygun yapısal değişikliklerde, io.js güncellemelerinin kodunuzu çalışamaz hale getirebileceğine hazırlıklı olmanız gerekmektedir.      
 
## io.js'in hangi V8 sürümünü kullandığını nasıl bulabilirim?

io.js basit bir şekilde, tüm bağımlılıkları ve ilgili sürümleri listelemek için global `process` nesnesini sunar. V8 motorunun sürüm bilgisini öğrenebilmek için uç birim ekranına aşağıdaki komut satırını yazmanız yeterlidir:

```sh
iojs -p process.versions.v8
```

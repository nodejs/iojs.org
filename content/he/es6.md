<div dir="rtl" lang="he">
# ES6 ב io.js 

נבנה לצד הגרסאות העדכניות של מנוע ה [V8](https://code.google.com/p/v8/). 
שמירה על עדכניות ומודרניות מבטיחים לנו כפלטפורמה לספק את המלוא התכונות החדשות מ[JavaScript ECMA-262 specification](http://www.ecma-international.org/publications/standards/Ecma-262.htm) מבעוד מועד. כמו כן, שיפורי ביצועים יציבות וכיוצא בזה.

גרסת 1.3.0 מובאת עם גרסת 4.1.0.14 של הV8 שכוללת תכונותֿ/פיצ׳רים מES6 (ראה למטה), בשונה מגרסת 3.26.33 של הV8 שמובאת עם גרסה 0.12 של joyent/node

# אין יותר את הדגל --harmony

בגרסת 0.12 של Joyent/node דגל הזמן ריצה(--harmony) מדליק/מביא לשימוש את כל התכונות/פיצ׳רים ה״יציבים״, ב"staging", וב-״inprogress״/בפיתוח של ES6.(משמע, כי ייתכן ״באגים״, ״׳פיצ׳רים לא שלמים״ וכיוצא בזה. למשל: [Arrow Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) אשר זמינים בחופשיות לשימוש כמו: Generators (אשר כמעט יציבים לחלוטין).
לכן, רוב המשתמשים מעדיפים להדליק דגלים ספציפים למשל: `--harmony-generators`.
בגרסת 1.x של iojs (גרסת 4.1 של V8) אין כל מורכבות.
כל הפ׳יצרים/תכונות של ES6 מחולקים ל3 תת קבוצות. shipping(יציב), staging, ובפיתוח.
* יציב: כל הפיצ׳רים שמוגדרים יציבים בV8. למשל: `generators` `templates` ועוד תכונות נוספות למחרוזות(strings).
* סטג׳ינג:  פיצ׳רים לפני סיום, שעדיין לא נבדקו לחלוטין או עודכנו לspec הנוכחי, ולכן לא נחשבים ״יציבים״ על ידי הV8. (למשל: סטאטוס הgenerators בגרסת 3.26 של הV8). על מנת להדליק/להביא לידי שימוש את בפיצ׳רים הללו השתמש בדגל `--es_staging`.
* בפיתוח: כל הפיצ׳רים ב״פיתוח״ יכולים להידלק על ידי דגל `--harmony_arrow_functions`

## איזה פיצ׳רים/תכונות מוגדרים כיציבים וזמינים ללא שימוש בדגלים ?


*   Block scoping

    *   [let](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)

    *   [const](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const)

    *   `function`-in-blocks

    >נכון לגרסת 3.31.74.1 v8, הצהרות של block-scoped מיושמות במכוון בהגבלה שאינה תואמת ל"strict mode". משתמשים צריכים להיות מודעים לכך שזה ישתנה ראה: [דיון](https://groups.google.com/forum/#!topic/v8-users/3UXNCkAU8Es)

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

הינך יכול לצפות ברשימה המלאה, כולל השוואה עם מנועים אחרים/מקבילים. ראה: [compat-table](https://kangax.github.io/compat-table/es6/)

## איזה פיצ׳רים/תכונות מאופשרים על ידי הדלקת דגל ה״סטג׳ינג״ ?
*   [Classes](https://github.com/lukehoban/es6features#classes) (strict mode only)
*   [Object literal extensions](https://github.com/lukehoban/es6features#enhanced-object-literals)

*   [`Symbol.toStringTag`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol) (user-definable results for `Object.prototype.toString`)


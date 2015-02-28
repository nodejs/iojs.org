# H ES6 στην io.js

Η io.js έχει δομηθεί πάνω στις νεότερες εκδόσεις της [V8](https://code.google.com/p/v8/). Με συνεχείς ενημερώσεις σύμφωνα με τις τελευταίες εκδόσεις της V8 εξασφαλίζεται ότι νέες δυνατότητες και χαρακτηριστικά από την [JavaScript ECMA-262 specification](http://www.ecma-international.org/publications/standards/Ecma-262.htm) προσφέρονται στους io.js developers εγκαίρως, καθώς και η συνεχής βελτιώση της απόδοσης και της σταθερότητας της.

Η έκδοση 1.4.1 της io.js έρχεται μαζί με την έκδοση 4.1.0.21 της V8, η οποία περιλαμβάνει χαρακτηριστικά από την ES6, πολύ περισσότερα από την έκδοση 3.26.33 που προσφέρετε από την joyent/node@0.12.x.

## Όχι πια --harmony flag

Στην joyent/node@0.12.x (V8 3.26), με `--harmony` runtime flag ενεργοποιούνται όλες μαζί οι δυνατότητες της ES6 είτε είναι **ολοκληρωμένες (completed)**, είτε **σε φάση ελέγχου (staged)** είτε **υπό ανάπτυξη (in progress)** (με εξαίρεση τα nonstandard/non-harmonious semantics για το `typeof` τα οποία βρίσκονται υπό το flag `--harmony-typeof`). Αυτό σημαίνει πως κάποια χαρακτηριστικά τα οποία περιέχουν σφάλματα ή δεν λειτουργούν καθόλου, όπως π.χ. [proxies](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) ήταν διαθέσιμα στους developers μαζί με χαρακτηριστικά τα οποία είχαν λίγα ή καθόλου γνωστά προβλήματα όπως π.χ. οι [generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*). Ως εκ τούτου, ήταν καλή πρακτική είτε να ενεργοποιείς μόνο συγκεκριμένα χαρακτηριστικά χρησιμοποιώντας συγκεκριμένα runtime harmony flags (π.χ. `--harmony-generators`), είτε να ενεργοποιείς όλα τα χαρακτηριστικά και να χρησιμοποιείς μόνο ένα υποσύνολο από αυτά.

Με την io.js@1.x (V8 4.1+), όλη αυτή η πολυπλοκότητα εξαλείφεται. Όλα τα χαρακτηριστικά της έκδοσης harmony είναι λογικά διαχωρισμένα σε τρεις ομάδες **έτοιμα (shipping)**, **σε φάση ελέγχου(staged)** και **υπό ανάπτυξη(in progress)**:

*   Όλα τα **(έτοιμα) shipping** χαρακτηριστικά, αυτά που η V8 θεωρεί αρκετά σταθερά, όπως π.χ. [generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*), [templates](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/template_strings), [new string methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/New_in_JavaScript/ECMAScript_6_support_in_Mozilla#Additions_to_the_String_object) και αρκετά αλλά ενεργοποιούνται **εξ ορισμού στο io.js** και **ΔΕΝ** απαιτούν οποιοδήποτε runtime flag.
*   Υπάρχουν χαρακτηριστικά που βρίσκονται **σε φάση ελέγχου (staged)** τα οποία είναι σχεδόν έτοιμα αλλά δεν έχουν ελεγχθεί πλήρως ή δεν έχουν ενημερωθεί σύμφωνα με τα τελευταία πρώτυπα της ES6 και ως εκ τούτου δεν θεωρούνται σταθερά από την ομάδα της V8 (π.χ. μπορεί να υπάρχουν edge cases που θα πρέπει να ελεγχθούν). Αυτό πιθανόν ισοδυναμεί με την κατάσταση των [generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*) στην έκδοση 3.26. Αυτά είναι χαρακτηριστικά τύπου "χρησιμοποίησε τα με δική σου ευθύνη (use at your own risk)" τα οποία τώρα απαιτούν για να ενεργοποιηθούν την χρήση ενός runtime flag: `--es_staging` (ή του ισοδύναμου, `--harmony`).
*   Εν τέλη, όλα τα χαρακτηριστικά που βρίσκονται **(υπό ανάπτυξη) in progress** μπορούν να ενεργοποιηθούν ξεχωριστά με το δικό τους  αντίστοιχο harmony flag (e.g. `--harmony_arrow_functions`), αν και αυτό δεν συνίσταται εκτός από περιπτώσεις που αυτό γίνεται για δοκιμές των χαρακτηριστικών αυτών.

## Ποια χαρακτηριστικά της ES6 έρχονται με io.js εξ ορισμού (χωρίς την χρήση runtime flag);


*   Block scoping

    *   [let](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)

    *   [const](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const)

    *   `function`-in-blocks

    >Από την έκδοση v8 3.31.74.1, οι block-scoped declarations είναι [σκόπιμα υλοποιημένες όχι σε strict mode](https://groups.google.com/forum/#!topic/v8-users/3UXNCkAU8Es). Οι developers πρέπει να είναι ενήμεροι ότι αυτό θα αλλάξει όσο η v8 συνεχίζει περαιτέρω την υλοποίηση χαρακτηριστικών σύμφωνα με τα πρώτυπα (specifications) της ES6.

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

Μπορείτε να δείτε μια λεπτομερή λίστα, συμπεριλαμβανομένου και ενός συγκριτικού πίνακα με άλλες μηχανές, στην σελίδα του project[compat-table](https://kangax.github.io/compat-table/es6/).

## Ποία χαρακτηριστικά της ES6 βρίσκονται πίσω από το --es_staging flag;

*   [Classes](https://github.com/lukehoban/es6features#classes) (strict mode only)
*   [Object literal extensions](https://github.com/lukehoban/es6features#enhanced-object-literals)

*   [`Symbol.toStringTag`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol) (user-definable results for `Object.prototype.toString`)

## Έχω ρυθμίσει την υποδομή μου με την χρησή του --harmony flag. Πρέπει να το αφαιρέσω;

Το `--harmony` flag στην παρούσα έκδοση της io.js ενεργοποιεί μόνο χαρακτηριστικά που είναι **σε φάση ελέγχου (staged)**. Πλέον ισοδυναμεί με το `--es_staging` flag. Όπως αναφέρθηκε προηγουμένως αυτά είναι ολοκληρωμένα χαρακτηριστικά τα οποία δεν θεωρούνται σταθερά ακόμη. Αν θέλετε να είστε ασφαλής, ειδικά σε production environments, εξετάστε το ενδεχόμενο να αφαιρέσετε αυτό το runtime flag μέχρις ότου να παρέχεται εξ ορισμού με την V8, και ως εκ τούτου και στην io.js. Αν επιλέξετε να το αφήσετε ενεργοποιημένο, θα πρέπει να προετοιμαστείτε για περισσότερες αναβαθμήσεις της io.js οι οποίες θα απαιτούν αλλαγές στον κώδικα σας αν η V8 αλλάξει τα semantics της ώστε να ακολουθεί πιο πιστά τα πρώτυπα (specifications) της ES6.

## Πως μπορώ να βρω ποια έκδοση της V8 παρέχεται μαζί με μια συγκεκριμένη έκδοση της io.js;

Η io.js παρέχει έναν απλό τρόπο να απαριθμήσετε όλες τις εξαρτήσεις (dependencies) και τις αντίστοιχες εκδόσεις οι οποίες παρέχονται στην συγκεκριμένη έκδοση μέσω `process` ενός global object. Στην περίπτωση της μηχανής V8, πληκτρολογήστε την ακόλουθη εντολή στο τερματικό ώστε να βρείτε την έκδοση:

```sh
iojs -p process.versions.v8
```

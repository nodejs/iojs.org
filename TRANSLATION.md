# io.js Website Translation Policy

io.js is a global platform and so this site has many translations. The translation of the site into
separate languages is handled by the localization working group of the language in question. If you
would like to contribute to the translation of iojs.org, please refer to the following process:

## For Individuals wanting to contribute
* Contact your appropriate localization group, and discuss with them the best possible way to contribute. A list of the localization groups can be found here: 
    * [iojs-bn](https://github.com/iojs/iojs-bn) Bengali Localizations
    * [iojs-cn](https://github.com/iojs/iojs-cn) Chinese Localizations 
    * [iojs-cs](https://github.com/iojs/iojs-cs) Czech Localizations 
    * [iojs-da](https://github.com/iojs/iojs-da) Danish Localizations 
    * [iojs-de](https://github.com/iojs/iojs-de) German Localizations
    * [iojs-el](https://github.com/iojs/iojs-el) Greek Localizations
    * [iojs-es](https://github.com/iojs/iojs-es) Spanish Localizations
    * [iojs-fa](https://github.com/iojs/iojs-fa) Persian Localizations 
    * [iojs-fi](https://github.com/iojs/iojs-fi) Finnish Localizations
    * [iojs-fr](https://github.com/iojs/iojs-fr) French Localizations
    * [iojs-he](https://github.com/iojs/iojs-he) Hebrew Localizations
    * [iojs-hi](https://github.com/iojs/iojs-hi) Hindi Localizations 
    * [iojs-hu](https://github.com/iojs/iojs-hu) Hungarian Localizations
    * [iojs-id](https://github.com/iojs/iojs-id) Indonesian Localizations
    * [iojs-it](https://github.com/iojs/iojs-it) Italian Localizations
    * [iojs-ja](https://github.com/iojs/iojs-ja) Japanese Localizations
    * [iojs-ka](https://github.com/iojs/iojs-ka) Georgian Localizations
    * [iojs-kr](https://github.com/iojs/iojs-kr) Korean Localizations
    * [iojs-mk](https://github.com/iojs/iojs-mk) Macedonian Localizations
    * [iojs-nl](https://github.com/iojs/iojs-nl) Dutch Localizations
    * [iojs-no](https://github.com/iojs/iojs-no) Norwegian Localizations
    * [iojs-pl](https://github.com/iojs/iojs-pl) Polish Localizations
    * [iojs-pt](https://github.com/iojs/iojs-pt) Portuguese Localizations
    * [iojs-ro](https://github.com/iojs/iojs-ro) Romanian Localizations
    * [iojs-ru](https://github.com/iojs/iojs-ru) Russian Localizations
    * [iojs-sv](https://github.com/iojs/iojs-sv) Swedish Localizations
    * [iojs-tr](https://github.com/iojs/iojs-tr) Turkish Localizations
    * [iojs-tw](https://github.com/iojs/iojs-tw) Taiwan Localizations
    * [iojs-uk](https://github.com/iojs/iojs-uk) Ukranian Localizations
    
## For Localization Groups
* Ensure that any site translations are done as pull requests into this repo. This will ensure the build process, layout, and styling, remain consistent across the different translations of the site.
* You can find the appropriate language folder within `content/`
* There needs to be the following files in your language folder:
    * `template.json` (this fills in the buttons and title bar with the appropriate translation)
    * `index.md` (this contains the markdown translation for the home page. The paragraph order is important here, so please maintain it)
    * `faq.md` (this contains markdown for the faq page)
    * `es6.md` (this contains markdown for the ES6 explanation page)
    * Any additional md files that are to be added can be done here, and will be dynamically generated into html using the template.
* Do not make language specific changes to layout or styling in a translation PR. If they are needed, make a separate styling/layout pr and chat with one of the website WG about the change. We want to make sure, for example, a Chinese layout change doesn't cascade failure to the German page.
* To be merged, translation PR's require a Website WG +1 and a +1 from another native speaker in your language. Make sure whoever you have review the PR adds a +1 in the comments of it so we know it is translated properly.

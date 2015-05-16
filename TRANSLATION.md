# io.js Website Translation Policy

io.js is a global platform and so this site has many translations. The translation of the site into
separate languages is handled by the localization working group of the language in question. If you
would like to contribute to the translation of iojs.org, please refer to the following process:

## For Individuals wanting to contribute
* Contact your appropriate localization group, and discuss with them the best possible way to contribute. A list of the localization groups can be found here: 
    * [`iojs-bn`](https://github.com/nodejs/iojs-bn) Bengali Community
    * [`iojs-cn`](https://github.com/nodejs/iojs-cn) Chinese Community 
    * [`iojs-cs`](https://github.com/nodejs/iojs-cs) Czech Community 
    * [`iojs-da`](https://github.com/nodejs/iojs-da) Danish Community 
    * [`iojs-de`](https://github.com/nodejs/iojs-de) German Community
    * [`iojs-el`](https://github.com/nodejs/iojs-el) Greek Community
    * [`iojs-es`](https://github.com/nodejs/iojs-es) Spanish Community
    * [`iojs-fa`](https://github.com/nodejs/iojs-fa) Persian Community 
    * [`iojs-fi`](https://github.com/nodejs/iojs-fi) Finnish Community
    * [`iojs-fr`](https://github.com/nodejs/iojs-fr) French Community
    * [`iojs-he`](https://github.com/nodejs/iojs-he) Hebrew Community
    * [`iojs-hi`](https://github.com/nodejs/iojs-hi) Hindi Community 
    * [`iojs-hu`](https://github.com/nodejs/iojs-hu) Hungarian Community
    * [`iojs-id`](https://github.com/nodejs/iojs-id) Indonesian Community
    * [`iojs-it`](https://github.com/nodejs/iojs-it) Italian Community
    * [`iojs-ja`](https://github.com/nodejs/iojs-ja) Japanese Community
    * [`iojs-ka`](https://github.com/nodejs/iojs-ka) Georgian Community
    * [`iojs-kr`](https://github.com/nodejs/iojs-kr) Korean Community
    * [`iojs-mk`](https://github.com/nodejs/iojs-mk) Macedonian Community
    * [`iojs-nl`](https://github.com/nodejs/iojs-nl) Dutch Community
    * [`iojs-no`](https://github.com/nodejs/iojs-no) Norwegian Community
    * [`iojs-pl`](https://github.com/nodejs/iojs-pl) Polish Community
    * [`iojs-pt`](https://github.com/nodejs/iojs-pt) Portuguese Community
    * [`iojs-ro`](https://github.com/nodejs/iojs-ro) Romanian Community
    * [`iojs-ru`](https://github.com/nodejs/iojs-ru) Russian Community
    * [`iojs-sv`](https://github.com/nodejs/iojs-sv) Swedish Community
    * [`iojs-tr`](https://github.com/nodejs/iojs-tr) Turkish Community
    * [`iojs-tw`](https://github.com/nodejs/iojs-tw) Taiwan Community
    * [`iojs-uk`](https://github.com/nodejs/iojs-uk) Ukrainian Community
    * [`iojs-vi`](https://github.com/nodejs/iojs-vi) Vietnamese Community
    
## For Localization Groups
* Ensure that any site translations are done as pull requests into this repo. This will ensure the build process, layout, and styling, remain consistent across the different translations of the site.
* You can find the appropriate language folder within `content/`
* There needs to be the following files in your language folder:
    * `template.json` (this fills in the buttons and title bar with the appropriate translation)
    * `index.md` (this contains the markdown translation for the home page. The paragraph order is important here, so please maintain it)
    * `faq.md` (this contains markdown for the faq page)
    * `es6.md` (this contains markdown for the ES6 explanation page)
    * Any additional md files that are to be added can be done here, and will be dynamically generated into html using the template.
* Prefix your PR with the localization group's name (e.g. `iojs-no`). If you are only translating one of the above files, please mention them in your PR's subject as well, e.g.:
```
    iojs-de: Add files - index.md, faq.md
    iojs-pt: Add files - 15 files

    iojs-fr: Update files - es6.md
    iojs-ja: Update files - all files
```
* Do not make language specific changes to layout or styling in a translation PR. If they are needed, make a separate styling/layout pr and chat with one of the website WG about the change. We want to make sure, for example, a Chinese layout change doesn't cascade failure to the German page.
* To be merged, translation PR's require a Website WG +1 and a +1 from another native speaker in your language. Make sure whoever you have review the PR adds a +1 in the comments of it so we know it is translated properly.

# io.js Website Translation Policy

io.js is a global platform and so this site has many translations. The translation of the site into
separate languages is handled by the localization working group of the language in question. If you
would like to contribute to the translation of iojs.org, please refer to the following process:

## For Individuals wanting to contribute
* Contact your appropriate localization group, and discuss with them the best possible way to contribute. A list of the localization groups can be found here: [TBD]

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

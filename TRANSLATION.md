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
* Do not make language specific changes to layout or styling in a translation PR. If they are needed, make a separate styling/layout pr and chat with one of the website WG about the change. We want to make sure, for example, a Chinese layout change doesn't cascade failure to the German page.
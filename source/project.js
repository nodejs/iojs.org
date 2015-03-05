// temporary merge to help avoid some merge confusion when landed:
var project = require('./project.json');

/*

// This will replace `./project.json`

project = {
  "current_version": "1.4.3",
  "current_v8": "4.1.0.21"
}

project.languages = [
  {"code": "cn", "name": "简体中文", "name-en": "Chinese (Simple)"},
  {"code": "de", "name": "Deutsch", "name-en": "German"},
  {"code": "el", "name": "Ελληνικά", "name-en": "Greek"},
  {"code": "en", "name": "English", "name-en": "English"},
  {"code": "es", "name": "Español", "name-en": "Spanish"},
  {"code": "fi", "name": "Suomi", "name-en": "Finnish"},
  {"code": "fr", "name": "Français", "name-en": "French"},
  {"code": "he", "name": "עברית", "name-en": "Hebrew", "rtl": true},
  {"code": "id", "name": "Bahasa Indonesia", "name-en": "Indonesian"},
  {"code": "it", "name": "Italiano", "name-en": "Italian"},
  {"code": "ja", "name": "日本語", "name-en": "Japanese"},
  {"code": "ko", "name": "한국어", "name-en": "Korean"},
  {"code": "no", "name": "Norsk", "name-en": "Norwegian"},
  {"code": "pt_BR", "name": "Português (BR)", "name-en": "Portuguese (Brazil)"},
  {"code": "pt_PT", "name": "Português (PT)", "name-en": "Portuguese (Portugal)"},
  {"code": "ru", "name": "Русский", "name-en": "Russian"},
  {"code": "tr", "name": "Türkçe", "name-en": "Turkish"},
  {"code": "uk", "name": "Українська", "name-en": "Ukrainian"},
  {"code": "zh_TW", "name": "正體中文（台灣）", "name-en": "Chinese Traditional (Taiwan)"}
]
*/

project.links = {
  nodejs: 'https://nodejs.org/',
  npm: 'https://www.npmjs.org/',
  website: 'https://iojs.org/',
  pages: {
    home: './index.html',
    es6: './es6.html',
    faq: './faq.html',
    faq_verbose: './faq.html'
  }
};

var baseURL = `https://iojs.org/dist`;
project.current_version_downloads = [
  {key: 'linux', url: `${baseURL}/v${project.current_version}/iojs-v${project.current_version}-linux-x64.tar.xz`},
  {key: 'win32', url: `${baseURL}/v${project.current_version}/iojs-v${project.current_version}-x86.msi`},
  {key: 'win64', url: `${baseURL}/v${project.current_version}/iojs-v${project.current_version}-x64.msi`},
  {key: 'mac', url: `${baseURL}/v${project.current_version}/iojs-v${project.current_version}.pkg`},
  {key: 'all', url: `${baseURL}/v${project.current_version}/`}
];
Object.defineProperty(project.current_version_downloads, 'all', {value: `${baseURL}/v${project.current_version}/`});

module.exports = project;

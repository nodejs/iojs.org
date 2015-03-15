// temporary merge to help avoid some merge confusion when landed:
var versions = require('./versions.json');

var project = {};

project.current_version = versions[0].version.replace(/^v/, '');
project.current_v8 = versions[0].v8;

project.languages = require('./languages.js');

project.links = {
  nodejs: 'https://nodejs.org/',
  npm: 'https://www.npmjs.org/',
  website: 'https://iojs.org/',
  pages: {
    changelog: 'https://github.com/iojs/io.js/blob/v1.x/CHANGELOG.md',
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

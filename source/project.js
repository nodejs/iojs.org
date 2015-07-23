// temporary merge to help avoid some merge confusion when landed:
var versions = require('./versions.json');

var project = {};

project.current_version = versions[0].version.replace(/^v/, '');
project.current_v8 = versions[0].v8;
project.versions = versions;

project.languages = require('./languages.js');

project.banner = {
  visible: false,
  content: 'Critical <a href="https://medium.com/@iojs/important-security-upgrades-for-node-js-and-io-js-8ac14ece5852">security release</a>, please update now!'
};

project.links = {
  nodejs: 'https://nodejs.org/',
  npm: 'https://www.npmjs.com/',
  website: 'https://iojs.org/',
  pages: {
    changelog: 'https://github.com/nodejs/io.js/blob/master/CHANGELOG.md',
    home: './index.html',
    es6: './es6.html',
    faq: './faq.html',
    faq_verbose: './faq.html',
    releases: './releases.html'
  },
  rss: [
    {
      title: 'Releases (GitHub)',
      url: 'https://github.com/nodejs/io.js/releases.atom'
    }
  ]
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

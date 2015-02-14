var dest = './public';
var src = './source';
var content = './content';

var urlPrefix = '';
if (process.env.URL_PREFIX && process.env.URL_PREFIX !== '') {
  urlPrefix = '/' + process.env.URL_PREFIX;
}

module.exports = {
  stylus: {
    src: src + '/styles/**/*.styl',
    dest: dest,
    settings: {
      // put stylus settings here
    }
  },
  templates: {
    urlPrefix: urlPrefix, // need this, if the website it not located at the root of a domain
    templateSrc: src + '/templates/**/*.html',
    contentSrc: content + '/**/*.md',
    templateJSONsrc: content + '/**/template.json',
    dest: dest
  },
  images: {
    src: dest + '/img/**',
    dest: dest + '/img'
  },
  del: {
    files: [
      dest + '/**/*.html',
      dest + '/**/*.js',
      dest + '/**/*.css',
      '!'+ dest + '/index.html',
      '!'+ dest + '/es6.html',
      '!'+ dest + '/faq.html',
    ]
  },
  cssSrc: dest + '/*.css',
  htmlSrc: dest + '/*.html',
  dest: dest,
  server: {
    port: 4657
  }
};

var dest = './public';
var src = './source';
var content = './content';

module.exports = {
  copyStatic: {
    src: src + '/static/**/*',
  },
  stylus: {
    src: src + '/styles/**/*.styl',
    dest: dest,
    settings: {
      // put stylus settings here
    }
  },
  templates: {
    templateSrc: src + '/templates/**/*.html',
    contentSrc: content + '/**/*.{html,md}',
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
  htmlSrc: dest + '/**/*.html',
  dest: dest,
  server: {
    port: 4657
  }
};

var dest = "./public_test";
var src = './source';
var content = './content';

module.exports = {
  stylus: {
    src: src + "/styles/**/*.styl",
    dest: dest,
    settings: {
      // put stylus settings here
    }
  },
  templates: {
    src: src + "/templates/**/*.md",
    content: content,
    dest: dest
  },
  images: {
    src: dest + "/img/**",
    dest: dest + "/img"
  },
  del: {
    files: [
      dest + "/**/*.html",
      dest + "/**/*.js",
      dest + "/**/*.css"
    ]
  },
  cssSrc: dest + '/*.css',
  htmlSrc: dest + '/*.html',
  dest: dest
};

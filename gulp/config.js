var dest = "./public";
var src = './source';
var content = './content';

module.exports = {
  stylus: {
    src: src + "/styles/*.{styl}",
    dest: dest,
    settings: {
      // put stylus settings here
    }
  },
  templates: {
    src: src + "/templates/**",
    content: content,
    dest: dest
  },
  images:{
    src: dest + "/img/**",
    dest: dest + "/img"
  },
  cssSrc: dest + '/*.css',
  htmlSrc: dest + '/*.html',
  dest: dest
};

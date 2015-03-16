var path = require('path');
var gulp = require('gulp');
var clone = require('gulp-clone');
var buffer = require('vinyl-buffer');
var mergeStream = require('merge-stream');
var generateContentAndTemplates = require('../util/content').generateContentAndTemplates;
var through = require('through2');

gulp.task('content', function() {
  var base = path.resolve(__dirname, '..', '..');
  var contentJSON = require('../../source/content.js');
  var languagesJSON = require('../../source/languages.js');
  var matchHTML = /\.html$/;
  var templates = {};
  var templateStreams = mergeStream();

  Object.keys(contentJSON).filter(function(key) {
    var article = contentJSON[key];
    if (article.content && matchHTML.test(article.content)) {
      var contentTemplate = `source/templates/${article.content}`;
      if (templates[contentTemplate] == null) {
        templates[contentTemplate] = gulp.src(contentTemplate, {base: 'source/templates'});
      }
      languagesJSON.forEach(function(lang) {
        var newpath = path.resolve(base, 'content', lang.code, article.url);
        var stream = templates[contentTemplate]
          .pipe(clone())
          .pipe(through.obj(function(file, _unused_, cb) {
            file.base = 'content'
            file.path = path.join(base, 'content', lang.code, article.url);
            file._article = article;
            this.push(file);
            cb();
          }));
        templateStreams.add(stream);
      });
    }
  });

  return templateStreams
    .pipe(buffer())
    .pipe(through.obj(generateContentAndTemplates()))
    .pipe(gulp.dest('public/'))
});

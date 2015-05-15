var gulp       = require('gulp');
var config     = require('../config');
var minifyHTML = require('gulp-htmlmin');
var size       = require('gulp-size');

// See https://github.com/kangax/html-minifier#options-quick-reference
var options = {
  caseSensitive: true,
  collapseBooleanAttributes: true,
  collapseWhitespace: true,
  ignoreCustomComments: [ /contribute/ ],
  removeAttributeQuotes: true,
  removeComments: true,
  removeOptionalTags: true,
  removeRedundantAttributes: true
};

gulp.task('minifyHtml', function() {
  return gulp.src(config.htmlSrc)
    .pipe(minifyHTML(options))
    .pipe(gulp.dest(config.dest))
    .pipe(size({title: 'minifyHtml'}));
});

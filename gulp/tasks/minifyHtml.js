var gulp      = require('gulp');
var config    = require('../config');
var minifyHTML = require('gulp-htmlmin');
var size      = require('gulp-filesize');

gulp.task('minifyHtml', function() {
  return gulp.src(config.htmlSrc)
    .pipe(minifyHTML())
    .pipe(gulp.dest(config.dest))
    .pipe(size());
})

var gulp     = require('gulp');
var config   = require('../config').stylus;
var stylus   = require('gulp-stylus');
var size      = require('gulp-filesize');

gulp.task('stylus', function() {
  return gulp.src(config.src)
    .pipe(stylus())
    .pipe(gulp.dest(config.dest))
    .pipe(size());
});

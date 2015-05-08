var gulp     = require('gulp');
var config   = require('../config').stylus;
var stylus   = require('gulp-stylus');

gulp.task('stylus', function() {
  return gulp.src(config.src)
    .pipe(stylus())
    .pipe(gulp.dest(config.dest));
});

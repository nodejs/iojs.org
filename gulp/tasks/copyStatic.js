var gulp = require('gulp');
var config   = require('../config');

gulp.task('copyStatic', function () {
  return gulp.src(config.copyStatic.src)
    .pipe(gulp.dest(config.dest));
});

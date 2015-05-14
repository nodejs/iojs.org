var gulp         = require('gulp');
var config       = require('../config');
var postcss      = require('gulp-postcss');
var autoprefixer = require('autoprefixer-core');
var csswring     = require('csswring');
var size         = require('gulp-size');

gulp.task('minifyCss', function() {
  return gulp.src(config.cssSrc)
    .pipe(postcss([
      autoprefixer(),
      csswring
    ]))
    .pipe(gulp.dest(config.dest))
    .pipe(size({title: 'minifyCss'}));
});

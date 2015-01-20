var gulp      = require('gulp');
var config    = require('../config');
var minifyCSS = require('gulp-minify-css');
var size      = require('gulp-filesize');

gulp.task('minifyCss', function() {
  return gulp.src(config.cssSrc)
    .pipe(minifyCSS({keepBreaks:true}))
    .pipe(gulp.dest(config.dest))
    .pipe(size());
})

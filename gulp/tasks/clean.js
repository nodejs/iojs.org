var gulp = require('gulp');
var del = require('del');
var config = require('../config');

gulp.task('clean', function(cb) {
  // clean out directory before build
  del(config.del.files, cb);
});

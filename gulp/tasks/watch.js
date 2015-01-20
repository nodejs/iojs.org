var gulp     = require('gulp');
var config   = require('../config');

gulp.task('watch', function(callback) {
  gulp.watch(config.stylus.src,   ['stylus']);
  gulp.watch(config.templates.src, ['templates']);
});

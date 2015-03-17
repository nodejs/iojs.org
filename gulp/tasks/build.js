var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('build', function(cb){
  runSequence(
    'clean',
    'content',
    ['stylus', 'templates'],
    'minifyCss',
    cb);
});

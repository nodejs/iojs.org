var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('build', function(cb){
  runSequence(
    'clean',
    'download',
    'content',
    ['stylus', 'templates'],
    'minifyCss',
    cb);
});

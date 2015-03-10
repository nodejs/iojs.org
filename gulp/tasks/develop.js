var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('develop', function(cb){
  runSequence(
    'clean',
    'content',
    ['stylus', 'templates'],
    ['watch', 'server'],
  cb);
});

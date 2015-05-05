var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('develop', function(cb){
  runSequence(
    'clean',
    'download',
    'content',
    'copyStatic',
    ['stylus', 'templates'],
    ['watch', 'server'],
  cb);
});

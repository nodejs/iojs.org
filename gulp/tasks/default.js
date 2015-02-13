var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('default', function(cb){
  runSequence(
    'clean',
    ['stylus', 'templates'],
    'minifyCss',
    ['watch', 'server'],
  cb);
});

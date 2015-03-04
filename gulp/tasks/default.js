var gulp = require('gulp');

gulp.task('default', function(){

  var message =
  '---- io.js website ----\n' +
  'gulp tasks available:\n'   +
  '- develop\n' +
  '- build\n'   +
  '- server\n'  +
  '- clean\n';

  console.log(message);
});

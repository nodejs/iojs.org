var gulp = require('gulp');

gulp.task('default', function(){

  var message =
  '---- io.js website ----\n' +
  'gulp tasks available:\n'   +
  '- develop // Runs the `build` and `server` tasks and also keeps a watcher running\n' +
  '- build   // build the HTML and CSS files\n'   +
  '- server  // start the local dev server\n'  +
  '- clean   // clean out directory\n';

  console.log(message);
});

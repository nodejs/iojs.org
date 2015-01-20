var config   = require('../config');
var gulp     = require('gulp');

function startExpress(cb) {
  var express = require('express');
  var app = express();
  app.use(express.static(config.dest));
  app.listen(config.server.port, function() {
    console.log('Development server running on http://127.0.0.1:'+config.server.port);
    cb();
  });
}

gulp.task('server', function(cb) {
  startExpress(cb)
});

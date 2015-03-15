var gulp = require('gulp');
var fs = require('fs');
var path = require('path');
var request = require('request');

gulp.task('download', function () {
  var dir = path.resolve(__dirname, '..', '..', 'source');
  var outputFile = path.resolve(dir, 'versions.json');
  console.log('updating source/versions.json');
  return request('https://iojs.org/dist/index.json').pipe(fs.createWriteStream(outputFile));
});

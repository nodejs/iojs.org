var gulp = require('gulp');
var fs = require('fs');
var path = require('path');
var request = require('request');

var manifest = {
  "content/en/governance.md": "https://raw.githubusercontent.com/iojs/io.js/v1.x/GOVERNANCE.md",
  "content/en/working-groups.md": "https://raw.githubusercontent.com/iojs/io.js/v1.x/WORKING_GROUPS.md",
  "source/versions.json": "https://iojs.org/dist/index.json"
}

gulp.task('download', function () {
  var dir = path.resolve(__dirname, '..', '..');
  var streams = [];
  var targets = Object.keys(manifest);

  targets.forEach(function(target) {
    console.log('updating', target);

    var source = manifest[target];
    var outputFile = path.resolve(dir, target);

    var promise = new Promise(function(resolve, reject) {
      var outStream = fs.createWriteStream(outputFile);
      outStream.on('error', reject);
      outStream.on('finish', resolve);
      var stream = request(source).pipe(outStream);
    });

    streams.push(promise);
  })

  return Promise.all(streams);
});

var _ = require('lodash'); // to handle collections gracefully
var config = require('../config').templates; // pull in the pathing config file
var fs = require('fs'); // used to work with substack's module
var glob = require('glob'); // to dynamically read in all content md files
var gulp = require('gulp'); // because this is a gulp task. duh.
var HTMLtemplate = require('html-template'); // substack's html template implementation
var md = require('markdown-it')({ html: true }); // to convert markdown to html
var source = require('vinyl-source-stream'); // used to convert substack's readStream to vinylStream
var moment = require('moment-timezone');
var exec = require('child_process').exec
var utils = require('../util/template-utils.js');
var path = require('path');
var crypto = require("crypto");
var gulpif = require('gulp-if');
var handlebars = require('gulp-compile-handlebars');
var buffer = require('vinyl-buffer');
var rename = require('gulp-rename');

gulp.task('templates', function() {
  var separator = '<SEPARATOR>';
  var cmd = 'git log --no-color --pretty=format:\'[ "%H", "%s", "%cr", "%an" ],\' --abbrev-commit';
  cmd = cmd.replace(/"/g, separator);
  _command(cmd, function(str) {
    str = str.substr(0, str.length - 1);
    str = str.replace(/"/g, '\\"');
    str = str.replace(/\\\./g, '\\\\.');
    str = str.replace(new RegExp(separator, 'g'), '"');
    var commits = JSON.parse('[' + str + ']');
    var thisCommit = commits[0];
    var commitSha = thisCommit[0];
    var commitMsg = thisCommit[1];
    var commitUser = thisCommit[3];
    var buildTime = moment().tz('UTC').format('YYYY-MM-DD HH:mm:ss') + ' UTC'
    var contentFiles = glob.sync(config.contentSrc); // read in all content files in the repo
    var languages = _.uniq(_.map(contentFiles, function(str) { // extrapolate the languages from the content filepaths
      return str.split('/')[2];
    }));
    _.forEach(languages, function(lang) { // loop through languages to make separate folder outputs
      var templateJSON = utils.loadTemplateJSON(lang); // read in the template JSON file
      var markdownFilesInThisLang = utils.loadMdFiles(contentFiles, lang); // load all the md files

      _.forEach(markdownFilesInThisLang, function(file) { // iterate over the md files present in this language to apply the template to them
        var markdown = String(fs.readFileSync(file.srcPath)); // read in the md file, convert buffer to string
        var html = md.render(markdown); // convert md string to html string
        var thisFileJSON = _.cloneDeep(templateJSON); // clone in the template JSON object
        var pageTitle = thisFileJSON['browser-title'];
        var filepath = __dirname.split('gulp/tasks')[0] + 'source/templates/main.html'; // get the main template file location. There can be multiple, this is just a proof of concept
        var destinationDirectory = path.dirname('public/' + file.filepathArray.join('/'));
        var changedFileCache = [];

        var isChangedFile = function(vinylFile) {
          if (vinylFile.isNull()) {
            return;
          }
          if (changedFileCache[vinylFile.path] != null) {
            return changedFileCache[vinylFile.path];
          }

          var currentContent = fs.readFileSync(path.join(destinationDirectory, file.filename + '.html'), {encoding: 'utf8'});
          var currentHash = currentContent.match(/Hashsum:\s(\b([a-f0-9]{40})\b)/);
          if (currentHash && currentHash.length > 2) {
            currentHash = currentHash[1]
          } else {
            currentHash = null
          }

          var contents = String(vinylFile.contents);
          var newHash = crypto
            .createHash("sha1")
            .update(vinylFile.contents, "binary")
            .digest("hex");

          var isChanged = (currentHash !== newHash);

          if (isChanged) {
            contents = contents.replace(/Hashsum:(?:\s+\b([a-f0-9]{40})\b)?/, `Hashsum: ${newHash}`)
            contents = contents.replace('Build Time:', `Build Time: ${buildTime}`)
            contents = contents.replace('Commit Sha:', `Commit Sha: ${commitSha}`)
            contents = contents.replace('Commit Msg:', `Commit Msg: ${commitMsg}`)
            vinylFile.contents = new Buffer(contents);
          }
          changedFileCache[vinylFile.path] = isChanged;
          return isChanged;
        };

        var templateContent = {
          i18n: thisFileJSON,
          content: html,
          lang: lang,
          build: {
            markdownPage: file.filename,
            pageStylesheet: file.filename
          }
        };

        var fileStream = gulp.src(filepath) // pulling this code from substack's example on html-template
          .pipe(rename(file.filename + '.html')) // converting the readStream to a vinyl stream so gulp can write it back to the disk
          .pipe(buffer())
          .pipe(handlebars(templateContent))
          .pipe(gulpif(isChangedFile, gulp.dest(destinationDirectory))); // dump it in the appropriate language subfolder
      });
    });
  });
});

function _command(cmd, cb) {
  exec(cmd, function(err, stdout, stderr) {
    cb(stdout.split('\n').join(''))
  })
}

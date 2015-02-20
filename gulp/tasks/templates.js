var _             = require('lodash'); // to handle collections gracefully
var config        = require('../config').templates; // pull in the pathing config file
var versions      = require('../config').versions; // pull in the pathing config file
var fs            = require('fs'); // used to work with substack's module
var glob          = require('glob'); // to dynamically read in all content md files
var gulp          = require('gulp'); // because this is a gulp task. duh.
var HTMLtemplate  = require('html-template'); // substack's html template implementation
var md            = require('markdown-it')({ html: true }); // to convert markdown to html
var source        = require('vinyl-source-stream'); // used to convert substack's readStream to vinylStream
var replaceStream = require('replacestream'); // used to add an element to the html: making sure each page has it's own class if needed in css
var moment        = require('moment-timezone');
var exec          = require('child_process').exec
var utils         = require('../util/template-utils.js');
var path          = require('path');
var injectVersions;


//  function to inject the versions into the string given
injectVersions = function(string, versions){

  if( !Array.isArray(versions) ){
    throw new Error('expecting an array of versions!');
  }

  versions
  .forEach(function(thisVersion){

    if(thisVersion.linkRegExp !== 'undefined'){
      string = string.replace(thisVersion.linkRegExp, thisVersion.link);
    }

    if(thisVersion.nameRegExp !== 'undefined'){
      string = string.replace(thisVersion.nameRegExp, thisVersion.name);
    }

    if(thisVersion.valueRegExp !== 'undefined'){
      string = string.replace(thisVersion.valueRegExp, thisVersion.value);
    }
  });

  return string;
};


gulp.task('templates', function() {

  var separator = '<SEPARATOR>';
  var cmd = 'git log --no-color --pretty=format:\'[ "%H", "%s", "%cr", "%an" ],\' --abbrev-commit';

  cmd = cmd.replace(/"/g, separator);

  _command(cmd, function(str) {
    str = str.substr(0, str.length - 1);
    str = str.replace(/"/g, '\\"');
    str = str.replace(/\\\./g, '\\\\.');
    str = str.replace(new RegExp(separator, 'g'), '"');

    var commits       = JSON.parse('[' + str + ']');
    var thisCommit    = commits[0];
    var commitSha     = thisCommit[0];
    var commitMsg     = thisCommit[1];
    var commitUser    = thisCommit[3];
    var buildTime     = moment().tz('UTC').format('YYYY-MM-DD HH:mm:ss') + ' UTC'
    var contentFiles  = glob.sync(config.contentSrc); // read in all content files in the repo
    var languages     = _.uniq(_.map(contentFiles, function(str) { // extrapolate the languages from the content filepaths
      return str.split('/')[2];
    }));

    _.forEach(languages, function(lang) { // loop through languages to make separate folder outputs
      var templateJSON            = utils.loadTemplateJSON(lang); // read in the template JSON file
      var markdownFilesInThisLang = utils.loadMdFiles(contentFiles, lang); // load all the md files

      _.forEach(markdownFilesInThisLang, function(file) { // iterate over the md files present in this language to apply the template to them
        var markdown      = String(fs.readFileSync(file.srcPath)); // read in the md file, convert buffer to string
        markdown          = injectVersions(markdown.toString(), versions); // inject the versions in the markdown

        var html          = md.render(markdown); // convert md string to html string

        var thisFileJSON  = _.cloneDeep(templateJSON); // clone in the template JSON object
        var pageTitle     = thisFileJSON['browser-title'];
        thisFileJSON      = _.omit(thisFileJSON, 'browser-title');
        var finalJSON     = {};

        _.forEach(thisFileJSON, function(value, key) {
          finalJSON['[i18n-' + key + ']'] = value;
        });

        finalJSON['[i18n-content]'] = html; // Attach md2html string to the interpolation object
        var htmlObj = HTMLtemplate(); // finally using that holder for the template stream

        i18nObj = htmlObj.template('i18n', {
          include: false
        }); // same

        var filepath = __dirname.split('gulp/tasks')[0] + 'source/templates/main.html'; // get the main template file location. There can be multiple, this is just a proof of concept
        var destinationDirectory = path.dirname('public/' + file.filepathArray.join('/'));
        var fileStream = fs.createReadStream(filepath) // pulling this code from substack's example on html-template
          .pipe(replaceStream('<title i18n-title>io.js - JavaScript I/O</title>', '<title i18n-title>' + pageTitle + '</title>'))
          .pipe(replaceStream('markdown-page=""', 'markdown-page="' + file.filename + '"')) // add css-triggerable attribute to body
          .pipe(replaceStream('[page-stylesheet]', file.filename)) // require in specific stylesheet
          .pipe(replaceStream('Build Time:', 'Build Time: ' + buildTime))
          .pipe(replaceStream('Commit Sha:', 'Commit Sha: ' + commitSha))
          .pipe(replaceStream('Commit Msg:', 'Commit Msg: ' + commitMsg))
          .pipe(htmlObj)
          .pipe(source(file.filename + '.html')) // converting the readStream to a vinyl stream so gulp can write it back to the disk
          .pipe(gulp.dest(destinationDirectory)); // dump it in the appropriate language subfolder
        i18nObj.write(finalJSON); // write the interpolation JSON to the template
        i18nObj.end(); // saving? this is taken from substack too.
      });
    });
  });
});

function _command(cmd, cb) {
  exec(cmd, function(err, stdout, stderr) {
    cb(stdout.split('\n').join(''))
  })
}

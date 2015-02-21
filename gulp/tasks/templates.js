
'use strict';

var _             = require('lodash'),                      // to handle collections gracefully
    config        = require('../config').templates,         // pull in the pathing config file
    versions      = require('../config').versions,          // pull in the versions
    fs            = require('fs'),                          // used to work with substack's module
    glob          = require('glob'),                        // to dynamically read in all content md files
    gulp          = require('gulp'),                        // because this is a gulp task. duh.
    HTMLtemplate  = require('html-template'),               // substack's html template implementation
    md            = require('markdown-it')({ html: true }), // to convert markdown to html
    source        = require('vinyl-source-stream'),         // used to convert substack's readStream to vinylStream
    replaceStream = require('replacestream'),               // used to add an element to the html: making sure each page has it's own class if needed in css
    moment        = require('moment-timezone'),
    exec          = require('child_process').exec,
    utils         = require('../util/template-utils.js'),
    path          = require('path'),
    injectVersions,
    makeInjectionRegExp,
    _command;


//  a RegExp constructor for the values we want to inject
makeInjectionRegExp = function(string) {

  if(typeof string !== 'string') {
    throw new Error('makeInjectionRegExp() needs a string argument!');
  }

  return new RegExp('{{\\s*' + string + '\\s*}}', 'mg');
};

//  function to inject the versions into the string given
injectVersions = function(text, versions) {

  if( !Array.isArray(versions) ) {
    throw new Error('expecting an array of versions!');
  }

  versions
  .forEach(function(thisVersion) {

    if(typeof thisVersion.id !== 'string') {
      throw new Error('A version is defined without valid id!');
    }

    Object.keys(thisVersion)
    .filter(function(key) { return key !== 'id'; })
    .forEach(function(key) {

      var injectionRegExp = makeInjectionRegExp(thisVersion.id + '.' + key);

      text = text.replace(injectionRegExp, thisVersion[key]);
    });
  });

  return text;
};


_command = function (cmd, cb) {
  exec(cmd, function(err, stdout, stderr) {
    cb(stdout.split('\n').join(''))
  })
};


//  `templates` gulp task
gulp.task('templates', function() {

  var separator = '<SEPARATOR>',
      cmd;

  cmd = 'git log --no-color --pretty=format:\'[ "%H", "%s", "%cr", "%an" ],\' --abbrev-commit';

  cmd = cmd.replace(/"/g, separator);

  _command(cmd, function(str) {

    str = str.substr(0, str.length - 1);
    str = str.replace(/"/g, '\\"');
    str = str.replace(/\\\./g, '\\\\.');
    str = str.replace(new RegExp(separator, 'g'), '"');

    var commits       = JSON.parse('[' + str + ']'),
        thisCommit    = commits[0],
        commitSha     = thisCommit[0],
        commitMsg     = thisCommit[1],
        commitUser    = thisCommit[3],
        buildTime     = moment().tz('UTC').format('YYYY-MM-DD HH:mm:ss') + ' UTC',
        contentFiles  = glob.sync(config.contentSrc), // read in all content files in the repo
        languages;

    // extrapolate the languages from the content filepaths
    languages = _.uniq(_.map(contentFiles, function(str) {
      return str.split('/')[2];
    }));

    // loop through languages to make separate folder outputs
    _.forEach(languages, function(lang) {

      var templateJSON            = utils.loadTemplateJSON(lang), // read in the template JSON file
          markdownFilesInThisLang = utils.loadMdFiles(contentFiles, lang); // load all the md files

      // iterate over the md files present in this language to apply the template to them
      _.forEach(markdownFilesInThisLang, function(file) {

        var markdown,
            html,
            thisFileJSON,
            pageTitle,
            finalJSON,
            htmlObj,
            i18nObj,
            filepath,
            destinationDirectory,
            fileStream;

        markdown = String(fs.readFileSync(file.srcPath)); // read in the md file, convert buffer to string
        markdown = injectVersions(markdown.toString(), versions); // inject the versions in the markdown

        html = md.render(markdown); // convert md string to html string

        thisFileJSON = _.cloneDeep(templateJSON); // clone in the template JSON object
        pageTitle    = thisFileJSON['browser-title'];
        thisFileJSON = _.omit(thisFileJSON, 'browser-title');
        finalJSON    = {};

        _.forEach(thisFileJSON, function(value, key) {
          finalJSON['[i18n-' + key + ']'] = value;
        });

        // Attach md2html string to the interpolation object
        finalJSON['[i18n-content]'] = html;

        // finally using that holder for the template stream
        htmlObj = HTMLtemplate();

        i18nObj = htmlObj.template('i18n', {
          include: false
        }); // same

        // get the main template file location. There can be multiple, this is just a proof of concept
        filepath = __dirname.split('gulp/tasks')[0] + 'source/templates/main.html';
        destinationDirectory = path.dirname('public/' + file.filepathArray.join('/'));

        fileStream = fs.createReadStream(filepath) // pulling this code from substack's example on html-template
          .pipe(replaceStream('<title i18n-title>io.js - JavaScript I/O</title>', '<title i18n-title>' + pageTitle + '</title>'))
          .pipe(replaceStream('markdown-page=""', 'markdown-page="' + file.filename + '"')) // add css-triggerable attribute to body
          .pipe(replaceStream('[page-stylesheet]', file.filename)) // require in specific stylesheet
          .pipe(replaceStream('Build Time:', 'Build Time: ' + buildTime))
          .pipe(replaceStream('Commit Sha:', 'Commit Sha: ' + commitSha))
          .pipe(replaceStream('Commit Msg:', 'Commit Msg: ' + commitMsg))
          .pipe(htmlObj)
          .pipe(source(file.filename + '.html')) // converting the readStream to a vinyl stream so gulp can write it back to the disk
          .pipe(gulp.dest(destinationDirectory)); // dump it in the appropriate language subfolder

          // write the interpolation JSON to the template
        i18nObj.write(finalJSON);
        // saving? this is taken from substack too.
        i18nObj.end();
      });
    });
  });
});

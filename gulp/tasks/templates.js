var _ = require('lodash'); // to handle collections gracefully
var config = require('../config').templates; // pull in the pathing config file
var fs = require('fs'); // used to work with substack's module
var path = require('path'); // use for get dirname of a path
var glob = require('glob'); // to dynamically read in all content md files
var gulp = require('gulp'); // because this is a gulp task. duh.
var jade = require('gulp-jade'); // to render jade to html.
var rename = require('gulp-rename'); // to use different file name between input and output
var md = require('markdown-it')(); // to convert markdown to html
var utils = require('../util/template-utils.js');

gulp.task('templates', function() {
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

      templateJSON.page = file.filename; // extend locals for special styles on each page
      if (file.filepathArray[1] !== 'blog') {
        templateJSON['page-stylesheet'] = file.filename; // for special css files for the page
      } else {
        templateJSON['page-stylesheet'] = 'blog';
      }
      templateJSON['i18n-content'] = html; // attach the rendered markdown into the body

      var filepath = __dirname.split('gulp/tasks')[0] + 'source/templates/main.jade'; // get the main template file location. There can be multiple, this is just a proof of concept
      var destinationDirectory = path.dirname('public/' + file.filepathArray.join('/')); // consider 

      gulp.src(filepath) // read jade template
      .pipe(jade({ // render template while passing locals
        locals: _.cloneDeep(templateJSON)
      }))
      .pipe(rename(file.filename + '.html')) // rename output file, using md filename 
      .pipe(gulp.dest(destinationDirectory)); // dump it in the appropriate language subfolder

     });
  });
});

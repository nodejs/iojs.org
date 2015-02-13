var _ = require('lodash'); // to handle collections gracefully
var config = require('../config').templates; // pull in the pathing config file
var fs = require('fs'); // used to work with substack's module
var path = require('path'); // use for get dirname of a path
var glob = require('glob'); // to dynamically read in all content md files
var gulp = require('gulp'); // because this is a gulp task. duh.
var jade = require('gulp-jade'); // to render jade to html.
var rename = require('gulp-rename'); // to use different file name between input and output
var md = require('markdown-it')(); // to convert markdown to html
var cheerio = require('cheerio'); // to extract the h3 from the html
var utils = require('../util/template-utils.js');

gulp.task('template-blog', function() {
  var contentFiles = glob.sync(config.contentSrc); // read in all content files in the repo

  var languages = _.uniq(_.map(contentFiles, function(str) { // extrapolate the languages from the content filepaths
    return str.split('/')[2];
  }));

  _.forEach(languages, function(lang) { // loop through languages to make separate folder outputs
    var templateJSON = utils.loadTemplateJSON(lang); // read in the template JSON file
    var blogFilesInThisLang = utils.loadMdFiles(contentFiles, lang, 'blog'); // load all the md files
    if (blogFilesInThisLang.length === 0) {
      return;
    }
    console.log(blogFilesInThisLang);
    var articles = [];
    _.forEach(blogFilesInThisLang, function(file) { // iterate over the md files present in this language to apply the template to them
      var markdown = String(fs.readFileSync(file.srcPath)); // read in the md file, convert buffer to string
      console.log(markdown);
      var html = md.render(markdown); // convert md string to html string
      console.log(html);
      var $ = cheerio.load(html);
      var firstHeadline = $('h3').text();
      articles.push({
        title: firstHeadline,
        date: file.filename.substr(0, 10), // 'YYY-MM-DD'
        url: file.filename + '.html'
      });
    });
    templateJSON.page = 'blog';
    templateJSON['page-stylesheet'] = 'blog';
    templateJSON.articles = articles;
    templateJSON.lang = lang;

    var filepath = __dirname.split('gulp/tasks')[0] + 'source/templates/blog.jade'; // get the main template file location. There can be multiple, this is just a proof of concept
    gulp.src(filepath) // read jade template
    .pipe(jade({ // render template while passing locals
      locals: _.cloneDeep(templateJSON)
    }))
    .pipe(rename('index.html')) // rename output file, using md filename 
    .pipe(gulp.dest('public/' + lang + '/blog')); // dump it in the appropriate language subfolder

  });
});
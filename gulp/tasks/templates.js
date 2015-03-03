/*
 * 1. because this is a gulp task. duh.
 * 2. to convert markdown to html
 * 3. handlebars is used to convert `{{ }}` placeholders
 *    in markdown, html, to output
 * 4. we get an un-buffered stream we need 100% loaded in order
 *    to properly process
 * 5. the map function helps us "inject" our custom processing steps in to the
 *    incoming file buffer
 * 6. renames our files for output
 * 7. brings in our own shared `utils`
 */
var fs = require('fs');
var path = require('path');
var gulp = require('gulp'); /* 1 */
var md = require('markdown-it')({ html: true }); /* 2 */
var Handlebars = require('handlebars'); /* 3 */
var buffer = require('vinyl-buffer'); /* 4 */
var vinylMap = require('vinyl-map'); /* 5 */
var rename = require('gulp-rename'); /* 6 */
var utils = require('../util/template-utils.js'); /* 7 */


/*
  generateContentAndTemplates()
  =============
  This function wraps some lookups and caching around otherwise repeated actions
  within the run of the task returned.

  In general, the purpose is to:
  - take incoming Markdown files** and inject in dictionary variables
  - render the post-processed Markdown in to HTML
  - fetch the appropriate template (HTML)
  - Inject in dictionary variables and feed the HTML **content** (from markdown)
    in to the template.
  - Return the final combined HTML through to the vinyl stream.

  ** later, we want to accept incoming HTML partials as well
     (not all pages will be Markdown based)

  Returns: a gulp-friendly pipe task (function)
*/
function generateContentAndTemplates() {
  var base, projectJSON, i18nJSON, hbsTemplates;

  /*
   * cache variables and lookups used on subsequent runs of the pipe task:
   *
   * 1. `base` directory of project
   * 2. `contentBase` is the root directory where the task is getting its content,
   *     this is helpful later for processing out which i18n we're looking at
   * 3. `projectJSON` is global, re-used across all languages
   * 4. `i18nJSON` caches the template JSON for each language (avoids duplicated work)
   * 5. `hbsTemplates` caches the handlebars FUNCTION for each template to save overhead
   */
  base = path.resolve(__dirname, '..', '..'); /* 1 */
  contentBase = path.resolve(base, 'content'); /* 2 */
  projectJSON = require('../../source/project.json'); /* 3 */
  i18nJSON = {}; /* 4 */
  hbsTemplates = {}; /* 5 */

  // we returned a wrapped function to help us cache some work (above)
  return function(contentBuffer, file) {
    var fileName, contentRaw, lang, templateJSON, contentHandlebarsCompiled,
        contentMarkdownCompiled, template, contentTemplateCompiled;

    fileName = path.parse(file).name
    contentRaw = contentBuffer.toString();

    // determine the language based off of the current path
    lang = path.relative(contentBase, path.dirname(file)).split(path.sep)[0];

    if (i18nJSON[lang] == null) {
      i18nJSON[lang] = utils.loadTemplateJSON(lang);
    }

    // load the current dictionary for the selected lang
    templateJSON = {
      i18n: i18nJSON[lang],
      lang: lang,
      build: {
        markdownPage: fileName,
        pageStylesheet: fileName
      },
      project: projectJSON
    }

    // initial Handlebars compile, Markdown content, before parsing
    // (otherwise the `{{ }}` can be escaped)
    contentHandlebarsCompiled = Handlebars.compile(contentRaw)(templateJSON);

    // Turn `.md` in to `.html`
    contentMarkdownCompiled = md.render(contentHandlebarsCompiled)

    // this is hard-coded right now, but planned to be dynamic:
    template = 'main.html';

    // fetch the final template function we need (if not already cached)
    if (hbsTemplates[template] == null) {
      var templateBody =  fs.readFileSync(path.join(base, 'source', 'templates', template), {encoding: 'utf8'});
      hbsTemplates[template] = Handlebars.compile(templateBody);
    }

    // Adds the inner-content already processed to the templateJSON
    // as the dictionaries may be re-used between both levels:
    templateJSON.content = contentMarkdownCompiled;

    // Compile a version of the template with the content inside:
    contentTemplateCompiled = hbsTemplates[template](templateJSON)

    // Return as a Buffer for additional processing:
    return new Buffer(contentTemplateCompiled);
  }
};

/*
 * processMarkdown will take markdown files (from content) and apply any
 * template and variables needed. See `generateContentAndTemplates()` for
 * the bulk of the work this task provides.
 *
 * Arguments:
 * - `eventOrStream`: an event (from a `watch` trigger) or a vinyl stream
 * - `filePath` a specific pattern (glob string).
 *
 * note: processMarkdown allows you to specify `event == null` with
 * `filePath == "a glob string"` to explictly regenerate one or more files
 * without having to pass in an existing event or stream
 *
 * Returns: a vinyl stream
 */
var processMarkdown = function(eventOrStream, filePath) {
  // If we have an existing vinyl stream continue with it, otherwise create one
  if (eventOrStream != null && eventOrStream.pipe) {
    stream = eventOrStream;
  } else {
    // A check for incoming watch events, which will provide a `path` attribute:
    if (eventOrStream != null && eventOrStream.path) {
      filePath = path.relative(path.resolve(__dirname, '..', '..'), eventOrStream.path);
    }
    stream = gulp.src(filePath, {base: 'content/'});
  }

  return stream
    .pipe(buffer())
    .pipe(vinylMap(generateContentAndTemplates()))
    .pipe(rename({extname: '.html'}))
    .pipe(gulp.dest('public/'))
}

gulp.task('templates', function() {
  var stream = gulp.src('content/**/*.md');
  return processMarkdown(stream);
});

module.exports = {
  processMarkdown: processMarkdown
}

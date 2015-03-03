var gulp = require('gulp');
var config = require('../config');

/* Default Watch task
 * ==================
 * Live project regeneration as one works within iojs/website.
 * 1. watches for any CSS (stylus) changes, regenerating as needed
 * 2. triggers re-rendering **all** markdown files, when:
      a. any `source/templates` HTML file changes,
 *    b. any localization `template.json` changes +++
 * 3. triggered re-rendering of **individual** markdown files when they change.
 *
 * +++ we are aggressive with 2b. as a change to the `en/template.json` could
 *     cause other localizations to have different output (english is the
 *     default fallback for undefined dictionary variables)
 */

var processMarkdown = require('./templates').processMarkdown; /* for 3 */

gulp.task('watch', function(callback) {
  gulp.watch(config.stylus.src, ['stylus']); /* 1 */
  gulp.watch([
    config.templates.templateSrc,  /* 2a */
    config.templates.templateJSONsrc  /* 2b */
  ], ['templates']);
  gulp.watch([config.templates.contentSrc], processMarkdown); /* 3 */
});

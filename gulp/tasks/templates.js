/*
 * 1. we get an un-buffered stream we need 100% loaded in order
 *    to properly process
 * 2. the through function helps us "inject" our custom processing steps in to the
 *    incoming file buffer
 * 3. renames our files for output
 */
var path = require('path');
var gulp = require('gulp');

var buffer = require('vinyl-buffer'); /* 1 */
var through = require('through2'); /* 2 */
var rename = require('gulp-rename'); /* 3 */
var generateContentAndTemplates = require('../util/content').generateContentAndTemplates;

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
    .pipe(through.obj(generateContentAndTemplates()))
    .pipe(rename({extname: '.html'}))
    .pipe(gulp.dest('public/'))
}

gulp.task('templates', function() {
  var stream = gulp.src('content/**/*.{md,html}');
  return processMarkdown(stream);
});

module.exports = {
  processMarkdown: processMarkdown
}

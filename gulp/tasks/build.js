var gulp = require('gulp');

gulp.task('build', ['clean', 'stylus', 'templates', 'minifyCss', 'minifyHtml']);
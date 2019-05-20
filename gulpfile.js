// including plugins
var gulp = require('gulp')
, minifyHtml = require("gulp-minify-html");

// task
gulp.task('minify-html', done => {
	gulp.src('./Html/*.html') // path to your files
	.pipe(minifyHtml())
	.pipe(gulp.dest('path/to/destination'));
  done();
});


// including plugins
var gulp = require('gulp')
, minifyCss = require("gulp-minify-css");

// task
gulp.task('minify-css', done => {
	gulp.src('./css/styles.css') // path to your file
	.pipe(minifyCss())
	.pipe(gulp.dest('path/to/destination'));
    done();
});
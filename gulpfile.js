// including plugins
var gulp = require('gulp'),
  minifyHtml = require("gulp-minify-html"),
  minifyCss = require("gulp-minify-css"),
  uglify = require('gulp-uglify-es').default,
  sass = require("gulp-sass"),
  concat = require("gulp-concat"),
  image = require('gulp-image'),
  gutil   = require('gulp-util'),
  rename = require('gulp-rename');

// task
gulp.task('minify-html', done => {
	gulp.src('./*.html') // path to your files
	.pipe(minifyHtml())
    .pipe(concat('index.html'))
    .pipe(rename('min-index.html'))
	.pipe(gulp.dest('./'));
  done();
});


// task
gulp.task('minify-css', done => {
	gulp.src('./css/*.css') // path to your file
	.pipe(minifyCss())
    .pipe(concat('styles.css'))
	.pipe(gulp.dest('./css/'));
    done();
});


// task
gulp.task('minify-js', done => {
	gulp.src('./js/*.js') // path to your files
	.pipe(uglify())
    .pipe(concat('min-scripts.js'))
    .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
	.pipe(gulp.dest('./js/'));
    done();
});


// task
gulp.task('compile-sass',  done => {
	gulp.src('./sass/*.sass') // path to your file
	.pipe(sass())
	.pipe(gulp.dest('./sass/'));
    done();
});

gulp.task('image', done => {
  gulp.src('./images/*')
    .pipe(image())
    .pipe(gulp.dest('./images/'));
    done(); 
});


gulp.task('allTogetherNow', done => {
	gulp.src('./') // path to your file
    .pipe(minifyHtml())
	.pipe(minifyCss())  // compile coffeeScript
	.pipe(uglify())  // compile coffeeScript
	.pipe(sass())  // compile coffeeScript
	.pipe(image())  // compile coffeeScript
	.pipe(concat('index.html'))
	.pipe(concat('styles.css'))
	.pipe(concat('styles.sass'))
	.pipe(rename('min-index.html')) // rename into "renamed.js" (original name "one.js")
	.pipe(gulp.dest('./'));
    done();
});


























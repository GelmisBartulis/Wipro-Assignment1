// including plugins
var gulp = require('gulp'),
  minifyHtml = require("gulp-minify-html"),
  minifyCss = require("gulp-minify-css"),
  uglify = require("gulp-uglify"),
  sass = require("gulp-sass"),
  concat = require("gulp-concat"),
  image = require('gulp-image');

// task
gulp.task('minify-html', done => {
	gulp.src('./') // path to your files
	.pipe(minifyHtml())
    .pipe(concat('index.html'))
	.pipe(gulp.dest('./'));
  done();
});


// task
gulp.task('minify-css', done => {
	gulp.src('./css/styles.css') // path to your file
	.pipe(minifyCss())
    .pipe(concat('styles.css'))
	.pipe(gulp.dest('./css'));
    done();
});


// task
gulp.task('minify-js', done => {
	gulp.src('./js/*.js') // path to your files
	.pipe(uglify())
    .pipe(concat('scripts.js'))
	.pipe(gulp.dest('./js'));
    done();
});


// task
gulp.task('compile-sass',  done => {
	gulp.src('./sass/styles.sass') // path to your file
	.pipe(sass())
	.pipe(gulp.dest('./sass'));
    done();
});

gulp.task('image', done => {
  gulp.src('./images/*')
    .pipe(image())
    .pipe(gulp.dest('./dest'));
    done(); 
});

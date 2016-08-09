'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function() {
  return gulp.src(['./src/scss/styles.scss'])
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('../public/css'));
});

gulp.task('browser-sync', function() {
  var browserSync = require('browser-sync').create();

  browserSync.init(null, {
    files: ['../public/css/styles.css', '../public/js/app.js'],
    proxy: 'localhost:3000'
  });
});

gulp.task('serve', ['browser-sync', 'sass'], function() {
  var browserSync = require('browser-sync').create();
  var reload = browserSync.reload;
  gulp.watch('./src/scss/styles.scss', ['sass'], reload);
});


gulp.task('default', ['sass']);

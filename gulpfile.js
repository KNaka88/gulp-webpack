var gulp = require('gulp'),
    typescript = require('gulp-typescript'),
    uglify = require('gulp-uglify'),
    tsConfig = require('./tsconfig.json'),
    concat = require('gulp-concat'),
    webpack = require('webpack');

gulp.task('default', ['build']);
gulp.task('build', function() {
  gulp.start('compile-scripts');
});

gulp.task('compile-scripts', ['compile-typescript']);

gulp.task('typescript', function() {
  return gulp.src([
    '**/*.ts',
    '!./node_modules/**',
    '!./typings/**'
  ])
  .pipe(typescript(tsConfig.compilerOptions))
  .js
  .pipe(gulp.dest('js/'))
});


gulp.task('compile-typescript', ['typescript'], function () {
  gulp.start('custom-scripts');
});

gulp.task('custom-scripts', function() {
  return gulp.src([
    'js/app.js'
  ])
  .pipe(concat('jsbundle.js'))
  .pipe(uglify())
  .pipe(gulp.dest('dist'))
});

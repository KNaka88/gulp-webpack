var gulp = require('gulp'),
    typescript = require('gulp-typescript'),
    uglify = require('gulp-uglify'),
    tsConfig = require('./tsconfig.json'),
    concat = require('gulp-concat'),
    del = require('del'),
    sourcemaps = require('gulp-sourcemaps'),
    webpack = require('webpack');

gulp.task('default', ['build']);
gulp.task('build', ['clean'], function() {
  gulp.start('compile-scripts');
  gulp.start('move-templates');
});

gulp.task('clean', function() {
  return del([
    'dist/',
    'js/'
  ]);
});

gulp.task('compile-scripts', ['vendor-scripts', 'compile-typescript']);



gulp.task('compile-typescript', ['typescript'], function () {
  gulp.start('custom-scripts');
});

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


gulp.task("vendor-scripts", function () {
  return gulp.src([
    "node_modules/angular/angular.js",
    "node_modules/angular-ui-router/release/angular-ui-router.js",
    "node_modules/angular-animate/angular-animate.js",
    "node_modules/angular-route/angular-route.min.js"
  ])
  .pipe(concat('vendorbundle.js'))
  .pipe(uglify())
  .pipe(gulp.dest('dist'))
});

gulp.task('custom-scripts', function() {
  return gulp.src([
    "app.js",
    "page1/PageModule.js",
    "page1/PageController.js",
  ])
  .pipe(sourcemaps.init())
  .pipe(concat('jsbundle.js'))
  .pipe(uglify())
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('dist'))
});

gulp.task('move-templates', function () {
  return gulp.src([
    './**/*.html',
    '!./*.html',
  ], {base: './'})
  .pipe(gulp.dest('./dist/'));
});

"use strict"

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();


module.exports.compile = () => {
  gulp.src( myPaths.src + myPaths.img + '**/*')
  .pipe($.plumber())
  .pipe($.imagemin())
  .pipe(gulp.dest( myPaths.dest + myPaths.img ));
}

module.exports.watch = () => {
  gulp.watch( myPaths.src + myPaths.img + '**/*', this.compile );
}
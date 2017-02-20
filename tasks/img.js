"use strict"

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var myPaths = global.myGulpConfigs.myPaths;

module.exports.compile = () => {
  gulp.src( myPaths.src + myPaths.img + '**/*')
  .pipe($.plumber({errorHandler: $.notify.onError("Error: <%= error.message %>")}))
  .pipe($.imagemin())
  .pipe(gulp.dest( myPaths.dest + myPaths.img ));
}

module.exports.watch = () => {
  gulp.watch( myPaths.src + myPaths.img + '**/*', this.compile );
}
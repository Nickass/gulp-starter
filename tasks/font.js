"use strict"

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var myPaths = global.myGulpConfigs.myPaths;

module.exports.compile = () => {
  gulp.src( myPaths.src + myPaths.font + '**/*.*')
  .pipe($.plumber({errorHandler: $.notify.onError("Error: <%= error.message %>")}))
  .pipe(gulp.dest( myPaths.dest + myPaths.font ));
}

module.exports.watch = () => {
  gulp.watch( myPaths.src + myPaths.font + '**/*', this.compile );
}
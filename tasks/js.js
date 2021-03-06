"use strict"

var gulp = require('gulp');
var $ = require('gulp-load-plugins')(); 
var myPaths = global.myGulpConfigs.myPaths;

module.exports.compile = () => {
  gulp.src( myPaths.src + myPaths.js + '**/*.js')
  .pipe($.plumber({errorHandler: $.notify.onError("Error: <%= error.message %>")}))
  //.pipe($.uglify())
  .pipe(gulp.dest( myPaths.dest + myPaths.js ));
}

module.exports.watch = () => {
  gulp.watch( myPaths.src + myPaths.js + '**/*', this.compile );
}


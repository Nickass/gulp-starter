"use strict"

var gulp = require('gulp');
var fs = require('fs');
var $ = require('gulp-load-plugins')();
const reload = require('browser-sync').reload;
var myPaths = global.myGulpConfigs.myPaths;

module.exports.compile = function(){
  gulp.src( myPaths.src + myPaths.jade + '*.jade' )
  .pipe( $.changed(myPaths.src + myPaths.html) ) // Don't working, need remove!
  .pipe( $.plumber({errorHandler: $.notify.onError("Error: <%= error.message %>")}) )
  .pipe( $.jade({pretty: true, locals:{_fs: fs} }) )
  .pipe( gulp.dest( myPaths.src + myPaths.html ) )
  .pipe( reload({stream: true}) );
}

module.exports.watch = function(){
	gulp.watch( myPaths.src + myPaths.jade + '**/*.*', this.compile );
}
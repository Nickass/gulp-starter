"use strict"

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
const reload = require('browser-sync').reload;

module.exports.compile = function(){
  gulp.src( myPaths.src + myPaths.jade + '*.jade' )
  .pipe( $.plumber() )
  .pipe( $.jade({pretty: true}) )
  .pipe( gulp.dest( myPaths.src + myPaths.html ) )
  .pipe( reload({stream: true}) );
}

module.exports.watch = function(){
	gulp.watch( myPaths.src + myPaths.jade + '**/*.jade', this.compile );
}
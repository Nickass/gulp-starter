"use strict"

var gulp = require('gulp');
var $ = require('gulp-load-plugins')(); 


module.exports.compile = () => {
  gulp.src( myPaths.src + myPaths.js + '**/*.js')
  .pipe($.plumber())
  //.pipe($.uglify())
  .pipe(gulp.dest( myPaths.dest + myPaths.js ));
}

module.exports.watch = () => {
  gulp.watch( myPaths.src + myPaths.js + '**/*.js', this.compile );
}


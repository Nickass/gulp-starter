"use strict"

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var myPaths = global.myGulpConfigs.myPaths;

module.exports.compile = () => {
  gulp.src( myPaths.src + myPaths.css + '**/*.css')
  .pipe($.plumber({errorHandler: $.notify.onError("Error: <%= error.message %>")}))
  .pipe($.cssnano({safe: true, autoprefixer: false}))
  .pipe(gulp.dest( myPaths.dest + myPaths.css ));
}

module.exports.watch = () => {
  gulp.watch( myPaths.src + myPaths.css + '**/*', this.compile );
}


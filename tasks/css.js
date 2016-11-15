"use strict"

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();


module.exports.compile = () => {
  gulp.src( myPaths.src + myPaths.css + '**/*.css')
  .pipe($.plumber())
  //.pipe($.cssnano({safe: true, autoprefixer: false}))
  .pipe(gulp.dest( myPaths.dest + myPaths.css ));
}

module.exports.watch = () => {
  gulp.watch( myPaths.src + myPaths.css + '**/*.css', this.compile );
}


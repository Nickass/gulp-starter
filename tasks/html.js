"use strict"

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();




module.exports.compile = ()=>{
	gulp.src( myPaths.src + myPaths.html + '*.html')
	.pipe($.plumber())
  .pipe($.useref({searchPath: ['dev', 'app', 'bower_components']}))
  .pipe($.if('*.js', $.uglify()))
  .pipe($.if('*.css', $.cssnano({safe: true, autoprefixer: false})))
  .pipe(gulp.dest( myPaths.dest + myPaths.html ));
}


module.exports.watch = () => {
  gulp.watch( myPaths.src + '**/*', this.compile );
}
"use strict"

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var myPaths = global.myGulpConfigs.myPaths;



module.exports.compile = ()=>{
	gulp.src( myPaths.src + myPaths.html + '*.html')
	.pipe($.plumber({errorHandler: $.notify.onError("Error: <%= error.message %>")}))
  .pipe($.useref({searchPath: ['dev', myPaths.src, 'bower_components']}))
  .pipe($.if('*.js', $.uglify()))
  .pipe($.if('*.css', $.cssnano({safe: true, autoprefixer: false})))
  .pipe(gulp.dest( myPaths.dest + myPaths.html ));
}


module.exports.watch = () => {
  gulp.watch( myPaths.src + '**/*', this.compile );
}
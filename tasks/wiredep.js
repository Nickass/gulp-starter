"use strict"

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var reload = require('browser-sync').reload;
var wiredep = require('wiredep');
var wireStream = wiredep.stream;

wiredep({
	fileTypes:{
	  jade: {
      replace: {
      	css: (filePath)=>{return `link(rel=\'stylesheet\', href=\'${filePath.substr(3)}\')`}, // magic number 3
      	js : (filePath)=>{return `script(src=\'${filePath.substr(3)}\')`} // magic number 3
      }
    },
	}
});

module.exports.compile = () => {
  gulp.src( myPaths.src + myPaths.sass + '*.scss')
  .pipe($.plumber())
  .pipe(wireStream({ ignorePath: /^(\.\.\/)+/ }))
  .pipe(gulp.dest( myPaths.src + myPaths.sass ));

  gulp.src( myPaths.src + myPaths.jade + '*.jade')
  .pipe($.plumber())
  .pipe(wireStream())
  .pipe(gulp.dest( myPaths.src + myPaths.jade ));
  .pipe(reload({stream: true}));
}

module.exports.watch = () => {
  gulp.watch( './bower.json', this.compile);
}


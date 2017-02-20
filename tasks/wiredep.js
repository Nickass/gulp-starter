"use strict"

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var reload = require('browser-sync').reload;
var wireStream = require('wiredep').stream;
var myPaths = global.myGulpConfigs.myPaths;
var locConf = global.myGulpConfigs.gulpManifest.tasks.wiredep;

var settings = {
  cwd:myPaths.src,
  fileTypes:{
    jade: {
      replace: { 
        css: (filePath)=>{return `link(rel=\'stylesheet\', href=\'${filePath.substr(3)}\')`}, // magic number 3
        js : (filePath)=>{return `script(src=\'${filePath.substr(3)}\')`} // magic number 3
      } // magic, for fix path between directories jade and html.
    },
  }
}


module.exports.compile = () => {
  if(!!locConf.scss) {
    gulp.src( myPaths.src + myPaths.sass + '*.scss')
    .pipe($.plumber({errorHandler: $.notify.onError("Error: <%= error.message %>")}))
    .pipe(wireStream(settings/*{ ignorePath: /^(\.\.\/)+/ }*/))
    .pipe(gulp.dest( myPaths.src + myPaths.sass ));
  }
  if(!!locConf.jade) {
    gulp.src( myPaths.src + myPaths.jade + '*.jade')
    .pipe($.plumber())
    .pipe(wireStream(settings))
    .pipe(gulp.dest( myPaths.src + myPaths.jade ))
    .pipe(reload({stream: true}));
  }
  if(!!locConf.html) {
    gulp.src( myPaths.src + myPaths.html + '*.html')
    .pipe($.plumber())
    .pipe(wireStream(settings))
    .pipe(gulp.dest( myPaths.src + myPaths.html ))
    .pipe(reload({stream: true}));
  }
}

module.exports.watch = () => {
  gulp.watch( myPaths.src + 'bower.json', this.compile);
}


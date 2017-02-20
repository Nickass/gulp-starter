"use strict"

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var p = require('path');
var myPaths = global.myGulpConfigs.myPaths;


/*Normalize path*/
var pathToSass = p.relative( myPaths.src + myPaths.font,  myPaths.src + myPaths.sass );
var pathToFont = p.relative( myPaths.src + myPaths.css,  myPaths.src + myPaths.font );
pathToSass = pathToSass.replace(/\\/g, '/') + '/';
pathToFont = pathToFont.replace(/\\/g, '/') + '/';
/*--------------*/


module.exports.compile = function(){
  gulp.src( myPaths.src + myPaths.iconFont + '**/*.svg' )
    .pipe($.plumber({errorHandler: $.notify.onError("Error: <%= error.message %>")}))
    .pipe( $.iconfontCss({
      path: 'helpers/_icons_template.scss',
      fontName: 'iconfont',
      targetPath: pathToSass + 'general/_iconfont.scss', 
      fontPath: pathToFont,
    }))

    .pipe( $.iconfont({
      formats: [ 'svg', 'ttf', 'eot', 'woff', 'woff2' ],
      fontName: 'iconfont',
      normalize: true,
      prependUnicode: true,

    }))
    //.pipe( $.if('*.{svg,ttf,eot,woff,woff2}', $.rev() ))
    .pipe( gulp.dest( myPaths.src + myPaths.font ) );
    //.pipe( $.rev.manifest())
    //.pipe( gulp.dest(myPaths.src + 'manifest/'));
}
module.exports.watch = function(){
  gulp.watch( myPaths.src + myPaths.iconFont + '**/*', this.compile);
}


"use strict"

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var p = require('path');


/*Normalize path*/
var pathToSass = p.relative( myPaths.src + myPaths.font,  myPaths.src + myPaths.sass );
var pathToFont = p.relative( myPaths.src + myPaths.css,  myPaths.src + myPaths.font );
pathToSass = pathToSass.replace(/\\/g, '/') + '/';
pathToFont = pathToFont.replace(/\\/g, '/') + '/';
/*--------------*/

module.exports.compile = function(){
  gulp.src( myPaths.src + myPaths.iconFont + '**/*.svg' )
     .pipe( $.iconfontCss({
        path: 'helpers/_icons_template.scss',
        fontName: 'iconfont',
        targetPath: pathToSass + 'general/_iconfont.scss', 
        fontPath: pathToFont,
     }))

     .pipe( $.iconfont({
        formats: [ 'svg', 'ttf', 'eot', 'woff', 'woff2' ],
        fontName: 'iconfont'
     }))
     .pipe( gulp.dest( myPaths.src + myPaths.font ) );
}
module.exports.watch = function(){
  gulp.watch( myPaths.iconFont + '**/*.svg', this.compile);
}


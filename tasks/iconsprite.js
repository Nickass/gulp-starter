"use strict"

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var p = require('path');
const reload = require('browser-sync').reload;
var myPaths = global.myGulpConfigs.myPaths;

/*Normalize path*/
var pathToImg = p.relative( myPaths.src + myPaths.css, myPaths.src + myPaths.img);
pathToImg = pathToImg.replace(/\\/g, '/') + '/';
/*--------------*/

let options = {
	imgName: 'iconsprite.png',
	cssName: '_iconsprite.scss',
	cssFormat: 'scss',
	imgPath: pathToImg, 
	cssVarMap: function( sprite ) {
	  sprite.name = 's-' + sprite.name;
	}
}

module.exports.compile = function(){
    var spriteData = 
      gulp.src( myPaths.src + myPaths.iconSprite + '**/*.{png,jpg}' )
      .pipe($.plumber({errorHandler: $.notify.onError("Error: <%= error.message %>")}))
      .pipe( $.spritesmith( options ) );
 
    spriteData.css.pipe( gulp.dest( myPaths.src + myPaths.sass + '/general/' ) );
    spriteData.img.pipe( gulp.dest( myPaths.src + myPaths.img ) )
    .pipe(reload({stream: true}));
}

module.exports.watch = function(){
	gulp.watch( myPaths.src + myPaths.iconSprite + '**/*', this.compile);
}
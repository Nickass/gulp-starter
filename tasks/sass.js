"use strict"

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var reload = require('browser-sync').reload;

var plugs4PostCss = [
  require('postcss-fontpath')(true),
  require('autoprefixer')({ cascade: true, browsers: ['> 1%', 'last 2 versions'] }),
  require('postcss-assets')()
];



module.exports.compile = function(){
  gulp.src( myPaths.src + myPaths.sass + '*.scss' )
  .pipe( $.plumber() )
  .pipe( $.sourcemaps.init() )
  .pipe( $.sass.sync({
    outputStyle: 'expanded',
    precision: 10,
    includePaths: ['.']
  } ).on( 'error', $.sass.logError ) )
  .pipe( $.postcss( plugs4PostCss ) )
  .pipe( $.sourcemaps.write() )
  .pipe( gulp.dest( myPaths.src + myPaths.css ) )
  .pipe(reload({stream: true}));
}

module.exports.watch = function(){
  gulp.watch( myPaths.src + myPaths.sass + '**/*.scss', this.compile);
}
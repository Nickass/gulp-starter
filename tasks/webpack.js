"use strict"

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var reload = require('browser-sync').reload;
var webpackStream = require('webpack-stream');
var webpack = webpackStream.webpack;
var gulplog = require('gulplog');


let options = {
  output: {
    publicPath: 'js/',
    filename: 'common.js'
  },
  devtool: 'cheap-module-inline-source-map',
  module:  {
    loaders: [{
      test:    /\.js$/,
      loader:  'babel?presets[]=es2015'
    }]
  },
  plugins: [
    new webpack.NoErrorsPlugin()
  ]
};

module.exports.compile = function(){
  gulp.src( myPaths.src + myPaths.webpack + '*.js' )
  .pipe( $.plumber({
        errorHandler: $.notify.onError(err => ({
          title:   'Webpack',
          message: err.message
        }))
      }) )
  .pipe(webpackStream(options))
  .pipe(gulp.dest( myPaths.src + myPaths.js ))
  .pipe(reload({stream: true}));
}

module.exports.watch = function(){
  gulp.watch( myPaths.src + myPaths.webpack + '**/*.js', this.compile);
}
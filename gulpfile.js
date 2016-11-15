"use strict"

global.myPaths = {
	src  : 'app/',
	dest : 'dist/',

	css  : 'css/',
	js   : 'js/',
	img  : 'img/',
	font : 'font/',
	html : '',

	iconSprite : 'img_to_sprites/',
	iconFont   : 'svg_to_iconfont/',
	sass			 : 'sass/',
	jade			 : 'jade/',
	webpack		 : 'webpack/',
}

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var reload = browserSync.reload;

function includeTask(name, src){
	gulp.task(name, function(cb){
		require(src).compile(cb);
	});
	gulp.task(name+':watch', function(cb){		
		require(src).watch(cb);
	});
}

includeTask('sass', 			'./tasks/sass.js');
includeTask('jade', 			'./tasks/jade.js');
includeTask('iconsprite', './tasks/iconsprite.js');
includeTask('iconfont', 	'./tasks/iconfont.js');
includeTask('webpack', 		'./tasks/webpack.js');
includeTask('wiredep', 		'./tasks/wiredep.js');

includeTask('build:js', 			'./tasks/js.js');
includeTask('build:css', 			'./tasks/css.js');
includeTask('build:img', 			'./tasks/img.js');
includeTask('build:font', 		'./tasks/font.js');
includeTask('build:html', 		'./tasks/html.js');

gulp.task( 'compile', ['sass', 'jade', 'iconsprite', 'iconfont', 'webpack', 'wiredep'] );
gulp.task( 'build', ['build:js', 'build:css', 'build:img', 'build:font', 'build:html'] );

gulp.task('server', ()=>{
	gulp.start('webpack:watch');
	gulp.start('iconfont:watch');
	gulp.start('iconsprite:watch');
	gulp.start('jade:watch');
	gulp.start('sass:watch');
	gulp.start('wiredep:watch');

  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: myPaths.src
    }
  });
});
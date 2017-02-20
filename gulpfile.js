"use strict"


var project = process.env.PWD.match(/[^(\/|\\)]*$/)[0];
console.log('Real work directory: ' + project);
var projDir = project + '/';

global.myGulpConfigs = {};
var configs = global.myGulpConfigs;

configs.projectName = project;
configs.myPaths = {
	src  : 'dev/' + projDir,
	dest : 'dist/' + projDir,

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
configs.gulpManifest = require('./' + configs.myPaths.src + '_gulpManifest.json');


var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var ts = configs.gulpManifest.tasks;
var tsArr = Object.keys(ts).filter((e)=>{ return !!ts[e] });

function includeTask(name, src) {
	gulp.task(name, function(cb){
		require(src).compile();
		cb();
	});
	gulp.task(name+':watch', function(){		
		require(src).watch();
	});
}

if(ts.sass) 			includeTask('sass', 			'./tasks/sass.js');
if(ts.jade) 			includeTask('jade', 			'./tasks/jade.js');
if(ts.iconsprite) includeTask('iconsprite', './tasks/iconsprite.js');
if(ts.iconfont) 	includeTask('iconfont', 	'./tasks/iconfont.js');
if(ts.webpack) 		includeTask('webpack', 		'./tasks/webpack.js');
if(ts.wiredep) 		includeTask('wiredep', 		'./tasks/wiredep.js');
if(ts.favicon) 		includeTask('favicon', 		'./tasks/favicon.js');

includeTask('build:js', 			'./tasks/js.js');
includeTask('build:css', 			'./tasks/css.js');
includeTask('build:img', 			'./tasks/img.js');
includeTask('build:font', 		'./tasks/font.js');
includeTask('build:html', 		'./tasks/html.js');

gulp.task( 'compile', tsArr );
gulp.task( 'build', ['build:js', 'build:css', 'build:img', 'build:font', 'build:html'] );

gulp.task('serve', ()=>{

	for(let i in tsArr){
		gulp.start( tsArr[i] + ':watch' );
	}

	var isProxy = (configs.gulpManifest ? (configs.gulpManifest.proxy ? true : false) : false);
	if(!isProxy){
	  browserSync({
	    notify: false,
	    port: 9000,
	    server: {
	      baseDir: configs.myPaths.src,
	      directory: false,
	      routes:{'/bower_components':'bower_components'}
	    }
	  });
	}else{
		browserSync({
			notify:false,
			proxy: configs.gulpManifest.proxy,
		});
	}

});


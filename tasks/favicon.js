"use strict"

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var realFavicon = require ('gulp-real-favicon');
var fs = require('fs');

var myPaths = global.myGulpConfigs.myPaths;
var projectName = global.myGulpConfigs.projectName;
var ts = global.myGulpConfigs.gulpManifest.tasks.favicon;

var pathSaveFavicon = myPaths.img + 'favicon/';
var pathSaveTemplate =  myPaths.jade + 'extrafiles/';
var pathFromLogo = myPaths.src + "logo.png";

var pack = require( process.cwd() + '/package.json');
var nameDeveloper = pack.author;
var urlDeveloper = pack.repository.url;

var bgColor = ts ? (ts.color ? ts.color : '#fff' ): '#fff';



// File where the favicon markups are stored
var FAVICON_DATA_FILE = myPaths.src + 'faviconData.json';

// Generate the icons. This task takes a few seconds to complete. 
// You should run it at least once to create the icons. Then, 
// you should run it whenever RealFaviconGenerator updates its 
// package (see the check-for-favicon-update task below).
gulp.task('generate-favicon', function(done) {
	realFavicon.generateFavicon({
		masterPicture: pathFromLogo,
		dest: myPaths.src + pathSaveFavicon,
		iconsPath: pathSaveFavicon,
		design: {
			ios: {
				pictureAspect: 'backgroundAndMargin',
				backgroundColor: bgColor,
				margin: '21%'
			},
			desktopBrowser: {},
			windows: {
				pictureAspect: 'whiteSilhouette',
				backgroundColor: bgColor,
				onConflict: 'override'
			},
			androidChrome: {
				pictureAspect: 'shadow',
				themeColor: bgColor,
				manifest: {
					name: projectName,
					display: 'browser',
					orientation: 'notSet',
					onConflict: 'override'
				}
			},
			safariPinnedTab: {
				pictureAspect: 'silhouette',
				themeColor: bgColor
			}
		},
		settings: {
			compression: 5,
			scalingAlgorithm: 'Mitchell',
			errorOnImageTooSmall: false
		},
		markupFile: FAVICON_DATA_FILE
	}, function() {
		done();
	});
});

// Inject the favicon markups in your HTML pages. You should run 
// this task whenever you modify a page. You can keep this task 
// as is or refactor your existing HTML pipeline.
gulp.task('inject-favicon-markups', ['generate-favicon'], function() {
	gulp.src([ myPaths.src + pathSaveTemplate + '_favicon.jade' ])
		.pipe(realFavicon.injectFaviconMarkups(JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).favicon.html_code))
		.pipe(gulp.dest(myPaths.src + pathSaveTemplate ));
});

// Check for updates on RealFaviconGenerator (think: Apple has just
// released a new Touch icon along with the latest version of iOS).
// Run this task from time to time. Ideally, make it part of your 
// continuous integration system.
gulp.task('check-for-favicon-update', function(done) {
	var currentVersion = JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).version;
	realFavicon.checkForUpdates(currentVersion, function(err) {
		if (err) {
			throw err;
		}
	});
});



module.exports.compile = ()=>{
	gulp.start('inject-favicon-markups');
}

module.exports.watch = () => {
  gulp.watch( pathFromLogo, this.compile );
}
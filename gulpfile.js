var gulp = require('gulp');
var webpack = require('webpack-stream');
var sass = require('gulp-sass');
//var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var rename = require("gulp-rename");

// using data from package.json 
var header = require('gulp-header');
var pkg = require('./package.json');
var banner = ['/*',
	' Copyright (c) ' + new Date().getFullYear() + ' SETLEVEL, LLC. All rights reserved.',
	' <%= pkg.name %> - <%= pkg.description %>',
	' version: v<%= pkg.version %>',
	' link: <%= pkg.homepage %>',
	' license: <%= pkg.license %>',
	' */',
	//''].join('\n');
	''].join(' | ')
	.replace(/^\/\* \|  /, '/* ').replace(/ \| $/, '').replace(/ \|  \*\/$/, ' */') + '\n';

gulp.task('webpack', function () {
	return gulp.src('ng2-offcanvas.js')
		.pipe(webpack({
			output: {
				filename: 'ng2-offcanvas.js'
			}
		}))
		.pipe(gulp.dest('bundles/'));
});

// Watch Files For Changes
gulp.task('watch', function () {
	gulp.watch(['./ng2-offcanvas.js', './src/**/*.js'], ['webpack']);
	//gulp.watch('scss/*.scss', ['sass']);
});

gulp.task('sass', function () {
	return gulp.src('./sass/ng2-canvas.scss')
		//pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(sass().on('error', sass.logError))
		//.pipe(sourcemaps.write())
		.pipe(header(banner, { pkg: pkg }))
		.pipe(gulp.dest('./bundles/css'))
		.pipe(gulp.dest('./demo/src/assets/css'));
});

gulp.task('sass:minify', function () {
	return gulp.src('./sass/ng2-canvas.scss')
		.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(rename('ng2-canvas.min.css'))
		.pipe(header(banner, { pkg: pkg }))
		.pipe(gulp.dest('./bundles/css'));
});

gulp.task('sass:watch', function () {
	gulp.watch('./sass/**/*.scss', ['sass', 'sass:minify']);
});

gulp.task('clean:bundles', function () {
	return del([
		'bundles/css'
	]);
});

//gulp.task('default', ['watch']);
gulp.task('default', ['clean:bundles'], function () {
	gulp.start('sass:watch', 'sass', 'sass:minify');
});
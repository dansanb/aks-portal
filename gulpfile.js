// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var livereload = require('gulp-livereload');

var pathSourceJS = [
                    'public/js/aksApp/aksApp.js',
                    'public/js/aksApp/filters/**/*.js',
                    'public/js/aksApp/directives/**/*.js',
                    'public/js/aksApp/factories/**/*.js',
                    'public/js/aksApp/services/**/*.js',
                    'public/js/aksApp/controllers/**/*.js'
                    ];
var pathDestJS = 'public/js';
var concatJSFile = 'all';   // 2 files will be created: all.js and all.min.js
var pathSourceSass = 'public/sass/*.sass';
var pathDestCss = 'public/css';

// Lint Task
gulp.task('lint', function() {
    return gulp.src(pathSourceJS)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src(pathSourceSass)
        .pipe(sass())
        .pipe(gulp.dest(pathDestCss));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src(pathSourceJS)
        .pipe(concat(concatJSFile + '.js'))
        .pipe(gulp.dest(pathDestJS))
        .pipe(rename(concatJSFile + '.min.js'))
        //.pipe(uglify({mangle: false}))
        .pipe(gulp.dest(pathDestJS));
});

// compile when anything changes
gulp.task('watch:compile', function () {
    gulp.watch('public/**', ['compile:all']);
});

// Watch Files For Changes and reload browser
gulp.task('watch:livereload', function() {
    livereload.listen();
    gulp.watch('public/**').on('change', livereload.changed);
});

// compile tasks
gulp.task('compile:all', ['lint', 'sass', 'scripts']);

// Default Task
gulp.task('default', ['watch:compile', 'watch:livereload']);

var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();
var cssnano = require('gulp-cssnano');
var htmlImport = require('gulp-html-import');
var imagemin = require('gulp-imagemin');
var concat = require('gulp-concat');
var cache = require('gulp-cache');
var image = require('gulp-image');

var {src, series, parallel, watch} = require('gulp');

var jsPath = 'app/assets/js/*.js';
var scssPath = 'app/assets/sass/**/*.scss';
var htmlPath = 'app/html/modules/*.html';
var imgPath = 'app/assets/images/**/*';

function Html() {
    return src(htmlPath)
        .pipe(htmlImport('app/html/partials/'))
        .pipe(concat('index.html'))
        .pipe(gulp.dest('dist'));
}

function Image() {
    return src(imgPath)
        .pipe(imagemin())
        .pipe(cache(image({
            interlaced: true
          })))
        .pipe(gulp.dest('dist/assets/images'))
}

function Js() {
    return src(jsPath)
        .pipe(concat('index.js'))
        .pipe(gulp.dest('dist/assets/js'))
}

function Sass() {
    return src(scssPath)
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('styles.css'))
        .pipe(cssnano())
        .pipe(gulp.dest('dist/assets/css'))
}



function watchTask() {
    browserSync.init({
        server: {
            baseDir: 'dist',
            index: 'index.html',

        }
    });
    watch([htmlPath, scssPath, jsPath, imgPath], {interval: 1000}, parallel(Html, Sass, Js, Image))
    .on('change', browserSync.reload);
}

exports.Html = Html;
exports.Sass = Sass;
exports.Js = Js;
exports.Image = Image;
exports.default = series(parallel(Html, Sass, Js, Image), watchTask);
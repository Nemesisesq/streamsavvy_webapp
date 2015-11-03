'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var clean = require('gulp-clean');
var livereload = require('gulp-livereload');

//livereload(
//    {
//        port:'8000',
//        host: '127.0.0.1'
//    })

var paths = {
    dist: './static/dist/',
    templates: './templates',
    partials: './static/partials',
    images_dest: './static/img',

    index: ['./angular_app_frontend/index.html'],
    features_html: [
        './angular_app_frontend/features/footer/*.html',
        './angular_app_frontend/features/home/*.html',
        './angular_app_frontend/features/journey_one/**/*.html',
        './angular_app_frontend/features/nav/*.html',
        './angular_app_frontend/features/progress/*.html',
        './angular_app_frontend/features/search/*.html'
    ],
    images: ['./angular_app_frontend/img/*']

};

gulp.task('clean', function() {
 return gulp.src(paths.dist)
 .pipe(clean());
});

gulp.task('bower', function () {
    return gulp.src(['./bower_components/**/*.*', './bower_components/**/*.js', './bower_components/**/*.css'])
        .pipe(gulp.dest(paths.dist))
});

gulp.task('index', function () {
    return gulp.src(paths.index)
        .pipe(gulp.dest(paths.templates))
});

gulp.task('partials', function () {
    return gulp.src(paths.features_html)
        .pipe(gulp.dest(paths.partials))
        .pipe(livereload());
});

gulp.task('scripts', function () {
    return gulp.src(['./angular_app_frontend/**/*.js'])
        .pipe(concat('all.js'))
        .pipe(gulp.dest(paths.dist))
        .pipe(livereload());
});


gulp.task('sass', function () {
    return gulp.src('./angular_app_frontend/**/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(paths.dist))
        .pipe(livereload());
});

gulp.task('images', function () {
    return gulp.src(paths.images)
        .pipe(gulp.dest(paths.images_dest));
});

gulp.task('sass:watch', function () {
    livereload.listen();
    gulp.watch('./angular_app_frontend/**/*.scss', ['sass']);
});

gulp.task('script:watch', function () {
    livereload.listen();
    gulp.watch('./angular_app_frontend/**/*.js', ['scripts']);
});
gulp.task('html:watch', function () {
    livereload.listen();
    gulp.watch(paths.features_html, ['partials']);
    gulp.watch(paths.index, ['index']);
});

gulp.task('images:watch', function () {
    gulp.watch(paths.images, ['images']);
});

gulp.task('default', ['scripts', 'bower', 'index', 'partials', 'images', 'script:watch', 'sass', 'sass:watch', 'html:watch', 'images:watch']);


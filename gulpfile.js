'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var paths = {
    dist: './static/dist/',
    templates: './templates',
    partials: './static/partials',
    images_dest: './static/img',

    index: ['./main/index.html'],
    features_html: [
        './main/features/footer/*.html',
        './main/features/home/*.html',
        './main/features/journey_one/**/*.html',
        './main/features/nav/*.html',
        './main/features/progress/*.html',
        './main/features/search/*.html'
    ],
    images: ['./main/img']

};
gulp.task('bower', function () {
    return gulp.src('./bower_components/**/*.js')
        .pipe(gulp.dest(paths.dist))
})

gulp.task('index', function () {
    return gulp.src(paths.index)
        .pipe(gulp.dest(paths.templates))
});

gulp.task('partials', function () {
    return gulp.src(paths.features_html)
        .pipe(gulp.dest(paths.partials))
});

gulp.task('scripts', function () {
    return gulp.src(['./main/**/*.js'])
        .pipe(concat('all.js'))
        .pipe(gulp.dest(paths.dist));
});


gulp.task('sass', function () {
    return gulp.src('./main/**/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(paths.dist));
});

gulp.task('images', function () {
    return gulp.src(paths.images)
        .pipe(gulp.dest(paths.images_dest));
});

gulp.task('sass:watch', function () {
    gulp.watch('./main/**/*.scss', ['sass']);
});

gulp.task('script:watch', function () {
    gulp.watch('./main/**/*.js', ['scripts']);
});
gulp.task('html:watch', function () {
    gulp.watch(paths.features_html, ['partials']);
    gulp.watch(paths.index, ['index']);
});

gulp.task('images:watch', function () {
    gulp.watch(paths.images, ['images']);
});

gulp.task('default', ['scripts', 'bower', 'index', 'partials', 'images', 'script:watch', 'sass', 'sass:watch', 'html:watch', 'images:watch']);


/*-----------------------------------------------------------------------------


@author:        Marc Pérez Castells
@contact:       marc.perez@whads.com
@organization:  Whads Accent SL
@since:         March 2016
-----------------------------------------------------------------------------*/

var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    watch = require('gulp-watch'),
    batch = require('gulp-batch'),
    imagemin = require('gulp-imagemin'),
    notify = require('gulp-notify');

gulp.task('sass', function() {
  return sass('src/styles/main.scss', { style: 'expanded'/*'compressed'*/ })
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('public/stylesheets'))
});

//gulp.task('images', function() {
//  return gulp.src('resources/images/**/*')
//    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
//    .pipe(gulp.dest('resources/images'))
//    .pipe(notify({ message: 'Images task complete' }));
//});

gulp.task('watch', function () {
    watch('src/styles/**/*.scss', batch(function (events, done) {
        gulp.start('sass', done);
    }));
});

//gulp.task('watch-images', function() {
//    watch('resources/images/**/*', batch(function (events, done) {
//        gulp.start('images', done);
//    }));
//});

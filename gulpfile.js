var gulp = require('gulp'),
    gp_rename = require('gulp-rename'),
    minify = require('gulp-minify'),
    gp_sourcemaps = require('gulp-sourcemaps'),
    watch = require('gulp-watch'),
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer'),
    babel = require('gulp-babel'),
    bro = require('gulp-bro'),
    del = require('del'),
    runSequence = require('run-sequence');

gulp.task('clean', function () {
  return del([
    'dist/**',
  ]);
});

gulp.task('resources', function(){
    gulp.src('assets/fonts/**/*')
    .pipe(gulp.dest('dist/fonts/'));
    gulp.src('assets/images/**/*')
    .pipe(gulp.dest('dist/images/'));
    return;
});

gulp.task('buildjs', function(){
    return gulp.src(
    [
        'assets/js/app.js'
    ])
    .pipe(gp_sourcemaps.init())
    .pipe(bro())
    .pipe(babel())
    .pipe(minify())
    .pipe(gp_sourcemaps.write('./'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('buildscss', function(){
    return gulp.src(
    [
        'assets/scss/app.scss'
    ])
    .pipe(gp_sourcemaps.init())
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false
            }))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gp_rename('app.css'))
    .pipe(gp_sourcemaps.write('./'))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('watch', function () {
    gulp.watch(
    [
        'assets/js/*'
    ]
    , ['buildjs']);
    gulp.watch(
    [
        'assets/scss/*'
    ]
    , ['buildscss']);
});

gulp.task('dev', function() {
    runSequence('clean',
                'resources',
                ['buildjs', 'buildscss'],
                'watch',
                function () {
                    console.log('watching...');
                });
});

gulp.task('default', function() {
    runSequence('clean',
                'resources',
                ['buildjs', 'buildscss'],
                function () {
                    console.log('done');
                });
});
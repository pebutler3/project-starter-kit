var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    minifyCss = require('gulp-minify-css'),
    uncss = require('gulp-uncss'),
    plumber = require('gulp-plumber'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    fileinclude = require('gulp-file-include');

gulp.task('serve', function() {

    browserSync.init({
        server: "./_site",
        open: false,
        ui: false,
        notify: false
    });

   gulp.watch(['assets/styles/**/*.scss'], ['styles'], reload),
   // gulp.watch(['assets/includes/**/*.html'], ['fileinclude', reload]),
   gulp.watch(['assets/**/*.html'],['fileinclude', reload]);
   gulp.watch('assets/**/*').on('change', browserSync.reload);
});

gulp.task('fileinclude', function() {
  gulp.src(['./assets/templates/**/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('./_site/'));
});

gulp.task('styles', function(){
  gulp.src([
   'assets/styles/app.scss'
  ])
  .pipe(plumber())
  .pipe(sass())
  .pipe(concat('app.css'))
  .pipe(minifyCss())
  .pipe(gulp.dest('./_site/css'));
});

gulp.task('clean', function () {
    return gulp.src('./site/css/app.css')
        .pipe(uncss({
            html: 'index.html'
        }))
        .pipe(gulp.dest('./out'));
});

gulp.task('scripts', function(){
  gulp.src([
    'assets/js/app.js',
  ])
  .pipe(concat('app.js'))
  .pipe(uglify())
  .pipe(gulp.dest('./_site/js'));
});


gulp.task('copy', function () {
        return gulp.src('./public/img/**/*', {
         base: './public/img'
        }).pipe(gulp.dest('_site/assets/img'));
});

gulp.task('default', ['styles', 'copy']);

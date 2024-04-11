const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const pxtorem = require('gulp-pxtorem');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
//compile scss into css
function style() {
    return gulp.src('./scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error',sass.logError))
    .pipe(autoprefixer())
    .pipe(pxtorem())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
}
function watch() {
    browserSync.init({
        server: {
           baseDir: "./",
           index: "./index.html"
        }
    });
    gulp.watch('./scss/**/*.scss', style)
    gulp.watch('./*.html').on('change', browserSync.reload);
    gulp.watch('./js/**/*.js').on('change', browserSync.reload);
}
exports.style = style;
exports.watch = watch;
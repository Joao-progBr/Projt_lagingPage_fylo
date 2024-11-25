const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const srcmaps = require('gulp-sourcemaps')


function compSass(){
    return gulp.src('./src/styles/main.scss')
    .pipe(srcmaps.init())
    .pipe(sass({
        outputStyle: 'compressed'
    }))
    .pipe(srcmaps.write('/maps'))
    .pipe(gulp.dest('./dist/styles'))
}

// exports.sass = compSass;
exports.watch = function(){
    gulp.watch('./src/styles/*.scss',{ignoreInitial:false}, gulp.series(compSass))
}
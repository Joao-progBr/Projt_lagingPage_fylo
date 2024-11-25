const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const srcmaps = require('gulp-sourcemaps');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin')


function compSass(){
    return gulp.src('./src/styles/main.scss')
    .pipe(srcmaps.init())
    .pipe(sass({
        outputStyle: 'compressed'
    }))
    .pipe(srcmaps.write('/maps'))
    .pipe(gulp.dest('./dist/styles'))
}

function processHtml() {
    return gulp.src('./src/*.html') // Seleciona os arquivos HTML na pasta src
        .pipe(htmlmin({
            collapseWhitespace: true, // Remove espaços desnecessários
            removeComments: true,    // Remove comentários
        }))
        .pipe(gulp.dest('./dist')); // Salva os arquivos processados na pasta dist
}

function imageMin(){
    return gulp.src('./src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/images'))
}

// exports.sass = compSass;
exports.watch = function(){
    gulp.watch('./src/styles/*.scss',{ignoreInitial:false}, gulp.series(compSass))
    gulp.watch('./src/*.html', { ignoreInitial: false }, gulp.series(processHtml)); // Observa alterações no HTML
}

exports.sass = compSass;
exports.html = processHtml;
exports.imagemin = imageMin;
exports.build = gulp.series(compSass, processHtml, imageMin);
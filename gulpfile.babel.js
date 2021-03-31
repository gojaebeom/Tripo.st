import gulp from 'gulp';
import del from 'del';
// import gulp_img from 'gulp-image';
import gulp_sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import mini_css from 'gulp-csso';
import browserfy from 'gulp-bro';
import babelify from 'babelify';
import postCSS from 'gulp-postcss';
const stripDebug = require('gulp-strip-debug');

gulp_sass.compiler = require('node-sass');

const BABEL_POLYFILL = './node_modules/@babel/polyfill/dist/polyfill.js';

const routes = {
    js:{
        watch:"src/**/*.js",
        src:"src/build.js",
        dest:"dist/static/js"
    },
    scss:{
        watch:"src/scss/**/*.scss",
        src:"src/scss/style.scss",
        dest:"dist/static/css"
    }
};

//js 컴파일
function jsWithConsole(){
    return gulp.src([BABEL_POLYFILL, routes.js.src])
        .pipe(browserfy({
            transform:[
                babelify.configure({ 
                    presets :['@babel/preset-env','@babel/preset-react'], 
                }),
                //['uglifyify', {global:true}] //js 파일 압축
            ]
        }))
        .pipe(gulp.dest(routes.js.dest));
}

function jsWithoutConsole(){
    return gulp.src([BABEL_POLYFILL, routes.js.src])
    .pipe(browserfy({
        transform:[
            babelify.configure({ 
                presets :['@babel/preset-env','@babel/preset-react'], 
            }),
            ['uglifyify', {global:true}] //js 파일 압축
        ]
    }))
    .pipe(stripDebug())
    .pipe(gulp.dest(routes.js.dest));
}

//scss 파일 컴파일
function scss(){
    return gulp.src(routes.scss.src)
        .pipe(gulp_sass().on('error', gulp_sass.logError))
        .pipe(postCSS([
            require('tailwindcss'),
            require('autoprefixer')
        ]))
        .pipe(mini_css())
        .pipe(gulp.dest(routes.scss.dest));
}

//수정사항 감시
function watch(){
    gulp.watch(routes.js.watch, jsWithConsole);
    gulp.watch(routes.scss.watch, scss);
}

// console.log 포함 , 변경사항 실시간 업데이트
export const dev = gulp.series([jsWithConsole, scss, watch]);

// 불필요한 console.log 제거, watch 모드 제거
export const prod = gulp.series([jsWithoutConsole, scss]);
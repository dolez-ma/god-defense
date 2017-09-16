let del         = require('del');
let gulp        = require('gulp');
let path        = require('path');
let gulpif      = require('gulp-if');
let buffer      = require('gulp-buffer');
let uglify      = require('gulp-uglify');
let exorcist    = require('exorcist');
let gutil       = require('gulp-util');
let source      = require('vinyl-source-stream');
let argv        = require('yargs').argv;
let browserify  = require('browserify');
let browserSync = require('browser-sync');
let babelify    = require('babelify');

const PHASER_PATH = './node_modules/phaser/build/';
const BUILD_PATH  = './build';
const JS_PATH     = BUILD_PATH + '/js';
const APP_PATH    = './app';
const ASSETS_PATH = './assets';
const START_FILE  = APP_PATH + "/index.js";
const RESULT_FILE = 'gd.js';

let keepFiles = false;

// verifie si l'environnement est celui de production
function isProd() {
    return argv.production;
}

// Affiche dans la console l'environnement correspondant
function logEnv() {
    if(isProd()){
        gutil.log(gutil.colors.green('Environnement de production utilisé...'));
    } else {
        gutil.log(gutil.colors.yellow('Environnement de developpement utilisé...'));
    }
}

/**
 * Supprime tout le contenu du dossier build
 */
function clean() {
    if(!keepFiles){
        del(['build/**/*.*']);
    }
}

/**
 * Copie le contenue du dossier ./assets dans le dossier build
 */
function copyAssets() {
    return gulp.src(ASSETS_PATH + '/**/*')
        .pipe(gulp.dest(BUILD_PATH));
}

/**
 * Copie les fichiers des librairies (en l'occurence Phaser, dans le dossier ./build/js
 */
function copyLibs() {
    let jsList = ['phaser.min.js'];
    
    if(!isProd()){
        jsList.push('phaser.map', 'phaser.js');
    }
    
    jsList = jsList.map(function (file) {
        return PHASER_PATH + file;
    });
    
    return gulp.src(jsList).pipe(gulp.dest(JS_PATH));
}

/**
 * Traduit ES2015 en ES5
 * Crée optionnellement un fichier map gd.js.map pour le debug
 */
function transcode(){
    
    let sourcemap = JS_PATH + '/' + RESULT_FILE + '.map';
    logEnv();
    
    return browserify({
        paths: [path.join(__dirname, 'app')],
        entries: RESULT_FILE,
        debug: true,
        transform: [
            [
                babelify, { presets: ["es2015"]}
            ]
        ]
    })
    .transform(babelify)
    .bundle().on('error', function (error) {
        gutil.log(gutil.colors.red('[Error]', error.message));
        this.emit('end');
    })
    .pipe(gulpif(!isProd(), exorcist(sourcemap)))
    .pipe(source(RESULT_FILE))
    .pipe(buffer())
    .pipe(gulpif(isProd(), uglify()))
    .pipe(gulp.dest(JS_PATH));
}

/**
 * Lance le serveur
 * Ecoute les changements sur les fichiers du dossier "app"
 */
function run() {
    let options = {
        server: {
            baseDir: BUILD_PATH
        },
        open: false // false: n'ouvre pas de navigateur automatiquement
    };
    
    browserSync(options);
    
    // Ecoute les changements sur les fichier du dossier "app"
    gulp.watch(APP_PATH + '/**/*.js', ['watch-js']);
    
    // Ecoute les changements sur les fichiers du dossier "assets"
    gulp.watch(ASSETS_PATH + '/**/*', ['watch-assets']).on('change', function () {
        keepFiles = true;
    });
}

gulp.task('clean', clean);
gulp.task('copyAssets', ['clean'], copyAssets);
gulp.task('copyLibs', ['copyAssets'], copyLibs);
gulp.task('transcode', ['copyLibs'], transcode);
gulp.task('fastTranscode', transcode);
gulp.task('run', ['transcode'], run);

gulp.task('watch-js', ['fastBuild'], browserSync.reload);
gulp.task('watch-assets', ['copyLibs'], browserSync.reload);

gulp.task('default', ['run']);

var gulp = require('gulp');

//header & banner
var header = require('gulp-header');
var pkg = require('./package.json');
var banner = ['/*!\n',
        ' * <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
        ' * Copyright 2014-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
        ' * Licensed under <%= pkg.license %> \n',
        ' */\n\n'];
banner.join();


/***** GULP BASIC TASKS *****/

//delete /css/ directory
var rimraf = require('rimraf');
gulp.task('rimraf-dist', function () {
    'use strict';
    rimraf('./css', function () {
        console.log('Directory "css" deleted by rimraf!');
    });
});

//NodeJS web server
var connect = require('gulp-connect');
gulp.task('webserver', function () {
    'use strict';
    connect.server({
        root: './',
        livereload: false,
        port: 8080
    });
});

//sass & css
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer'); //add vendor prefixes: -webkit-, -ms-, -o-,
var sourcemaps = require('gulp-sourcemaps'); //create .map files for scss debugging in browser
var cssmin = require('gulp-cssmin'); //create .min files
var rename = require('gulp-rename');
gulp.task('scss', function () {
    'use strict';
    gulp
        .src(
            'scss/*.scss'
        )
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(header(banner, {pkg: pkg}))
        .pipe(sourcemaps.write({includeContent: false}))
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('css'));
});
gulp.task('css-minify', function () {
    'use strict';
    gulp.src('css/**/*.css')
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('css'));
});


//first delete then create /css/ directory
gulp.task('build-dist', ['rimraf-dist', 'scss'], function () {
    'use strict';
    setTimeout(function () {
        gulp.start('css-minify');
    }, 800);
});




/***** GULP WATCH *****/
gulp.task('watch', function () {
    'use strict';

    gulp.watch([
        'scss/**/*.scss',
        'bower_components/bootstrap-sass/assets/stylesheets/bootstrap/*.scss'
    ], ['scss']);

});



/***** GULP COMPOUND TASKS *****/
gulp.task('default', ['build-dist', 'watch'], function () {
    'use strict';
    setTimeout(function () {
        gulp.start('webserver');
    }, 2100);
});

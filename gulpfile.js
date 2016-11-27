var gulp = require('gulp');
var header = require('gulp-header');
var rimraf = require('rimraf');
var connect = require('gulp-connect');
var compass = require('gulp-compass');
var pkg = require('./package.json');
var autoprefixer = require('gulp-autoprefixer'); //add prefixes -webkit-, -moz-, -o-


//banner
var banner = ['/*!\n',
        ' * <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
        ' * Copyright 2014-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
        ' * Licensed under <%= pkg.license %> \n',
        ' */\n\n'];
banner.join();


/////// GULP Tasks
gulp.task('rimraf-dist', function () {
    'use strict';
    rimraf('./css', function () {
        console.log('Directory "css" deleted by rimraf!');
    });
});

gulp.task('webserver', function () {
    'use strict';
    connect.server({
        root: './',
        livereload: false,
        port: 8080
    });
});

gulp.task('scss', function () {
    'use strict';
    gulp
        .src([
            'scss/main.scss'
        ])
        .pipe(compass({
            style: 'expanded', //nested, expanded, compact, or compressed
            comments: false, //show comments or not
            css: 'css', //target dir
            sass: 'scss', //source dir for .sass or scss files
            logging: true,
            time: true,
            require: []
        }))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'ff 17', 'opera 12.1', 'ios 6', 'android 4'))
        // .pipe(header(banner, {pkg: pkg}))
        .pipe(gulp.dest('css'));
});

//first delete then create JS, HTML and CSS files in /dist/ directory
gulp.task('build-dist', ['rimraf-dist'], function () {
    'use strict';
    setTimeout(function () {
        gulp.start('scss');
    }, 1300);
});




////// GULP Watchers
gulp.task('watch', function () {
    'use strict';

    gulp.watch([
        'scss/**/*.scss',
        'bower_components/bootstrap-sass/assets/stylesheets/bootstrap/*.scss'
    ], ['scss']);

});




//defult gulp task
gulp.task('default', ['build-dist', 'watch'], function () {
    'use strict';
    setTimeout(function () {
        gulp.start('webserver');
    }, 5000);
});

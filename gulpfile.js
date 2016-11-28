var gulp = require('gulp');
var header = require('gulp-header');
var rimraf = require('rimraf');
var connect = require('gulp-connect');
var pkg = require('./package.json');

//SASS NMPs
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');


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


gulp.task('scss-sass', function () {
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


//first delete then create /css/ directory
gulp.task('build-dist', ['rimraf-dist'], function () {
    'use strict';
    setTimeout(function () {
        gulp.start('scss-sass');
    }, 800);
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
    }, 2100);
});

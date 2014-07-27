var gulp = require('gulp'),
    usemin = require('gulp-usemin'),
    uglify = require('gulp-uglify'),
    rimraf = require('rimraf'),
    minifyHtml = require('gulp-minify-html'),
    minifyCss = require('gulp-minify-css'),
    header = require('gulp-header'),
    inject = require('gulp-inject'),
    imagemin = require('gulp-imagemin'),
    templateCache = require('gulp-angular-templatecache'),
    ngmin = require('gulp-ngmin'),
    jshint = require('gulp-jshint'),
    rev = require('gulp-rev'),
    connect = require('gulp-connect'),
    less = require('gulp-less'),
    watch = require('gulp-watch');


// var compass = require('gulp-compass');
// var less = require('gulp-less');

// Constants
var SERVER_PORT = 5000;
var LIVERELOAD_PORT = 35729;
var CSS_COMPILE = ['nativeCss']; //['compass', 'less', 'nativeCss'];

// Header configuration
var pkg = require('./package.json');
var banner = ['/**',
    ' * <%= pkg.name %> - <%= pkg.description %>',
    ' * @version v<%= pkg.version %>',
    ' * @link <%= pkg.homepage %>',
    ' * @license <%= pkg.license %>',
    ' */',
    ''
].join('\n');

// Compilation tasks
gulp.task('clean', function(cb) {
    rimraf.sync('./build');
    rimraf.sync('./.tmp');
    rimraf.sync('./.sass-cache');
    cb(null);
});

gulp.task('compass', function() {
    return gulp.src('./app/stylesheets/*.scss')
        .pipe(compass({
            css: '.tmp/stylesheets',
            sass: 'app/stylesheets',
            image: 'app/images'
        }))
        .on('error', function(err) {
            console.log(err.message);
        })
        .pipe(gulp.dest('./.tmp'))
        .pipe(connect.reload());
});

gulp.task('less', function() {
    return gulp.src('./app/stylesheets/*.less')
        .pipe(less())
        .pipe(gulp.dest('./.tmp'))
        .pipe(connect.reload());
});

gulp.task('nativeCss', function() {
    return gulp.src('./app/stylesheets/*.css')
        .pipe(connect.reload());
});

gulp.task('compile:css', CSS_COMPILE);

gulp.task('lint', function() {
    return gulp.src('./app/scripts/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'));
});

gulp.task('views', function() {
    return gulp.src('./app/views/**/*.html')
        .pipe(templateCache({
            module: 'app',
            root: 'views'
        }))
        .pipe(gulp.dest('./.tmp/javascripts'));
});

gulp.task('images', function() {
    return gulp.src('./app/images/**/*.*')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/images'));
});

gulp.task('compile', ['clean', 'views', 'images', 'compile:css', 'lint'], function() {
    var projectHeader = header(banner, {
        pkg: pkg
    });

    gulp.src('./app/*.html')
        .pipe(inject(gulp.src('./.tmp/scripts/templates.js', {
            read: false
        }), {
            starttag: '<!-- inject:templates:js -->',
            ignorePath: '/.tmp'
        }))
        .pipe(usemin({
            css: [minifyCss(), rev(), projectHeader],
            html: [minifyHtml({
                empty: true
            })],
            js: [ngmin(), uglify(), rev(), projectHeader],
            js_libs: [rev()]
        }))
        .pipe(gulp.dest('build/'));
});

// Serve tasks
gulp.task('reload:html', function() {
    return gulp.src('./app/**/*.html')
        .pipe(connect.reload());
})

gulp.task('watch', function() {
    gulp.watch('app/stylesheets/**/*.scss', ['compile:css']);
    gulp.watch('app/**/*.html', ['reload:html']);
});

gulp.task('serve:app', ['compile', 'watch'], function() {
    return connect.server({
        livereload: {
            port: LIVERELOAD_PORT
        },
        port: SERVER_PORT,
        root: ['./.tmp', './app']
    });
});

gulp.task('serve:build', ['compile'], function() {
    return connect.server({
        root: ['build'],
        port: SERVER_PORT
    });
});

gulp.task('default', ['compile']);

require('es6-promise').polyfill();
var gulp = require('gulp'),
    del = require('del'),
    connect = require('gulp-connect'),
    watch = require('gulp-watch'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    livereload = require('gulp-livereload'),
    gulpSequence = require('gulp-sequence'),
    uglyfy = require('gulp-uglify'),
    concat = require('gulp-concat'),
    series = require('stream-series'),
    htmlmin = require('gulp-htmlmin'),
    inject = require('gulp-inject'),
    compass = require('gulp-compass'),
    path = require('path'),
    cssmin = require('gulp-cssmin'),
    extender = require('gulp-html-extend'),
    iconfont = require('gulp-iconfont'),
    iconfontCss = require('gulp-iconfont-css'),
    svgSprite = require('gulp-svg-sprite'),
    config					= {
        shape				: {
            dimension		: {			// Set maximum dimensions
                maxWidth	: 300,
                maxHeight	: 300
            },
            spacing			: {			// Add padding
                padding		: 0
            }
        },
        mode				: {
            view			: {
                dest        : 'sprite',
                bust		: false,
                layout      : 'horizontal',
                render		: {
                    scss	: {
                        dest    : '_sprite'
                    }
                }
            }
        }
    };

    swallowError = function (error) {
        console.log(error.toString());
        this.emit('end');
    };


/********     LIVERELOAD      *******/
gulp.task('webserver', function() {
    connect.server({
        port:8081,
        livereload: true,
        root: ['./']
    });
});

gulp.task('livereload', ['build-scripts'], function() {
    gulp.src(['web/**/*.*']).pipe(watch(['web/**/*.*'])).pipe(connect.reload());
});


/********     WATCH FILES     *******/
gulp.task('watch', function() {
    gulp.watch(['./src/assets/_scss/**/*.scss', './src/assets/*.scss'], ['build-sass']);
    gulp.watch('./src/assets/scripts/**/*.js', ['build-scripts']);
    gulp.watch('./src/assets/fonts/**/*.*', ['build-fonts']);
    gulp.watch('./src/assets/img/**/*.*', ['build-img']);
    gulp.watch('./src/assets/documents/**/*.*', ['build-docs']);
    gulp.watch('./src/views/**/*.*', ['build-php']);
});

/********     SVG2FONT      *******/
gulp.task('icon2font', function(){
    return gulp.src('src/assets/svg/icons2font/*.svg')
        .pipe(iconfontCss({
            fontName: 'icons',
            path: 'src/assets/_scss/templates/_icons.scss',
            targetPath: '../_scss/fonts/_icons.scss',
            fontPath: '../fonts/'
        }))
        .pipe(iconfont({
            fontName: 'icons',
            formats: ['ttf', 'eot', 'woff', 'woff2', 'svg'],
            prependUnicode: true,
            normalize : true
        }))
        .pipe(gulp.dest('src/assets/fonts/'));
});

/********     SVG2SPRITE      *******/
gulp.task('svg2sprite', function() {
    gulp.src('src/assets/svg/icons2sprite/*.svg')
        .pipe(svgSprite(config))
        .pipe(gulp.dest('src/assets/'));
});


/********     SASS      *******/
/*   Sass sequence - develop  */
gulp.task('build-sass', function (cb) {
    gulpSequence('del-css', 'sass', cb);
});

gulp.task('del-css',  del.bind(null, './web/css/*.css'));

gulp.task('sass', function () {
    gulp.src([
        './src/assets/*.scss'
    ])
    .pipe(compass({
        project: path.join(__dirname),
        css: 'src/assets/.temp',
        sass: 'src/assets',
        sourcemap: true
    }))
    .on('error', swallowError)
    .pipe(gulp.dest('./web/css/'))
});

/*  Sass sequence - production  */
gulp.task('build-sass-prod', function (cb) {
    gulpSequence('del-css', 'sass-prod', cb);
});


gulp.task('sass-prod', function () {
    gulp.src([
        './src/assets/*.scss'
    ])
    .pipe(compass({
        project: path.join(__dirname),
        css: 'src/assets/.temp',
        sass: 'src/assets',
        style: 'compressed',
        output_style :'compressed',
        comments: false,
        logging: false,
        debug_info: false,
        debug: false,
        environment: 'production'
    }))
    .on('error', swallowError)
    .pipe(concat('app.css'))
    .pipe(cssmin())
    .pipe(gulp.dest('./web/css/'))
});

/********     JS        *******/
/*    JS sequence - develop   */
gulp.task('build-scripts', function (cb) {
    gulpSequence('del-scripts', 'script-main',  cb);
});

gulp.task('del-scripts',  del.bind(null, './web/scripts/'));

gulp.task('script-main', function() {
    return series(gulp.src('./src/assets/scripts/**/*.js'))
        .pipe(gulp.dest('./web/scripts/'));
});

/*    JS sequence - production   */
gulp.task('build-scripts-prod', function (cb) {
    gulpSequence('del-scripts', 'script-prod',  cb);
});

gulp.task('script-prod', function() {
    return series(gulp.src('./src/assets/scripts/**/*.js'))
        .pipe(uglyfy())
        .pipe(gulp.dest('./web/scripts/'));
});


/********     FONTS     *******/
gulp.task('build-fonts', function(cb) {
    gulpSequence('del-fonts', 'fonts',  cb);
});

gulp.task('del-fonts',  del.bind(null, './web/fonts/'));

gulp.task('fonts', function() {
    return gulp.src('./src/assets/fonts/**/*.*')
        .pipe(gulp.dest('./web/fonts/'));
});


/********     IMG     *******/
gulp.task('build-img', function(cb) {
    gulpSequence('del-img', 'img',  cb);
});

gulp.task('del-img',  del.bind(null, './web/img/'));

gulp.task('img', function() {
    return gulp.src('./src/assets/img/**/*.*')
        .pipe(gulp.dest('./web/img/'));
});

/********     DOCS     *******/
gulp.task('build-docs', function(cb) {
    gulpSequence('del-docs', 'docs',  cb);
});

gulp.task('del-docs',  del.bind(null, './web/documents/'));

gulp.task('docs', function() {
    return gulp.src('./src/assets/documents/**/*.*')
        .pipe(gulp.dest('./web/documents/'));
});


gulp.task('build-php', function(cb) {
    gulpSequence('del-php', 'php', cb);
});

gulp.task('del-php',  del.bind(null, ['./web/*.php', './web/**/*.twig']));

gulp.task('php', function() {
    return gulp.src(['./src/views/**/*.php', './src/views/**/*.twig'])
        //.pipe(extender({annotations:true,verbose:false}))
        .pipe(gulp.dest('./web/'))
});


gulp.task('build-html', function(cb) {
    gulpSequence('del-html', 'html', 'inject', cb);
});

gulp.task('del-html',  del.bind(null, './web/*.html'));

gulp.task('html', function() {
    return gulp.src('./src/views/*.html')
        .pipe(extender({annotations:true,verbose:false}))
        .pipe(gulp.dest('./web/'))
});

gulp.task('build-sprite', function(cb) {
    gulpSequence('del-sprite', 'copy-sprite', cb);
});

gulp.task('del-sprite',  del.bind(null, './web/sprite/*.html'));

gulp.task('copy-sprite', function() {
    return gulp.src('./src/assets/sprite/svg/*.svg ')
        .pipe(extender({annotations:true,verbose:false}))
        .pipe(gulp.dest('./web/sprite/'))
});


gulp.task('inject', function() {
    setTimeout(
        function(){
            var sources = gulp.src(['web/scripts/**/*.js', 'web/css/**/*.css'], {read: false});
            return gulp.src('./web/**/*.html')
                .pipe(inject(sources, {relative: true}))
                .pipe(htmlmin({collapseWhitespace: true, removeComments:true}))
                .pipe(gulp.dest('./web/'))
        }
        ,1000
    );
});

/********     DEVELOP SEQUENCE     *******/
gulp.task('sequence-develop', function (cb) {
    gulpSequence('icon2font', 'svg2sprite', 'build-fonts', 'build-img', 'build-docs', 'build-php','build-sass', 'webserver','livereload', 'watch' ,  cb);
});

gulp.task('default', ['sequence-develop']);


/********    PRODUCTION SEQUENCE   *******/
gulp.task('production', function (cb) {
    gulpSequence('icon2font', 'svg2sprite', 'build-sass-prod', 'build-fonts', 'build-img', 'build-docs', 'build-scripts-prod', 'build-php', 'build-sprite',  cb)
});
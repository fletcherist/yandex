var gulp = require('gulp');
var livereload = require('gulp-livereload');
var uglify = require('gulp-uglify');
var pump = require('pump');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var clean = require('gulp-clean');


gulp.task('livereload', function (cb) {
    return gulp.src('./').pipe(livereload());
});

gulp.task('compress-js', function () {
    return gulp.src(
        ['./src/js/game-3/game.js',
        './src/js/game-3/animations.js',
        './src/js/game-3/interface.js',
        './src/js/game-3/timer.js',
        './src/js/game-3/init.js']) 
        .pipe(concat('bundle.js'))
        .pipe(babel({presets: ['es2015']}))
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function(){
	livereload.listen();
	gulp.watch('./src/**/*', ['compress-js', 'livereload']);
});

gulp.task('default', ['watch']);

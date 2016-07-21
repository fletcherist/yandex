import gulp from 'gulp'
import babel from 'gulp-babel'
import concat from 'gulp-concat'
import sourcemaps from 'gulp-sourcemaps'
import postcss from 'postcss-csso'
import concatCss from 'gulp-concat-css'
import csso from 'gulp-csso'
import plumber from 'gulp-plumber'
import livereload from 'gulp-livereload'

gulp.task('default', ['watch']);

gulp.task('watch', () => {
	livereload.listen();
	gulp.watch('./src/js/**/*.js', ['js', 'livereload']);
	gulp.watch('./src/css/*.css', ['css', 'livereload']);
});

gulp.task('livereload', () => {
    return gulp.src('./')
    	.pipe(livereload({ start: true }));
});

gulp.task('css', () => {
	var processors = [
		csso()
	];
	return gulp.src('./src/css/*.css')
		.pipe(plumber())
		.pipe(concatCss('bundle.css'))
		.pipe(gulp.dest('./build'));
});

gulp.task('js', () => {
	return gulp.src('./src/js/**/*')
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(babel({
			presets: ['es2015', 'react']
		}))
		.pipe(concat('app.bundle.js'))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./build'));
});
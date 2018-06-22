var gulp = require('gulp'),
		sass = require('gulp-sass'),
		autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del');

//gulp.task("task-name", function(){ //do-something});
gulp.task('styles', function(){
	return gulp.src('app/scss/styles.scss')
		.pipe(autoprefixer('last 2 version'))
		.pipe(sass())
		.pipe(gulp.dest('app/css'))
		.pipe(rename({suffix: 'min'}))
		.pipe(cssnano())
		.pipe(gulp.dest('dist'))
		.pipe(notify({message:'Style task complete'}));
	//'pipe' = chain together
});
gulp.task('scripts', function() {
  return gulp.src('app/scripts/**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
    .pipe(notify({ message: 'Scripts task complete'}));
});

//Clean
gulp.task('clean', function() {
    return del(['dist/css', 'dist/js']);
});


// Default task
gulp.task('default', ['clean'], function() {
  gulp.start('styles', 'scripts');
});
	
// Watch
gulp.task('watch', function() {

  // Watch .scss files
  gulp.watch('app/css/**/*.scss', ['styles']);

  // Watch .js files
  gulp.watch('app/scripts/**/*.js', ['scripts']);

  // Create LiveReload server
  livereload.listen();

  // Watch any files in dist/, reload on change
  gulp.watch(['dist/**']).on('change', livereload.changed);

});
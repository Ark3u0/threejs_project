var gulp = require('gulp');
var webpack = require("webpack-stream");
var babel = require('gulp-babel');

// Build Client Package
gulp.task('bundle', function(done) {
  return webpack(require('./webpack.config.js'))
    .pipe(gulp.dest('./build/resources/js'));
});

// Build Node.js Server Code
gulp.task('transpile-server', function(done) {
  gulp.src('./server/es6/**/*.es6')
      .pipe(babel())
      .pipe(gulp.dest('./build'))
      .on('end', done);
});

gulp.task('cp-resources', function(done) {
  return gulp.src('./resources/**/*')
    .pipe(gulp.dest('./build/resources'));
});

gulp.task('cp-views', function(done) {
  return gulp.src('./views/**/*')
    .pipe(gulp.dest('./build/views'));
});

gulp.task('build', ['transpile-server', 'bundle', 'cp-resources', 'cp-views']);
gulp.task('default', ['build']);
var gulp = require('gulp');
var webpack = require("webpack-stream");
var babel = require('gulp-babel');

// Build Client Package
gulp.task('bundle', function(done) {
  return webpack(require('./webpack.config.js'))
    .pipe(gulp.dest('./build'));
});

// Build Node.js Server Code
gulp.task('transpile-server', function(done) {
  gulp.src('./server/es6/**/*.es6')
      .pipe(babel())
      .pipe(gulp.dest('./build/server'))
      .on('end', done);
});

gulp.task('default', ['transpile-server', 'bundle']);